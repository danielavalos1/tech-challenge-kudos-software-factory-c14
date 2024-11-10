import UserModel from "../models/User";
import { User } from "@prisma/client";
import { userSchema } from "../validations/user";
import bcrypt from "bcrypt";
import { ZodError } from "zod";

export async function saveUsers(users: User[]) {
  const successList: Omit<User, "password">[] = [];
  const failedList: any[] = [];
  let successCount = 0;
  let failedCount = 0;
  for (const [index, record] of users.entries()) {
    try {
      const preparedUser = {
        ...record,
        password: "default",
        age: record.age ? Number(record.age) : null,
      };
      const validatedUser = userSchema.parse(preparedUser);
      const hashedPassword = await bcrypt.hash(validatedUser.password, 10);
      const user = await UserModel.createUser({
        ...validatedUser,
        password: hashedPassword,
      } as User);
      const { password, ...userWithoutPassword } = user;
      successList.push(userWithoutPassword);
      successCount++;
    } catch (error: any) {
      failedCount++;
      let errorMessage = "Unknown error";
      if (error instanceof ZodError) {
        errorMessage = error.errors.map((err) => err.message).join(", ");
      } else if (error instanceof Error) {
        if ((error as any).code === "P2002") {
          errorMessage = "Email already exists";
        } else {
          errorMessage = error.message;
        }
      }
      failedList.push({ row: index + 1, record, error: errorMessage });
    }
  }
  return {
    successCount,
    failedCount,
    successList,
    failedList,
  };
}

export async function getUsers() {
  return UserModel.getUsers();
}

export default {
  saveUsers,
};
