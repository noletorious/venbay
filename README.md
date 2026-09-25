# venbay

eBay's vending machine — buy digital trading cards sourced from the Unsplash API. Each card is styled like a trading card (unique name, image, type, stats), bought with credits earned over time. The concept extends to other things, like digital assets, ebay products, NFTs, etc.

## For Reviewers

A quick explainer of scope and my deep dive in my dev/design thoughts, a good place to start is here: **[documentation/noel-share/APPROACH.md](documentation/noel-share/APPROACH.md)**.

Phase I (MVP) deployment: link coming soon.
Phase II deployment: link coming soon.

## Getting started locally

Card data comes from the Unsplash API, so you'll need your own (free) access key:

1. Create an app at [unsplash.com/oauth/applications](https://unsplash.com/oauth/applications) to get an Access Key.
2. Add it to a `.env.local` file in the project root: `UNSPLASH_ACCESS_KEY=your-key-here`.

Also, I can provided one if requested.

```
npm install
npm run dev
```

App runs at `http://localhost:3000` by default. Without a key, the card grid/detail routes will come back empty (check the terminal for the logged response status).

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
