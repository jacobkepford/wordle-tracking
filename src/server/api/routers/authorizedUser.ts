import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authorizedUserRouter = createTRPCRouter({
  getAuthorized: publicProcedure
    .input(z.object({ text: z.string().email() }))
    .query(async ({ input, ctx }) => {
      let isAuthorized = false;
      const authorizedUser = await ctx.prisma.authorizedUser.findFirst(
        {where:
          {
            authroized_email_address: input.text
          },
          select:
          {authroized_email_address: true}
        }
      );
      if (authorizedUser != null){
        isAuthorized = true;
      }
      return isAuthorized;
    }),
});
