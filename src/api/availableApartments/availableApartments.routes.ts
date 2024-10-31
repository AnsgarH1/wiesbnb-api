import {
  GetAvailableApartmentsPerIdParams,
  GetAvailableApartmentsPerIdQueryParams,
  GetAvailableApartmentsPerIdResponse,
  GetAvailableApartmentsQueryParams,
  GetAvailableApartmentsResponse,
} from "./availableApartments.schema";
import { createRoute } from "@hono/zod-openapi";
import {
  ClientErrorResponse,
  ServerErrorResponse,
} from "../../common/http_response.schema";

export const getAvailableApartmentsRoute = createRoute({
  path: "/availableApartments",
  method: "get",
  tags: ["Apartments"],
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

export const getAvailableApartmentsPerIdRoute = createRoute({
  path: "/availableApartments/{id}",
  method: "get",
  tags: ["Apartments"],
  request: {
    query: GetAvailableApartmentsPerIdQueryParams,
    params: GetAvailableApartmentsPerIdParams,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetAvailableApartmentsPerIdResponse,
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
