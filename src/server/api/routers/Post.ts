import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const PostRouter = createTRPCRouter({
  create: protectedProcedure
  .input(z.object({content: z.string(), image: z.string()}))
  .mutation(async ({input, ctx}) => {
    return ctx.prisma.post.create({
      data: {
        name: ctx.session.user.name || "anon",
        userId: ctx.session.user.id,
        userImg: ctx.session.user.image || "/default-avatar.webp",
        content: input.content,
        image: input.image,
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
