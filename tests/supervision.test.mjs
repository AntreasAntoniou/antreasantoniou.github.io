import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { matchesProject, normalize } from '../supervision/supervision.mjs';

const featured = JSON.parse(readFileSync(new URL('../supervision/projects.json', import.meta.url)));
const catalogue = JSON.parse(readFileSync(new URL('../supervision/catalogue.json', import.meta.url)));
const data = [...featured, ...catalogue];
const html = readFileSync(new URL('../supervision/index.html', import.meta.url), 'utf8');
const home = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const writing = readFileSync(new URL('../writing/index.html', import.meta.url), 'utf8');
const js = readFileSync(new URL('../supervision/supervision.mjs', import.meta.url), 'utf8');
const css = readFileSync(new URL('../supervision/supervision.css', import.meta.url), 'utf8');

test('every project has distinct, substantive mechanism, attribution and status', () => {
  assert.equal(featured.length, 14);
  assert.ok(catalogue.length >= 30, 'the broader recovered portfolio must be present');
  assert.equal(new Set(data.map(p => p.id)).size, data.length);
  assert.equal(data.filter(p => p.period === 'postdoc').length, 4);
  for (const project of data) {
    for (const field of ['question', 'mechanism', 'contribution', 'outcome']) assert.ok(project[field].length > 60, `${project.id}: ${field}`);
    assert.ok(project.discuss.length >= 1);
    assert.ok(project.tags.length >= 2);
    assert.match(html, new RegExp(`id="${project.id}"`));
  }
});

test('catalogue depth and mentorship are independent of career stage', () => {
  for (const project of catalogue) assert.equal(project.entryType, 'research-note');
  assert.match(html, /id="project-depth"/);
  const project = {text:'distillation', period:'phd', mentorship:'taught', depth:'research-note'};
  assert.equal(matchesProject(project, {mentorship:'taught',depth:'research-note'}), true);
  assert.equal(matchesProject(project, {mentorship:'phd'}), false);
  assert.equal(matchesProject(project, {mentorship:'postdoc'}), false);
  assert.equal(matchesProject(project, {mentorship:'taught',depth:'case-study'}), false);
});

test('mentorship filters match the mentee type without borrowing career chronology', () => {
  const projects = [
    {text:'learning', period:'phd', mentorship:'taught'},
    {text:'learning', period:'postdoc', mentorship:'phd'},
    {text:'learning', period:'postdoc', mentorship:'postdoc'},
  ];
  for (const mentorship of ['taught', 'phd', 'postdoc']) {
    assert.deepEqual(projects.filter(p => matchesProject(p, {mentorship})).map(p => p.mentorship), [mentorship]);
  }
  assert.equal(projects.filter(p => matchesProject(p)).length, 3);
});

test('the entire catalogue is available as static accessible HTML', () => {
  assert.doesNotMatch(html, /[ \t]+$/m, 'generated HTML must not contain trailing whitespace');
  assert.equal((html.match(/data-project data-mentorship/g) || []).length, data.length);
  assert.equal((html.match(/<details>/g) || []).length, data.length);
  assert.match(html, /<noscript>/);
  assert.match(html, /role="status" aria-live="polite"/);
  assert.match(html, /id="project-controls" hidden/);
  assert.match(html, /<label for="project-search">/);
  assert.match(css, /\[hidden\].*display: none !important/);
});

test('privacy boundaries exclude student identities and private source infrastructure', () => {
  const publicContent = JSON.stringify(data) + html;
  for (const pattern of [/docs\.google\.com/i, /drive\.google\.com/i, /\/Users\//i, /archivum:\/\//i, /google-docs\//i, /G0\d{2}/, /@gmail\.com/i, /\.private\//i]) assert.doesNotMatch(publicContent, pattern);
});

test('phase boundaries and research outcomes are preserved', () => {
  assert.match(data.find(p => p.id === 'damagegan').outcome, /did not establish/);
  assert.match(data.find(p => p.id === 'dynamic-curriculum').outcome, /mixed findings/);
  assert.match(data.find(p => p.id === 'pneumonia-multitask').outcome, /manuscript draft/);
  assert.match(data.find(p => p.id === 'relational-image-translation').contribution, /implemented and supplied/);
});

test('search combines all terms with mentorship and theme filters', () => {
  const project = { text: 'CLIP StyleGAN2 low-data café', mentorship: 'taught', theme: 'Generative models' };
  assert.equal(matchesProject(project, { query: 'clip STYLEgan2' }), true);
  assert.equal(matchesProject(project, { query: 'clip pytorch' }), false);
  assert.equal(matchesProject(project, { query: 'cafe', mentorship: 'phd' }), false);
  assert.equal(matchesProject(project, { query: 'café', mentorship: 'taught', theme: 'Generative models' }), true);
  assert.equal(matchesProject(project, { theme: 'Control & evolution' }), false);
  assert.equal(matchesProject(project, { query: '   ' }), true);
  assert.equal(normalize('  Générative  '), 'generative');
});

test('the page follows the existing navigation rather than adding another menu item', () => {
  const links = page => [...page.match(/<nav class="nav"[\s\S]*?<\/nav>/)[0].matchAll(/href="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(links(html), links(writing));
  assert.match(home, /href="\/supervision\/"/);
  assert.doesNotMatch(home.match(/<nav class="nav"[\s\S]*?<\/nav>/)[0], /supervision/);
});

test('permalinks, printing and filters remain local and reversible', () => {
  assert.match(js, /window.addEventListener\('hashchange', openHash\)/);
  assert.match(js, /window.addEventListener\('afterprint'/);
  assert.match(js, /beforePrint\?\.forEach/);
  assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|sendBeacon/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media print/);
  assert.match(js, /print.hidden = count === 0/);
  assert.match(js, /expand.hidden = visible.length === 0/);
  assert.match(css, /max-width: 900px/);
});
