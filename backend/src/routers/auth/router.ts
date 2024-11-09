//create a router
import { Router, NextFunction, Request, Response } from "express";
import { login } from "../../controllers/auth-controller";
import { loginSchema } from "../../validations/auth";
const router = Router();

// Routes

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      loginSchema.parse(req.body);
      await login(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
