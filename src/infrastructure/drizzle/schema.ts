import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const ApartmentIdSchema = z
  .number()
  .int()
  .positive()
  .brand("apartment_id");
export const BookingIdSchema = z.number().int().positive().brand("booking_id");

export const PaymentInfoSchema = z.object({
  paymentType: z.enum(["creditCard", "paypal"]),
  paymentReference: z.string(),
});

export const GuestInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.date(),
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
        birthDate: z.date(),
      })
    )
    .optional(),
});

export const ApartmentAdressSchema = z.object({
  street: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

type ApartmentId = z.infer<typeof ApartmentIdSchema>;
type BookingId = z.infer<typeof BookingIdSchema>;

type GuestInfo = z.infer<typeof GuestInfoSchema>;
type ApartmentAddress = z.infer<typeof ApartmentAdressSchema>;
type PaymentInfo = z.infer<typeof PaymentInfoSchema>;

export const apartmentsTable = sqliteTable("apartments_table", {
  id: int().$type<ApartmentId>().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text().notNull(),
  numberOfRooms: int().notNull(),
  maxAdults: int().notNull(),
  maxChildren: int().notNull(),
  adress: text({ mode: "json" }).$type<ApartmentAddress>().notNull(),
  pricePerNight: int().notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const bookingsTable = sqliteTable("bookings_table", {
  id: int().$type<BookingId>().primaryKey({ autoIncrement: true }),
  apartmentId: int()
    .notNull()
    .references(() => apartmentsTable.id),
  startDate: text().notNull(),
  endDate: text().notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  guestInfo: text({ mode: "json" }).$type<GuestInfo>(),
  paymentInfo: text({ mode: "json" }).$type<PaymentInfo>(),
});
