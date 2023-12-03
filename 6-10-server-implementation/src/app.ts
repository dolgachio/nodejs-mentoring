import express from "express";
import swaggerUI from "swagger-ui-express";
import path from "path";
import YAML from "yamljs";
import { loggingMiddleware } from "./utils/logging/logging-middleware";

export const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, "./doc/swagger.yaml"));

app.use(express.json());
app.use(loggingMiddleware);

app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/", (req, res, next) => {
  if (req.originalUrl === "/") {
    res.send("Service is running!");
    return;
  }
  next();
});

/* Routes only after middleware usage are affected by it */
