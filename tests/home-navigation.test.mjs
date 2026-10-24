import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const nav = home.match(/<!-- Navigation -->\s*<nav class="nav">([\s\S]*?)<\/nav>/)?.[1] ?? '';

test('keeps the homepage navigation focused on work, research, teaching, the agent toolkit, and writing', () => {
  for (const [href, label] of [
    ['/#building', 'Work'],
    ['/#research', 'Research'],
    ['/#teaching', 'Teaching'],
    ['/skills/', 'Agent Toolkit'],
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
  assert.doesNotMatch(nav, /href="\/daedalus\/"/);
});

test('makes DAEDALUS prominent inside current work without crowding the hero', () => {
  assert.doesNotMatch(home, /hero-daedalus/);
  assert.match(home, /<section id="building"/);
  assert.match(home, /class="programme-feature"/);
  assert.match(home, /DAEDALUS is the research programme behind that thesis/);
  assert.match(home, /Seven capabilities\. One programme\./);
  assert.match(home, /href="\/daedalus\/" class="btn-primary btn-sm programme-feature__cta"/);
  assert.match(home, /Explore DAEDALUS/);
  assert.ok(
    home.indexOf('id="building"') < home.indexOf('class="programme-feature"'),
    'The detailed DAEDALUS feature should live inside the current-work section',
  );
});

test('keeps the homepage and share metadata focused on the research agenda', () => {
  assert.doesNotMatch(home, /axiotic/i);
  assert.match(home, /My research agenda/);
  assert.match(home, /evolutionary optimisation/);
  const schema = JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.jobTitle, 'AI Researcher and Engineer');
  assert.equal(schema.worksFor, undefined);
});

test('retains the about, publications, and experience content sections', () => {
  assert.match(home, /<section id="about"/);
  assert.match(home, /<section id="publications"/);
  assert.match(home, /<section id="experience"/);
});
