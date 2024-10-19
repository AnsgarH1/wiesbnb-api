import { OpenAPIHono } from "@hono/zod-openapi";
import { getApartmentsRoute } from "./apartments.routes";

import { database } from "../../infrastructure/drizzle";
import * as schema from "../../infrastructure/drizzle/schema";
import { Resource } from "sst";
import { ApartmentsSchema } from "./apartments.schema";
import { fromZodError } from "zod-validation-error";

export const apartments = new OpenAPIHono();

apartments.openapi(getApartmentsRoute, async (c) => {
  console.log("GET /apartments");
  const db = database(Resource.Wiesbnb_Database);
  const db_apartments = await db.select().from(schema.apartmentsTable);
  console.log("Loaded following apartments from DB: ", db_apartments);
  const { data, error } = ApartmentsSchema.safeParse(db_apartments);
  if (error) {
    console.log("Error parsing db_apartments: ", fromZodError(error));
    return c.json(
      {
        error: fromZodError(error).toString(),
        code: 400,
      },
      400
    );
  }

  return c.json(data, 200);
});
