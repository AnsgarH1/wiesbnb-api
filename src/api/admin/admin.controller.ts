import { OpenAPIHono } from "@hono/zod-openapi";
import { createNewApartmentRoute } from "./admin.routes";
import { database } from "../../infrastructure/drizzle";
import * as schema from "../../infrastructure/drizzle/schema";

export const admin = new OpenAPIHono();

admin.openapi(createNewApartmentRoute, async (c) => {
  const db = database();
  const inputParams = c.req.valid("json");

  const response = await db.insert(schema.apartmentsTable).values(inputParams);

  if (response.error) {
    console.log(response.error);
    return c.json({ code: 500, message: "Failed to create apartment" }, 500);
  }

  return c.json({ code: 201, message: "Apartment created successfully" }, 201);
});
