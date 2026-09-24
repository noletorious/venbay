# venbay checklist

Tracks the phase-1 build order from `INITIAL-PROMPT.MD`, plus what's queued up next. Mainly for prep — what to think through before we touch code on the next thing.

## Phase 1 build order

- [x] 1. Build scaffold
- [x] 2. Build out header
- [x] 3. Build out left column card loop
- [x] 4. Build out right column vending machine components
- [x] 5. Build out search, be able to query
- [x] 6. Setup Storybook with 3 stories (Button, TradingCard, SearchInput — CardModal added as a bonus 4th)
- [ ] 7. Setup snapshots or unit tests — **not started**. Decided earlier: Vitest + `@marko/testing-library`, not yet installed/configured.
- [x] 8. Setup how to manage data — Unsplash fetch + caching via middleware, purchases/credits in localStorage
- [x] 9. Purchasing interaction — keypad-driven, `/card/{id}` detail route, credit-gated
- [x] 10. `/my-cards` route showing purchased cards, with a discard action

## Known gaps / things to prep before starting

- **Tests (step 7)**: needs a decision pass before starting — what's actually worth testing here? Candidates: `card-cost.ts`/`credits.ts` (pure, easy unit tests), `trading-card` rendering (name/code/cost), `vending-machine` selection + disabled-when-insufficient-credit logic. Prep: confirm Vitest config approach won't collide with Storybook's separate webpack-free Vite setup.
- **Credits top-up**: screen hint says "They top up automatically over time" but nothing implements that yet — purely decorative copy right now. Needs a real mechanism (time-based drip? fixed daily grant?) before it's not misleading.
- **Card set persistence**: flagged earlier as a good improvement — currently every fresh `/` load (post cache-expiry or restart) re-rolls a new random 25, so a card a user was "about to buy" can disappear. Persisting the active set (plus a deliberate "refresh cards" action) is still open.
- **Sass**: you'd mentioned wanting to see what Sass looks like at some point — never circled back. Still plain CSS + variables everywhere.
- **Rare cards**: `rare` prop exists on `trading-card` (forces white title text on a full-saturation accent band) but nothing currently marks any real card as rare — no logic decides which cards get it.
- **eBay component library**: `documentation/ebay-resources.md` links evo-web/CoreUI as optional phase-2 reference — untouched so far, by design (phase-1 spec says no CSS/UI libraries).

## Phase 2 (not started)

- [ ] Incorporate parts of eBay's evo-web component library
- [ ] 3D vending machine initial state that zooms into the app interface on interaction
