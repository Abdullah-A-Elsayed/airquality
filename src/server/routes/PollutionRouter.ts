import express from "express";
import { PollutionController } from "../controllers/v1/PollutionController";

const PollutionRouter = express.Router();

const pollutionController = new PollutionController();

PollutionRouter.get("/", pollutionController.getPollution);
PollutionRouter.get("/paris/max", pollutionController.getParisMaxTS);

export default PollutionRouter;
