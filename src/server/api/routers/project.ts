import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  ProjectCreateInputSchema,
  ProjectCreateManyInputSchema,
  ProjectFindManyArgsSchema,
} from "pg/generated/zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { mapPrismaErrorToTrpcError } from "../utils/prismaErrorHandler";

export const projectRouter = createTRPCRouter({
  create: publicProcedure
    .input(ProjectCreateManyInputSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const project = await ctx.db.project.create({ data: input });
        return project;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          const errorResponse = mapPrismaErrorToTrpcError(error);
          throw new TRPCError(errorResponse);
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  list: publicProcedure
    .input(ProjectFindManyArgsSchema)
    .query(async ({ ctx, input }) => {
      try {
        const customers = await ctx.db.project.findMany(input);
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
