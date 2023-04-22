import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const preAuthorizedAccountRouter = createTRPCRouter({
  addPreAuthUser: privateProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input, ctx }) => {
        try{
            await ctx.prisma.preAuthorizedAccount.create({
                data: {
                    pre_authorized_email: input.email
                }
            })
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                  throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: "Email already exists"})
                }
              }
        }
    }),
});
