// Unsplash doesn't provide a price, so cost is derived deterministically
// from the photo's id: same card always costs the same amount.
export function getCardCost(card: { id: string }): number {
  let hash = 0;
  for (const ch of card.id) {
    hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  }
  return (hash % 5) + 1; // $1–$5
}
