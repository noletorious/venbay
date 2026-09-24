const STORAGE_KEY = "venbay:credits";
const STARTING_CREDITS = 25;
export const MAX_CREDITS = 100;
export const DAILY_TOPUP_AMOUNT = 6;
export const TOPUP_HOUR_PST = 12;

export function getCredits(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== null ? Number(stored) : STARTING_CREDITS;
  } catch {
    return STARTING_CREDITS;
  }
}

export function spendCredits(amount: number) {
  const next = Math.max(0, getCredits() - amount);
  localStorage.setItem(STORAGE_KEY, String(next));
  return next;
}

export function addCredits(amount: number) {
  const next = Math.min(MAX_CREDITS, getCredits() + amount);
  localStorage.setItem(STORAGE_KEY, String(next));
  return next;
}
