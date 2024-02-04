import { PollutionService } from "../../services/PollutionService";
import prisma from "../../../lib/db";
import { PARIS_COORDINATES } from "../../../utils/constants";
import { RequestHandler } from "express";

export class PollutionController {
  constructor(private pollutionService = new PollutionService()) {}

  getPollution: RequestHandler = async (req, res, next) => {
    try {
      const latitude = req.query.latitude as string;
      const longitude = req.query.longitude as string;
      const data = await this.pollutionService.getPollutionData(
        latitude,
        longitude
      );
      res.json({
        Result: {
          Pollution: data,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  getParisMaxTS: RequestHandler = async (req, res, next) => {
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
  };
}
