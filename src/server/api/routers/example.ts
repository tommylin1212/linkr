/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});




//Weatherrouter to get current weather from the climaCell api using fetch
export const weatherRouter =createTRPCRouter({
  getWeather: publicProcedure.query(() => {
    return fetch('https://api.tomorrow.io/v4/weather/realtime?location=53092&units=imperial&apikey=M75cq5xtUlTlGWNfic8A3y5kHhviEVRk')
    .then(response => response.json())
    .then(data => {
      return data
    })
  })})

  


