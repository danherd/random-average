/* c8 ignore start */
import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";
import { callCsrng } from "@handlers/callCsrng";
import { logger } from "@services/logger";

const schedulerLogger = logger.child({ service: "scheduler" });
const schedulerInterval = 1;
let previousResult = false;
let consecutiveErrors = 0;

export const setupScheduler = (): void => {
  schedulerLogger.info("Initialising scheduler");

  const scheduler = new ToadScheduler();
  const task = new AsyncTask("call CSRNG API", async () => {
    const result = await callCsrng();

    if (!result && !previousResult) {
      consecutiveErrors += 1;

      if (consecutiveErrors > 9) {
        logger.error(
          `Experienced 10 consecutive failed calls to the CSRNG API - exiting`,
        );

        process.exit(1);
      }
    }
    if (result) {
      consecutiveErrors = 0;
    }
    previousResult = result;
  });
  const job = new SimpleIntervalJob(
    { seconds: schedulerInterval, runImmediately: true },
    task,
    { preventOverrun: true },
  );

  scheduler.addSimpleIntervalJob(job);

  schedulerLogger.info(`Scheduler running every ${schedulerInterval} seconds`);
};
/* c8 ignore end */
