// tests/index.test.ts
const request = require("supertest");
import app from "../src/index";
import { describe, it, expect } from "vitest";

describe("GET /", () => {
  it('should return a JSON message saying "Hello World"', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello World" });
  });
});

describe("GET /auth", () => {
  it("should respond with a 404 if the route is not configured properly", async () => {
    const response = await request(app).get("/auth");
    expect(response.status).toBe(404);
  });
});
