import { z } from "@hono/zod-openapi";

export const ErrorResponse = z
  .object({
    code: z.number().openapi({
      example: 400,
    }),
    message: z.string().openapi({
      example: "Bad Request",
    }),
  })
  .openapi("ErrorResponse");

export const SuccessResponse = z
  .object({
    code: z.number().openapi({
      example: 200,
    }),
    message: z.string().openapi({
      example: "Success",
    }),
  })
  .openapi("SuccessResponse");

export const CreatedResponse = z
  .object({
    code: z.number().openapi({
      example: 201,
    }),
    message: z.string().openapi({
      example: "Successfully created ressource",
    }),
  })
  .openapi("CreatedResponse");

export const NotImplementedResponse = z
  .object({
    code: z.number().openapi({
      example: 501,
    }),
    message: z.string().openapi({
      example: "Not implemented yet",
    }),
  })
  .openapi("NotImplementedResponse");
