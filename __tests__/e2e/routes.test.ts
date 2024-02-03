import request from "supertest";
import app from "../../src/server/app";
import prisma from "../../src/lib/db";
import { PARIS_COORDINATES } from "../../src/utils/constants";

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

  describe("GET /v1/pollution/paris/max", () => {
    beforeAll(async () => {
      // Clean up the database
      await prisma.pollution.deleteMany();

      // Insert mock data into the database
      const pollutionData = [
        {
          ts: "2024-02-02T10:00:00.0Z",
          aqius: 50,
          mainus: "p2",
          aqicn: 20,
          maincn: "p1",
        },
        {
          ts: "2024-02-02T10:01:00.0Z",
          aqius: 70, // This record has the highest aqius
          mainus: "p2",
          aqicn: 30,
          maincn: "p1",
        },
        {
          ts: "2024-02-02T10:02:00.0Z",
          aqius: 60,
          mainus: "p2",
          aqicn: 25,
          maincn: "p1",
        },
      ];
      for (const data of pollutionData) {
        await prisma.pollution.create({
          data: {
            ...data,
            latitude: PARIS_COORDINATES.latitude,
            longitude: PARIS_COORDINATES.longitude,
          },
        });
      }
    });

    it("should return the max pollution data for Paris", async () => {
      const res = await request(app).get("/v1/pollution/paris/max");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("Result");
      expect(res.body.Result).toHaveProperty("Datetime");
      expect(res.body.Result.Datetime).toBe("2024-02-02T10:01:00.0Z");
    });

    it("should return 404 when no pollution data found for Paris", async () => {
      // Delete all pollution data
      await prisma.pollution.deleteMany();

      const res = await request(app).get("/v1/pollution/paris/max");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty(
        "message",
        "No pollution data found for Paris"
      );
    });

    afterAll(async () => {
      // Clean up the database
      await prisma.pollution.deleteMany();
    });
  });
});
