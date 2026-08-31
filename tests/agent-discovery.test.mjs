import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const homepage = readFileSync(join(root, 'index.html'), 'utf8');

test('advertises the machine-readable guide from homepage metadata', () => {
  const head = homepage.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const agentLink = head.match(
    /<link\s+(?=[^>]*\brel=["']alternate["'])(?=[^>]*\btype=["']text\/markdown["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i,
  );

  assert.ok(agentLink, 'homepage head should advertise a Markdown agent guide');
  assert.equal(agentLink[1], '/AGENTS.md');

  const guide = readFileSync(join(root, agentLink[1].slice(1)), 'utf8');
  assert.match(guide, /^# AGENTS\.md\b/m);
});

test('puts a visible agent entrypoint before the first homepage section', () => {
  const body = homepage.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  const firstSectionIndex = body.search(/<section\b/i);
  const earlyBody = firstSectionIndex === -1 ? body : body.slice(0, firstSectionIndex);
  const entrypoint = earlyBody.match(
    /<aside\b(?=[^>]*\baria-label=["'][^"']*agent[^"']*["'])[^>]*>([\s\S]*?)<\/aside>/i,
  );

  assert.ok(entrypoint, 'an agent-labelled entrypoint should appear before the hero section');

  const agentLink = entrypoint[1].match(
    /<a\b(?=[^>]*\bhref=["']\/AGENTS\.md["'])(?=[^>]*\btype=["']text\/markdown["'])(?=[^>]*\baria-label=["']AI agents: start here["'])(?=[^>]*\btitle=["']Machine-readable guide["'])[^>]*>([\s\S]*?)<\/a>/i,
  );
  assert.ok(agentLink, 'the early entrypoint should link to the canonical Markdown guide');
  const visibleLabel = agentLink[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  assert.equal(visibleLabel, '⌁');
  assert.doesNotMatch(visibleLabel, /\b(?:AI|agents?)\b/i);
  assert.doesNotMatch(
    entrypoint[0],
    /\bclass=["'][^"']*\b(?:hidden|sr-only)\b[^"']*["']|\bstyle=["'][^"']*display\s*:\s*none/i,
  );
});

test('offers the agent guide as a quiet footer destination, not primary navigation', () => {
  const footer = homepage.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/i)?.[1] ?? '';
  const footerLinks = [...footer.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];
  const agentLink = footerLinks.find((match) => /\bhref=["']\/AGENTS\.md["']/i.test(match[1]));

  assert.ok(agentLink, 'footer should link to the canonical agent guide');
  assert.match(agentLink[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(), /^For agents\b/i);

  const primaryNav = homepage.match(/<nav\b[^>]*>([\s\S]*?)<\/nav>/i)?.[1] ?? '';
  assert.doesNotMatch(primaryNav, /<a\b[^>]*href=["']\/AGENTS\.md["']/i);
});

test('gives raw-source readers a non-visible agent trailhead', () => {
  const comments = [...homepage.matchAll(/<!--([\s\S]*?)-->/g)].map((match) => match[1]);
  const trailhead = comments
    .map((comment) => comment.match(/\/llms\.txt\b/)?.[0])
    .find(Boolean);

  assert.equal(trailhead, '/llms.txt');

  const body = homepage.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  assert.doesNotMatch(body, /<a\b[^>]*href=["'][^"']*llms\.txt/i);
});

test('lets an agent follow the compact trailhead to the canonical guide', () => {
  const trailheadPath = join(root, 'llms.txt');
  assert.ok(existsSync(trailheadPath), '/llms.txt should exist at the site root');

  const trailhead = readFileSync(trailheadPath, 'utf8');
  const guideUrl = trailhead.match(/https:\/\/antreas\.io\/AGENTS\.md\b/)?.[0];
  assert.equal(guideUrl, 'https://antreas.io/AGENTS.md');

  const guide = readFileSync(join(root, new URL(guideUrl).pathname.slice(1)), 'utf8');
  assert.match(guide, /^# AGENTS\.md\b/m);
});

test('makes the agent guide reachable through the crawler discovery chain', () => {
  const robots = readFileSync(join(root, 'robots.txt'), 'utf8');
  const sitemapUrl = robots.match(/^Sitemap:\s*(\S+)$/im)?.[1];

  assert.equal(sitemapUrl, 'https://antreas.io/sitemap.xml');

  const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
  assert.match(sitemap, /<loc>https:\/\/antreas\.io\/llms\.txt<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/antreas\.io\/AGENTS\.md<\/loc>/);
});
