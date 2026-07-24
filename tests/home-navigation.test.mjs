import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const nav = home.match(/<!-- Navigation -->\s*<nav class="nav">([\s\S]*?)<\/nav>/)?.[1] ?? '';

test('keeps the homepage navigation focused on work, research, teaching, and writing', () => {
  for (const [href, label] of [
    ['/daedalus/', 'DAEDALUS'],
    ['/#building', 'Work'],
    ['/#research', 'Research'],
    ['/#teaching', 'Teaching'],
    ['/writing/', 'Writing advice'],
    ['/blog', 'Blog'],
    ['/#contact', 'Contact'],
  ]) {
    assert.equal(
      (nav.match(new RegExp(`href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>${label}<\\/a>`, 'g')) ?? []).length,
      2,
      `${label} should appear once in desktop navigation and once in mobile navigation`,
    );
  }

  assert.doesNotMatch(nav, /href="#about"[^>]*>About<\/a>/);
  assert.doesNotMatch(nav, /href="#publications"[^>]*>Papers<\/a>/);
  assert.doesNotMatch(nav, /href="#experience"[^>]*>Experience<\/a>/);
});

test('puts the DAEDALUS research programme in the homepage hero', () => {
  assert.match(home, /<a href="\/daedalus\/" class="hero-daedalus"/);
  assert.match(home, /Flagship research programme/);
  assert.match(home, /Persistent memory · world models · temporal learning · adaptive compute/);
  assert.ok(
    home.indexOf('class="hero-daedalus"') < home.indexOf('id="building"'),
    'DAEDALUS should be visible before the current-work section',
  );
});

test('retains the about, publications, and experience content sections', () => {
  assert.match(home, /<section id="about"/);
  assert.match(home, /<section id="publications"/);
  assert.match(home, /<section id="experience"/);
});
