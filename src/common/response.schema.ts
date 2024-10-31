import { z } from "@hono/zod-openapi";
import {
  ApartmentAdressSchema,
  ApartmentIdSchema,
  BookingIdSchema,
  GuestInfoSchema,
  ImageSchema,
  PaymentInfoSchema,
} from "./database.schema";

export const ApartmentPreviewSchema = z
  .object({
    id: z.number().pipe(ApartmentIdSchema),
    title: z.string(),
    teaserText: z.string(),
    numberOfRooms: z.coerce.number().openapi({ type: "integer", example: 2 }),
    maxAdults: z.coerce.number().openapi({ type: "integer", example: 2 }),
    maxChildren: z.coerce.number().openapi({ type: "integer", example: 2 }),
    bedAmountAdults: z.coerce.number().openapi({ type: "integer", example: 2 }),
    bedAmountChildren: z.coerce
      .number()
      .openapi({ type: "integer", example: 2 }),
    preview: ImageSchema,
    pricePerNight: z.coerce.number().openapi({
      type: "integer",
      example: 6799,
      description: "Price in €/cents",
    }),
    rating: z.number().openapi({ type: "integer", example: 4.5 }),
  })
  .openapi("ApartmentPreview");

export const FullApartmentSchema = z
  .object({
    id: z.number().pipe(ApartmentIdSchema),
    title: z.string(),
    teaserText: z.string(),
    description: z.string(),
    numberOfRooms: z.coerce.number().openapi({ type: "integer", example: 2 }),
    maxAdults: z.coerce.number().openapi({ type: "integer", example: 2 }),
    maxChildren: z.coerce.number().openapi({ type: "integer", example: 2 }),
    bedAmountAdults: z.coerce.number().openapi({ type: "integer", example: 2 }),
    bedAmountChildren: z.coerce
      .number()
      .openapi({ type: "integer", example: 2 }),
    images: z.array(ImageSchema),
    adress: ApartmentAdressSchema,
    pricePerNight: z.coerce.number().openapi({
      type: "integer",
      example: 6799,
      description: "Price in €/cents",
    }),
    rating: z.number().openapi({ type: "integer", example: 4.5 }),
    updatedAt: z.coerce.string().datetime().openapi({ format: "datetime" }),
    createdAt: z.coerce.string().datetime().openapi({ format: "datetime" }),
  })
  .openapi("Apartment");

export const FullBookingSchema = z
  .object({
    id: z.coerce.number().pipe(BookingIdSchema),
    apartmentId: z.coerce.number().pipe(ApartmentIdSchema),
    cancelled: z.coerce
      .boolean()
      .openapi({ type: "boolean", example: false, default: false }),
    startDate: z.coerce.string().date().openapi({ format: "date" }),
    endDate: z.coerce.string().date().openapi({ format: "date" }),
    createdAt: z.coerce.string().datetime().openapi({ format: "datetime" }),
    updatedAt: z.coerce.string().datetime().openapi({ format: "datetime" }),
    guestInfo: GuestInfoSchema,
    paymentInfo: PaymentInfoSchema,
  })
  .openapi("Booking");
