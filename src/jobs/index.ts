import cron from "node-cron";
import { storeParisPollution } from "./handlers";
import { PollutionService } from "../server/services/PollutionService";

const pollutionService = new PollutionService();
cron.schedule("* * * * *", async () => {
  console.log("Running storeParisPollution ...");
  await storeParisPollution(pollutionService);
});
