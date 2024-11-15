import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getApartmentsRoute,
  getApartmentPerIdRoute,
  createNewApartmentRoute,
  deleteApartmentRoute,
  updateApartmentRoute,
} from "./apartments.routes";

import { database } from "../../../infrastructure/drizzle";
import * as schema from "../../../infrastructure/drizzle/schema";
import { eq } from "drizzle-orm";
import {
  GetApartmentPerIdResponse,
  GetApartmentsResponse,
} from "./apartments.schema";

export const apartments = new OpenAPIHono();

apartments.openapi(getApartmentsRoute, async (c) => {
  const db = database();

  const db_response = await db.query.apartment.findMany();

  console.log(`Found ${db_response.length} apartments to return`);
  console.log("---");
  console.log(
    "created: ",
    db_response.length > 0 && db_response[0].createdAt,
    "-end--"
  );
  const response_data = GetApartmentsResponse.parse(db_response);
  return c.json(response_data, 200);
});

apartments.openapi(getApartmentPerIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const db = database();
  const db_response = await db
    .select()
    .from(schema.apartment)
    .where(eq(schema.apartment.id, id));

  console.log("Get apartment per d response", db_response);

  if (db_response.length === 0) {
    return c.json(undefined, 200);
  }

  const response_data = GetApartmentPerIdResponse.parse(db_response[0]);
  return c.json(response_data, 200);
});

apartments.openapi(createNewApartmentRoute, async (c) => {
  const apartmentData = c.req.valid("json");
  const db = database();

  const db_response = await db.insert(schema.apartment).values(apartmentData);

  console.log("Insert response", db_response);

  if (db_response.success) {
    return c.json(
      { message: "Apartment created successfully", code: 201 },
      201
    );
  }

  return c.json({ message: "Failed to create apartment", code: 500 }, 500);
});

apartments.openapi(updateApartmentRoute, async (c) => {
  const { id } = c.req.valid("param");
  const apartmentData = c.req.valid("json");
  const db = database();

  const originalApartment = await db.query.apartment.findFirst({
    where: (apartment, { eq }) => eq(apartment.id, id),
  });

  if (!originalApartment) {
    return c.json(
      { message: `Apartment with id ${id} does not exist`, code: 400 },
      400
    );
  }

  const db_response = await db
    .update(schema.apartment)
    .set({
      ...apartmentData,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(schema.apartment.id, id));

  console.log("Update response", db_response);

  if (db_response.success) {
    return c.body(null, 204);
  } else {
    return c.json({ message: "Failed to update apartment", code: 500 }, 500);
  }
});

apartments.openapi(deleteApartmentRoute, async (c) => {
  const { id } = c.req.valid("param");
  const db = database();

  const db_response = await db
    .delete(schema.apartment)
    .where(eq(schema.apartment.id, id));

  console.log("Delete response", db_response);

  if (db_response.success) {
    return c.body(null, 204);
  } else {
    return c.json({ message: "Failed to delete apartment", code: 500 }, 500);
  }
});
