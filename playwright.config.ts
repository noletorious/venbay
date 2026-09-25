import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  use: {
    baseURL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
  },
  webServer: {
    command: "npm run dev",
    url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
