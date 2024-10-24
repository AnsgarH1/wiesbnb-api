import {
  GetAvailableApartmentsQueryParams,
  GetAvailableApartmentsResponse,
} from "./availableApartments.schema";
import { createRoute } from "@hono/zod-openapi";
import {
  ClientErrorResponse,
  ServerErrorResponse,
} from "../../common/http_response.schema";

export const getAvailableApartmentsRoute = createRoute({
  path: "/",
  method: "get",
  tags: ["Public Endpoints"],
  request: {
    query: GetAvailableApartmentsQueryParams,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetAvailableApartmentsResponse,
        },
      },

      description: "Create a new apartment",
    },
    400: {
      content: {
        "application/json": {
          schema: ClientErrorResponse,
        },
      },
      description: "Returns an error, if the request is invalid",
    },
    500: {
      content: {
        "application/json": {
          schema: ServerErrorResponse,
        },
      },
      description:
        "Returns an error, if the server fails to create the apartment",
    },
  },
});
