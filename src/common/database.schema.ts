import { z } from "zod";

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

export const ImageListSchema = z.array(
  z
    .object({ url: z.string().url(), description: z.string().min(3) })
    .openapi("Image")
);

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
    lat: z.coerce.number(),
    lng: z.coerce.number(),
  }),
});

export type ApartmentId = z.infer<typeof ApartmentIdSchema>;
export type BookingId = z.infer<typeof BookingIdSchema>;

export type GuestInfo = z.infer<typeof GuestInfoSchema>;
export type ApartmentAddress = z.infer<typeof ApartmentAdressSchema>;
export type PaymentInfo = z.infer<typeof PaymentInfoSchema>;
export type ImageList = z.infer<typeof ImageListSchema>;
