import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import {
  ApartmentAddress,
  ApartmentId,
  BookingId,
  GuestInfo,
  ImageList,
  PaymentInfo,
} from "../../common/database.schema";

export const apartment = sqliteTable("apartments", {
  id: int().$type<ApartmentId>().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text().notNull(),
  numberOfRooms: int().notNull(),
  maxAdults: int().notNull(),
  maxChildren: int().notNull(),
  bedAmountAdults: int().notNull(),
  bedAmountChildren: int().notNull(),
  images: text({ mode: "json" }).$type<ImageList>().notNull(),
  adress: text({ mode: "json" }).$type<ApartmentAddress>().notNull(),
  pricePerNight: int().notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const booking = sqliteTable("bookings", {
  id: int().$type<BookingId>().primaryKey({ autoIncrement: true }),
  apartmentId: int()
    .notNull()
    .references(() => apartment.id),
  cancelled: int({ mode: "boolean" }).default(false),
  startDate: text().notNull(),
  endDate: text().notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  guestInfo: text({ mode: "json" }).$type<GuestInfo>(),
  paymentInfo: text({ mode: "json" }).$type<PaymentInfo>(),
});
