import { createRoute } from "@hono/zod-openapi";
import {
  CreateNewBookingRequestBody,
  DeleteBookingRequestParams,
  GetBookingPerIdParams,
  GetBookingPerIdResponse,
  GetBookingsResponse,
  UpdateBookingRequestBody,
  UpdateBookingRequestParams,
} from "./bookings.schema";
import {
  ClientErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../../../common/http_response.schema";

export const createNewBookingRoute = createRoute({
  path: "/bookings",
  method: "post",
  description: "Create a new booking",
  tags: ["Admin Endpoints"],
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
      description: "Create a new booking",
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
        "Returns an error, if the server fails to create the booking",
    },
  },
});

export const getBookingsRoute = createRoute({
  path: "/bookings",
  method: "get",
  description: "Get all bookings",
  tags: ["Admin Endpoints"],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetBookingsResponse,
        },
      },
      description: "Get all bookings",
    },
    500: {
      content: {
        "application/json": {
          schema: ServerErrorResponse,
        },
      },
      description: "Returns an error, if the server fails to get the bookings",
    },
  },
});

export const getBookingPerIdRoute = createRoute({
  path: "/bookings/{id}",
  method: "get",
  description: "Get a booking by ID",
  tags: ["Admin Endpoints"],
  request: {
    params: GetBookingPerIdParams,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetBookingPerIdResponse,
        },
      },
      description: "Get a booking by ID",
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
      description: "Returns an error, if the server fails to get the booking",
    },
  },
});

export const updateBookingRoute = createRoute({
  path: "/bookings/{id}",
  method: "put",
  description: "Update a booking",
  tags: ["Admin Endpoints"],
  request: {
    body: {
      content: {
        "application/json": { schema: UpdateBookingRequestBody },
      },
      required: true,
    },
    params: UpdateBookingRequestParams,
  },
  responses: {
    204: {
      content: {
        "application/json": {
          schema: SuccessResponse,
        },
      },
      description: "Update a booking",
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
        "Returns an error, if the server fails to update the booking",
    },
  },
});

export const deleteBookingRoute = createRoute({
  path: "/bookings/{id}",
  method: "delete",
  description: "Delete a booking",
  tags: ["Admin Endpoints"],
  request: {
    params: DeleteBookingRequestParams,
  },
  responses: {
    204: {
      content: {
        "application/json": {
          schema: SuccessResponse,
        },
      },
      description: "Delete a booking",
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
        "Returns an error, if the server fails to delete the booking",
    },
  },
});
