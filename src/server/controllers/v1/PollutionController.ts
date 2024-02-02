import express from "express";
import { PollutionService } from "../../services/PollutionService";

export const PollutionRouter = express.Router();

const pollutionService = new PollutionService();

PollutionRouter.get("/", async (req, res, next) => {
  try {
    const latitude = req.query.latitude as string;
    const longitude = req.query.longitude as string;
    const data = await pollutionService.getPollutionData(latitude, longitude);
    res.json({
      Result: {
        Pollution: data,
      },
    });
  } catch (err) {
    next(err);
  }
});
