import { createRoute } from "@hono/zod-openapi";
import {
  GetApartmentsQueryParams,
  GetApartmentsResponse,
  GetApartmentPerIdParams,
  GetApartmentPerIdResponse,
} from "./apartments.schema";
import { ErrorResponse } from "../common/response.schema";

export const getApartmentsRoute = createRoute({
  method: "get",
  path: "/apartments",
  request: {
    query: GetApartmentsQueryParams,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetApartmentsResponse,
        },
      },
      description: "Retrieve the apartments",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
      description: "Returns an error",
    },
  },
});

export const getApartmentPerIdRoute = createRoute({
  method: "get",
  path: "/apartments/{id}",
  request: {
    params: GetApartmentPerIdParams,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetApartmentPerIdResponse,
        },
      },
      description: "Retrieve the apartments",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
      description: "Returns an error",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
      description: "Returns an error",
    },
  },
});
