import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "@prisma/client";
import { ApiError } from "./error";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: User; // Añade la propiedad 'user'
    }
  }
}

const { JWT_SECRET } = process.env;

const verifyToken = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return next(new ApiError("Access denied", 401));
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET as string);

    if (!verified) {
      return next(new ApiError("Access denied", 401));
    }

    req.user = verified as User;
    next();
  } catch (error) {
    next(new ApiError("Invalid token", 400));
  }
};

export default verifyToken;
