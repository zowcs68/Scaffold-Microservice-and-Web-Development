import { Elysia, t } from "elysia";

// Health route confirms that this app responds.
export const app = new Elysia().get(
  "/health",
  () => ({ status: "ok" as const }),
  {
    response: t.Object({ status: t.Literal("ok") }),
  },
);
