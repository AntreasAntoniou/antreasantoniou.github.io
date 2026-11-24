import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const nav = home.match(/<!-- Navigation -->\s*<nav class="nav">([\s\S]*?)<\/nav>/)?.[1] ?? '';

test('exposes primary sections and full menu options including demos and leadership', () => {
  for (const [href, label] of [
    ['/#building', 'Work'],
    ['/#research', 'Research'],
    ['/#demos', 'Demos'],
    ['/#outreach', 'Leadership'],
    ['/#teaching', 'Teaching'],
    ['/blog', 'Blog'],
    ['/#contact', 'Contact'],
  ]) {
    assert.ok(
      (nav.match(new RegExp(`href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>${label}<\\/a>`, 'g')) ?? []).length >= 2,
      `${label} should appear in desktop and mobile navigation`,
    );
  }

  for (const [href, label] of [
    ['/#about', 'About'],
    ['/#publications', 'Publications'],
    ['/#experience', 'Experience'],
    ['/tali/', 'TALI Visualizer'],
    ['/daedalus/', 'DAEDALUS'],
    ['/supervision/', 'Supervision'],
    ['/skills/', 'Agent Toolkit'],
    ['/writing/', 'Writing advice'],
  ]) {
    assert.ok(
      nav.includes(`href="${href}"`) && nav.includes(label),
      `${label} (${href}) should be reachable from the navigation menu`,
    );
  }

  assert.match(nav, /<details class="site-nav-dropdown">/);
});

test('surfaces the TALI Visualizer at a glance near the top of the homepage', () => {
  const hero = home.match(/<!-- Hero Section -->([\s\S]*?)<!-- About Section/)?.[1] ?? '';
  assert.match(hero, /class="hero-update"/);
  assert.match(hero, /TALI Visualizer/);
  assert.match(hero, /href="\/tali\/"/);
  assert.match(hero, /href="\/#demos"/);
  assert.match(hero, /hero-update__badge[^>]*>New<\/span>/);
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
