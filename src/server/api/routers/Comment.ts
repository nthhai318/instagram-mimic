import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const CommentRouter = createTRPCRouter({
  create: protectedProcedure
  .input(z.object({postId: z.string(), content: z.string()}))
  .mutation(({input, ctx}) => {
    return ctx.prisma.comment.create({
      data: {
        postId: input.postId,
        userId: ctx.session.user.id,
        name: ctx.session.user.name || "anon",
        userImg: ctx.session.user.image || "/default-avatar.webp",
        content: input.content,
      }
    })
  }),

  getAllFromPost: publicProcedure
  .input(z.object({postId: z.string()}))
  .query(async ({ ctx, input }) => {
    return ctx.prisma.comment.findMany({
      where: {
        postId: input.postId,
      }
    });
  }),

  delete: protectedProcedure
  .input(z.object({commentId: z.string()}))
  .mutation(({input, ctx}) => {
    return ctx.prisma.comment.delete({
      where: {
        id: input.commentId,
      }
    })
  })

});
