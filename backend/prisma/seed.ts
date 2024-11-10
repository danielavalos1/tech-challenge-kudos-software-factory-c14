import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function seed() {
  console.log("Ejecutando el seeder");
  const users = [
    {
      email: "admin@test.com",
      name: "Admin",
      age: 30,
      password: await bcrypt.hash("123456", 10),
      role: "admin",
    },
  ];
  await prisma.user.upsert({
    where: { email: users[0].email },
    update: {},
    create: {
      email: users[0].email,
      name: users[0].name,
      age: users[0].age,
      password: users[0].password,
      role: users[0].role as Role,
    },
  });
}

seed()
  .then(async () => {
    console.log("Seeder ejecutado correctamente");
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.log(e);
    throw e;
  });
