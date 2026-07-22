# Deferred Game of Life Control Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep Game of Life dormant until a visitor explicitly starts it from a control revealed after 12 seconds of inactivity, while separating portrait switching from the simulation.

**Architecture:** The existing `GameOfLife` class owns discovery, play, pause, resume, and interaction state. Static homepage markup supplies semantic portrait and Life controls; CSS handles their restrained visual states; Node static-contract tests guard the user-visible behaviour.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Node.js built-in test runner.

## Global Constraints

- Life never starts automatically.
- The discovery control reveals after exactly 12 seconds without meaningful activity.
- Once revealed, the control remains visible.
- Empty-space clicks and pointer dwell seed cells only while Life is active.
- Portrait clicks never alter Life state.
- Portrait copy alternates between **View illustrated portrait** and **View photograph**.
- Reduced-motion users receive neither the control reveal nor the simulation.

---

### Task 1: Implement explicit discovery and play state

**Files:**
- Modify: `tests/game-of-life.test.mjs`
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `game-of-life.js`

**Interfaces:**
- Consumes: `#gol-control`, `#gol-control-label`, `#profile-evolve-control`, and `#profile-hint-label` from homepage markup.
- Produces: `GameOfLife.toggle(): void`, `start(): void`, `pause(): void`, `resume(): void`, and `revealControl(): void`.

- [ ] **Step 1: Replace the old automatic-start assertions with the new contract**

```js
test('keeps Life dormant until the delayed control is selected', () => {
  assert.match(script, /discoveryDelay:\s*12000/);
  assert.doesNotMatch(script, /activationDelay/);
  assert.match(home, /id="gol-control"/);
  assert.match(home, />\s*Start Game of Life\s*</);
  assert.match(script, /this\.controlRevealed/);
  assert.match(script, /this\.control\.addEventListener\('click'/);
});

test('keeps portrait switching independent from Life', () => {
  assert.match(home, /View illustrated portrait/);
  assert.match(home, /View photograph/);
  const portraitFunction = home.match(/function toggleProfileImage\(\) \{[\s\S]*?\n    \}/)?.[0] ?? '';
  assert.doesNotMatch(portraitFunction, /gameOfLife|spawnAtClientPoint/);
});

test('preserves click and dwell play after explicit start', () => {
  assert.match(script, /document\.addEventListener\('click'/);
  assert.match(script, /document\.addEventListener\('pointermove'/);
  assert.match(script, /if \(!this\.activated \|\| this\.reducedMotion\.matches\) return/);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test tests/game-of-life.test.mjs`

Expected: FAIL because Life still activates automatically, no start control exists, and the portrait seeds an acorn.

- [ ] **Step 3: Add semantic controls and accurate portrait copy**

```html
<span id="profile-hint" class="profile-hint">
  <i class="fas fa-image" aria-hidden="true"></i>
  <span id="profile-hint-label">View illustrated portrait</span>
</span>

<button id="gol-control" class="gol-control" type="button"
        aria-label="Start Game of Life" aria-hidden="true" tabindex="-1">
  <i class="fas fa-border-all" aria-hidden="true"></i>
  <span id="gol-control-label">Start Game of Life</span>
</button>
```

```js
const nextLabel = currentProfileIndex === 0
  ? 'View illustrated portrait'
  : 'View photograph';
profileHintLabel.textContent = nextLabel;
profileControl.setAttribute('aria-label', nextLabel);
```

- [ ] **Step 4: Add the delayed utility-control styles**

```css
.gol-control {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 49;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(8px);
}

.gol-control.is-revealed {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}
```

- [ ] **Step 5: Replace automatic activation with discovery and explicit state transitions**

```js
const CONFIG = {
  cellSize: 8,
  updateInterval: 100,
  dwellTime: 500,
  dwellRadius: 3,
  fadeSteps: 10,
  spawnPatterns: true,
  discoveryDelay: 12000,
};

scheduleDiscovery() {
  clearTimeout(this.discoveryTimer);
  if (this.controlRevealed || this.reducedMotion.matches) return;
  this.discoveryTimer = setTimeout(() => this.revealControl(), CONFIG.discoveryDelay);
}

revealControl() {
  this.controlRevealed = true;
  this.control.classList.add('is-revealed');
  this.control.setAttribute('aria-hidden', 'false');
  this.control.tabIndex = 0;
}

start() {
  if (this.activated || this.reducedMotion.matches) return;
  this.activated = true;
  this.spawnInitialPatterns();
  this.resume();
  this.setControlState('Pause Game of Life', true);
}

toggle() {
  if (!this.activated) this.start();
  else if (this.running) {
    this.pause();
    this.setControlState('Resume Game of Life', false);
  } else {
    this.resume();
    this.setControlState('Pause Game of Life', true);
  }
}
```

- [ ] **Step 6: Run syntax, focused, and full verification**

Run: `node --check game-of-life.js && node --test tests/game-of-life.test.mjs && node --test tests/*.test.mjs`

Expected: JavaScript syntax passes, the focused interaction tests pass, and all site tests pass.

- [ ] **Step 7: Commit the implementation**

```bash
git add tests/game-of-life.test.mjs index.html styles.css game-of-life.js
git commit -m "feat: defer Game of Life until invited"
```
