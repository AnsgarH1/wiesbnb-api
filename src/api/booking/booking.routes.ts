import { createRoute } from "@hono/zod-openapi";

import {
  CancelBookingRequestParams,
  CreateNewBookingRequestBody,
} from "./booking.schema";
import {
  ClientErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../../common/http_response.schema";

export const bookApartmentRoute = createRoute({
  method: "post",
  description: "Book an apartment",
  tags: ["User Endpoints"],
  path: "/submitBooking",
  request: {
    body: {
      content: {
        "application/json": { schema: CreateNewBookingRequestBody },
      },
      required: true,
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: SuccessResponse,
        },
      },
      description: "Book an apartment",
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
      description: "Returns an Error",
    },
  },
});

export const cancelBookingRoute = createRoute({
  method: "post",
  path: "/cancelBooking",
  tags: ["User Endpoints"],
  description: "Cancel a booking for an apartment",
  request: {
    params: CancelBookingRequestParams,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessResponse,
        },
      },
      description: "Cancel a booking",
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
      description: "Returns an Error",
    },
  },
});
