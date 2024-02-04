import express, { Request, Response, NextFunction } from "express";
import path from "path";
import * as OpenApiValidator from "express-openapi-validator";
import PollutionRouter from "./routes/PollutionRouter";
import swaggerUi from "swagger-ui-express";
import yamljs from "yamljs";

export const app = express();
const apiSpec = path.join("docs", "api.yaml");
const swaggerDocument = yamljs.load(apiSpec);

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(OpenApiValidator.middleware({ apiSpec }));
app.use("/v1/pollution", PollutionRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== "test") console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export default app;
