import { prisma } from "@/config";
import { Booking } from "@prisma/client";

async function find(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId
    },
    include: {
      Room: true
    }
  });
}

async function findRoom(roomId: number) {
  return prisma.room.findUnique({
    where: {
      id: roomId
    },
    include: {
      Booking: true
    }
  });
}

async function upsert(bookingId: number, data: UpsertBookingParams) {
  return prisma.booking.upsert({
    create: {
      userId: data.userId,
      roomId: data.roomId
    },
    update: {
      userId: data.userId,
      roomId: data.roomId
    },        
    where: {
      id: bookingId
    }
  });
}

export type UpsertBookingParams = Omit<Booking, "id" | "createdAt" | "updatedAt">;

const bookingRepository = {
  find,
  findRoom,
  upsert
};

export default bookingRepository;
