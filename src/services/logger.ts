/* c8 ignore start */
import winston from "winston";

export const logger = winston.createLogger({
  level: process.env["LOG_LEVEL"] || "info",
  transports: [
    new winston.transports.Console({
      silent: process.env["NODE_ENV"] === "testing",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});
/* c8 ignore end */
