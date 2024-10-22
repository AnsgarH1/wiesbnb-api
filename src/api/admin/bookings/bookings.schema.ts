import { z } from "@hono/zod-openapi";

import { FullBookingSchema } from "../../../common/response.schema";
import { BookingIdSchema } from "../../../common/database.schema";

export const GetBookingsResponse = z.array(FullBookingSchema);

export const GetBookingPerIdResponse = FullBookingSchema.optional();

export const GetBookingPerIdParams = z.object({
  id: z.coerce.number().pipe(BookingIdSchema),
});

export const CreateNewBookingRequestBody = FullBookingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateBookingRequestBody = FullBookingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export const UpdateBookingRequestParams = z.object({
  id: z.coerce.number().pipe(BookingIdSchema),
});

export const DeleteBookingRequestParams = z.object({
  id: z.coerce.number().pipe(BookingIdSchema),
});
