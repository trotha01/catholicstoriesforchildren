#!/usr/bin/env node
/*
 * SEO smoke test for prerendered routes.
 *
 * Reads every route emitted by `scripts/prerender-routes.mjs` from `dist/`
 * and asserts the acceptance criteria for issue #35:
 *   - one <title> tag whose text matches `route.title`
 *   - one meta description matching `route.description`
 *   - exactly one self-referential canonical link
 *   - og:title, og:description, og:url, og:image present and correct
 *   - twitter:card, twitter:title, twitter:description, twitter:image present
 *   - og:url is the route's own URL, never the homepage on inner pages
 *   - at least one H1
 *   - at least one internal link in raw HTML
 *
 * Cross-route checks:
 *   - every public route has a unique <title>
 *   - every public route has a unique meta description
 *
 * Exits non-zero on any failure so this can run in CI.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ROUTES, SITE_ORIGIN } from './seo-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

function fileFor(route) {
  return route.path === '/'
    ? resolve(distDir, 'index.html')
    : resolve(distDir, route.path.replace(/^\/+|\/+$/g, ''), 'index.html');
}

function countMatches(re, html) {
  return (html.match(re) || []).length;
}

function metaContent(html, attr, name) {
  // Match `<meta {attr}="{name}" ... content="...">` regardless of attribute order.
  const re = new RegExp(
    `<meta\\s+(?=[^>]*\\b${attr}="${name}")[^>]*\\bcontent="([^"]*)"[^>]*>`,
    'i',
  );
  const m = html.match(re);
  return m ? m[1] : null;
}

function metaTagCount(html, attr, name) {
  const re = new RegExp(
    `<meta\\s+(?=[^>]*\\b${attr}="${name}")[^>]*>`,
    'gi',
  );
  return (html.match(re) || []).length;
}

const failures = [];
const titlesSeen = new Map();
const descriptionsSeen = new Map();

for (const route of ROUTES) {
  const file = fileFor(route);
  const display = route.path;

  if (!existsSync(file)) {
    failures.push(`${display}: missing prerendered file ${file}`);
    continue;
  }

  const html = readFileSync(file, 'utf8');

  // <title>
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    failures.push(`${display}: missing <title>`);
  } else {
    const titleText = titleMatch[1].trim();
    if (titleText !== route.title) {
      failures.push(`${display}: <title> "${titleText}" does not match route.title "${route.title}"`);
    }
    if (titlesSeen.has(titleText)) {
      failures.push(`${display}: duplicate <title> "${titleText}" — also used by ${titlesSeen.get(titleText)}`);
    } else {
      titlesSeen.set(titleText, display);
    }
  }
  if (countMatches(/<title>/gi, html) !== 1) {
    failures.push(`${display}: expected exactly one <title>`);
  }

  // meta description
  const desc = metaContent(html, 'name', 'description');
  if (!desc || !desc.trim()) {
    failures.push(`${display}: missing meta description`);
  } else {
    if (desc !== route.description) {
      failures.push(`${display}: meta description does not match route.description`);
    }
    if (descriptionsSeen.has(desc)) {
      failures.push(`${display}: duplicate meta description — also used by ${descriptionsSeen.get(desc)}`);
    } else {
      descriptionsSeen.set(desc, display);
    }
  }
  if (metaTagCount(html, 'name', 'description') !== 1) {
    failures.push(`${display}: expected exactly one meta description`);
  }

  // canonical (self-referential, exactly one)
  const canonicalMatches = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/gi) || [];
  if (canonicalMatches.length !== 1) {
    failures.push(`${display}: expected exactly one canonical link, got ${canonicalMatches.length}`);
  } else {
    const expected = `${SITE_ORIGIN}${route.path}`;
    const actual = canonicalMatches[0].match(/href="([^"]+)"/)[1];
    if (actual !== expected) {
      failures.push(`${display}: canonical "${actual}" does not match expected "${expected}"`);
    }
    if (actual !== route.canonical) {
      failures.push(`${display}: canonical "${actual}" does not match route.canonical "${route.canonical}"`);
    }
  }

  // Open Graph metadata
  const ogTitle = metaContent(html, 'property', 'og:title');
  if (ogTitle !== route.ogTitle) {
    failures.push(`${display}: og:title "${ogTitle}" does not match route.ogTitle "${route.ogTitle}"`);
  }
  const ogDescription = metaContent(html, 'property', 'og:description');
  if (ogDescription !== route.ogDescription) {
    failures.push(`${display}: og:description does not match route.ogDescription`);
  }
  const ogUrl = metaContent(html, 'property', 'og:url');
  if (ogUrl !== route.ogUrl) {
    failures.push(`${display}: og:url "${ogUrl}" does not match route.ogUrl "${route.ogUrl}"`);
  }
  if (route.path !== '/' && ogUrl === SITE_ORIGIN + '/') {
    failures.push(`${display}: og:url points to homepage instead of the route URL`);
  }
  const ogImage = metaContent(html, 'property', 'og:image');
  if (!ogImage) {
    failures.push(`${display}: missing og:image`);
  } else if (ogImage !== route.ogImage) {
    failures.push(`${display}: og:image "${ogImage}" does not match route.ogImage "${route.ogImage}"`);
  }

  // Twitter card metadata
  const twitterCard = metaContent(html, 'property', 'twitter:card')
    || metaContent(html, 'name', 'twitter:card');
  if (!twitterCard) {
    failures.push(`${display}: missing twitter:card`);
  }
  const twitterTitle = metaContent(html, 'property', 'twitter:title')
    || metaContent(html, 'name', 'twitter:title');
  if (twitterTitle !== route.twitterTitle) {
    failures.push(`${display}: twitter:title "${twitterTitle}" does not match route.twitterTitle "${route.twitterTitle}"`);
  }
  const twitterDescription = metaContent(html, 'property', 'twitter:description')
    || metaContent(html, 'name', 'twitter:description');
  if (twitterDescription !== route.twitterDescription) {
    failures.push(`${display}: twitter:description does not match route.twitterDescription`);
  }
  const twitterImage = metaContent(html, 'property', 'twitter:image')
    || metaContent(html, 'name', 'twitter:image');
  if (!twitterImage) {
    failures.push(`${display}: missing twitter:image`);
  } else if (twitterImage !== route.twitterImage) {
    failures.push(`${display}: twitter:image "${twitterImage}" does not match route.twitterImage "${route.twitterImage}"`);
  }

  // H1
  if (countMatches(/<h1[\s>]/gi, html) < 1) {
    failures.push(`${display}: missing <h1>`);
  }

  // Internal link
  if (!/<a\s+[^>]*href="\/[^"]*"/i.test(html)) {
    failures.push(`${display}: no internal links in raw HTML`);
  }

  // Meaningful text: presence of intro string
  if (!html.includes(route.intro)) {
    failures.push(`${display}: route intro text not found in raw HTML`);
  }

  // JSON-LD
  if (route.jsonLd && route.jsonLd.length > 0) {
    const jsonLdMatches = html.match(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi) || [];
    if (jsonLdMatches.length === 0) {
      failures.push(`${display}: no <script type="application/ld+json"> found`);
    } else if (jsonLdMatches.length !== route.jsonLd.length) {
      failures.push(`${display}: expected ${route.jsonLd.length} JSON-LD block(s), found ${jsonLdMatches.length}`);
    } else {
      for (let i = 0; i < jsonLdMatches.length; i++) {
        const jsonText = jsonLdMatches[i]
          .replace(/<script[^>]*>/i, '')
          .replace(/<\/script>/i, '')
          .trim();
        let parsed;
        try {
          parsed = JSON.parse(jsonText);
        } catch (e) {
          failures.push(`${display}: JSON-LD block ${i + 1} is not valid JSON: ${e.message}`);
          continue;
        }
        const expectedTypes = [].concat(route.jsonLd[i]['@type']);
        const actualTypes = [].concat(parsed['@type'] || []);
        for (const t of expectedTypes) {
          if (!actualTypes.includes(t)) {
            failures.push(`${display}: JSON-LD block ${i + 1} missing @type "${t}" (found: ${actualTypes.join(', ') || 'none'})`);
          }
        }
        // /give/ second block must include taxID
        if (route.path === '/give/' && i === 1 && !parsed.taxID) {
          failures.push(`${display}: JSON-LD block 2 (Organization) missing taxID`);
        }
        // Animation series TVSeries block must include startDate
        if (parsed['@type'] === 'TVSeries' && !parsed.startDate) {
          failures.push(`${display}: JSON-LD TVSeries block missing startDate`);
        }
        // BreadcrumbList must have at least 2 items
        if (parsed['@type'] === 'BreadcrumbList') {
          const items = parsed.itemListElement || [];
          if (items.length < 2) {
            failures.push(`${display}: JSON-LD BreadcrumbList has fewer than 2 items`);
          }
        }
      }
    }
  }
}

if (failures.length) {
  console.error(`[verify-seo] ${failures.length} failure(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`[verify-seo] OK — ${ROUTES.length} routes pass all checks (titles, descriptions, canonicals, OG, Twitter, JSON-LD).`);
