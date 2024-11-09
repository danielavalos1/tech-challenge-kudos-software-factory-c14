import User from "../models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const { password: _, ...userWithoutPassword } = user;

  const token = jwt.sign(userWithoutPassword, secretKey, {
    expiresIn: "1h",
  });

  return res.json({ message: "Logged in", user, token });
}
