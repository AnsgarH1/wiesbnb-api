import { z } from "@hono/zod-openapi";

export const ApartmentsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    numberOfRooms: z.number(),
    maxAdults: z.number(),
    maxChildren: z.number(),
    pricePerNight: z.number(),
    adress: z.object({
      street: z.string(),
      city: z.string(),
      postalCode: z.string(),
      country: z.string(),
      coords: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    }),
  })
);
