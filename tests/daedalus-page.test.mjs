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

test('keeps experimental results and negative results off the public page', () => {
  assert.doesNotMatch(html, /id="verification-heading"|class="verification-grid"/);
  assert.doesNotMatch(visibleText, /Current evidence boundary|Negative results retained|sharp capability transitions|non-tie win-rate|measured energy-to-competence/i);
});

test('compares brain and AI energy only after naming the workload and unit', () => {
  assert.match(visibleText, /What the banana buys/);
  assert.match(visibleText, /≈ 20 W continuous/);
  assert.match(visibleText, /30 W adapter ceiling/);
  assert.match(visibleText, /14\.3 kW maximum/);
  assert.match(visibleText, /same 18 hours/i);
  assert.match(visibleText, /power-envelope comparisons, not claims/i);
  assert.match(visibleText, /sight, sound, touch, proprioception and interoception/i);
  assert.match(visibleText, /persistent episodic and semantic memories/i);
  assert.match(html, /pmc\.ncbi\.nlm\.nih\.gov\/articles\/PMC6092772/);
  assert.match(html, /support\.apple\.com\/en-gb\/109509/);
  assert.match(html, /docs\.nvidia\.com\/dgx\/dgxb200-user-guide\/introduction-to-dgxb200\.html/);
  assert.equal(count(/<article class="energy-case\b/g), 3);
  assert.match(visibleText, /≈700× lower power envelope/i);
  assert.match(visibleText, /not an equal-work efficiency benchmark/i);
  assert.doesNotMatch(visibleText, /Gemini|0\.24 Wh/i);
  assert.doesNotMatch(visibleText, /GB200 NVL72|rack-scale|120 kW|6,000 brain-hours/i);
});

test('gives every workload a calibrated bananas-for-scale conversion', () => {
  assert.match(visibleText, /BANANA energy unit/);
  assert.match(visibleText, /1 BANANA/);
  assert.match(visibleText, /defined here as one medium fruit/i);
  assert.match(visibleText, /105 kcal/);
  assert.match(visibleText, /≈ 122 Wh of food energy/);
  assert.match(visibleText, /≈3 BANANAS \/ 18 HOURS/);
  assert.match(visibleText, /≈4\.5 BANANAS \/ 18 HOURS/);
  assert.match(visibleText, /≈2,100 BANANAS \/ 18 HOURS/);
  assert.match(visibleText, /watts keep it honest/i);
  assert.match(visibleText, /arithmetic scale, not a claim of biological conversion efficiency/i);
  assert.match(html, /snaped\.fns\.usda\.gov\/seasonal-produce-guide\/bananas/);
  assert.equal(count(/class="power-equivalent"/g), 3);
  assert.equal(count(/class="brain-capabilities"/g), 1);
});

test('presents information thermodynamics as a falsifiable interpretive spine', () => {
  assert.match(html, /Information thermodynamics/);
  assert.match(html, /adaptive value per unit of energy/i);
  assert.match(html, /F\[θ, A\]/);
  assert.match(html, /computational energy/);
  assert.match(html, /model complexity/);
  assert.match(html, /predictive value/);
  assert.match(html, /interpretive framework, not a proven law/i);
});

test('keeps the source submission private', () => {
  assert.doesNotMatch(html, /daedalus-next-frontier-ai-submission\.pdf/);
  assert.doesNotMatch(visibleText, /Final NFAI submission/);
});

test('records the SPRIND evaluation and funded cohort without hiding the outcome', () => {
  assert.match(visibleText, /came close to the Challenge’s up-to-ten-team funded cohort/i);
  assert.match(visibleText, /not selected to advance to the jury pitches/i);
  assert.match(visibleText, /“We were highly impressed by your work\.”/i);
  assert.match(visibleText, /“stood out during our evaluation process”/i);
  assert.match(visibleText, /different funding programmes, its investor network, and future opportunities/i);
  assert.match(visibleText, /up to 10 teams/i);
  assert.match(visibleText, /€3 million/);
  assert.match(visibleText, /up to 6 teams/i);
  assert.match(visibleText, /€8 million/);
  assert.match(visibleText, /up to 3 teams/i);
  assert.match(visibleText, /€15\.5 million/);
  assert.match(html, /sprind\.org\/en\/actions\/challenges\/next-frontier-ai/);
  assert.doesNotMatch(visibleText, /€9 million/);
});

test('keeps the submitted research constellation non-public', () => {
  assert.doesNotMatch(html, /id="people-heading"|class="person-card"|class="people-group"/);
  assert.doesNotMatch(visibleText, /The people behind the programme|proposal network, not present-day employment/i);
  assert.doesNotMatch(html, /scholar\.google\.com\/citations/);
  assert.doesNotMatch(visibleText, /leads MNEME|programme\/team result/i);
});

test('inherits the main site light default and honours the saved theme', () => {
  assert.match(html, /:root\s*\{[\s\S]*?--void:\s*var\(--bg\)/);
  assert.match(html, /:root\s*\{[\s\S]*?color-scheme:\s*light/);
  assert.match(html, /\[data-theme="dark"\]\s*\{[\s\S]*?color-scheme:\s*dark/);
  assert.match(html, /localStorage\.getItem\('theme'\)/);
  assert.match(html, /localStorage\.setItem\('theme', nextTheme\)/);
  assert.match(html, /class="theme-toggle"/);
  assert.match(html, /aria-label="Toggle theme"/);
  assert.doesNotMatch(html, /--bg:\s*var\(--void\)/);
});

test('keeps the page accessible and responsive', () => {
  assert.equal(count(/<h1\b/g), 1);
  assert.match(html, /@media \(max-width: 720px\)/);
  assert.match(html, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(html, /:focus-visible/);
});
