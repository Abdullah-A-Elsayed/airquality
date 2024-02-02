import axios from "axios";
import { PollutionData } from "../models/v1/PollutionData";

const baseUrl = "https://api.airvisual.com/v2/";
const AIR_VISUAL_API_KEY =
  process.env.AIR_VISUAL_API_KEY || "c8b660de-77aa-4fdd-8786-6e105ef4dc38";

export class PollutionService {
  async getPollutionData(
    latitude: string,
    longitude: string
  ): Promise<PollutionData> {
    const response = (
      await axios.get(
        `${baseUrl}nearest_city?lat=${latitude}&lon=${longitude}&key=${AIR_VISUAL_API_KEY}`
      )
    ).data;
    console.log(response.data);
    const { ts, aqicn, maincn, aqius, mainus } =
      response.data.current.pollution;
    return {
      ts,
      aqius,
      mainus,
      aqicn,
      maincn,
    };
  }
}
