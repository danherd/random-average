import { jest, describe, expect, it } from "@jest/globals";
import httpMocks from "node-mocks-http";
import { getAverage } from "./getAverage";
import { logger } from "@services/logger";
import { numberStore } from "@stores/numberStore";

jest.mock("@stores/numberStore", () => {
  return {
    numberStore: [1, 1, 2, 3, 4, 4, 4, 5],
  };
});

jest.spyOn(logger, "info");

describe("getAverage function", () => {
  it("should log an info message with numberStore details", async () => {
    const response = httpMocks.createResponse();

    getAverage(httpMocks.createRequest(), response, numberStore);

    expect(jest.mocked(logger.info)).toHaveBeenCalledWith(
      "There are 8 values in numberStore ([1,1,2,3,4,4,4,5])",
    );
    expect(response.statusCode).toBe(200);
    expect(response._getData()).toBe("3");
  });
});
