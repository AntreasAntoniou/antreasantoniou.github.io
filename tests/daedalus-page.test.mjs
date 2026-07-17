import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../daedalus/index.html', import.meta.url), 'utf8');
const count = (pattern) => (html.match(pattern) || []).length;
const visibleText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');

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
  assert.match(html, /\.node-c4::before \{ content: "↑"; \}/);
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

test('compares brain and AI energy only after naming the workload and unit', () => {
  assert.match(visibleText, /What the watt buys/);
  assert.match(visibleText, /20 W continuous/);
  assert.match(visibleText, /360 Wh over 18 waking hours/);
  assert.match(visibleText, /three bananas/);
  assert.match(visibleText, /0\.24 Wh \/ prompt/);
  assert.match(visibleText, /median Gemini Apps text prompt/);
  assert.match(visibleText, /up to 700 W/);
  assert.match(visibleText, /approximately 120 kW/);
  assert.match(visibleText, /Power is a rate; energy is power integrated over time/);
  assert.match(visibleText, /one bounded text-generation request/i);
  assert.match(visibleText, /perception, action, memory, learning, language, planning, and biological maintenance/i);
  assert.match(html, /pmc\.ncbi\.nlm\.nih\.gov\/articles\/PMC6092772/);
  assert.match(html, /measuring_the_environmental_impact_of_delivering_ai_at_google_scale\.pdf/);
  assert.match(html, /nvidia\.com\/en-gb\/data-center\/h100/);
  assert.match(html, /docs\.nvidia\.com\/dgx\/dgxgb200-user-guide\/hardware\.html/);
});

test('presents information thermodynamics as a falsifiable interpretive spine', () => {
  assert.match(html, /Information thermodynamics/);
  assert.match(html, /adaptive value per unit of energy/i);
  assert.match(html, /F\[θ, A\]/);
  assert.match(html, /computational energy/);
  assert.match(html, /model complexity/);
  assert.match(html, /predictive value/);
  assert.match(html, /interpretive framework, not a proven law/i);
  assert.match(html, /3,077 ± 124 J/);
  assert.match(html, /7–26% less measured energy/);
  assert.match(html, /engineering result, not fundamental thermodynamics/i);
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
