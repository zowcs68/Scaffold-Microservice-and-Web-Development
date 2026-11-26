import { Elysia, t } from "elysia";
import { getCatalogProducts } from "./catalog";


const CatalogProductSchema = t.Object({
  id: t.String(),
  name: t.String(),
  priceSatang: t.Number({ minimum: 0 }),
  available: t.Boolean(),
});

const CatalogListSchema = t.Object({
  data: t.Array(CatalogProductSchema),
});

const CatalogValidationErrorSchema = t.Object({
  error: t.Object({
    code: t.Literal("VALIDATION_ERROR"),
    message: t.Literal("available must be true or false"),
    details: t.Array(t.Object({
      field: t.Literal("available"),
      reason: t.Literal("invalid_value"),
    })),
  }),
});


// Health route confirms that this app responds.
export const app = new Elysia().get(
  "/health",
  () => ({ status: "ok" as const }),
  {
    response: t.Object({ status: t.Literal("ok") }),
  },
).get(
  "/api/v1/catalog/products",
  ({ query, set }) => {
    const value = query.available;
    if (value !== undefined && value !== "true" && value !== "false") {
      set.status = 422;
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "available must be true or false",
          details: [{ field: "available", reason: "invalid_value" }],
        },
      };
    }

    const available =
      value === undefined ? undefined : value === "true"; // ล็กค่าของ query string เป็น boolean หรือ undefined
    return { data: getCatalogProducts(available) };
  },
  {
    query: t.Object({ available: t.Optional(t.String()) }),
    response: {
      200: CatalogListSchema,
      422: CatalogValidationErrorSchema,
    },
  },
)




