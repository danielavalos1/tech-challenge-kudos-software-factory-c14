import UserModel from "../models/User";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await UserModel.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const { password: _, ...userWithoutPassword } = user;

  const token = jwt.sign(userWithoutPassword, secretKey, {
    expiresIn: "1h",
  });

  return res.json({ message: "Logged in", data: userWithoutPassword, token });
}

export async function signup(req: Request, res: Response) {
  const { email, password, name, age, role } = req.body;

  /* const existingUser = await UserModel.getUserByEmail(email);

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  } */

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.createUser({
    email,
    password: hashedPassword,
    name,
    age,
    role,
  } as User);

  if (!user || user instanceof Error) {
    return res.status(500).json({ message: "Error creating user" });
  }

  const { password: _, ...userWithoutPassword } = user;

  const token = jwt.sign(userWithoutPassword, secretKey, {
    expiresIn: "1h",
  });

  return res.json({ message: "Signed up", data: userWithoutPassword, token });
}

export default {
  login,
  signup,
};
