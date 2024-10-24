import { OpenAPIHono } from "@hono/zod-openapi";

import { getAvailableApartmentsRoute } from "./availableApartments.routes";
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

  console.debug(c.req.valid("query"));

  const db = database();

  const allApartmentsWithoutAnyFilter = await db.query.apartment.findMany();

  const allApartments = await db.query.apartment.findMany({
    where: (apartment, { and, gte, lte }) =>
      and(
        gte(apartment.pricePerNight, minPrice),
        lte(apartment.pricePerNight, maxPrice),
        gte(apartment.maxAdults, amountAdults),
        gte(apartment.maxChildren, amountChildren)
      ),
  });
  console.log(
    `Found ${allApartments.length} of ${allApartmentsWithoutAnyFilter.length} apartments for params minPrice: ${minPrice}, maxPrice: ${maxPrice}, amountAdults: ${amountAdults}, amountChildren: ${amountChildren}`
  );

  const allBookings = await db.query.booking.findMany();

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

  const apartmentsWithAvailableStatus = apartmentsFilteredByBbox.map(
    (apartment) => {
      const bookings = allBookings.filter(
        (booking) => booking.apartmentId === apartment.id
      );

      for (const booking of bookings) {
        if (
          (startDate.getMilliseconds() >=
            new Date(booking.startDate).getMilliseconds() &&
            startDate.getMilliseconds() <=
              new Date(booking.endDate).getMilliseconds()) ||
          (endDate.getMilliseconds() >=
            new Date(booking.startDate).getMilliseconds() &&
            endDate.getMilliseconds() <=
              new Date(booking.endDate).getMilliseconds())
        ) {
          return { ...apartment, available: booking.cancelled };
        }
      }
      return { ...apartment, available: true };
    }
  );

  if (onlyAvailable) {
    const availableApartments = apartmentsWithAvailableStatus.filter(
      (apartment) => apartment.available
    );

    const data = GetAvailableApartmentsResponse.parse(availableApartments);

    return c.json(data, 200);
  } else {
    const data = GetAvailableApartmentsResponse.parse(
      apartmentsWithAvailableStatus
    );
    return c.json(GetAvailableApartmentsResponse.parse(data), 200);
  }
});
