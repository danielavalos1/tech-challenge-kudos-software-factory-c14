import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  age: z.number().int().min(1, "Age must be greater than 0").optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
