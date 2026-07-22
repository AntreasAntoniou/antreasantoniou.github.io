import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const blogIndex = readFileSync(new URL('blog/index.html', root), 'utf8');
const daedalus = readFileSync(new URL('daedalus/index.html', root), 'utf8');

const posts = [
  ['distilled-micro-models', 'Aircraft Carriers and Fishing Boats'],
  ['fortress-mode', 'Fortress Mode'],
  ['ai-memory-and-cognition', "If You Don’t Use It, You Lose It"],
  ['distillation', 'Distillation: Teaching Small Models Big Tricks'],
  ['ai-education', 'The Gamification Hypothesis'],
  ['building-jarvis', 'Building Jarvis'],
  ['cheap-then-clean', 'The Cheap-Then-Clean Architecture'],
  ['attention-learns-its-wiring', 'Attention Learns Its Own Wiring'],
  ['failing-optimally', 'Failing Optimally'],
  ['embodied-ai', 'Embodied AI: Fluffy Balls That Float'],
];

function readHtmlTree(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    if (entry.isDirectory()) return readHtmlTree(child);
    return entry.name.endsWith('.html') ? [readFileSync(child, 'utf8')] : [];
  });
}

test('uses the selected evolutionary scaling lines in the requested order', () => {
  const first = 'Monkey brains didn’t need skyscraper-scale infrastructure and national power budgets. Something is architecturally broken.';
  const second = 'Nature’s scaling law: intelligence through computational diversity, not uniformity.';

  assert.ok(daedalus.indexOf(first) >= 0, 'missing first line');
  assert.ok(daedalus.indexOf(second) > daedalus.indexOf(first), 'second line must follow first');
  assert.doesNotMatch(daedalus, /size of the fire|shape of the forge/i);
});

test('publishes exactly ten selected Research Archivum essays on the blog index', () => {
  assert.equal((blogIndex.match(/data-archivum-post/g) || []).length, 10);
  assert.match(blogIndex, /From the Research Archivum/);

  for (const [slug, title] of posts) {
    assert.match(blogIndex, new RegExp(`href="/blog/${slug}/"`));
    assert.match(blogIndex, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('gives every selected essay a complete, provenance-labelled reading page', () => {
  for (const [slug, title] of posts) {
    const html = readFileSync(new URL(`blog/${slug}/index.html`, root), 'utf8');

    assert.match(html, new RegExp(`<h1[^>]*>${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
    assert.match(html, /Developed from a January 2025 long-form research conversation/);
    assert.match(html, /Research Archivum/);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://antreas.io/blog/${slug}/">`));
    assert.match(html, /class="field-note-rail"/);
    assert.match(html, />Idea</);
    assert.match(html, />Mechanism</);
    assert.match(html, />Implication</);
    assert.match(html, /href="\/blog"/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
});

test('keeps the collection accessible, responsive, and light-first', () => {
  assert.match(blogIndex, /@media \(max-width: 720px\)/);
  assert.match(blogIndex, /:focus-visible/);
  assert.match(blogIndex, /localStorage\.getItem\('theme'\)/);
  assert.match(blogIndex, /aria-label="Toggle theme"/);
  assert.equal((blogIndex.match(/<h1\b/g) || []).length, 1);
});

test('edits podcast drafts for technical honesty and NDA-safe specificity', () => {
  const corpus = posts
    .map(([slug]) => readFileSync(new URL(`blog/${slug}/index.html`, root), 'utf8'))
    .join('\n');

  assert.doesNotMatch(corpus, /trillion-parameter|trillions of parameters/i);
  assert.doesNotMatch(corpus, /500ms minimum|student cannot exceed the teacher|1000x reduction/i);
  assert.doesNotMatch(corpus, /single-digit milliseconds|Every 20 seconds|100x slower/i);
  assert.doesNotMatch(corpus, /pieces(?:\.app)?/i);
  assert.doesNotMatch(corpus, /Self-attention can learn anything|two-legged locomotion is an unsolved problem/i);
  assert.doesNotMatch(corpus, /500 million users|5-10 years from this being mainstream/i);

  const distillation = readFileSync(new URL('blog/distillation/index.html', root), 'utf8');
  const pipeline = readFileSync(new URL('blog/cheap-then-clean/index.html', root), 'utf8');
  assert.match(distillation, /The Teacher Is Not Ground Truth/);
  assert.match(pipeline, /The interval is deployment-dependent/);
});

test('keeps the retired model label out of the blog and its generator', () => {
  const publicCorpus = [
    ...readHtmlTree(new URL('blog/', root)),
    readFileSync(new URL('scripts/generate-research-notes.sh', root), 'utf8'),
  ].join('\n');

  assert.doesNotMatch(
    publicCorpus,
    /nano(?:[\s_-]+scale)?(?:[\s_-]+task)?[\s_-]+models?/i,
  );
});
