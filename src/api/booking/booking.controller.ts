import { OpenAPIHono } from "@hono/zod-openapi";
import { bookApartmentRoute, cancelBookingRoute } from "./booking.routes";

import { database } from "../../infrastructure/drizzle";
import * as schema from "../../infrastructure/drizzle/schema";
import {
  GuestInfoSchema,
  PaymentInfoSchema,
} from "../../common/database.schema";
import { eq } from "drizzle-orm";

export const booking = new OpenAPIHono();

booking.openapi(bookApartmentRoute, async (c) => {
  const requestParams = c.req.valid("json");

  const db = database();

  // check if apartment exists
  const apartment = await db.query.apartments.findFirst({
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
  const existing_booking = await db.query.bookings.findFirst({
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

  const db_guestInfo = GuestInfoSchema.parse(requestParams.guestInfo);

  const db_paymentInfo = PaymentInfoSchema.parse({
    paymentType: requestParams.paymentInfo.paymentType,
    paymentReference:
      requestParams.paymentInfo.paymentType === "creditCard"
        ? requestParams.paymentInfo.cardNumber
        : requestParams.paymentInfo.paypalEmail,
  });

  const insertData: typeof schema.booking.$inferInsert = {
    apartmentId: requestParams.apartmentId,
    startDate: requestParams.startDate.toDateString(),
    endDate: requestParams.endDate.toDateString(),
    guestInfo: db_guestInfo,
    paymentInfo: db_paymentInfo,
  };

  const db_response = await db.insert(schema.booking).values(insertData);

  if (db_response.error) {
    return c.json(
      {
        message: "Failed to create booking",
        code: 500,
      },
      500
    );
  }
  console.log("create booking response", db_response);
  return c.json(
    {
      message: "Booking created successfully",
      code: 201,
    },
    201
  );
});

booking.openapi(cancelBookingRoute, async (c) => {
  const requestParams = c.req.valid("param");

  const db = database();

  // check if booking exists
  const booking = await db.query.bookings.findFirst({
    where: (booking, { eq }) => eq(booking.id, requestParams.bookingId),
  });

  // only allow cancellation if booking exists and lastname and email match
  const isCancellationAllowed =
    !!booking &&
    booking.guestInfo?.lastName === requestParams.lastName &&
    booking.guestInfo?.email === requestParams.email;

  if (!isCancellationAllowed) {
    return c.json(
      {
        message: `Booking with id ${requestParams.bookingId} does not exist or is not booked by given guest.`,
        code: 400,
      },
      400
    );
  }

  if (booking.cancelled) {
    return c.json(
      {
        message: `Booking with id ${requestParams.bookingId} is already cancelled.`,
        code: 400,
      },
      400
    );
  }

  const db_response = await db
    .delete(schema.booking)
    .where(eq(schema.booking.id, requestParams.bookingId));

  console.log("cancel booking response", db_response);

  if (db_response.error) {
    return c.json(
      {
        message: "Failed to cancel booking",
        code: 500,
      },
      500
    );
  }

  return c.json(
    {
      message: "Booking cancelled successfully",
      code: 200,
    },
    200
  );
});
