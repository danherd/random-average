import { logger } from "@services/logger";
import { numberStore } from "@stores/numberStore";
import { CsrngResponseArray } from "@types";

const callCsrngLogger = logger.child({ handler: "callCsrng" });

export const callCsrng = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      "https://csrng.net/csrng/csrng.php?min=0&max=100",
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching response: ${response.status} ${response.statusText}`,
      );
    }

    const responseJsonArray: CsrngResponseArray = await response.json();
    const responseJson = responseJsonArray[0];

    if (responseJson === undefined || responseJson.status === "error") {
      if (responseJson !== undefined && responseJson.code === "5") {
        callCsrngLogger.debug("CSRNG API limit exceeded");

        return true;
      }

      throw new Error(`Invalid response: ${JSON.stringify(responseJsonArray)}`);
    }

    callCsrngLogger.debug(`Response received: ${JSON.stringify(responseJson)}`);

    numberStore.push(responseJson.random as number);

    return true;
  } catch (err) {
    callCsrngLogger.error((err as Error).message);

    return false;
  }
};
