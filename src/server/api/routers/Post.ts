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
    return ctx.prisma.post.findMany({
      include: {
        like: {
          select: {
            userId: true,
            id: true,
          }
        },
        comment: {
          select: {
            userId: true,
          }
        }
      }
    });  
  }),

  getPostById: publicProcedure
  .input(z.object({postId: z.string()}))
  .query(({ input, ctx }) => {
    return ctx.prisma.post.findUnique({
      where: {
        id: input.postId,
      },
      include: {
        like: true,
        comment: true
      }
    });  
  }),

  getPostByUserId: publicProcedure
  .input(z.object({userId: z.string()}))
  .query(({ input, ctx }) => {
    return ctx.prisma.post.findMany({
      where: {
        userId: input.userId,
      },
      include: {
        like: {
          select: {
            userId: true,
            id: true,
          }
        },
        comment: {
          select: {
            userId: true,
          }
        }
      }
    });  
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
