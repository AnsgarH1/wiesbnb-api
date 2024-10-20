import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getApartmentsRoute,
  getApartmentPerIdRoute,
} from "./apartments.routes";

import { database } from "../../infrastructure/drizzle";
import * as schema from "../../infrastructure/drizzle/schema";
import { eq } from "drizzle-orm";
import {
  GetApartmentPerIdResponse,
  GetApartmentsResponse,
} from "./apartments.schema";

export const apartments = new OpenAPIHono();

apartments.openapi(getApartmentsRoute, async (c) => {
  const db = database();

  const db_response = await db.select().from(schema.apartmentsTable);

  const response_data = GetApartmentsResponse.parse(db_response);

  return c.json(response_data, 200);
});

apartments.openapi(getApartmentPerIdRoute, async (c) => {
  const { id } = c.req.valid("param");

  const db = database();

  const db_response = await db
    .select()
    .from(schema.apartmentsTable)
    .where(eq(schema.apartmentsTable.id, id));

  if (db_response.length === 0) {
    return c.json(
      { message: `No apartment found with id ${id}`, code: 404 },
      404
    );
  }

  const response_data = GetApartmentPerIdResponse.parse(db_response[0]);

  return c.json(response_data, 200);
});
