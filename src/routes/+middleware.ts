import { config } from "dotenv";
import type {} from "@marko/run";

config({ path: ".env.local" });

export default Run.ALL(async (ctx, next) => {
  const url = new URL("https://api.unsplash.com/photos/random");
  url.searchParams.set("count", "25");

  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  });

  const cards = res.ok ? await res.json() : [];

  return next({ cards });
});
