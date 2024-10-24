import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

import { apartments as adminApartments } from "./api/admin/apartments/apartments.controller";
import { bookings as adminBookings } from "./api/admin/bookings/bookings.controller";
import { booking } from "./api/booking/booking.controller";
import { seed } from "./api/admin/seed/controller";
import { availableApartments } from "./api/availableApartments/availableApartments.controller";

const app = new OpenAPIHono().basePath("/api");

app.doc31("/doc", (c) => ({
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "WiesBnB API",
    description:
      "WiesBnB is a AirBnB inspired Platform, which you can use to build your own AirBnB clone.",
  },
  servers: [
    {
      url: new URL(c.req.url).origin,
      description: "Current environment",
    },
  ],
}));

app.route("/availableApartments", availableApartments);
app.route("/booking", booking);
app.route("/admin", adminApartments);
app.route("/admin", adminBookings);
app.route("/admin/seed", seed);

app.get("/", swaggerUI({ url: "/api/doc" }));

export default app;
