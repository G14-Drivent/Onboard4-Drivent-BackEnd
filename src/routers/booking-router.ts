import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { createBooking, getBooking } from "@/controllers";
import { bookingBodySchema } from "@/schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(bookingBodySchema), createBooking);

export { bookingRouter };
