import { beforeEach, describe, expect, it } from "vitest";
import { addCredits, getCredits, MAX_CREDITS, spendCredits } from "./credits";

beforeEach(() => {
  localStorage.clear();
});

describe("getCredits", () => {
  it("defaults to the starting balance when nothing is stored", () => {
    expect(getCredits()).toBe(25);
  });

  it("reads back a stored balance", () => {
    localStorage.setItem("venbay:credits", "10");
    expect(getCredits()).toBe(10);
  });
});

describe("spendCredits", () => {
  it("deducts the given amount", () => {
    localStorage.setItem("venbay:credits", "10");
    expect(spendCredits(4)).toBe(6);
    expect(getCredits()).toBe(6);
  });

  it("never goes below zero", () => {
    localStorage.setItem("venbay:credits", "3");
    expect(spendCredits(10)).toBe(0);
  });
});

describe("addCredits", () => {
  it("adds to the current balance", () => {
    localStorage.setItem("venbay:credits", "10");
    expect(addCredits(6)).toBe(16);
  });

  it("never exceeds MAX_CREDITS", () => {
    localStorage.setItem("venbay:credits", String(MAX_CREDITS - 2));
    expect(addCredits(50)).toBe(MAX_CREDITS);
  });
});
