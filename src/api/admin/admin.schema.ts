import { z } from "@hono/zod-openapi";
export const CreateNewApartmentResponse = z.object({
  status: z.number(),
  message: z.string(),
});

export const CreateNewApartmentRequestBody = z.object({
  name: z.string(),
  description: z.string(),
  numberOfRooms: z.coerce.number(),
  maxAdults: z.coerce.number(),
  maxChildren: z.coerce.number(),
  pricePerNight: z.coerce.number(),
  adress: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
    coords: z.object({
      lat: z.coerce.number(),
      lng: z.coerce.number(),
    }),
  }),
});
