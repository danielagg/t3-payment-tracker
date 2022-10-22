import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const paymentRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.paymentTransaction.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }),

  add: publicProcedure
    .input(z.object({ amount: z.number(), description: z.string().nullish() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.paymentTransaction.create({
        data: {
          amount: input.amount,
          description: input.description,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.paymentTransaction.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
