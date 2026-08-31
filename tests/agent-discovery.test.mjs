import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const homepage = readFileSync(join(root, 'index.html'), 'utf8');

test('lets agents discover the guide without adding it to the visible homepage', () => {
  const head = homepage.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const agentLink = head.match(
    /<link\s+(?=[^>]*\brel=["']alternate["'])(?=[^>]*\btype=["']text\/markdown["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i,
  );

  assert.ok(agentLink, 'homepage head should advertise a Markdown agent guide');
  assert.equal(agentLink[1], '/AGENTS.md');

  const guide = readFileSync(join(root, agentLink[1].slice(1)), 'utf8');
  assert.match(guide, /^# AGENTS\.md\b/m);

  const body = homepage.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  assert.doesNotMatch(body, /<a\b[^>]*href=["'][^"']*AGENTS\.md/i);
});

test('makes the agent guide reachable through the crawler discovery chain', () => {
  const robots = readFileSync(join(root, 'robots.txt'), 'utf8');
  const sitemapUrl = robots.match(/^Sitemap:\s*(\S+)$/im)?.[1];

  assert.equal(sitemapUrl, 'https://antreas.io/sitemap.xml');

  const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
  assert.match(sitemap, /<loc>https:\/\/antreas\.io\/AGENTS\.md<\/loc>/);
});
