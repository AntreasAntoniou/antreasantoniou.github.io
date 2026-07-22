# Game of Life Invitation Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local review dropdown that switches the homepage among all twenty Game of Life invitation treatments, ordered from quiet to maximally aggressive.

**Architecture:** Keep one `GameOfLife` instance and one semantic start button. A twenty-entry registry controls copy, icon, anchor, reveal timing, and a `data-variant` presentation state; one atmosphere layer supplies optional cells, trails, dimmers, panels, and full-screen effects without duplicating interaction logic.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node's built-in test runner, in-app browser verification.

## Global Constraints

- The selector is a local review instrument and must expose exactly twenty ordered options.
- Switching variants must atomically remove the previous treatment and reset Life to its dormant invitation state.
- All variants must share one accessible start/pause/resume control and one simulation instance.
- Portrait switching must remain independent from Life.
- Light mode, dark mode, mobile layouts, keyboard focus, and reduced motion must remain supported.

---

### Task 1: Define the gallery contract

**Files:**
- Modify: `tests/game-of-life.test.mjs`
- Modify: `index.html`
- Modify: `game-of-life.js`

**Interfaces:**
- Produces: `LIFE_INVITATION_VARIANTS`, an ordered frozen array of twenty `{ id, option, copy, kicker, icon, anchor }` records.
- Produces: `GameOfLife.applyVariant(id: number)` and `GameOfLife.resetInvitation(): void`.
- Produces: `#gol-variant-select`, `#gol-presentation`, `#gol-atmosphere`, `#gol-kicker`, and the existing shared `#gol-control`.

- [ ] **Step 1: Write failing structure tests**

Add assertions that the HTML contains one labelled selector with twenty options and one shared presentation/control tree; assert that JavaScript contains `LIFE_INVITATION_VARIANTS`, IDs 1–20, `applyVariant`, `resetInvitation`, and the selector `change` listener.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/game-of-life.test.mjs`

Expected: FAIL because `gol-variant-select` and `LIFE_INVITATION_VARIANTS` do not exist.

- [ ] **Step 3: Add the selector, semantic presentation layer, and registry**

Add the review `<aside>` and `<select>` before the presentation layer in `index.html`. Replace the standalone button with:

```html
<div id="gol-presentation" class="gol-presentation" data-variant="1">
  <div id="gol-atmosphere" class="gol-atmosphere" aria-hidden="true"></div>
  <p id="gol-kicker" class="gol-kicker"></p>
  <button id="gol-control" class="gol-control" type="button">
    <i id="gol-control-icon" aria-hidden="true"></i>
    <span id="gol-control-label"></span>
  </button>
</div>
```

Create twenty complete registry records and bind selection to `applyVariant(Number(event.target.value))`. `applyVariant` moves `#gol-presentation` into the record's named anchor, sets copy/icon/kicker, sets `data-variant`, creates atmosphere cells, and calls `resetInvitation`.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test tests/game-of-life.test.mjs`

Expected: all focused tests PASS.

- [ ] **Step 5: Commit the gallery contract**

```bash
git add index.html game-of-life.js tests/game-of-life.test.mjs
git commit -m "feat: add Life invitation gallery selector"
```

### Task 2: Implement twenty escalating treatments

**Files:**
- Modify: `tests/game-of-life.test.mjs`
- Modify: `styles.css`
- Modify: `game-of-life.js`

**Interfaces:**
- Consumes: `#gol-presentation[data-variant]`, `.gol-atmosphere-cell`, `.is-revealed`, and `.is-active`.
- Produces: visually distinct selectors `[data-variant="1"]` through `[data-variant="20"]` and animations `gol-pulse`, `gol-accumulate`, `gol-guide`, `gol-converge`, and `gol-breach`.

- [ ] **Step 1: Write failing escalation tests**

Assert that CSS addresses all twenty exact `data-variant` values, includes the five named animations, includes a full-screen treatment for variant 20, and constrains the gallery selector and presentation on mobile.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/game-of-life.test.mjs`

Expected: FAIL because the variant selectors and animations are absent.

- [ ] **Step 3: Add the visual system**

Style variants 1–7 as hero/nav anchored whispers, icons, ghost buttons, and attached pills; 8–12 as centred hero invitations, dormant-cell previews, card, and divider; 13–16 as progressively stronger fixed pills and panels; 17–20 as dimmer, converging-edge, dramatic interruption, and full-screen breach. Use `--gol-aggression` and shared primitives to avoid duplicating base button styles. When `.is-active`, collapse variants 17–20 into the ordinary bottom-centre pause control and hide atmospheric copy.

- [ ] **Step 4: Run focused and full tests and verify GREEN**

Run: `node --test tests/game-of-life.test.mjs && node --test tests/*.test.mjs`

Expected: all tests PASS.

- [ ] **Step 5: Commit the treatments**

```bash
git add styles.css game-of-life.js tests/game-of-life.test.mjs
git commit -m "feat: style twenty Life invitation treatments"
```

### Task 3: Verify interaction, accessibility, and responsive presentation

**Files:**
- Modify: `tests/game-of-life.test.mjs`
- Modify if required by findings: `index.html`
- Modify if required by findings: `styles.css`
- Modify if required by findings: `game-of-life.js`

**Interfaces:**
- Consumes: the completed gallery and existing `toggleProfileImage()` behaviour.
- Produces: verified local preview at `http://127.0.0.1:8878/`.

- [ ] **Step 1: Add failing lifecycle assertions**

Assert that variant changes call `resetInvitation`, reset the canvas, preserve one button, expose an explicit selector label, and retain `prefers-reduced-motion` handling.

- [ ] **Step 2: Run focused tests and verify RED when a lifecycle requirement is missing**

Run: `node --test tests/game-of-life.test.mjs`

Expected: either the new assertion fails for the missing lifecycle detail or, if already covered by Task 1, all tests pass without production changes.

- [ ] **Step 3: Repair only observed lifecycle or responsive defects**

Ensure `resetInvitation()` pauses, clears timers, empties both grids, clears the canvas, removes active/revealed state, and reapplies the selected invitation. Ensure the lab remains usable above theatrical overlays with `z-index: 100`, and long labels remain inside `calc(100vw - 2rem)`.

- [ ] **Step 4: Run automated verification**

Run: `node --check game-of-life.js && node --test tests/*.test.mjs && git diff --check`

Expected: JavaScript syntax valid, all tests PASS, and no whitespace errors.

- [ ] **Step 5: Run browser verification**

Reload the local preview. Inspect variants 1, 2, 5, 10, 15, 17, 19, and 20; verify dropdown switching, portrait independence, start/pause behaviour, mobile width, and light/dark readability. Leave the preview reset to variant 1.

- [ ] **Step 6: Commit verified repairs**

```bash
git add index.html styles.css game-of-life.js tests/game-of-life.test.mjs
git commit -m "fix: polish Life invitation gallery"
```
