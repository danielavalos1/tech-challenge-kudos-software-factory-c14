import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import {
  PrismaClientValidationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";

export class ApiError extends Error {
  status: number;
  details?: Record<string, any>;

  constructor(message: string, status = 500, details?: Record<string, any>) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      details: err.errors.reduce((acc, error) => {
        if (error.path) {
          acc[error.path.join(".")] = error.message;
        }
        return acc;
      }, {} as Record<string, string>),
    });
  }

  if (err instanceof PrismaClientValidationError) {
    return res.status(400).json({
      message: "Prisma validation error",
      details: err.message,
    });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(400).json({
        message: "Invalid data",
        details: err.message,
      });
    }

    if (err.code === "P2002") {
      return res.status(400).json({
        message: "Duplicate key",
        details: err.message,
      });
    }

    return res.status(400).json({
      message: "Prisma request error",
      details: err.message,
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      details: err.details,
    });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
}
