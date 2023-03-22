import { z } from "zod";
import {nanoid} from "nanoid";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { supabase } from "lib/supabaseClient";

export const PostRouter = createTRPCRouter({
  create: protectedProcedure
  .input(z.object({content: z.string(), image: z.string()}))
  .mutation(async ({input, ctx}) => {

    const {data, error} = await supabase.storage.from("instagram-mimic").upload(`public/${ctx.session.user.id}/${nanoid(10)}`, input.image)

    if (error) { throw new Error("upload image failed")}


    return ctx.prisma.post.create({
      data: {
        name: ctx.session.user.name || "anon",
        userId: ctx.session.user.id,
        userImg: ctx.session.user.image || "/default-avatar.webp",
        content: input.content,
        image: data.path,
      }
    })
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.prisma.post.findMany();
    results.sort((a,b) => a.createdAt > b.createdAt ? -1 : 1)
    return results;  
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
