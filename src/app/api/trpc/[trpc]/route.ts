import { createNextApiHandler} from "@trpc/server/adapters/next";
import {fetchRequestHandler} from "@trpc/server/adapters/fetch";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { env } from "~/env.mjs";

// this is the server RPC API handler

const handler = (request: Request) => {
    console.log(`incoming request ${request.url}`)
    return fetchRequestHandler({
      endpoint: "/api/trpc",
      req: request,
      router: appRouter,
      createContext: createTRPCContext,
      onError:
        env.NODE_ENV === "development"
          ? ({ path, error }) => {
              console.error(
                `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
              );
            }
          : undefined,
    });
}

export const GET = handler;
export const POST = handler;