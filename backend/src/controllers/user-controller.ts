import UserModel from "../models/User";
import { User } from "@prisma/client";
import { userSchema } from "../validations/user";
import bcrypt from "bcrypt";
import { ZodError } from "zod";

interface SaveUsersResponse {
  successCount: number;
  failedCount: number;
  success: Omit<User, "password">[];
  errors: Errors[];
}

interface SaveUserResponse {
  success: Omit<User, "password">;
  error?: Detail;
}

interface Errors {
  row: number;
  details: Detail;
  record: Omit<User, "password">;
}

interface Detail {
  name?: DetailStructure;
  email?: DetailStructure;
  age?: DetailStructure;
  password?: DetailStructure;
  role?: DetailStructure;
}

interface DetailStructure {
  value: string;
  error: string;
}

export async function saveUsers(users: User[]) {
  const successList: Omit<User, "password">[] = [];
  const failedList: Errors[] = [];
  let successCount = 0;
  let failedCount = 0;
  for (const [index, record] of users.entries()) {
    try {
      const validatedUser = validateUser(record);
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
      const errorMessage = getErrorMessage(error, record);
      failedList.push({ row: index + 1, details: errorMessage, record });
    }
  }
  return {
    successCount,
    failedCount,
    success: successList,
    errors: failedList,
  } as SaveUsersResponse;
}

export async function saveOne(record: User) {
  try {
    const validatedUser = validateUser(record);
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);
    const user = await UserModel.createUser({
      ...validatedUser,
      password: hashedPassword,
    } as User);
    const { password, ...userWithoutPassword } = user;
    return {
      success: userWithoutPassword,
    } as SaveUserResponse;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, record);
    return {
      success: null,
      error: errorMessage,
    };
  }
}

function validateUser(user: User) {
  const preparedUser = {
    ...user,
    password: user.password || "default",
    age: user.age ? Number(user.age) : null,
  };
  return userSchema.parse(preparedUser);
}

function getErrorMessage(error: ZodError | Error, record: User) {
  const detailKeys: (keyof Detail)[] = [
    "name",
    "email",
    "age",
    "password",
    "role",
  ];
  let errorMessage = {} as Detail;
  if (error instanceof ZodError) {
    error.errors.forEach((err) => {
      const pathKey = err.path[0];
      if (
        typeof pathKey === "string" &&
        detailKeys.includes(pathKey as keyof Detail)
      ) {
        const key = pathKey as keyof Detail;
        if (!errorMessage[key]) {
          errorMessage[key] = {
            value: record[key] as string,
            error: err.message,
          };
        } else {
          errorMessage[key] = {
            value: record[key] as string,
            error: `${errorMessage[key].error}, ${err.message}`,
          };
        }
      }
    });
  } else if (error instanceof Error) {
    if ((error as any).code === "P2002") {
      errorMessage.email = {
        value: record.email,
        error: "Email already exists",
      };
    }
  }
  return errorMessage;
}

export default {
  saveUsers,
  saveOne,
};
