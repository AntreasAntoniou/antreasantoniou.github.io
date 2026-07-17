# DAEDALUS Pillar-First Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the project-name-led DAEDALUS page with a rendered, accessible account of the seven compositional-intelligence pillars in the final NFAI submission.

**Architecture:** Keep the existing static-site shell and implement the page as one self-contained HTML document with embedded page CSS. Encode the research architecture as semantic HTML—an ordered list on mobile and a CSS-grid circuit on desktop—then use a ledger of seven `<article>` elements for the technical detail. Add a dependency-free Node contract test so factual and structural regressions fail before publication.

**Tech Stack:** Static HTML5, CSS, existing site stylesheet, Node.js built-in test runner.

## Global Constraints

- C1–C7 concepts are the primary ontology; CHRONOS, GESTALT, MNEME, ANUBIS, SOMA, CONSENSUS, TALOS, and APEX appear only as secondary implementation handles.
- The final NFAI submission is a programme proposal and target record, not evidence that the targets were achieved.
- Preserve the verified evidence language: 432 runs, 144 conditions, 3 seeds; “sharp capability transitions,” not proven phase transitions.
- Preserve CHRONOS honesty: 79.7% non-tie win-rate at roughly 10M parameters; H1 falsified at 150M; crossover with scale/data remains a hypothesis.
- Attribute MNEME to the Axiotic programme/team and Samuel Jones, never as Antreas’s individual build.
- Integrated readiness is TRL 2–3; component readiness is C1 4, C2 2–3, C3 3–4, C4 3–4, C5 deployed technique 5 / training filter 3, C6 2–3, C7 4.
- Use `#050914`, `#0D1526`, `#65A9FF`, `#69E3D5`, `#F4F7FC`, and `#A8B3C5`; Source Serif 4 display, Inter body, Roboto Mono labels.
- One `<h1>`, visible focus, AA contrast, reduced-motion support, and no horizontal overflow at 720px or below.
- No gradients, no progress bars, and no rounded-card wall.

---

### Task 1: Add the publication contract

**Files:**
- Create: `tests/daedalus-page.test.mjs`
- Test: `tests/daedalus-page.test.mjs`

**Interfaces:**
- Consumes: `daedalus/index.html` as UTF-8 text.
- Produces: a dependency-free contract run by `node --test tests/daedalus-page.test.mjs`.

- [ ] **Step 1: Write the failing test**

Create tests that assert the seven concept labels, semantic circuit and ledger, exact verified evidence, final-submission wording, absence of superseded-language and banned claims, one `<h1>`, mobile breakpoint, and reduced-motion support:

```js
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
  ]) assert.match(html, new RegExp(label.replace(/[+]/g, '\\\\+')));
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
```

- [ ] **Step 2: Run the contract to verify it fails for the old five-project page**

Run: `node --test tests/daedalus-page.test.mjs`

Expected: FAIL, beginning with the missing `C1 · Better learning signals` assertion.

- [ ] **Step 3: Commit the red contract**

```bash
git add tests/daedalus-page.test.mjs docs/superpowers/plans/2026-07-17-daedalus-pillar-first-redesign.md
git commit -m "test: define DAEDALUS publication contract"
```

---

### Task 2: Rebuild the page around the seven conceptual pillars

**Files:**
- Modify: `daedalus/index.html`
- Test: `tests/daedalus-page.test.mjs`

**Interfaces:**
- Consumes: existing global `../styles.css`, final NFAI PDF at `../documents/daedalus/daedalus-next-frontier-ai-submission.pdf`.
- Produces: a standalone responsive programme page at `/daedalus/`.

- [ ] **Step 1: Replace the metadata and design tokens**

Set the description to “DAEDALUS is Axiotic AI’s programme for compositional, resource-rational intelligence: seven testable capabilities designed to work as one system.” Load Roboto Mono alongside Inter and Source Serif 4. Define the page palette exactly as:

```css
:root {
  --void: #050914;
  --slate: #0D1526;
  --circuit: #65A9FF;
  --signal: #69E3D5;
  --paper: #F4F7FC;
  --steel: #A8B3C5;
  color-scheme: dark;
}
```

Use square rules and borders rather than card decoration; set `overflow-x: clip`, a 70rem shell, `:focus-visible`, the 720px linear fallback, and a `prefers-reduced-motion` block.

- [ ] **Step 2: Implement the programme hero and architecture circuit**

Use the exact visible hierarchy:

```html
<p class="eyebrow">Axiotic AI research programme · submitted to SPRIND NFAI</p>
<h1 id="page-title">DAEDALUS <span>Compositional Intelligence</span></h1>
<p class="hero-copy">Intelligence is not the size of the fire. It is the shape of the forge.</p>
```

Explain the resource-rational premise with the roughly-20-watt / three-bananas comparison. Put the proposal-only `1B vs 100B` and `~1/100 compute` figures in a box labelled `PROGRAMME TARGET · NOT AN ACHIEVED RESULT`.

Create `<ol class="architecture-circuit">` with seven `architecture-node` list items and desktop grid positions matching:

```text
             C6 GOVERNANCE ENVELOPE
C1 SIGNALS → C2 WORLD MODEL → ACTION
     ↓             ↕
C4 ROUTING ↔ C3 STATE + REASONING
     ↑             ↓
C7 SEARCH  ← C5 VERIFIED EXPERIENCE LOOP
```

The caption must say `Conceptual architecture, not a literal tensor graph.` On mobile, preserve DOM order C1 through C7 and show the role of each item as plain text.

- [ ] **Step 3: Implement the seven-entry pillar ledger**

Create exactly seven `<article class="pillar-ledger__item">` entries, each with a `<dl>` containing `Missing capability`, `Mechanism`, `Role in composition`, `Falsifiable test / current state`, and `Secondary implementation label`. Use this content matrix:

| ID | Concept | Secondary handle | Core mechanism and honest test |
|---|---|---|---|
| C1 | Better learning signals | CHRONOS | Past/present/future objectives; compare at matched model size, tokens, and FLOPs; 79.7% non-tie win-rate near 10M, H1 falsified at 150M. |
| C2 | World modelling for planning | GESTALT | Multimodal predictive state and cheap internal rollouts; test transfer and planning success at compute parity; current TRL 2–3. |
| C3 | Explicit memory + recursive latent reasoning | MNEME + ANUBIS | Persistent read/write state and iterative latent refinement; test long-horizon retention and context degradation; team/programme work led for MNEME by Samuel Jones. |
| C4 | Compute-aware attention | SOMA | Route depth and computation toward uncertainty/information gain; test quality–FLOP frontier against dense attention. |
| C5 | Audited self-improvement | CONSENSUS | Curate generated experience through independent checks before reuse; deployed technique TRL 5, training-filter integration TRL 3. |
| C6 | Governance and built-in norms | TALOS | Put constraints into the learning and action loop; test intervention reliability and auditability under distribution shift. |
| C7 | Learning beyond backprop | APEX | Search, evolution, and non-gradient adaptation over architectures/objectives; test useful adaptation under fixed compute and stability budgets. |

- [ ] **Step 4: Implement composition tests, evidence, readiness, and public record**

List the integration protocol as compute-matched baselines, pairwise integration, leave-one-component-out ablations, capability-per-watt, and publication of negative results. State the 432-run structure programme, sharp-transition qualification, CHRONOS result, and cluster infrastructure. State integrated and component TRLs as text labels, never progress bars.

Link the PDF with exactly:

```html
<a href="../documents/daedalus/daedalus-next-frontier-ai-submission.pdf" target="_blank" rel="noopener noreferrer">Final NFAI submission →</a>
```

Describe it as the final submitted proposal and a record of programme targets, not achieved results. Retain the Axiotic GitHub, TSP repository, Axiotic lab, and INIT links.

- [ ] **Step 5: Run the contract and refactor only while green**

Run: `node --test tests/daedalus-page.test.mjs`

Expected: 5 tests pass, 0 fail.

- [ ] **Step 6: Commit the rendered implementation**

```bash
git add daedalus/index.html
git commit -m "feat: rebuild DAEDALUS around compositional pillars"
```

---

### Task 3: Verify the actual website

**Files:**
- Verify: `daedalus/index.html`

**Interfaces:**
- Consumes: local static site served over HTTP.
- Produces: browser-visible desktop and mobile renders ready for Antreas’s visual review.

- [ ] **Step 1: Serve the worktree locally**

Run: `python3 -m http.server 8877 --bind 127.0.0.1`

Expected: server listens at `http://127.0.0.1:8877/daedalus/`.

- [ ] **Step 2: Inspect desktop at 1440 × 1000**

Verify the hero, circuit, seven ledger entries, evidence, readiness, and final PDF link render without console errors or horizontal overflow.

- [ ] **Step 3: Inspect mobile at 390 × 844**

Verify the architecture becomes a legible C1–C7 sequence, all text remains inside the viewport, focus styles remain visible, and there is no horizontal scrolling.

- [ ] **Step 4: Run final checks**

Run:

```bash
node --test tests/daedalus-page.test.mjs
git diff --check
git status --short
```

Expected: all tests pass, no whitespace errors, and no uncommitted implementation changes.

- [ ] **Step 5: Open the local page for Antreas**

Open `http://127.0.0.1:8877/daedalus/` in the visible browser. Do not publish or merge until Antreas has reviewed the rendered page.
