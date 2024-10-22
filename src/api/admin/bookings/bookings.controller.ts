import { OpenAPIHono } from "@hono/zod-openapi";
import {
  createNewBookingRoute,
  deleteBookingRoute,
  getBookingPerIdRoute,
  getBookingsRoute,
  updateBookingRoute,
} from "./bookings.routes";
import { database } from "../../../infrastructure/drizzle";
import * as schema from "../../../infrastructure/drizzle/schema";
import {
  GetBookingPerIdResponse,
  GetBookingsResponse,
} from "./bookings.schema";
import { eq } from "drizzle-orm";
import { booking } from "../../booking/booking.controller";
import { cancelBookingRoute } from "../../booking/booking.routes";

const bookings = new OpenAPIHono();

bookings.openapi(createNewBookingRoute, async (c) => {
  const bookingData = c.req.valid("json");
  const db = database();

  const db_response = await db.insert(schema.bookingsTable).values(bookingData);

  console.log("Insert response", db_response);

  if (db_response.success) {
    return c.json({ message: "Booking created successfully", code: 201 }, 201);
  }

  return c.json({ message: "Failed to create booking", code: 500 }, 500);
});

bookings.openapi(getBookingsRoute, async (c) => {
  const db = database();
  const db_response = await db.select().from(schema.bookingsTable);

  console.log("Get bookings response", db_response);
  const response_data = GetBookingsResponse.parse(db_response);
  return c.json(response_data, 200);
});

bookings.openapi(getBookingPerIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const db = database();
  const result = await db.query.bookingsTable.findFirst({
    where: (booking, { eq }) => eq(schema.bookingsTable.id, id),
  });

  console.log("Get booking per id response", result);

  if (!result) {
    return c.json(undefined, 200);
  }

  const response_data = GetBookingPerIdResponse.parse(result);
  return c.json(response_data, 200);
});

bookings.openapi(updateBookingRoute, async (c) => {
  const requestParams = c.req.valid("param");

  const bookingData = c.req.valid("json");

  const db = database();

  const oldBookingId = await db.query.bookingsTable.findFirst({
    where: (booking, { eq }) => eq(booking.id, requestParams.id),
  });

  if (!oldBookingId) {
    return c.json(
      { message: "Booking with given id does not exist", code: 400 },
      400
    );
  }

  const db_response = await db
    .update(schema.bookingsTable)
    .set({ ...bookingData, updatedAt: new Date() })
    .where(eq(schema.bookingsTable.id, requestParams.id));

  console.log("Update booking response", db_response);

  if (!db_response.success) {
    return c.json({ message: "Failed to update booking", code: 500 }, 500);
  }
  return c.json({ message: "Booking updated successfully", code: 204 }, 204);
});

booking.openapi(deleteBookingRoute, async (c) => {
  const requestParams = c.req.valid("param");

  const db = database();

  const db_response = await db
    .delete(schema.bookingsTable)
    .where(eq(schema.bookingsTable.id, requestParams.id));

  console.log("Delete booking response", db_response);

  if (!db_response.success) {
    return c.json({ message: "Failed to delete booking", code: 500 }, 500);
  }
  return c.json({ message: "Booking deleted successfully", code: 204 }, 204);
});
