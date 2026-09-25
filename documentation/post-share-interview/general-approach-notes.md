# General approach notes

## Workflow / process decisions
- Work happens on `phase-1` branch, not `main`. `phase-2` doesn't exist yet.
- Commit only when explicitly told to; no AI attribution lines in commits (standing instruction for this repo).
- Noel runs scaffold/install/dev-server commands himself (`npm create marko`, `npm install`, `npm run dev`) rather than having them run for him.
- Minimal code, one step at a time, review before moving on.

## Stack choices
- Marko + `@marko/run` (file-based routing) + `@marko/vite`, per the take-home test's requirement to use eBay's own framework.
- `npm create marko` was scaffolded manually (the blog-post-era `marko-run` create command is dead; current command is `npm create marko`).
- Plain CSS + CSS variables throughout, no preprocessor yet — Noel floated trying Sass "afterwards" but that never got revisited, so it stayed plain CSS.
- No CSS/UI libraries anywhere (matches the take-home spec's explicit requirement).

## Unsplash integration
- Access key moved out of the committed `documentation/unsplash-keys.md` into a gitignored `keys/` folder, then into `.env.local`, read server-side via `dotenv`.
- Had to explicitly `config({ path: ".env.local" })` — `dotenv/config`'s default import only reads `.env`, not `.env.local`, which caused a silent-empty-key bug early on.
- Auth switched from `client_id` query param to an `Authorization: Client-ID ...` header — the query-param form was returning "access token is invalid" even with a confirmed-correct key.
- Demo app is capped at 50 req/hour. Added a lightweight in-memory cache in the middleware (keyed by search query for the grid, by photo ID for the detail route) so repeated loads/dev-reloads don't re-burn quota, plus console logging of response status + rate-limit headers so failures are visible instead of silently returning an empty grid.
- Attribution requirements followed: images are hotlinked directly (`urls.small`/`urls.regular`, never re-hosted), every card links "Photo by {photographer} on Unsplash" back to Unsplash.

## Card grid ↔ vending machine mapping
- The 25-card grid is intentionally 5×5 so it maps 1:1 onto the vending machine's A–E / 1–5 keypad. Each card displays its own code (bottom-right badge).
- Trading card visual design: accent border/header tint pulled from Unsplash's per-photo dominant color; title text uses the theme's `--text-color` token (already black-in-light/white-in-dark) rather than a per-color contrast calculation — simpler and "safe by construction" since the accent is always blended toward the background, not used at full saturation behind text.
- Added a `rare` variant as an explicit opt-in: full-saturation accent header + forced white title. This only works because rare accents would be hand-picked to guarantee contrast — it's not derived automatically from arbitrary Unsplash colors.

## The click-modal → keypad-driven purchase flow pivot
This was the biggest direction change in the session, worth flagging explicitly:
- **Original build**: clicking a card opened a modal (image, stats, "enter this code on the keypad" prompt). This matched the take-home test's literal requirement for "a way to view a selected item."
- **Noel's correction**: once the vending-machine metaphor was actually being used, the modal felt disconnected from the real interaction — purchasing is driven by the physical keypad, and only one card can be "dialed" at a time. A modal per card didn't reflect that.
- **New flow**: clicking a card no longer opens anything — it only sets a cosmetic highlight on the matching keypad cell (a stroked outline, not a fill), and that highlight later moved from click-triggered to **hover-triggered** (renamed "click-selected" → "hover-selected" to make clear it's a preview, not a selection). Completing an actual keypad selection (both row and column pressed) is what navigates, to `/card/{unsplash-id}?code={code}`.
- The `card-modal` component and its Storybook story are still in the codebase but are no longer used on the live app — kept as a reusable piece rather than deleted, since Noel hadn't said to remove it outright.

## Route-by-ID, not route-by-code
- Considered keeping the row/col code itself as the URL (`/card/A3`), but the 25-card set is re-fetched fresh (random or search) on each request, so a given code doesn't reliably point at the same photo across loads.
- Decided (with Noel) to route by the underlying Unsplash photo ID instead (`/card/{id}`), with the code carried along only as a display label via a query param. Persisting the whole 25-card set as an alternative was raised and explicitly deferred — Noel noted it'd be good to add later alongside a "refresh cards" action, not built yet.

## Keypad/dispense structure
- Dispense was originally a standalone button below the keypad, shown only when a purchase handler existed (i.e., hidden on the home page). Noel asked for it to move into the keypad grid itself as a full-width third row, and to stay visible-but-disabled on the home page instead of being conditionally hidden.
- Hit a CSS specificity bug: `.key:hover` and `.key--active` were both single-class selectors, but `:hover` carries more effective specificity, so hovering a selected key silently dropped its accent fill back to the hover color. Fixed by switching hover/pressed states to a `filter: brightness()` darkening approach layered on top of whatever background a state class sets, instead of competing `background` declarations.

## Persistence
- Credits/purchased-cards persistence was decided early as localStorage-only (no backend), which held throughout. `/my-cards` reads a small shared helper (`src/lib/purchased-cards.ts`) on mount and reuses the existing `trading-card` component to render purchased items rather than building a separate display component.

## Storybook setup
- The package README's documented setup command (`npx sb init --type marko --builder webpack5`) no longer works — current Storybook CLI dropped "marko" from its built-in `--type` list.
- Found `@storybook/marko-vite` by digging into the package's own test fixtures (not its README, which only documents webpack5), and set it up manually so Storybook shares the app's Vite toolchain instead of introducing a separate webpack build alongside it.

## Storybook theme toolbar — renderer-agnostic over decorators
- Wanted a light/dark toolbar control in Storybook. `@storybook/marko`'s decorator plumbing is renderer-specific and its exact story-wrapping signature wasn't worth reverse-engineering.
- Used `globalTypes` (toolbar item) + a `loaders` hook in `preview.ts` that just sets `document.documentElement.dataset.theme = globals.theme` before each story renders. Loaders are a plain pre-render side-effect hook supported identically across every Storybook renderer, so it sidesteps Marko-specific decorator composition entirely.

## Shared theme CSS — two failed attempts before landing
- Extracted CSS variables into `src/styles/theme.css` so both the app and Storybook's preview could use the same tokens.
- First attempt: a `<link rel="stylesheet" href="../styles/theme.css">` in the layout's `<head>` — broke on nested routes (`/card/:id`) because the relative path resolves against the browser's current URL, not the source file location, and 404'd.
- Second attempt: moved the reference into a `<script> import "../styles/theme.css"; </script>` block inside the Marko layout component — broke immediately with a syntax error, because `import` is only valid at the root of a `.marko` file, not inside its compiled `<script>` block (which runs in a plain function scope, not a module).
- Landed on: duplicating the variables directly in the layout's own scoped `<style>` block for the live app, and keeping `theme.css` only for Storybook's `preview.ts` (a real JS/TS module context where `import` works as expected).
