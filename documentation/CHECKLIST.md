# venbay checklist

Tracks the phase-1 build order from `INITIAL-PROMPT.MD`, plus what's queued up next. Mainly for prep — what to think through before we touch code on the next thing.

**When asked "what's next," reference the "Up next" list below first.**

## Up next (in order)

1. **Figma flow documentation** — Noel documents the determined UX flow in Figma, links it into `general-approach-notes.md`, which he'll adjust himself from there.

## Phase 1 build order

- [x] 1. Build scaffold
- [x] 2. Build out header
- [x] 3. Build out left column card loop
- [x] 4. Build out right column vending machine components
- [x] 5. Build out search, be able to query
- [x] 6. Setup Storybook — 4 stories (Search, VendingMachine, Card, CardList), a11y addon, light/dark theme toolbar
- [x] 7. Setup unit + e2e tests — Vitest for `src/lib/*` (credits, card-cost, purchased-cards), Playwright for the dial → dispense → showcase/throw-away and credit top-up flows
- [x] 8. Setup how to manage data — Unsplash fetch + caching via middleware, purchases/credits in localStorage
- [x] 9. Purchasing interaction — keypad-driven, `/card/{id}` detail route, credit-gated
- [x] 10. `/my-cards` route showing purchased cards, with a discard action

## Known gaps / things to prep before starting

- **Credits top-up**: real mechanism now in place — a modal (fake card/Apple Pay flow) lets a user add credits up to a 100 cap; the actual daily-drip auto top-up (6/day at 12p PST) is still just documented in the modal copy, not yet driven by a real timestamp check on load.
- **Card set persistence**: flagged earlier as a good improvement — currently every fresh `/` load (post cache-expiry or restart) re-rolls a new random 25, so a card a user was "about to buy" can disappear. Persisting the active set (plus a deliberate "refresh cards" action) is still open.
- **Sass**: you'd mentioned wanting to see what Sass looks like at some point — never circled back. Still plain CSS + variables everywhere.
- **Rare cards**: `rare` prop exists on `trading-card` (forces white title text on a full-saturation accent band) but nothing currently marks any real card as rare — no logic decides which cards get it.
- **eBay component library**: `documentation/ebay-resources.md` links evo-web/CoreUI as optional phase-2 reference — untouched so far, by design (phase-1 spec says no CSS/UI libraries).

## Phase 2 (not started)

- [ ] Incorporate parts of eBay's evo-web component library
- [ ] 3D vending machine initial state that zooms into the app interface on interaction
