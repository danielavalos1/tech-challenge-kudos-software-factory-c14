import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function createUser(data: Omit<User, "id">): Promise<User> {
  return prisma.user.create({
    data,
  });
}

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export default {
  getUserByEmail,
  createUser,
  getUsers,
};
