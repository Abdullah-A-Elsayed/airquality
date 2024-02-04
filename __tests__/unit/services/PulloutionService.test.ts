import { PollutionService } from "../../../src/server/services/PollutionService";
import axios from "axios";
const AIR_VISUAL_API_KEY =
  process.env.AIR_VISUAL_API_KEY || "c8b660de-77aa-4fdd-8786-6e105ef4dc38";
// Mock axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Create an instance of PollutionService
const pollutionService = new PollutionService();
const lat = "30.0444",
  lng = "31.2357";
// Define some sample data
const samplePollutionData = {
  ts: "2024-02-02T12:00:00.000Z",
  aqius: 50,
  mainus: "p2",
  aqicn: 20,
  maincn: "p1",
};

const sampleResponse = {
  data: {
    status: "success",
    data: {
      city: "Cairo",
      current: {
        weather: {
          ts: "2024-02-02T12:00:00.000Z",
          tp: 18,
          pr: 1015,
          hu: 55,
          ws: 2.06,
          wd: 270,
          ic: "01d",
        },
        pollution: samplePollutionData,
      },
    },
  },
};

describe("PollutionService", () => {
  // Reset the mock before each test
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  // Test the getPollutionData method
  describe("getPollutionData", () => {
    // Test the happy path
    test("should return pollution data for the given coordinates", async () => {
      // Mock the axios get method to return the sample response
      mockedAxios.get.mockResolvedValue(sampleResponse);

      // Call the getPollutionData method with some sample coordinates
      const result = await pollutionService.getPollutionData(lat, lng);

      // Expect the result to match the sample pollution data
      expect(result).toEqual(samplePollutionData);

      // Expect the axios get method to be called with the correct URL and parameters
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.airvisual.com/v2/nearest_city?lat=30.0444&lon=31.2357&key=${AIR_VISUAL_API_KEY}`
      );
    });

    // Test the error path
    test("should throw an error if the axios get method fails", async () => {
      // Mock the axios get method to reject with an error
      mockedAxios.get.mockRejectedValue(new Error("Network error"));

      // Expect the getPollutionData method to throw an error
      await expect(pollutionService.getPollutionData(lat, lng)).rejects.toThrow(
        "Network error"
      );

      // Expect the axios get method to be called with the correct URL and parameters
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.airvisual.com/v2/nearest_city?lat=30.0444&lon=31.2357&key=${AIR_VISUAL_API_KEY}`
      );
    });
  });
});
