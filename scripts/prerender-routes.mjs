#!/usr/bin/env node
/*
 * Build-time prerenderer for the Claritas Studios Elm SPA.
 *
 * For each public route, write a route-specific `index.html` into `dist/`
 * that contains crawlable content (title, meta description, canonical,
 * H1, navigation links, route-specific copy) BEFORE the Elm bundle runs.
 *
 * The Elm SPA still mounts on top of `<div id="elm-root">` after JS loads,
 * so end-user behavior is unchanged. But crawlers and AI retrievers that
 * read raw HTML now see meaningful content for each route.
 *
 * See docs/SEO_PRERENDERING.md for the design rationale.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ROUTES, NAV_LINKS } from './seo-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');
const baseHtmlPath = resolve(distDir, 'index.html');

if (!existsSync(baseHtmlPath)) {
  console.error(`[prerender] Cannot find ${baseHtmlPath}. Run \`vite build\` first.`);
  process.exit(1);
}

const baseHtml = readFileSync(baseHtmlPath, 'utf8');

function escape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderNav() {
  const items = NAV_LINKS
    .map((l) => `      <li><a href="${escape(l.href)}">${escape(l.label)}</a></li>`)
    .join('\n');
  return `  <nav aria-label="Primary">\n    <ul>\n${items}\n    </ul>\n  </nav>`;
}

function renderBodyContent(route) {
  const sections = (route.sections || [])
    .map((s) => {
      const heading = s.heading ? `    <h2>${escape(s.heading)}</h2>\n` : '';
      const paragraphs = (s.paragraphs || [])
        .map((p) => `    <p>${escape(p)}</p>`)
        .join('\n');
      const links = (s.links || []).length
        ? `    <ul>\n${s.links.map((l) => `      <li><a href="${escape(l.href)}">${escape(l.label)}</a></li>`).join('\n')}\n    </ul>`
        : '';
      return `  <section>\n${heading}${paragraphs}${links ? '\n' + links : ''}\n  </section>`;
    })
    .join('\n');

  return [
    `<noscript-seo data-route="${escape(route.path)}">`,
    `  <header>`,
    `    <a href="/">Claritas Studios</a>`,
    `  </header>`,
    renderNav(),
    `  <main>`,
    `    <h1>${escape(route.h1)}</h1>`,
    `    <p>${escape(route.intro)}</p>`,
    sections,
    `  </main>`,
    `  <footer>`,
    `    <p>Claritas Studios &mdash; Catholic animations and resources for children.</p>`,
    `    <ul>`,
    `      <li><a href="/give/">Donate</a></li>`,
    `      <li><a href="/contact/">Contact</a></li>`,
    `      <li><a href="/about/privacy-policy">Privacy Policy</a></li>`,
    `      <li><a href="/about/terms-and-conditions">Terms &amp; Conditions</a></li>`,
    `    </ul>`,
    `  </footer>`,
    `</noscript-seo>`,
  ].join('\n');
}

function renderRouteHtml(route) {
  let html = baseHtml;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escape(route.title)}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?>/i,
    `<meta name="description" content="${escape(route.description)}">`,
  );

  // Replace og:title
  html = html.replace(
    /<meta\s+property="og:title"[\s\S]*?>/i,
    `<meta property="og:title" content="${escape(route.ogTitle)}">`,
  );

  // Replace og:description
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?>/i,
    `<meta property="og:description" content="${escape(route.ogDescription)}">`,
  );

  // Replace og:url with the route's own URL (not the homepage)
  html = html.replace(
    /<meta\s+property="og:url"[\s\S]*?>/i,
    `<meta property="og:url" content="${escape(route.ogUrl)}">`,
  );

  // Replace og:image and twitter:image
  html = html.replace(
    /<meta\s+property="og:image"[\s\S]*?>/i,
    `<meta property="og:image" content="${escape(route.ogImage)}">`,
  );
  html = html.replace(
    /<meta\s+property="twitter:image"[\s\S]*?>/i,
    `<meta property="twitter:image" content="${escape(route.twitterImage)}">`,
  );

  // Add self-referential canonical link, twitter:title, and twitter:description.
  // (insert just before </head>)
  const headExtras = [
    `  <link rel="canonical" href="${escape(route.canonical)}">`,
    `  <meta property="twitter:title" content="${escape(route.twitterTitle)}">`,
    `  <meta property="twitter:description" content="${escape(route.twitterDescription)}">`,
  ].join('\n');
  html = html.replace(/<\/head>/i, `${headExtras}\n</head>`);

  // Inject crawlable content immediately inside #elm-root.
  // Elm's Browser.application replaces the mount node when it boots, so
  // this content is invisible to JS-enabled visitors but visible to crawlers
  // and to anyone fetching raw HTML (curl, AI retrievers, link previewers).
  const seoBody = renderBodyContent(route);
  html = html.replace(
    /<div id="elm-root"><\/div>/,
    `<div id="elm-root">\n${seoBody}\n</div>`,
  );

  return html;
}

function writeRoute(route) {
  const outPath = route.path === '/'
    ? resolve(distDir, 'index.html')
    : resolve(distDir, route.path.replace(/^\/+|\/+$/g, ''), 'index.html');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, renderRouteHtml(route), 'utf8');
  return outPath;
}

const written = ROUTES.map(writeRoute);
console.log(`[prerender] Wrote ${written.length} route files:`);
for (const p of written) {
  console.log(`  - ${p.replace(distDir, 'dist')}`);
}
