import { z } from "zod";
import {nanoid} from "nanoid";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { supabase } from "lib/supabaseClient";

const prepareBase64DataUrl = (base64: string) =>
  base64
    .replace("data:image/webp;", "data:image/webp;charset=UTF-8;")
    .replace(/^.+,/, "");

export const PostRouter = createTRPCRouter({
  create: protectedProcedure
  .input(z.object({content: z.string(), image: z.string()}))
  .mutation(async ({input, ctx}) => {

    const {data, error} = await supabase.storage.from("instagram-mimic").upload(`public/${ctx.session.user.id}/${nanoid(10)}`, Buffer.from(prepareBase64DataUrl(input.image), "base64"))

    if (error) { console.log("upload image failed: ", error )}
    let imgUrl = "";
    if (data) {      
      const Url = supabase.storage.from("instagram-mimic").getPublicUrl(data.path);
      imgUrl = Url.data.publicUrl;
    }

    return ctx.prisma.post.create({
      data: {
        name: ctx.session.user.name || "anon",
        userId: ctx.session.user.id,
        userImg: ctx.session.user.image || "/default-avatar.webp",
        content: input.content,
        image: imgUrl,
      }
    })

  }),

  getAll: publicProcedure
  .query(async ({ ctx }) => {
    return ctx.prisma.post.findMany();  
  }),

  delete: protectedProcedure
  .input(z.object({postid: z.string()}))
  .mutation(({input, ctx}) => {
    return ctx.prisma.post.delete({
      where: {
        id: input.postid,
      }
    })
  })

});
