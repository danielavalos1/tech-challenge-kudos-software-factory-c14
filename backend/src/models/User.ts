import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export default {
  getUserByEmail,
};
