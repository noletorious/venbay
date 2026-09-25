import { beforeEach, describe, expect, it } from "vitest";
import { addPurchasedCard, getPurchasedCards, removePurchasedCard } from "./purchased-cards";

beforeEach(() => {
  localStorage.clear();
});

describe("purchased cards", () => {
  it("starts empty", () => {
    expect(getPurchasedCards()).toEqual([]);
  });

  it("adds a card with its code", () => {
    addPurchasedCard({ id: "1" }, "A1");
    expect(getPurchasedCards()).toEqual([{ card: { id: "1" }, code: "A1" }]);
  });

  it("removes a card by index", () => {
    addPurchasedCard({ id: "1" }, "A1");
    addPurchasedCard({ id: "2" }, "B2");
    removePurchasedCard(0);
    expect(getPurchasedCards()).toEqual([{ card: { id: "2" }, code: "B2" }]);
  });

  it("recovers from corrupt storage instead of throwing", () => {
    localStorage.setItem("venbay:purchasedCards", "{not json");
    expect(getPurchasedCards()).toEqual([]);
  });
});
