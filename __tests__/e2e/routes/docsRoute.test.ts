import request from "supertest";
import app from "../../../src/server/app";

describe("GET /docs", () => {
  test("should return the Swagger HTML documentation", async () => {
    const response = await request(app).get("/docs");
    // Expect the response header to have the correct content type
    expect(response.header["content-type"].toLowerCase()).toBe(
      "text/html; charset=utf-8"
    );
  });
});
