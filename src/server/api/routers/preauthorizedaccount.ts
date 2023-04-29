import { PreAuthorizedAccount } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

type PreAuthReturnUsers = PreAuthorizedAccount & {
    isUserRegistered: boolean
}

export const preAuthorizedAccountRouter = createTRPCRouter({
  addPreAuthUser: privateProcedure
    .input(z.object({ email: z.string().email(), isAdmin: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
        await ctx.prisma.preAuthorizedAccount.upsert({
            where: {
                pre_authorized_email: input.email
            },
            create: {
                pre_authorized_email: input.email,
                pre_authorized_as_admin: input.isAdmin
            },
            update: {
                pre_authorized_as_admin: input.isAdmin
            }
        })
    }),

    getAll: privateProcedure.query(async ({ ctx }) => {
        //Gets all preregistered users and checks to see if user has an account already in the system
        const returnUsers: PreAuthReturnUsers[] = []
        const users = await ctx.prisma.user.findMany({
            select: {
                user_email_address: true
            }
        })
        const preAuthedUsers = await ctx.prisma.preAuthorizedAccount.findMany();
        preAuthedUsers.forEach(preAuthUser => {
            const isUserRegistered = users.some(user => user.user_email_address == preAuthUser.pre_authorized_email)
            returnUsers.push({...preAuthUser, isUserRegistered: isUserRegistered})
        });
        return returnUsers;
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
