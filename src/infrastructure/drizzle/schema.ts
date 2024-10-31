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
  title: text().notNull(),
  description: text().notNull(),
  teaserText: text().notNull(),
  numberOfRooms: int().notNull(),
  maxAdults: int().notNull(),
  maxChildren: int().notNull(),
  bedAmountAdults: int().notNull(),
  bedAmountChildren: int().notNull(),
  images: text({ mode: "json" }).$type<ImageList>().notNull(),
  adress: text({ mode: "json" }).$type<ApartmentAddress>().notNull(),
  pricePerNight: int().notNull(),
  rating: int().notNull(),
  createdAt: text()
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  updatedAt: text()
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

export const booking = sqliteTable("bookings", {
  id: int().$type<BookingId>().primaryKey({ autoIncrement: true }),
  apartmentId: int()
    .notNull()
    .references(() => apartment.id),
  cancelled: int({ mode: "boolean" }).default(false).notNull(),
  startDate: text().notNull(),
  endDate: text().notNull(),
  createdAt: text()
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  updatedAt: text()
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  guestInfo: text({ mode: "json" }).$type<GuestInfo>(),
  paymentInfo: text({ mode: "json" }).$type<PaymentInfo>(),
});
