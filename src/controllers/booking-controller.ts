import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import bookingService from "@/services/booking-service";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBookingByUser(Number(userId));
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  const { roomId } = req.body;

  try {
    const booking = await bookingService.createNewBooking({ roomId, userId });
    res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === "CannotListHotelsError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  const bookingId = Number(req.params.bookingId);
  const { roomId } = req.body;

  try {
    const booking = await bookingService.updateOneBooking({ id: bookingId, roomId, userId });
    res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === "CannotListHotelsError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
}
