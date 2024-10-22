import { z } from "@hono/zod-openapi";
import { ApartmentIdSchema } from "../../../common/database.schema";
import { FullApartmentSchema } from "../../../common/response.schema";

export const GetApartmentsResponse = z.array(FullApartmentSchema);

export const GetApartmentPerIdResponse = FullApartmentSchema.optional();

export const GetApartmentPerIdParams = z.object({
  id: z.coerce.number().pipe(ApartmentIdSchema), // Needed to return branded id-type
});

export const CreateNewApartmentRequestBody = FullApartmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateApartmentRequestBody = FullApartmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export const UpdateApartmentRequestParams = z.object({
  id: z.coerce.number().pipe(ApartmentIdSchema),
});

export const DeleteApartmentRequestParams = z.object({
  id: z.coerce.number().pipe(ApartmentIdSchema),
});
