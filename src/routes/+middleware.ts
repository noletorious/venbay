import { config } from "dotenv";
import type {} from "@marko/run";

config({ path: ".env.local" });

export default Run.ALL(async (ctx, next) => {
  const query = ctx.url.searchParams.get("q")?.trim();

  const url = query
    ? new URL("https://api.unsplash.com/search/photos")
    : new URL("https://api.unsplash.com/photos/random");

  if (query) {
    url.searchParams.set("query", query);
  }
  url.searchParams.set("per_page", "25");
  url.searchParams.set("count", "25");

  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  });

  const body = res.ok ? await res.json() : [];
  const cards = query ? body.results : body;

  return next({ cards, query: query ?? "" });
});
