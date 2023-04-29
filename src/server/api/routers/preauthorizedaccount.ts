import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const preAuthorizedAccountRouter = createTRPCRouter({
  addPreAuthUser: privateProcedure
    .input(z.object({ email: z.string().email(), isAdmin: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
        try{
            await ctx.prisma.preAuthorizedAccount.create({
                data: {
                    pre_authorized_email: input.email,
                    pre_authorized_as_admin: input.isAdmin
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

    getAll: privateProcedure.query(({ ctx }) => {
        return ctx.prisma.preAuthorizedAccount.findMany();
      }),

    deletePreAuthUser: privateProcedure
    .input(z.object({ userID: z.number() }))
    .mutation(async ({ input, ctx }) => {
        await ctx.prisma.preAuthorizedAccount.delete({
            where: {
                pre_authorized_id: input.userID
            }
        })
    }),
});
