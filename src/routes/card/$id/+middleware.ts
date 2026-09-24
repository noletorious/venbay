import type {} from "@marko/run";

const cardCache = new Map<string, unknown>();

export default Run.ALL(async (ctx, next) => {
  const code = ctx.url.searchParams.get("code") || "";

  if (cardCache.has(ctx.params.id)) {
    return next({ card: cardCache.get(ctx.params.id), code });
  }

  const res = await fetch(`https://api.unsplash.com/photos/${ctx.params.id}`, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  });

  const card = res.ok ? await res.json() : null;

  if (card) {
    cardCache.set(ctx.params.id, card);
  }

  return next({ card, code });
});
