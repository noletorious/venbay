# venbay

eBay's vending machine — buy digital trading cards sourced from the Unsplash API. Each card is styled like a trading card (unique name, image, type, stats), bought with credits earned over time. Built with [Marko](https://markojs.com) and [@marko/run](https://github.com/marko-js/run).

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

## Project structure

Routes map to the file system under `src/routes` (`+page.marko` per route). See the [@marko/run docs](https://github.com/marko-js/run/#file-based-routing) for details.
