# Meaningful Game of Life Experiments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the twenty invitation mockups with ten mechanically meaningful cellular experiments and two viewport-persistent presentations selectable at runtime.

**Architecture:** A new deterministic `ExperimentRuntime` module owns simulation state, panels, metrics, specialised mechanics, and semantic rendering. The existing `GameOfLife` class becomes the page integration layer: it owns the one canvas, binds the experiment instrument, delegates stepping/rendering, and preserves page-wide click, pointer, theme, and resize behaviour.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, ES modules loaded through dynamic import, Node's built-in test runner, in-app browser verification.

## Global Constraints

- Expose exactly ten experiments and exactly two presentations: `11 · Sealed experiment` and `16 · Persistent field panel`.
- Both presentations are fixed to the viewport and remain visible across scrolling.
- Keep exactly one canvas and one running simulation instance.
- Use deterministic seeded pseudorandomness and report only outcomes observed in the cellular run.
- Display `A cellular-automata demonstration, not evidence about neural networks.`
- Use “sharp behavioural transition,” never “phase transition.”
- Semantic colours: cyan births, blue persistent cells, violet/amber additional types, amber death traces, slate controls, translucent cyan simulated futures.
- Respect light/dark themes, keyboard focus, touch, small screens, reduced motion, and portrait independence.

---

### Task 1: Build the deterministic multi-panel engine

**Files:**
- Create: `life-experiments.mjs`
- Create: `tests/life-experiments.test.mjs`

**Interfaces:**
- Produces: `EXPERIMENTS: ReadonlyArray<ExperimentDefinition>` and `PRESENTATIONS: ReadonlyArray<PresentationDefinition>`.
- Produces: `seededRandom(seed: number): () => number`.
- Produces: `ExperimentRuntime` with `reset(id, dimensions)`, `step(pointer)`, `interact(x, y)`, `secondaryAction()`, `setCoupling(value)`, `resize(cols, rows)`, `readout()`, and `draw(ctx, palette, cellSize)`.

- [ ] **Step 1: Write failing module tests**

Import the module and assert ten definitions, two presentations, repeatable `seededRandom`, equal initial populations for experiment 1, unequal populations for experiment 2, two memory panels for experiment 6, and three substrate panels for experiment 10.

- [ ] **Step 2: Run tests to verify RED**

Run: `node --test tests/life-experiments.test.mjs`

Expected: FAIL because `life-experiments.mjs` does not exist.

- [ ] **Step 3: Implement shared state, panel boundaries, canonical stepping, and semantic drawing**

Define experiment records with `id`, `label`, `question`, `hypothesis`, `primary`, `secondary`, and `kind`. Implement deterministic grid allocation, motif and random seeding, Moore/hex/sparse neighbour functions, age and death-trace tracking, per-panel metrics, and a readout containing generation, live cells, changes, budget, and interpretation.

- [ ] **Step 4: Run tests to verify GREEN**

Run: `node --test tests/life-experiments.test.mjs`

Expected: all engine tests PASS.

- [ ] **Step 5: Commit the engine foundation**

```bash
git add life-experiments.mjs tests/life-experiments.test.mjs
git commit -m "feat: add deterministic Life experiment engine"
```

### Task 2: Implement all specialised experiment mechanics

**Files:**
- Modify: `life-experiments.mjs`
- Modify: `tests/life-experiments.test.mjs`

**Interfaces:**
- Consumes: the runtime and panel primitives from Task 1.
- Produces: compute-budget routing, weighted coupling, perturbation recovery, memory influence, ghost rollout commitment, typed-cell diversity, preregistered trial history, and per-substrate outcomes.

- [ ] **Step 1: Write failing behavioural tests**

Assert that experiment 3 spends updates only inside the compute radius; experiment 4 changes outcomes when coupling changes; experiment 5 records perturbation and recovery; experiment 6's memory state diverges from its canonical control; experiment 7 creates then commits a ghost rollout; experiment 8 contains three types; experiment 9 records prediction and actual outcome; and experiment 10 uses `moore`, `hex`, and `sparse` neighbourhoods.

- [ ] **Step 2: Run tests to verify RED**

Run: `node --test tests/life-experiments.test.mjs`

Expected: FAIL on the first missing specialised behaviour.

- [ ] **Step 3: Implement the specialised strategies**

Implement each mechanic through mode-specific branches at reset, step, pointer interaction, secondary action, and readout boundaries. Keep the canonical update function shared; supply mode-specific panel rules and hooks instead of copying the loop.

- [ ] **Step 4: Run tests to verify GREEN**

Run: `node --test tests/life-experiments.test.mjs`

Expected: all engine tests PASS.

- [ ] **Step 5: Commit experiment mechanics**

```bash
git add life-experiments.mjs tests/life-experiments.test.mjs
git commit -m "feat: implement ten Life experiment mechanics"
```

### Task 3: Build the persistent experiment instrument

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `game-of-life.js`
- Modify: `tests/game-of-life.test.mjs`

**Interfaces:**
- Consumes: `EXPERIMENTS`, `PRESENTATIONS`, and `ExperimentRuntime` through `await import('./life-experiments.mjs')`.
- Produces: `#gol-experiment-select`, `#gol-presentation-select`, experiment title/question/hypothesis/result fields, three metric fields, coupling control, context action, and the existing primary start/pause control.

- [ ] **Step 1: Replace gallery tests with failing instrument tests**

Assert exactly ten experiment options, exactly two presentation options, fixed CSS for variants 11 and 16, required protocol and metric fields, the honesty caveat, dynamic import, one canvas, and increased visible cell alpha.

- [ ] **Step 2: Run focused tests to verify RED**

Run: `node --test tests/game-of-life.test.mjs`

Expected: FAIL because the current HTML still exposes twenty invitation options.

- [ ] **Step 3: Replace the invitation gallery with the persistent instrument**

Add the two selectors and semantic experiment fields. Remove obsolete hero/nav anchors and variants 1–10 and 12–15 and 17–20. Style variant 11 as a fixed bottom-right card and variant 16 as a fixed full-width bottom strip. On mobile, both become a compact bottom sheet with bounded height and scrollable protocol copy.

- [ ] **Step 4: Delegate page interaction to `ExperimentRuntime`**

Load the module, bind selector changes to deterministic reset, bind pointer movement to adaptive compute or preview state, bind clicks to runtime interaction, bind the secondary button and coupling slider, render readouts every step, and retain pause/resume, resize, theme, reduced motion, and portrait independence.

- [ ] **Step 5: Run focused and full tests to verify GREEN**

Run: `node --check game-of-life.js && node --test tests/game-of-life.test.mjs && node --test tests/*.test.mjs`

Expected: syntax valid and all tests PASS.

- [ ] **Step 6: Commit the instrument**

```bash
git add index.html styles.css game-of-life.js tests/game-of-life.test.mjs
git commit -m "feat: add persistent Life experiment instrument"
```

### Task 4: Browser verification and repair

**Files:**
- Modify if required by observed defects: `life-experiments.mjs`
- Modify if required by observed defects: `index.html`
- Modify if required by observed defects: `styles.css`
- Modify if required by observed defects: `game-of-life.js`
- Modify if required by observed defects: `tests/life-experiments.test.mjs`
- Modify if required by observed defects: `tests/game-of-life.test.mjs`

**Interfaces:**
- Consumes: the complete local experiment playground.
- Produces: a verified preview at `http://127.0.0.1:8878/`, reset to experiment 1 and presentation 11.

- [ ] **Step 1: Verify both persistent presentations across scroll**

Select presentations 11 and 16 at the hero and after scrolling to later sections. Confirm the instrument remains in the same viewport-relative location and never anchors to page content.

- [ ] **Step 2: Exercise all ten experiments**

For every mode, start the run and inspect its question, mechanics, metrics, result language, and colour semantics. Directly exercise pointer routing, coupling, perturbation, preview commit, trial advancement, and all three substrates.

- [ ] **Step 3: Verify accessibility and themes**

Check keyboard operation, focus visibility, narrow viewport constraints, light/dark contrast, pause/resume, reset on selection, one canvas, and portrait independence.

- [ ] **Step 4: Repair observed defects with a failing regression test first**

For each defect, add the smallest assertion reproducing it, run the focused test to observe failure, apply the repair, and rerun the focused test.

- [ ] **Step 5: Run final verification**

Run: `node --check game-of-life.js && node --test tests/*.test.mjs && git diff --check && git status --short --branch`

Expected: syntax valid, all tests PASS, no whitespace errors, and no uncommitted changes after the repair commit.

- [ ] **Step 6: Commit verified repairs**

```bash
git add life-experiments.mjs index.html styles.css game-of-life.js tests/life-experiments.test.mjs tests/game-of-life.test.mjs
git commit -m "fix: polish meaningful Life experiments"
```
