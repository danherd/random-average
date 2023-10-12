import { jest, describe, expect, it } from "@jest/globals";
import httpMocks from "node-mocks-http";
import { numberStore } from "@stores/numberStore";
import { getNumberCount } from "./getNumberCount";

jest.mock("@stores/numberStore", () => {
  return {
    numberStore: [1, 1, 2, 3, 4, 4, 4, 5],
  };
});

describe("getNumberCount function", () => {
  it("should log an info message with numberStore details", async () => {
    const response = httpMocks.createResponse();

    getNumberCount(
      httpMocks.createRequest({
        query: { number: "4" },
      }),
      response,
      numberStore,
    );

    expect(response.statusCode).toBe(200);
    expect(response._getData()).toBe("3");
  });
});
