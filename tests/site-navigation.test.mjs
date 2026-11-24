import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const pages = [
  ['Home', readFileSync(new URL('index.html', root), 'utf8')],
  ['Blog', readFileSync(new URL('blog/index.html', root), 'utf8')],
  ['Writing', readFileSync(new URL('writing/index.html', root), 'utf8')],
  ['Agent Toolkit', readFileSync(new URL('skills/index.html', root), 'utf8')],
];
const styles = readFileSync(new URL('styles.css', root), 'utf8');

const expectedTopBarLinks = [
  ['/#building', 'Work'],
  ['/#research', 'Research'],
  ['/#demos', 'Demos'],
  ['/#outreach', 'Leadership'],
  ['/#teaching', 'Teaching'],
  ['/blog', 'Blog'],
  ['/#contact', 'Contact'],
  ['/cv/', 'Resume'],
];

const expectedMenuLinks = [
  ['/#about', 'About'],
  ['/#building', 'Work'],
  ['/#research', 'Research'],
  ['/#publications', 'Publications'],
  ['/#teaching', 'Teaching'],
  ['/#experience', 'Experience'],
  ['/#outreach', 'Leadership'],
  ['/#demos', 'Demos'],
  ['/#contact', 'Contact'],
  ['/tali/', 'TALI Visualizer'],
  ['/daedalus/', 'DAEDALUS'],
  ['/supervision/', 'Supervision'],
  ['/skills/', 'Agent Toolkit'],
  ['/writing/', 'Writing advice'],
  ['/blog', 'Blog'],
  ['/cv/', 'Resume'],
];

function mainNav(html) {
  return html.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0] ?? '';
}

function desktopTopLinks(nav) {
  const desktop = nav.match(/<div class="site-nav-links[^>]*>([\s\S]*?)<\/div>\s*(?:<!-- Mobile menu button -->\s*)?<div class="flex items-center gap-3 md:hidden">/)?.[1] ?? '';
  const withoutDropdown = desktop.replace(/<details class="site-nav-dropdown">[\s\S]*?<\/details>/, '');
  return [...withoutDropdown.matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)]
    .map((match) => [match[1], match[2].trim()]);
}

function dropdownLinks(nav) {
  const panel = nav.match(/<details class="site-nav-dropdown">[\s\S]*?<div class="site-nav-dropdown__panel">([\s\S]*?)<\/details>/)?.[1] ?? '';
  return [...panel.matchAll(/<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map((match) => [match[1], match[2].replace(/<span[^>]*>.*?<\/span>/g, '').replace(/<[^>]+>/g, '').trim()]);
}

test('uses one compact navigation and full menu across main site pages', () => {
  for (const [name, html] of pages) {
    const nav = mainNav(html);
    assert.ok(nav, `${name} is missing the canonical navigation`);
    assert.deepEqual(desktopTopLinks(nav), expectedTopBarLinks, `${name} has a divergent top bar`);
    assert.deepEqual(dropdownLinks(nav), expectedMenuLinks, `${name} has a divergent full menu dropdown`);
    assert.match(nav, /id="mobile-menu"/);
    assert.match(nav, /aria-controls="mobile-menu"/);
    assert.match(nav, /href="\/cv\/" class="block[^"]*">Resume<\/a>/);
  }
});

test('defines the writing page’s compact Inter navigation treatment globally', () => {
  const rule = styles.match(/\.site-nav-links\s*\{([\s\S]*?)\}/)?.[1] ?? '';
  assert.match(rule, /font-family:\s*"Inter",\s*sans-serif/);
  assert.match(rule, /font-size:\s*0\.92rem/);
  assert.match(rule, /font-weight:\s*600/);
  assert.match(rule, /gap:\s*1\.15rem/);
});
