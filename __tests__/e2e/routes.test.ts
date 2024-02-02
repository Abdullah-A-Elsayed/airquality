import request from "supertest";
import app from "../../src/server/app";

describe("API routes", () => {
  describe("GET /docs", () => {
    test("should return the Swagger documentation", async () => {
      const response = await request(app).get("/docs");
      // Expect the response header to have the correct content type
      expect(response.header["content-type"].toLowerCase()).toBe(
        "text/html; charset=utf-8"
      );
    });
  });

  // Test the GET /v1/pollution route
  describe("GET /v1/pollution", () => {
    // Test the happy path
    test("should return pollution data for the given coordinates", async () => {
      // Make a GET request to the /v1/pollution route with some sample coordinates
      const response = await request(app).get(
        "/v1/pollution?latitude=30.0444&longitude=31.2357"
      );
      // Expect the response status to be 200
      expect(response.status).toBe(200);

      // Expect the response body to have the Result and Pollution properties
      expect(response.body).toHaveProperty("Result");
      expect(response.body.Result).toHaveProperty("Pollution");

      // Expect the response body to have the correct pollution data
      expect(response.body.Result.Pollution).toEqual({
        ts: expect.any(String),
        aqius: expect.any(Number),
        mainus: expect.any(String),
        aqicn: expect.any(Number),
        maincn: expect.any(String),
      });
    });

    // Test the error path
    test("should return an error if the coordinates are missing or invalid", async () => {
      // Make a GET request to the /v1/pollution route without coordinates
      const response = await request(app).get("/v1/pollution");
      // Expect the response status to be 400
      expect(response.status).toBe(400);

      // Expect the response body to have an error message
      expect(response.body).toHaveProperty("errors");
      expect(response.body.message).toBe(
        "request/query must have required property 'latitude', request/query must have required property 'longitude'"
      );
    });
  });
});
