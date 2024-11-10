//create a router
import { Router, NextFunction, Request, Response } from "express";
const router = Router();

// Routes

router.post("/", (_req: Request, res: Response, _next: NextFunction) => {
  res.send("Hello, World!");
});

export default router;
