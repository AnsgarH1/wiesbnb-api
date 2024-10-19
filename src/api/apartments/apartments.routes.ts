import { createRoute } from "@hono/zod-openapi";
import { ApartmentsSchema } from "./apartments.schema";
import { ErrorSchema } from "../common/error.schema";

export const getApartmentsRoute = createRoute({
  method: "get",
  path: "/apartments",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ApartmentsSchema,
        },
      },
      description: "Retrieve the apartments",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Returns an error",
    },
  },
});
