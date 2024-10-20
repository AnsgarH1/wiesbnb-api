import { OpenAPIHono } from "@hono/zod-openapi";
import { bookApartmentRoute } from "./bookings.routes";
import { database } from "../../infrastructure/drizzle";
import { createInsertSchema } from "drizzle-zod";
import * as schema from "../../infrastructure/drizzle/schema";
import { z } from "zod";

export const bookings = new OpenAPIHono();

bookings.openapi(bookApartmentRoute, async (c) => {
  const requestParams = c.req.valid("json");

  const db = database();

  // check if apartment exists
  const apartment = await db.query.apartmentsTable.findFirst({
    where: (apartment, { eq }) => eq(apartment.id, requestParams.apartmentId),
  });

  if (!apartment) {
    return c.json(
      {
        message: `Apartment with id ${requestParams.apartmentId} does not exist`,
        code: 400,
      },
      400
    );
  }

  // check if no booking for this apartment id and start to end date exists
  const existing_booking = await db.query.bookingsTable.findFirst({
    where: (booking, { and, or, eq, between }) =>
      and(
        eq(booking.apartmentId, requestParams.apartmentId),
        or(
          between(
            booking.startDate,
            requestParams.startDate.toDateString(),
            requestParams.endDate.toDateString()
          ),
          between(
            booking.endDate,
            requestParams.startDate.toDateString(),
            requestParams.endDate.toDateString()
          )
        )
      ),
  });
    if (existing_booking) {
    return c.json(
      {
        message: `Booking ${existing_booking.id} already exists for this apartment and date range`,
        code: 400,
      },
      400
    );
  }

  const db_guestInfo = schema.GuestInfoSchema.parse(requestParams.guestInfo);

  const db_paymentInfo = schema.PaymentInfoSchema.parse({
    paymentType: requestParams.paymentInfo.paymentType,
    paymentReference:
      requestParams.paymentInfo.paymentType === "creditCard"
        ? requestParams.paymentInfo.cardNumber
        : requestParams.paymentInfo.paypalEmail,
  });

  const insertData: typeof schema.bookingsTable.$inferInsert = {
    apartmentId: requestParams.apartmentId,
    startDate: requestParams.startDate.toDateString(),
    endDate: requestParams.endDate.toDateString(),
    guestInfo: db_guestInfo,
    paymentInfo: db_paymentInfo,
  };

  const db_response = await db.insert(schema.bookingsTable).values(insertData);

  if (db_response.error) {
    return c.json(
      {
        message: "Failed to create booking",
        code: 500,
      },
      500
    );
  }
  console.log(db_response.results);
  return c.json(
    {
      message: "Booking created successfully",
      code: 201,
    },
    201
  );
});
