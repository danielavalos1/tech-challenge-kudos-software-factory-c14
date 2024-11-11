// tests/authRouter.test.ts
const request = require("supertest");
import app from "../src/index";
import { describe, it, expect, vi } from "vitest";

describe("Auth Router", () => {
  describe("POST /login", () => {
    it("should return 200 and a success message when valid data is provided", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({ email: "admin@test.com", password: "123456" });

      console.log(response);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });

    it("should return 400 when invalid data is provided", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({ email: "" }); // Datos no válidos

      expect(response.status).toBe(400);
    });
  });

  describe("POST /signup", () => {
    it("should return 201 and a success message when valid data is provided", async () => {
      const response = await request(app).post("/auth/signup").send({
        name: "User",
        password: "newpassword",
        email: "user4@example.com", //Hay que cambiar constantemente este mail para que pase el test
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });

    it("should return 400 when invalid data is provided", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({ password: "short" }); // Datos no válidos

      expect(response.status).toBe(400);
    });
  });
});
