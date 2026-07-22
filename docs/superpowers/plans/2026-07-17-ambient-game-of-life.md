# Ambient Game of Life Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the homepage's hero-only Game of Life into a discoverable, accessible ambient simulation that follows the visitor through the whole page.

**Architecture:** A fixed viewport canvas is appended to `body`, while document-level pointer listeners translate viewport coordinates into grid cells without intercepting page controls. The profile image becomes a semantic button whose click both swaps portraits and calls a public `spawnAtClientPoint()` method on the simulation.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Node.js built-in test runner.

## Global Constraints

- Interaction activates exactly 900 ms after initialisation.
- The canvas remains pointer-transparent and fixed to the viewport.
- The visible cue reads exactly **Click to evolve**.
- The portrait control works with pointer and keyboard input.
- `prefers-reduced-motion: reduce` disables ambient evolution and pointer seeding.
- No dependencies or site-wide visual-system changes.

---

### Task 1: Lock the interaction contract with tests

**Files:**
- Create: `tests/game-of-life.test.mjs`

**Interfaces:**
- Consumes: `index.html`, `styles.css`, and `game-of-life.js` as UTF-8 strings.
- Produces: regression checks for the fixed canvas, timing, profile control, public seeding method, and reduced-motion behaviour.

- [ ] **Step 1: Write the failing tests**

```js
test('runs one fixed simulation throughout the page', () => {
  assert.match(script, /activationDelay:\s*900/);
  assert.match(script, /document\.body\.appendChild\(canvas\)/);
  assert.match(css, /#gol-canvas\s*\{[\s\S]*?position:\s*fixed/);
  assert.match(css, /#gol-canvas\s*\{[\s\S]*?pointer-events:\s*none/);
});

test('makes the portrait interaction explicit and accessible', () => {
  assert.match(home, /<button[^>]+id="profile-evolve-control"/);
  assert.match(home, />\s*Click to evolve\s*</);
  assert.match(home, /spawnAtClientPoint/);
});

test('honours reduced motion', () => {
  assert.match(script, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test tests/game-of-life.test.mjs`

Expected: FAIL because the existing simulation is hero-scoped, activates after 3000 ms, and uses a disappearing paragraph as its profile hint.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/game-of-life.test.mjs
git commit -m "test: define ambient Game of Life interaction"
```

### Task 2: Implement the ambient simulation and profile control

**Files:**
- Modify: `game-of-life.js`
- Modify: `index.html`
- Modify: `styles.css`
- Test: `tests/game-of-life.test.mjs`

**Interfaces:**
- Consumes: `window.gameOfLife` created by `game-of-life.js` and the profile button's viewport rectangle.
- Produces: `GameOfLife.spawnAtClientPoint(clientX: number, clientY: number, patternName?: string): void`.

- [ ] **Step 1: Make the canvas viewport-scoped and expose coordinate seeding**

```js
const CONFIG = {
  cellSize: 8,
  updateInterval: 100,
  dwellTime: 500,
  dwellRadius: 3,
  fadeSteps: 10,
  spawnPatterns: true,
  activationDelay: 900,
};

spawnAtClientPoint(clientX, clientY, patternName) {
  if (!this.activated || this.reducedMotion.matches) return;
  const x = Math.floor(clientX / CONFIG.cellSize);
  const y = Math.floor(clientY / CONFIG.cellSize);
  this.spawnPattern(x, y, patternName);
}

const canvas = document.createElement('canvas');
canvas.id = 'gol-canvas';
canvas.setAttribute('aria-hidden', 'true');
document.body.appendChild(canvas);
```

- [ ] **Step 2: Move interaction listeners to the document and guard controls**

```js
document.addEventListener('click', (event) => {
  if (event.target.closest('a, button, input, textarea, select, label')) return;
  this.spawnAtClientPoint(event.clientX, event.clientY);
});

document.addEventListener('pointermove', (event) => {
  if (!this.activated || this.reducedMotion.matches) return;
  const x = Math.floor(event.clientX / CONFIG.cellSize);
  const y = Math.floor(event.clientY / CONFIG.cellSize);
  const pos = `${x},${y}`;
  if (this.lastDwellPos === pos) return;
  this.lastDwellPos = pos;
  clearTimeout(this.dwellTimer);
  this.dwellTimer = setTimeout(() => {
    if (this.activated && !this.reducedMotion.matches) {
      this.spawnRandom(x, y, CONFIG.dwellRadius);
    }
  }, CONFIG.dwellTime);
});
```

- [ ] **Step 3: Replace the decorative portrait wrapper with a real button**

```html
<button id="profile-evolve-control" type="button" class="profile-evolve-control"
        onclick="toggleProfileImage()"
        aria-label="Evolve the portrait and seed the Game of Life">
  <span class="relative block w-64 h-64 rounded-full overflow-hidden profile-image">
    <img id="hero-profile" src="images/profile.jpg"
         alt="Antreas Antoniou, AI Researcher and Engineer"
         class="w-full h-full object-cover transition-transform">
  </span>
  <span id="profile-hint" class="profile-hint">
    <i class="fas fa-arrow-pointer" aria-hidden="true"></i>
    Click to evolve
  </span>
</button>
```

- [ ] **Step 4: Seed the simulation from the portrait click**

```js
const rect = heroProfile.getBoundingClientRect();
window.gameOfLife?.spawnAtClientPoint(
  rect.left + rect.width / 2,
  rect.top + rect.height / 2,
  'acorn',
);
```

- [ ] **Step 5: Apply fixed-layer, affordance, and reduced-motion styles**

```css
#gol-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 40;
  opacity: 0.2;
}

.profile-evolve-control {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

@media (prefers-reduced-motion: reduce) {
  #gol-canvas { display: none; }
  .profile-evolve-control * { transition: none !important; }
}
```

- [ ] **Step 6: Run focused and complete verification**

Run: `node --check game-of-life.js && node --test tests/game-of-life.test.mjs && node --test tests/*.test.mjs`

Expected: JavaScript syntax check passes, focused tests pass, and the full suite passes.

- [ ] **Step 7: Commit the local implementation**

```bash
git add game-of-life.js index.html styles.css tests/game-of-life.test.mjs
git commit -m "feat: carry Game of Life through homepage"
```
