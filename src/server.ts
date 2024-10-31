import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { swaggerUI } from "@hono/swagger-ui";

import { apartments as adminApartments } from "./api/admin/apartments/apartments.controller";
import { bookings as adminBookings } from "./api/admin/bookings/bookings.controller";
import { booking } from "./api/booking/booking.controller";
import { seed } from "./api/admin/seed/controller";
import { availableApartments } from "./api/availableApartments/availableApartments.controller";

const app = new OpenAPIHono();
app.use(prettyJSON());

const publicRoutes = new OpenAPIHono().basePath("/api");

publicRoutes.use("*", cors());
publicRoutes.doc31("/doc", (c) => ({
  openapi: "3.1.0",
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

publicRoutes.get("/", swaggerUI({ url: "/api/doc" }));
publicRoutes.route("/", availableApartments);
publicRoutes.route("/", booking);

const adminRoutes = new OpenAPIHono().basePath("/api");
adminRoutes.doc31("/doc", (c) => ({
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "WiesBnB API - Admin",
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

adminRoutes.get("/", swaggerUI({ url: "/api/admin/doc" }));
adminRoutes.route("/", adminApartments);
adminRoutes.route("/", adminBookings);
adminRoutes.route("/seed", seed);

app.route("/", publicRoutes);
app.route("/admin", adminRoutes);

export default app;
