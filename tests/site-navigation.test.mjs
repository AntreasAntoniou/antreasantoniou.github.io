import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const pages = [
  ['Home', readFileSync(new URL('index.html', root), 'utf8')],
  ['Blog', readFileSync(new URL('blog/index.html', root), 'utf8')],
  ['Writing', readFileSync(new URL('writing/index.html', root), 'utf8')],
];
const styles = readFileSync(new URL('styles.css', root), 'utf8');

const expectedDesktopLinks = [
  ['/daedalus/', 'DAEDALUS'],
  ['/#building', 'Work'],
  ['/#research', 'Research'],
  ['/#teaching', 'Teaching'],
  ['/writing/', 'Writing advice'],
  ['/blog', 'Blog'],
  ['/#contact', 'Contact'],
  ['/documents/AntreasAntoniouResume.pdf', 'CV'],
];

function mainNav(html) {
  return html.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0] ?? '';
}

function desktopLinks(nav) {
  const desktop = nav.match(/<div class="site-nav-links[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? '';
  return [...desktop.matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)]
    .map((match) => [match[1], match[2].trim()]);
}

test('uses one compact navigation and destination order across main site pages', () => {
  for (const [name, html] of pages) {
    const nav = mainNav(html);
    assert.ok(nav, `${name} is missing the canonical navigation`);
    assert.deepEqual(desktopLinks(nav), expectedDesktopLinks, `${name} has a divergent desktop menu`);
    assert.match(nav, /id="mobile-menu"/);
    assert.match(nav, /aria-controls="mobile-menu"/);
  }
});

test('defines the writing page’s compact Inter navigation treatment globally', () => {
  const rule = styles.match(/\.site-nav-links\s*\{([\s\S]*?)\}/)?.[1] ?? '';
  assert.match(rule, /font-family:\s*"Inter",\s*sans-serif/);
  assert.match(rule, /font-size:\s*0\.92rem/);
  assert.match(rule, /font-weight:\s*600/);
  assert.match(rule, /gap:\s*1\.15rem/);
});
