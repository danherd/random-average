import { describe, expect, it } from "@jest/globals";
import { arrayAverage } from "./arrayAverage";

describe("arrayAverage function", () => {
  it("should return zero if the array is empty", () => {
    expect(arrayAverage([])).toBe(0);
  });

  it("should return '12.5' if the array is '[6, 12, 45, 12, 9, 10, 1, 5]'", () => {
    const numbers = [6, 12, 45, 12, 9, 10, 1, 5];

    expect(arrayAverage(numbers)).toBe(12.5);
  });
});
