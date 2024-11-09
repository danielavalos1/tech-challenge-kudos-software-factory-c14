//create a router
import { Router, NextFunction, Request, Response } from "express";
import authController from "../../controllers/auth-controller";
import { loginSchema, signupSchema } from "../../validations/auth";
const router = Router();

// Routes

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      loginSchema.parse(req.body);
      await authController.login(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      signupSchema.parse(req.body);
      await authController.signup(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
