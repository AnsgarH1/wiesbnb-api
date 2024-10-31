import { z } from "@hono/zod-openapi";

import {
  ApartmentPreviewSchema,
  FullApartmentSchema,
} from "../../common/response.schema";
import {
  ApartmentIdSchema,
  LatitudeSchema,
  LongitudeSchema,
} from "../../common/database.schema";

export const GetAvailableApartmentsResponse = z.array(
  ApartmentPreviewSchema.and(z.object({ available: z.boolean() })).openapi(
    "ApartmentPreview"
  )
);

export const GetAvailableApartmentsQueryParams = z.object({
  startDate: z.coerce
    .string()
    .date()
    .openapi({ format: "date", required: ["Required"] }),
  endDate: z.coerce.string().date().openapi({ format: "date" }),
  amountAdults: z.coerce.number().openapi({
    type: "integer",
    param: {
      required: true,
    },
    description: "Amount of adults (required)",
  }),
  amountChildren: z.coerce.number().openapi({
    type: "integer",
    param: {
      required: true,
    },
    description: "Amount of children (required)",
  }),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  onlyAvailable: z.coerce
    .boolean()
    .optional()
    .default(true)
    .openapi({ type: "boolean" }),
  bbox: z
    .tuple([LongitudeSchema, LatitudeSchema, LongitudeSchema, LatitudeSchema])
    .optional()
    .openapi({
      description:
        "Bounding box for the search in order: min Longitude (left), min Latitude (bottom), max Longitude (right), max Latitude (top)",
    }),
});

export const GetAvailableApartmentsPerIdResponse = FullApartmentSchema.and(
  z.object({ available: z.boolean() })
).openapi("ApartmentWithAvailableStatus");

export const GetAvailableApartmentsPerIdQueryParams = z.object({
  startDate: z.coerce
    .string()
    .date()
    .openapi({ format: "date", example: "2024-10-01" }),
  endDate: z.coerce
    .string()
    .date()
    .openapi({ format: "date", example: "2024-10-15" }),
});

export const GetAvailableApartmentsPerIdParams = z.object({
  id: z.coerce
    .number()
    .pipe(ApartmentIdSchema)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
    }),
});
