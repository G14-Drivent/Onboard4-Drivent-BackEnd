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

async function upsert(id: number, data: UpsertBookingParams) {
  return prisma.booking.upsert({
    where: {
      id
    },
    create: {
      userId: data.userId,
      roomId: data.roomId
    },
    update: {
      roomId: data.roomId
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
