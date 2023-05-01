import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

//create post router for tRPC
export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany();
    return posts;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
      });
      return post;
    }),
  //create post with title, content, authorID foreign key to user
  create: publicProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), authorId: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: input.authorId,
        },
      });
      return post;
    }),
  //update post by id
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        authorId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          authorId: input.authorId,
        },
      });
      return post;
    }),
  //delete post by id
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.delete({
        where: { id: input.id },
      });
      return post;
    }),
  //get all posts by authorID
  getPostsByAuthorId: publicProcedure
    .input(z.object({ authorId: z.string() }))
    .query(async ({ input, ctx }) => {
      const posts = await ctx.prisma.post.findMany({
        where: { authorId: input.authorId },
      });
      return posts;
    }),
    
    
});
//
