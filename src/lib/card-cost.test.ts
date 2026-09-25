import { describe, expect, it } from "vitest";
import { getCardCost } from "./card-cost";

describe("getCardCost", () => {
  it("is deterministic for the same card id", () => {
    const card = { id: "abc123" };
    expect(getCardCost(card)).toBe(getCardCost(card));
  });

  it("stays within the $1-$5 range", () => {
    for (const id of ["a", "bb", "ccc", "unsplash-id-xyz", "0"]) {
      const cost = getCardCost({ id });
      expect(cost).toBeGreaterThanOrEqual(1);
      expect(cost).toBeLessThanOrEqual(5);
    }
  });

  it("varies across different ids", () => {
    const costs = new Set(
      ["a", "b", "c", "d", "e", "f", "g", "h"].map((id) => getCardCost({ id }))
    );
    expect(costs.size).toBeGreaterThan(1);
  });
});
