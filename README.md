# venbay

eBay's vending machine — buy digital trading cards sourced from the Unsplash API. Each card is styled like a trading card (unique name, image, type, stats), bought with credits earned over time. Built with [Marko](https://markojs.com) and [@marko/run](https://github.com/marko-js/run).

The concept is that cards can be other things, like digital assets, ebay products, NFTs, etc.

See [documentation/INITIAL-PROMPT.MD](documentation/INITIAL-PROMPT.MD) for full project scope.

## Getting started

```
npm install
npm run dev
```

App runs at `http://localhost:3000` by default.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — build a production-ready Node.js server
- `npm run preview` — run the production build locally
- `npm run storybook` — run Storybook (component docs, a11y checks, light/dark theme toolbar)
- `npm run test` — run unit tests once (Vitest)
- `npm run test:watch` — run unit tests in watch mode
- `npm run test:e2e` — run end-to-end tests (Playwright); spins up the dev server automatically, requires `UNSPLASH_ACCESS_KEY` to be set since cards are fetched live

## Testing

- **Unit tests** (`src/lib/*.test.ts`, Vitest + jsdom) cover the pure localStorage-backed logic: credits (spend/top-up clamping), card cost (deterministic pricing), and purchased-cards persistence.
- **End-to-end tests** (`e2e/*.spec.ts`, Playwright) cover the real user flow: dialing a code on the keypad, dispensing a card, showcasing/throwing it away from My Cards, and topping up credits.

## Project structure

Routes map to the file system under `src/routes` (`+page.marko` per route). See the [@marko/run docs](https://github.com/marko-js/run/#file-based-routing) for details.
