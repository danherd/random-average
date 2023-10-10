/* c8 ignore start */
import "dotenv/config";
import { setupScheduler } from "@services/scheduler";
import { setupHttpServer } from "@services/httpServer";
import { logger } from "@services/logger";

try {
  setupScheduler();
  setupHttpServer();
} catch (err) {
  logger.error(`Failed to initialise required services - exiting`);

  process.exit(1);
}
/* c8 ignore end */
