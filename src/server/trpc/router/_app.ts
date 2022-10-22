// src/server/router/_app.ts
import { router } from "../trpc";

import { paymentRouter } from "./payment";

export const appRouter = router({
  payments: paymentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
