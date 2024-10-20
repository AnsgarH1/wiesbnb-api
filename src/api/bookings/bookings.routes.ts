import { createRoute } from "@hono/zod-openapi";
import {
  CreatedResponse,
  ErrorResponse,
  NotImplementedResponse,
} from "../common/response.schema";
import { CreateNewBookingRequestBody } from "./bookings.schema";

export const bookApartmentRoute = createRoute({
  method: "post",
  path: "/book",
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
          schema: CreatedResponse,
        },
      },
      description: "Book an apartment",
    },

    400: {
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
      description: "Returns an error, if the request is invalid",
    },
    501: {
      content: {
        "application/json": {
          schema: NotImplementedResponse,
        },
      },
      description: "Not implemented yet",
    },
  },
});
