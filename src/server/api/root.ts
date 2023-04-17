import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter, weatherRouter } from "~/server/api/routers/example";
import { userRouter } from "~/server/api/routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  weather: weatherRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
