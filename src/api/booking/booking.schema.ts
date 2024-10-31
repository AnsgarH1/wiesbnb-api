import { z } from "@hono/zod-openapi";
import {
  ApartmentIdSchema,
  BookingIdSchema,
  GuestInfoSchema,
} from "../../common/database.schema";

export const CreateNewBookingRequestBody = z.object({
  apartmentId: z.coerce.number().pipe(ApartmentIdSchema),
  startDate: z.coerce.string().date().openapi({
    description: "The start date of the booking in format YYYY-MM-DD",
    example: "2024-10-01",
    format: "date",
  }),
  endDate: z.coerce.string().date().openapi({ format: "date", example: "2024-10-15" }),
  guestInfo: GuestInfoSchema,
  paymentInfo: z.discriminatedUnion("paymentType", [
    z
      .object({
        paymentType: z.literal("paypal"),
        paypalEmail: z
          .string()
          .email()
          .transform((email) => {
            const [localPart, domainPart] = email.split("@");
            if (localPart.length <= 2) {
              // If the local part is very short, just return it without masking
              return email;
            }
            const maskedLocalPart = `${localPart[0]}${"*".repeat(
              localPart.length - 2
            )}${localPart[localPart.length - 1]}`;
            return `${maskedLocalPart}@${domainPart}`;
          }),
      })
      .openapi("PaypalPaymentInfo"),
    z
      .object({
        paymentType: z.literal("creditCard"),
        cardNumber: z
          .string()
          .min(8, "Card number is too short")
          .max(19, "Card number is too long")
          .transform((value) => `************${value.slice(-4)}`),
        cvv: z
          .string()
          .min(3, "CVV must be 3 or 4 digits")
          .max(4, "CVV must be 3 or 4 digits")
          .transform((value) => new Array(value.length).fill("*").join("")),
        holderName: z.string().min(1, "Holder name is required"),
        expiryDate: z
          .string()
          .regex(
            /^(0[1-9]|1[0-2])\/\d{2}$/,
            "Expiry date must be in MM/YY format"
          ),
      })
      .openapi("CreditCardPaymentInfo"),
  ]),
});

export const CancelBookingRequestParams = z.object({
  bookingId: z.coerce.number().pipe(BookingIdSchema),
  email: z.string().email(),
  lastName: z.string(),
});
