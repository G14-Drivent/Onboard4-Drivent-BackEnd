import { conflictError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import { Booking } from "@prisma/client";
import hotelService from "../hotels-service";

async function getBookingByUser(userId: number) {
  const booking = await bookingRepository.find(userId);

  if (!booking) {
    throw notFoundError();
  }

  return {
    id: booking.id,
    Room: booking.Room
  };
}

async function checkRoomAvailable(roomId: number) {
  const room = await bookingRepository.findRoom(roomId);

  if(!room) {
    throw notFoundError();
  }
  if(room.Booking.length >= room.capacity) {
    throw conflictError("selected room has no vacancy");
  }
}

async function createNewBooking({ roomId, userId }: Pick<Booking, "roomId" | "userId">) {
  await checkRoomAvailable(roomId);
  await hotelService.listHotels(userId);

  const data = { roomId, userId };
  const booking = await bookingRepository.upsert(0, data);
  return { 
    bookingId: booking.id
  };
}

const bookingService = {
  getBookingByUser,
  createNewBooking
};
  
export default bookingService;
