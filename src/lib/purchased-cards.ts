const STORAGE_KEY = "venbay:purchasedCards";

export function getPurchasedCards(): { card: any; code: string }[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addPurchasedCard(card: unknown, code: string) {
  const purchased = getPurchasedCards();
  purchased.push({ card, code });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchased));
}

export function removePurchasedCard(index: number) {
  const purchased = getPurchasedCards();
  purchased.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purchased));
}
