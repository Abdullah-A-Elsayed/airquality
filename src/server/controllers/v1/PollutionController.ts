import express from "express";
import { PollutionService } from "../../services/PollutionService";
import prisma from "../../../lib/db";
import { PARIS_COORDINATES } from "../../../utils/constants";

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

PollutionRouter.get("/paris/max", async (req, res, next) => {
  try {
    const maxPollution = await prisma.pollution.findFirst({
      where: {
        latitude: PARIS_COORDINATES.latitude,
        longitude: PARIS_COORDINATES.longitude,
      },
      orderBy: {
        aqius: "desc",
      },
    });

    if (maxPollution) {
      res.json({ Result: { Datetime: maxPollution.ts } });
    } else {
      next({
        message: "No pollution data found for Paris",
        status: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});
