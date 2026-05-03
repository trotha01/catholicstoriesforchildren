#!/usr/bin/env node
/*
 * SEO smoke test for prerendered routes.
 *
 * Reads every route emitted by `scripts/prerender-routes.mjs` from `dist/`
 * and asserts:
 *   - one <title> tag with non-empty text
 *   - one meta description with non-empty content
 *   - exactly one canonical link
 *   - at least one H1
 *   - at least one internal link in raw HTML
 *   - title and canonical agree with the route definition
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

const failures = [];

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
  } else if (titleMatch[1].trim() !== route.title) {
    failures.push(`${display}: <title> "${titleMatch[1].trim()}" does not match route.title "${route.title}"`);
  }
  if (countMatches(/<title>/gi, html) !== 1) {
    failures.push(`${display}: expected exactly one <title>`);
  }

  // meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
  if (!descMatch || !descMatch[1].trim()) {
    failures.push(`${display}: missing meta description`);
  }

  // canonical
  const canonicalMatches = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/gi) || [];
  if (canonicalMatches.length !== 1) {
    failures.push(`${display}: expected exactly one canonical link, got ${canonicalMatches.length}`);
  } else {
    const expected = `${SITE_ORIGIN}${route.path}`;
    const actual = canonicalMatches[0].match(/href="([^"]+)"/)[1];
    if (actual !== expected) {
      failures.push(`${display}: canonical "${actual}" does not match expected "${expected}"`);
    }
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
}

if (failures.length) {
  console.error(`[verify-seo] ${failures.length} failure(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`[verify-seo] OK — ${ROUTES.length} routes pass all checks.`);
