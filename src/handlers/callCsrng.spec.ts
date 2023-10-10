import {
  jest,
  beforeAll,
  afterEach,
  afterAll,
  describe,
  expect,
  it,
} from "@jest/globals";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { callCsrng } from "./callCsrng";
import { logger } from "@services/logger";

jest.spyOn(logger, "error");
jest.spyOn(logger, "debug");

const server = setupServer();
const endpoint = "https://csrng.net/csrng/csrng.php";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("callCsrng function", () => {
  it("should log an error and return false if API returns an error", async () => {
    server.use(rest.get(endpoint, (_req, res, ctx) => res(ctx.status(500))));

    expect(await callCsrng()).toBe(false);
    expect(jest.mocked(logger.error)).toHaveBeenCalledWith(
      "Error fetching response: 500 Internal Server Error",
    );
  });

  it("should log an error and return false if API returns an invalid response", async () => {
    server.use(rest.get(endpoint, (_req, res, ctx) => res(ctx.json({}))));

    expect(await callCsrng()).toBe(false);
    expect(jest.mocked(logger.error)).toHaveBeenCalledWith(
      "Invalid response: {}",
    );
  });

  it("should log a debug message and return true if API returns an api limit exceeded response", async () => {
    server.use(
      rest.get(endpoint, (_req, res, ctx) =>
        res(ctx.json([{ status: "error", code: "5" }])),
      ),
    );

    expect(await callCsrng()).toBe(true);
    expect(jest.mocked(logger.debug)).toHaveBeenCalledWith(
      "CSRNG API limit exceeded",
    );
  });

  it("should log a debug message and return true if API returns a valid response", async () => {
    server.use(
      rest.get(endpoint, (_req, res, ctx) =>
        res(ctx.json([{ status: "success", random: 18 }])),
      ),
    );

    expect(await callCsrng()).toBe(true);
    expect(jest.mocked(logger.debug)).toHaveBeenCalledWith(
      'Response received: {"status":"success","random":18}',
    );
  });
});
