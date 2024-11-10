import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
import { ApiError } from "./error";

export function authorize(...allowedRoles: User["role"][]) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError("Unauthorized", 401));

    const role = req.user.role;
    if (!role) return next(new ApiError("Unauthorized", 401));

    if (allowedRoles.includes(role as User["role"])) {
      next();
    } else {
      next(new ApiError("Access denied", 403));
    }
  };
}
