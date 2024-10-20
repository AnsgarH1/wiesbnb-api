import { createRoute } from "@hono/zod-openapi";
import { CreatedResponse, ErrorResponse } from "../common/response.schema";
import { CreateNewApartmentRequestBody } from "./admin.schema";

export const createNewApartmentRoute = createRoute({
  method: "post",
  path: "/admin/apartments",
  request: {
    body: {
      content: {
        "application/json": { schema: CreateNewApartmentRequestBody },
      },
      required: true,
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: CreatedResponse,
        },
      },

      description: "Create a new apartment",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
      description: "Returns an error, if the request is invalid",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
      description:
        "Returns an error, if the server fails to create the apartment",
    },
  },
});
