import { z } from "@hono/zod-openapi";
import {
  ApartmentAdressSchema,
  ApartmentIdSchema,
  BookingIdSchema,
  GuestInfoSchema,
  ImageListSchema,
  PaymentInfoSchema,
} from "./database.schema";

export const FullApartmentSchema = z
  .object({
    id: z.number().pipe(ApartmentIdSchema),
    name: z.string(),
    description: z.string(),
    numberOfRooms: z.coerce.number().openapi({ type: "integer", example: 2 }),
    maxAdults: z.coerce.number().openapi({ type: "integer", example: 2 }),
    maxChildren: z.coerce.number().openapi({ type: "integer", example: 2 }),
    bedAmountAdults: z.coerce.number().openapi({ type: "integer", example: 2 }),
    bedAmountChildren: z.coerce
      .number()
      .openapi({ type: "integer", example: 2 }),
    images: ImageListSchema,
    adress: ApartmentAdressSchema,
    pricePerNight: z.coerce.number().openapi({
      type: "integer",
      example: 6799,
      description: "Price in €/cents",
    }),
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
  })
  .openapi("Apartment");

export const FullBookingSchema = z
  .object({
    id: z.coerce.number().pipe(BookingIdSchema),
    apartmentId: z.coerce.number().pipe(ApartmentIdSchema),
    cancelled: z.coerce
      .boolean()
      .openapi({ type: "boolean", example: false, default: false }),
    startDate: z.string().date().openapi({ format: "date" }),
    endDate: z.string().date().openapi({ format: "date" }),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    guestInfo: GuestInfoSchema,
    paymentInfo: PaymentInfoSchema,
  })
  .openapi("Booking");
