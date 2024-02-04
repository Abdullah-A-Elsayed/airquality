import request from "supertest";
import app from "../../../../src/server/app";
import prisma from "../../../../src/lib/db";
import { PARIS_COORDINATES } from "../../../../src/utils/constants";

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
