import { z } from "@hono/zod-openapi";
import { ApartmentIdSchema } from "../../infrastructure/drizzle/schema";

const ApartmentReponseSchema = z.object({
  id: z.number().openapi({
    description: "Unique identifier for the apartment",
    example: 101,
  }),
  name: z.string().openapi({
    description: "Name of the apartment",
    example: "Ocean View Apartment",
  }),
  description: z.string().openapi({
    description: "A detailed description of the apartment",
    example:
      "A beautiful seaside apartment with stunning ocean views and modern amenities.",
  }),
  numberOfRooms: z.number().openapi({
    description: "Number of rooms in the apartment",
    example: 3,
  }),
  maxAdults: z.number().openapi({
    description: "Maximum number of adults allowed in the apartment",
    example: 2,
  }),
  maxChildren: z.number().openapi({
    description: "Maximum number of children allowed in the apartment",
    example: 2,
  }),
  pricePerNight: z.number().openapi({
    description: "Price per night in euro cents",
    example: 7899,
  }),
  adress: z
    .object({
      street: z.string().openapi({
        description: "Street address of the apartment",
        example: "123 Ocean Drive",
      }),
      city: z.string().openapi({
        description: "City where the apartment is located",
        example: "Barcelona",
      }),
      postalCode: z.string().openapi({
        description: "Postal code of the apartment location",
        example: "08002",
      }),
      country: z.string().openapi({
        description: "Country where the apartment is located",
        example: "Spain",
      }),
      coords: z
        .object({
          lat: z.number().openapi({
            description: "Latitude of the apartment's location",
            example: 41.3851,
          }),
          lng: z.number().openapi({
            description: "Longitude of the apartment's location",
            example: 2.1734,
          }),
        })
        .openapi({
          description: "Coordinates of the apartment's location",
          example: { lat: 41.3851, lng: 2.1734 },
        }),
    })
    .openapi({
      description: "Address details of the apartment",
      example: {
        street: "123 Ocean Drive",
        city: "Barcelona",
        postalCode: "08002",
        country: "Spain",
        coords: {
          lat: 41.3851,
          lng: 2.1734,
        },
      },
    })
    .openapi("Apartment"),
});

export const GetApartmentsResponse = z.array(ApartmentReponseSchema);
export const GetApartmentsQueryParams = z.object({
  id: z.coerce
    .number()
    .pipe(ApartmentIdSchema) // Needed to return branded id-type
    .optional()
    .openapi({ param: { in: "query" } }),
  numberOfRooms: z.coerce
    .number()
    .optional()
    .openapi({ param: { in: "query" } }),
  maxAdults: z.coerce
    .number()
    .optional()
    .openapi({ param: { in: "query" } }),
  maxChildren: z.coerce
    .number()
    .optional()
    .openapi({ param: { in: "query" } }),
});

export const GetApartmentPerIdResponse = ApartmentReponseSchema.optional();
export const GetApartmentPerIdParams = z.object({
  id: z.coerce
    .number()
    .pipe(ApartmentIdSchema) // Needed to return branded id-type
    .openapi({ param: { in: "path" } }),
});
