import { config } from "dotenv";
import type {} from "@marko/run";

config({ path: ".env.local" });

// In-memory cache keyed by search query, so repeat loads of the same
// query reuse the last fetched set instead of re-hitting Unsplash.
// Resets on server restart; a "refresh" action can bypass this later.
const cardsCache = new Map<string, unknown[]>();

export default Run.ALL(async (ctx, next) => {
  if (ctx.url.pathname !== "/") {
    return next();
  }

  const query = ctx.url.searchParams.get("q")?.trim();
  const cacheKey = query || "__default__";

  if (cardsCache.has(cacheKey)) {
    console.log(`[unsplash] cache hit for "${cacheKey}"`);
    return next({ cards: cardsCache.get(cacheKey), query: query ?? "" });
  }

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

  console.log(
    `[unsplash] GET ${url.pathname} "${cacheKey}" -> ${res.status}`,
    `ratelimit ${res.headers.get("x-ratelimit-remaining")}/${res.headers.get("x-ratelimit-limit")}`
  );

  if (!res.ok) {
    console.error("[unsplash] error body:", await res.text());
  }

  const body = res.ok ? await res.json() : [];
  const cards = query ? body.results : body;

  cardsCache.set(cacheKey, cards);

  return next({ cards, query: query ?? "" });
});
