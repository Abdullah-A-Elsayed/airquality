import prisma from "../../lib/db";
import { PollutionService } from "../../server/services/PollutionService";
import { PARIS_COORDINATES } from "../../utils/constants";

export async function storeParisPollution(pollutionService: PollutionService) {
  // TODO [BONUS] we can use bullmq to schedule these jobs in a queue
  const data = await pollutionService.getPollutionData(
    `${PARIS_COORDINATES.latitude}`,
    `${PARIS_COORDINATES.longitude}`
  );
  await prisma.pollution.create({
    data: {
      ...data,
      latitude: PARIS_COORDINATES.latitude,
      longitude: PARIS_COORDINATES.longitude,
    },
  });
}
