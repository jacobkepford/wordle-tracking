import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const scoreRouter = createTRPCRouter({
  addScore: privateProcedure
    .input(z.object({ score_value: z.number(), score_date: z.date() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.score.upsert(
        { where: {score_user: ctx.userId, score_date: input.score_date},
          create:
          {
            score_value: input.score_value,
            score_user: ctx.userId,
            score_date: input.score_date
          },
          update: 
          {
            score_value: input.score_value
          }
        }
      ); 
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.score.findMany();
  }),
});
