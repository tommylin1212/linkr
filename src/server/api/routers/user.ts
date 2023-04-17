
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

//create user router for User table, with create and update procedures
export const userRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ name: z.string()}))
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.create({
                data: {
                    UserName: input.name,
                },
            });
            return user;
        }),
    update: publicProcedure
        .input(z.object({ id: z.string(), name: z.string()})) 
        .query(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.update({
                where: { id: input.id },
                data: {
                    UserName: input.name,
                },
            });
            return user;
        }),
        //get all users
    getAll: publicProcedure.query(async ({ ctx }) => {
        const users = await ctx.prisma.user.findMany();
        return users;
    }),
    //delete user by id
    delete: publicProcedure
        .input(z.object({ id: z.string()}))
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.delete({
                where: { id: input.id },
            });
            return user;
        }),
});
