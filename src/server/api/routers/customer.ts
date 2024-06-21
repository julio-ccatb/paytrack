import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { CustomerCreateWithoutProjectsInputSchema } from "pg/generated/zod";
import CustomerFindManyArgsSchema from "../../../../prisma/generated/zod/outputTypeSchemas/CustomerFindManyArgsSchema";
import {
  VerifyRoles,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import { mapPrismaErrorToTrpcError } from "../utils/prismaErrorHandler";

export const customerRouter = createTRPCRouter({
  create: protectedProcedure
    .use(VerifyRoles(["admin"]))
    .input(CustomerCreateWithoutProjectsInputSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        console.log(ctx.session?.user);
        const customer = await ctx.db.customer.create({ data: input });
        return customer;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          const errorResponse = mapPrismaErrorToTrpcError(error);
          throw new TRPCError(errorResponse);
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  list: publicProcedure
    .input(CustomerFindManyArgsSchema)
    .query(async ({ ctx, input }) => {
      try {
        const customers = await ctx.db.customer.findMany(input);
        return customers;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          const errorResponse = mapPrismaErrorToTrpcError(error);
          throw new TRPCError(errorResponse);
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
