import { createTRPCRouter } from "~/server/api/trpc";
import { authorizedUserRouter } from "~/server/api/routers/authorizedUser";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  authorizedUser: authorizedUserRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
