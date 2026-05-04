# Build-time prerendering for crawlable HTML

## Problem

`claritasstudios.com` is an Elm SPA bundled with Vite. Before this change,
every public route returned the same shell `index.html` whose body contained
only `<div id="elm-root"></div>` plus the bundle. Crawlers and AI retrievers
that read raw HTML — Google's initial pass, Bing, Perplexity, ChatGPT
browsing, Claude browsing, Gemini, and link-preview bots — saw no headings,
no copy, no internal links, and no per-route metadata.

The SEO/GEO audit (`/home/user/workspace/claritasstudios_seo_geo_findings.md`)
flagged this as the highest-priority issue and recommended choosing one of
SSG, SSR, build-time prerendering, or a prerender bridge.

## Decision: build-time prerendering

We chose **build-time prerendering** — least disruptive of the four options
for this codebase.

| Option | Why not |
|---|---|
| Full SSG (rewrite in Next.js / Astro / Elm Pages) | Touches the entire app; the whole product is Elm; weeks of work. |
| SSR | Requires a Node server in front of static hosting (Netlify); breaks the current static deploy. |
| Prerender bridge (Prerender.io / Rendertron) | Adds a runtime dependency, ongoing cost, and another point of failure. Crawler-only — humans still get the slow SPA shell. |
| **Build-time prerender (chosen)** | Pure additive Node script; runs after `vite build`; outputs one static `index.html` per public route; SPA still hydrates for users; no infra changes. |

## How it works

1. `scripts/seo-routes.mjs` is the single source of truth for route
   metadata (path, `<title>`, description, canonical, H1, intro copy,
   per-section paragraphs and links).
2. `scripts/prerender-routes.mjs` runs after `vite build`. For each route
   it:
   - reads `dist/index.html` (the SPA shell Vite produced),
   - rewrites `<title>`, meta description, OG tags,
   - inserts `<link rel="canonical">` and `twitter:title` / `twitter:description`,
   - injects route-specific H1, intro paragraph, primary navigation, and
     deep links inside the `<div id="elm-root">` mount node,
   - writes `dist/<route>/index.html`.
3. `scripts/verify-seo.mjs` reads every emitted file and asserts that each
   has exactly one `<title>`, one canonical, at least one H1, a non-empty
   meta description, and at least one internal link. Run with
   `npm run verify:seo`. Exits non-zero on failure so it can run in CI.
4. The Elm bundle still loads for end users. When `Elm.Main.init` mounts on
   `#elm-root` it replaces the prerendered children with the live Elm view —
   so users see the same interactive experience as before. Crawlers and
   `curl` see the prerendered HTML.

## Routes covered

Required (per issue #34): `/`, `/animations/`, `/team/`, `/resources/`,
`/give/`, `/contact/`, `/saints/`, `/prayers/`, `/feastdayactivities/`.

Animation series (discovered in `src/Page/Animations/Productions.elm`):
`/animations/hailmary/`, `/animations/prayertimewithangels/`,
`/animations/daisyandsheep/`, `/animations/songsofthesaints/`,
`/animations/gigglesandgraceshow/`, `/animations/prayingwiththesaints/`.

Individual episode pages and saint detail pages remain SPA-only. The
saint detail pages are deliberately `noindex` (see `index.html`) and
episode URLs change frequently as new content lands. A follow-up issue
can drive these into the prerender pipeline once the metadata schema
stabilizes.

## Adding a new public route

1. Add an entry to `ROUTES` in `scripts/seo-routes.mjs`.
2. Run `npm run build`. The new file appears at `dist/<path>/index.html`.
3. Run `npm run verify:seo` to confirm.
4. Add the URL to `public/static/sitemap.xml`.

## Verification

```bash
npm run build           # vite build + prerender
npm run verify:seo      # SEO smoke test on dist/

# Manual spot check:
cd dist && python3 -m http.server 8765 &
curl -s http://localhost:8765/animations/ | grep -E '<title>|<h1>|name="description"|canonical'
```
