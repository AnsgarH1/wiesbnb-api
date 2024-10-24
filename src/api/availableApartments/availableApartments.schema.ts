import { z } from "@hono/zod-openapi";

import { FullApartmentSchema } from "../../common/response.schema";
import { LatitudeSchema, LongitudeSchema } from "../../common/database.schema";

export const GetAvailableApartmentsResponse = z.array(
  FullApartmentSchema.and(z.object({ available: z.boolean() }))
);

export const GetAvailableApartmentsQueryParams = z.object({
  startDate: z.coerce.date().openapi({ format: "date" }),
  endDate: z.coerce.date().openapi({ format: "date" }),
  amountAdults: z.coerce.number(),
  amountChildren: z.coerce.number(),
  minPrice: z.coerce.number().optional().default(0),
  maxPrice: z.coerce.number().optional().default(1_000_000),
  onlyAvailable: z.coerce.boolean().optional().default(true).default(true),
  bbox: z
    .tuple([LongitudeSchema, LatitudeSchema, LongitudeSchema, LatitudeSchema])
    .optional()
    .openapi({
      description:
        "Bounding box for the search in order: min Longitude (left), min Latitude (bottom), max Longitude (right), max Latitude (top)",
    }),
});
