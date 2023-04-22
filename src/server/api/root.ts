import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { preAuthorizedAccountRouter } from "./routers/preauthorizedaccount";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  preAuthorizedAccount: preAuthorizedAccountRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
