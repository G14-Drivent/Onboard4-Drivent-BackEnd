import { UpsertBookingParams } from "@/repositories/booking-repository";
//import { Booking } from "@prisma/client";
import Joi from "joi";

export const bookingBodySchema = Joi.object<Pick<UpsertBookingParams, "roomId">>({
  roomId: Joi.number().min(1).required()
});

// export const bookingParamsSchema = Joi.object<Pick<Booking, "id" as "bookingId">>({
//   bookingId: Joi.number().min(1).required()
// });
