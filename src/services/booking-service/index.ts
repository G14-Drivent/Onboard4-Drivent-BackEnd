import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";

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

const bookingService = {
  getBookingByUser
};
  
export default bookingService;
