import { prisma } from "@/config";

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

const bookingRepository = {
  find
};

export default bookingRepository;
