import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "@prisma/client";

dotenv.config();

const { JWT_SECRET } = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET as string);
    if (!verified) {
      return res.status(401).json({ error: "Access denied" });
    }
    req.user = verified as User;
    return next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

export default verifyToken;
