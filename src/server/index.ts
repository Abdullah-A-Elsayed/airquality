import express, { Request, Response, NextFunction } from "express";
import path from "path";
import * as OpenApiValidator from "express-openapi-validator";
import { routes } from "./controllers/v1/PollutionController";
import swaggerUi from "swagger-ui-express";
import yamljs from "yamljs";

const app = express();
const port = 3000;
const apiSpec = path.join("docs", "api.yaml");
const swaggerDocument = yamljs.load(apiSpec);

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(OpenApiValidator.middleware({ apiSpec }));
app.use("/v1/pollution", routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
