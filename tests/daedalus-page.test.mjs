import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../daedalus/index.html', import.meta.url), 'utf8');
const count = (pattern) => (html.match(pattern) || []).length;

test('presents all seven concepts as the primary programme ontology', () => {
  for (const label of [
    'C1 · Better learning signals',
    'C2 · World modelling for planning',
    'C3 · Explicit memory + recursive latent reasoning',
    'C4 · Compute-aware attention',
    'C5 · Audited self-improvement',
    'C6 · Governance and built-in norms',
    'C7 · Learning beyond backprop',
  ]) {
    assert.match(html, new RegExp(label.replace(/[+]/g, '\\+')));
  }
  assert.equal(count(/class="pillar-ledger__item"/g), 7);
});

test('encodes the composition model semantically', () => {
  assert.match(html, /<ol class="architecture-circuit"/);
  assert.equal(count(/class="architecture-node/g), 7);
  assert.match(html, /Conceptual architecture, not a literal tensor graph\./);
});

test('states evidence and readiness without inflating claims', () => {
  assert.match(html, /432 controlled runs across 144 conditions, with 3 seeds per condition/);
  assert.match(html, /sharp capability transitions/i);
  assert.match(html, /not proven phase transitions/i);
  assert.match(html, /79\.7% non-tie win-rate/i);
  assert.match(html, /H1 was falsified at 150M/i);
  assert.match(html, /Integrated programme <strong>TRL 2–3<\/strong>/);
  assert.doesNotMatch(html, /6,448|superseded June 2026|earlier six-component/i);
});

test('labels the source document as the final proposal record', () => {
  assert.match(html, />Final NFAI submission →<\/a>/);
  assert.match(html, /programme targets, not achieved results/i);
});

test('keeps the page accessible and responsive', () => {
  assert.equal(count(/<h1\b/g), 1);
  assert.match(html, /@media \(max-width: 720px\)/);
  assert.match(html, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(html, /:focus-visible/);
});
