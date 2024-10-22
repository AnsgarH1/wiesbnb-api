import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

import { apartments as adminApartments } from "./api/admin/apartments/apartments.controller";
import { booking } from "./api/booking/booking.controller";

const app = new OpenAPIHono();

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

app.route("/admin/", adminApartments);
app.route("/booking", booking);

app.get("/", swaggerUI({ url: "/doc" }));

export default app;
