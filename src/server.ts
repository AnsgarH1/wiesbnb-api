import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

import { apartments } from "./api/apartments/apartments.controller";

const app = new OpenAPIHono();

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "WiesBnB API",
    description:
      "WiesBnB is a AirBnB inspired Platform, which you can use to build your own AirBnB clone.",
  },
});

app.route("/", apartments);

app.get("/", swaggerUI({ url: "/doc" }));

export default app;