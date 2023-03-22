import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { PostRouter } from "./routers/Post";
import { CommentRouter } from "./routers/Comment";
import { LikeRouter } from "./routers/Like";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  post: PostRouter,
  comment: CommentRouter,
  like: LikeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
