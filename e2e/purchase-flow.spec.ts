import { expect, test } from "@playwright/test";

// Full happy path: dial a card, dispense it, showcase it, then throw it away.
// Requires UNSPLASH_ACCESS_KEY to be set for the dev server (cards are fetched live).

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("dialing a code navigates to that card's detail page", async ({ page }) => {
  await page.getByRole("button", { name: "A", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();

  await expect(page).toHaveURL(/\/card\/.+\?code=A1/);
  await expect(page.locator(".detail__notice-code")).toHaveText("A1");
});

test("dispensing a card adds it to My Cards, and it can be showcased and thrown away", async ({
  page,
}) => {
  await page.getByRole("button", { name: "A", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page).toHaveURL(/\/card\/.+\?code=A1/);

  await page.getByRole("button", { name: "Dispense" }).click();
  await expect(page).toHaveURL(/\/my-cards$/);

  const card = page.locator(".my-cards__item").first();
  await expect(card).toBeVisible();

  await card.getByRole("button", { name: "Card options" }).click();
  await card.getByRole("link", { name: "View showcase" }).click();
  await expect(page).toHaveURL(/\/my-cards\/0$/);
  await expect(page.locator(".showcase__stage .trading-card")).toBeVisible();

  await page.getByRole("link", { name: "Back to My Cards" }).click();
  await page.locator(".my-cards__item").first().getByRole("button", { name: "Card options" }).click();
  await page.getByRole("button", { name: "Throw away" }).click();
  await page.getByRole("button", { name: "Throw away" }).click();

  await expect(page.getByText("No cards purchased yet.")).toBeVisible();
});

test("credits can be topped up from the home page", async ({ page }) => {
  await page.getByRole("button", { name: "Need more credits?" }).click();
  await page.getByRole("button", { name: /\+\d+/ }).first().click();
  await page.getByRole("button", { name: /Add \d+ credits/ }).click();

  await expect(page.locator(".vending-machine__screen-value")).not.toHaveText("25");
});
