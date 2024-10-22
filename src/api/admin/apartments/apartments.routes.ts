import { createRoute } from "@hono/zod-openapi";
import {
  ClientErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../../../common/http_response.schema";
import {
  CreateNewApartmentRequestBody,
  DeleteApartmentRequestParams,
  GetApartmentPerIdParams,
  GetApartmentPerIdResponse,
  GetApartmentsResponse,
  UpdateApartmentRequestBody,
  UpdateApartmentRequestParams,
} from "./apartments.schema";

export const createNewApartmentRoute = createRoute({
  method: "post",
  path: "/apartments",
  tags: ["Admin Endpoints"],
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
          schema: SuccessResponse,
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

export const getApartmentsRoute = createRoute({
  method: "get",
  path: "/apartments",
  tags: ["Admin Endpoints"],
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
        "Returns an error, if the server fails to retreive the apartment",
    },
  },
});

export const getApartmentPerIdRoute = createRoute({
  method: "get",
  path: "/apartments/:id",
  tags: ["Admin Endpoints"],
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
      description: "Retrieve an apartment per id",
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
      description: "Returns an error, if an error occurs on the server",
    },
  },
});

export const updateApartmentRoute = createRoute({
  path: "/apartments/:id",
  method: "put",
  tags: ["Admin Endpoints"],
  request: {
    body: {
      content: {
        "application/json": { schema: UpdateApartmentRequestBody },
      },
      required: true,
    },
    params: UpdateApartmentRequestParams,
  },
  responses: {
    204: {
      content: {
        "application/json": {
          schema: SuccessResponse,
        },
      },
      description: "Retrieve an apartment per id",
    },
    400: {
      content: {
        "application/json": {
          schema: ClientErrorResponse,
        },
      },
      description: "Returns an error, if the new Apartment Data is invalid",
    },
    500: {
      content: {
        "application/json": {
          schema: ServerErrorResponse,
        },
      },
      description:
        "Returns an error, if the server fails to update the apartment",
    },
  },
});

export const deleteApartmentRoute = createRoute({
  path: "/apartments/:id",
  method: "delete",
  tags: ["Admin Endpoints"],
  request: {
    params: DeleteApartmentRequestParams,
  },
  responses: {
    204: {
      content: {
        "application/json": {
          schema: SuccessResponse,
        },
      },
      description: "Delete an apartment per id",
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
        "Returns an error, if the server fails to delete the apartment",
    },
  },
});
