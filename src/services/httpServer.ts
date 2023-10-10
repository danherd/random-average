/* c8 ignore start */
import express, { Express, Request } from "express";
import * as expressWinston from "express-winston";
import { getAverage } from "@handlers/getAverage";
import { logger } from "@services/logger";

const serverLogger = logger.child({ service: "httpServer" });

export const setupHttpServer = (): void => {
  serverLogger.info("Initialising HTTP server");

  const port = Number(process.env["PORT"] || 3000);

  if (isNaN(port)) {
    const errorMessage = `Invalid environment variable: PORT ('${process.env["PORT"]}')`;

    serverLogger.error(errorMessage);

    throw new Error(errorMessage);
  }

  const app: Express = express();

  app.use(
    expressWinston.logger({
      winstonInstance: serverLogger,
      ignoreRoute: (req: Request) => {
        if (req.path === "/favicon.ico") {
          return true;
        }

        return false;
      },
    }),
  );

  app.get("/", getAverage);

  app.listen(port, () => {
    serverLogger.log("info", `HTTP server listening on port ${port}`);
  });
};
/* c8 ignore end */
