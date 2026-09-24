const STORAGE_KEY = "venbay:credits";
const STARTING_CREDITS = 25;

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
