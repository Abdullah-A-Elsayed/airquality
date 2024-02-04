import { PollutionService } from "../../../src/server/services/PollutionService";
import { storeParisPollution } from "../../../src/jobs/handlers/index";
import { PARIS_COORDINATES } from "../../../src/utils/constants";
import prisma from "../../../src/lib/db";

// mocking external service
jest.mock(".../../../src/server/services/PollutionService");
const samplePollutionData = {
  ts: "2024-02-02T12:00:00.000Z",
  aqius: 50,
  mainus: "p2",
  aqicn: 20,
  maincn: "p1",
};
const mockGetPollutionData = jest.fn().mockResolvedValue(samplePollutionData);
PollutionService.prototype.getPollutionData = mockGetPollutionData;

// spying on ORM prisma.pollution.create
const prismaCreatePollutionSpy = jest.spyOn(prisma.pollution, "create");

describe("storeParisPollution", () => {
  beforeAll(async () => {
    prisma.pollution.deleteMany();
  });
  it("should fetch pollution data and store it in the database", async () => {
    const pollutionService = new PollutionService();
    await storeParisPollution(pollutionService);
    expect(mockGetPollutionData).toHaveBeenCalledTimes(1);
    expect(mockGetPollutionData).toHaveBeenCalledWith(
      `${PARIS_COORDINATES.latitude}`,
      `${PARIS_COORDINATES.longitude}`
    );
    expect(prismaCreatePollutionSpy).toHaveBeenCalledTimes(1);
    expect(prismaCreatePollutionSpy).toHaveBeenCalledWith({
      data: {
        ...samplePollutionData,
        latitude: PARIS_COORDINATES.latitude,
        longitude: PARIS_COORDINATES.longitude,
      },
    });
  });
  afterAll(async () => {
    // Clean up the database
    await prisma.pollution.deleteMany();
  });
});
