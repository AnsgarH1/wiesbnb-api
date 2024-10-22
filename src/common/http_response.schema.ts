import { z } from "@hono/zod-openapi";

export const SuccessResponse = z
  .object({
    code: z.number().min(200).max(299).openapi({
      example: 200,
    }),
    message: z.string().openapi({
      example: "Success",
    }),
  })
  .openapi("Success Response");

export const ClientErrorResponse = z
  .object({
    code: z.number().min(400).max(499).openapi({
      example: 400,
    }),
    message: z.string().openapi({
      example: "Wrong input param xyz..",
    }),
    cause: z.string().optional().openapi({ example: "Invalid input" }),
  })
  .openapi("Client Error Response");

export const ServerErrorResponse = z
  .object({
    code: z.number().min(500).max(599).openapi({
      example: 500,
    }),
    message: z.string().openapi({
      example: "Error",
    }),
    cause: z.string().optional().openapi({ example: "Invalid input" }),
  })
  .openapi("Server Error Response");
