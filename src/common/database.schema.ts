import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "@hono/zod-openapi";
import * as schema from "../infrastructure/drizzle/schema";

export const ApartmentIdSchema = z
  .number()
  .int()
  .positive()
  .brand("apartment_id");

export const BookingIdSchema = z.number().int().positive().brand("booking_id");

export const PaymentInfoSchema = z.object({
  paymentType: z.enum(["creditCard", "paypal"]),
  paymentReference: z.string().openapi({
    description: "Either the obuscated credit-card number or  paypal-email",
  }),
});

export const ImageSchema = z
  .object({ url: z.string().url(), description: z.string() })
  .openapi("Image");

export const ImageListSchema = z.array(ImageSchema);

export const LatitudeSchema = z.number().min(-90).max(90).openapi({
  title: "Latitude",
  description:
    "Latitude of the location, -90=South Pole, 90=North Pole, 0=Equator",
});

export const LongitudeSchema = z.number().min(-180).max(180).openapi({
  title: "Longitude",
  description:
    "Longitude of the location, Negative=West of prime-line, Positive=east of prime-line, 0=Prime-line",
});

export const GuestInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().date().openapi({ format: "date" }),
  email: z.string().email(),
  phone: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  additionalGuests: z
    .array(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        birthDate: z.string().date().openapi({ format: "date" }),
      })
    )
    .optional(),
});

export const ApartmentAdressSchema = z.object({
  street: z.string(),
  number: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  coords: z.object({
    lat: LatitudeSchema,
    lng: LongitudeSchema,
  }),
});

export const InsertApartmentSchema = createInsertSchema(schema.apartment);
export const InsertBookingSchema = createInsertSchema(schema.booking);

export const SelectApartmentSchema = createSelectSchema(schema.apartment);
export const SelectBookingSchema = createSelectSchema(schema.booking);

export type ApartmentId = z.infer<typeof ApartmentIdSchema>;
export type BookingId = z.infer<typeof BookingIdSchema>;

export type GuestInfo = z.infer<typeof GuestInfoSchema>;
export type ApartmentAddress = z.infer<typeof ApartmentAdressSchema>;
export type PaymentInfo = z.infer<typeof PaymentInfoSchema>;
export type ImageList = z.infer<typeof ImageListSchema>;
