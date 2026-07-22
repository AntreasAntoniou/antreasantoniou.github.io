# Restore Ambient Game of Life Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Use introduction 16 around the page-wide Game of Life, with fresh randomized initial conditions on every first activation.

**Architecture:** Reuse the known-good single-canvas implementation, removing the later experiment runtime and instrument UI while retaining only the “Rising nature panel” presentation layer. Keep randomness inside `spawnInitialPatterns()` so activation behavior remains isolated from pause/resume and user perturbations.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Node.js built-in test runner.

## Global Constraints

- One canvas and no experiment or presentation selectors.
- The rising nature introduction remains fixed to the viewport wherever the reader is.
- Fresh random pattern mix, positions, and rotations on first activation only.
- Clicking empty space and dwelling perturb the active field.
- Respect `prefers-reduced-motion`.
- Keep cells slightly more visible than the original implementation.

---

### Task 1: Restore the ambient interaction contract

**Files:**
- Modify: `tests/game-of-life.test.mjs`
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `game-of-life.js`
- Delete: `life-experiments.mjs`
- Delete: `tests/life-experiments.test.mjs`

**Interfaces:**
- Consumes: the known-good ambient implementation at commit `b642f96`
- Produces: `#gol-presentation`, `#gol-control`, `#gol-control-label`, and one dynamically created `#gol-canvas`

- [ ] **Step 1: Write the failing restoration tests**

Assert that the homepage contains one rising nature introduction, no selectors or protocol panel, one canvas, and the click/dwell handlers.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test tests/game-of-life.test.mjs`

Expected: FAIL because the current homepage still exposes the comparison selector and introduction 11.

- [ ] **Step 3: Restore the known-good files and remove the experiment runtime**

Restore the simple Game of Life engine, retain only presentation treatment 16 as a fixed viewport introduction, preserve unrelated page content, and remove the experiment runtime and its dedicated test.

- [ ] **Step 4: Run the focused test and verify the restoration passes**

Run: `node --test tests/game-of-life.test.mjs`

Expected: PASS.

### Task 2: Randomize initial conditions

**Files:**
- Modify: `game-of-life.js`
- Modify: `tests/game-of-life.test.mjs`

**Interfaces:**
- Consumes: `spawnPattern(centerX, centerY, patternName)`
- Produces: `createInitialSeeds(random = Math.random)` returning `{ x, y, patternName }[]`

- [ ] **Step 1: Write a failing seed-generation test**

Load the exported test hook and verify two supplied random streams create different seed descriptors while every descriptor stays inside the grid and references a known pattern.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test tests/game-of-life.test.mjs`

Expected: FAIL because `createInitialSeeds` does not exist.

- [ ] **Step 3: Implement curated randomized seeds**

Generate three to six seeds. Choose each pattern, position, and rotation from the supplied random source; pass the same source into `spawnPattern` so tests and runtime use the same behavior. `start()` invokes this once; `resume()` does not.

- [ ] **Step 4: Run the focused test and verify pass**

Run: `node --test tests/game-of-life.test.mjs`

Expected: PASS.

### Task 3: Verify the complete homepage

**Files:**
- Test: `tests/*.test.mjs`

**Interfaces:**
- Consumes: the restored homepage and ambient interaction
- Produces: verified local preview at `http://127.0.0.1:8878/`

- [ ] **Step 1: Run all tests**

Run: `node --test tests/*.test.mjs`

Expected: all tests pass with zero failures.

- [ ] **Step 2: Check the patch**

Run: `git diff --check`

Expected: no output and exit code 0.

- [ ] **Step 3: Verify in the browser**

Confirm the experiment panel and selectors are absent, the rising nature introduction remains fixed, activation creates visible cells, scrolling preserves the field, and an empty-space click adds a pattern.

- [ ] **Step 4: Commit**

```bash
git add game-of-life.js index.html styles.css tests/game-of-life.test.mjs
git add -u life-experiments.mjs tests/life-experiments.test.mjs
git commit -m "feat: restore chosen ambient Life introductions"
```
