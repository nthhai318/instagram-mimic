import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const LikeRouter = createTRPCRouter({
  create: protectedProcedure
  .input(z.object({postId: z.string()}))
  .mutation(({input, ctx}) => {
    return ctx.prisma.like.create({
      data: {
        postId: input.postId,
        userId: ctx.session.user.id,
      }
    })
  }),

  getAllFromPost: publicProcedure
  .input(z.object({postId: z.string()}))
  .query(async ({ input, ctx }) => {
    return ctx.prisma.comment.findMany({
      where: {
        postId: input.postId,
      }
    })
  }),

  delete: protectedProcedure
  .input(z.object({likeId: z.string()}))
  .mutation(({input, ctx}) => {
    return ctx.prisma.like.delete({
      where: {
        id: input.likeId
      }
    })
  })

});