import { Request, Response } from "express";
import { logger } from "@services/logger";
import { arrayAverage } from "@utils/arrayAverage";
import { numberStore } from "@stores/numberStore";

const getAverageLogger = logger.child({ handler: "getAverage" });

export const getAverage = (_request: Request, response: Response) => {
  const average = arrayAverage(numberStore);

  getAverageLogger.info(
    `There are ${numberStore.length} values in numberStore (${JSON.stringify(
      numberStore,
    )})`,
  );

  response.send(average.toString());
};
