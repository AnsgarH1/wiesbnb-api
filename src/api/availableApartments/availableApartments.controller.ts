import { OpenAPIHono } from "@hono/zod-openapi";

import {
  getAvailableApartmentsPerIdRoute,
  getAvailableApartmentsRoute,
} from "./availableApartments.routes";
import { database } from "../../infrastructure/drizzle";
import { GetAvailableApartmentsResponse } from "./availableApartments.schema";

export const availableApartments = new OpenAPIHono();

availableApartments.openapi(getAvailableApartmentsRoute, async (c) => {
  const {
    amountAdults,
    amountChildren,
    endDate,
    onlyAvailable,
    startDate,
    bbox,
    maxPrice,
    minPrice,
  } = c.req.valid("query");
  const inputStartDate = new Date(startDate);
  const inputEndDate = new Date(endDate);

  console.log("Query params:");
  console.debug(c.req.valid("query"));

  const db = database();

  const allApartmentsWithoutAnyFilter = await db.query.apartment.findMany();

  console.log("Fetching Apartments from DB..");
  const allApartments = await db.query.apartment.findMany({
    where: (apartment, { and, gte, lte }) =>
      and(
        gte(apartment.pricePerNight, minPrice ?? 0),
        lte(apartment.pricePerNight, maxPrice ?? Number.MAX_SAFE_INTEGER),
        gte(apartment.maxAdults, amountAdults),
        gte(apartment.maxChildren, amountChildren)
      ),
  });
  console.log(
    `Found ${allApartments.length} of ${allApartmentsWithoutAnyFilter.length} apartments for params minPrice: ${minPrice}, maxPrice: ${maxPrice}, amountAdults: ${amountAdults}, amountChildren: ${amountChildren}`
  );

  const allBookings = await db.query.booking.findMany();

  console.log("Filtering apartments for bbox..");
  const apartmentsFilteredByBbox = allApartments.filter((apartment) => {
    if (bbox) {
      const [minLat, minLon, maxLat, maxLon] = bbox;

      return (
        apartment.adress.coords.lat >= minLat &&
        apartment.adress.coords.lng >= minLon &&
        apartment.adress.coords.lat <= maxLat &&
        apartment.adress.coords.lng <= maxLon
      );
    }
    return true;
  });

  console.log(
    `Found ${apartmentsFilteredByBbox.length} apartments in bbox ${bbox}`
  );

  if (apartmentsFilteredByBbox.length === 0) {
    return c.json([], 200);
  }

  console.log("Checking for available apartments..");
  const apartmentsWithAvailableStatus = apartmentsFilteredByBbox.map(
    (apartment) => {
      const bookings = allBookings.filter(
        (booking) => booking.apartmentId === apartment.id
      );

      for (const booking of bookings) {
        const bookingStartDate = new Date(booking.startDate);
        const bookingEndDate = new Date(booking.endDate);
        if (
          (inputStartDate.getMilliseconds() >=
            bookingStartDate.getMilliseconds() &&
            inputStartDate.getMilliseconds() <=
              bookingEndDate.getMilliseconds()) ||
          (inputEndDate.getMilliseconds() >=
            bookingStartDate.getMilliseconds() &&
            inputEndDate.getMilliseconds() <= bookingEndDate.getMilliseconds())
        ) {
          return { ...apartment, available: booking.cancelled };
        }
      }
      return { ...apartment, available: true };
    }
  );
  console.log(`Filter out only available apartments? : ${onlyAvailable}`);
  if (onlyAvailable) {
    const availableApartments = apartmentsWithAvailableStatus.filter(
      (apartment) => apartment.available
    );
    console.log(`Returning ${availableApartments.length} available apartments`);
    const data = GetAvailableApartmentsResponse.parse(
      availableApartments.map((apartment) => ({
        ...apartment,
        preview: apartment.images[0],
      }))
    );
    console.log("Returning raw data:", data);
    return c.json(data, 200);
  } else {
    console.log(
      `Returning ${apartmentsWithAvailableStatus.length} available apartments`
    );
    const data = GetAvailableApartmentsResponse.parse(
      apartmentsWithAvailableStatus.map((apartment) => ({
        ...apartment,
        preview: apartment.images[0],
      }))
    );
    console.log("Returning raw data:", data);
    return c.json(data, 200);
  }
});

availableApartments.openapi(getAvailableApartmentsPerIdRoute, async (c) => {
  const requestParams = c.req.valid("query");

  const startDate = new Date(requestParams.startDate);
  const endDate = new Date(requestParams.endDate);

  const { id } = c.req.valid("param");

  const db = database();

  const apartment = await db.query.apartment.findFirst({
    where: (apartment, { eq }) => eq(apartment.id, id),
  });

  if (!apartment) {
    return c.json(
      { message: `Apartment with id ${id} does not exist`, code: 400 },
      400
    );
  }

  const allBookings = await db.query.booking.findMany();

  const bookings = allBookings.filter(
    (booking) => booking.apartmentId === apartment.id
  );

  for (const booking of bookings) {
    const bookingStartDate = new Date(booking.startDate);
    const bookingEndDate = new Date(booking.endDate);
    if (
      (startDate.getMilliseconds() >= bookingStartDate.getMilliseconds() &&
        startDate.getMilliseconds() <= bookingEndDate.getMilliseconds()) ||
      (endDate.getMilliseconds() >= bookingStartDate.getMilliseconds() &&
        endDate.getMilliseconds() <= bookingEndDate.getMilliseconds())
    ) {
      return c.json({ ...apartment, available: booking.cancelled }, 200);
    }
  }

  return c.json({ ...apartment, available: true }, 200);
});
