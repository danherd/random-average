import { jest, describe, expect, it } from "@jest/globals";
import httpMocks from "node-mocks-http";
import { getAverage } from "./getAverage";
import { logger } from "@services/logger";

jest.spyOn(logger, "info");

describe("getAverage function", () => {
  it("should log an info message with numberStore details", async () => {
    const response = httpMocks.createResponse();
    getAverage(httpMocks.createRequest(), response);

    expect(jest.mocked(logger.info)).toHaveBeenCalledWith(
      "There are 0 values in numberStore ([])",
    );
    expect(response.statusCode).toBe(200);
    expect(response._getData()).toBe("0");
  });
});
