import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  createUser: privateProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.upsert(
        { where: {user_id: ctx.userId},
          create:
          {
            user_id: ctx.userId,
            user_email_address: input.email,
          },
          update: {}
        }
      );
    }),
    getAuthorized: privateProcedure
    .query(async ({ ctx }) => {
      let isAuthorized = false;
      const authorizedUser = await ctx.prisma.user.findFirst(
        {where:
          {
            user_id: ctx.userId,
            user_is_authorized: true
          },
          select:
          {user_id: true}
        }
      );
      if (authorizedUser != null){
        isAuthorized = true;
      }
      return isAuthorized;
    }),
});
