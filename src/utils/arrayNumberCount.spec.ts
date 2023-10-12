import { describe, expect, it } from "@jest/globals";
import { arrayNumberCount } from "./arrayNumberCount";

describe("arrayNumberCount function", () => {
  it("should return '3' if the array is '[1, 1, 2, 3, 4, 4, 4, 5]'", () => {
    const numbers = [1, 1, 2, 3, 4, 4, 4, 5];

    expect(arrayNumberCount(numbers, 4)).toBe(3);
  });
});
