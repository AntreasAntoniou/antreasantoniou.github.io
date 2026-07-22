# Random Game of Life Invitation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centre the delayed Game of Life invitation, select one approved line per page load, and install the director’s-cut portrait copy.

**Architecture:** `game-of-life.js` selects and owns one start invitation for the lifetime of its `GameOfLife` instance, while keeping Pause and Resume deterministic. Existing HTML provides a useful fallback; CSS centres the fixed control and constrains its width on mobile.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Node.js built-in test runner.

## Global Constraints

- Choose uniformly from exactly five approved invitation lines once per page load.
- Never reroll on reveal, pause, resume, or portrait interaction.
- Keep the 12-second inactivity reveal.
- Centre the invitation near the bottom viewport edge.
- Accessible start copy must explicitly name Game of Life.
- Portrait copy must use **Show the director’s cut** and **Return to documentary footage**.

---

### Task 1: Implement random centred invitation copy

**Files:**
- Modify: `tests/game-of-life.test.mjs`
- Modify: `game-of-life.js`
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `#gol-control`, `#gol-control-label`, and `#profile-hint-label`.
- Produces: stable `GameOfLife.startInvitation: string` and `setStartInvitation(): void`.

- [ ] **Step 1: Write the failing contract tests**

```js
const invitations = [
  'Let there be Life',
  'Add a little chaos',
  'Let there be chaos!',
  'EMERGE',
  'Nobody really knows what happens if you click this',
];

test('chooses one approved start invitation for each page load', () => {
  for (const invitation of invitations) assert.match(script, new RegExp(invitation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(script, /this\.startInvitation\s*=\s*START_INVITATIONS\[/);
  assert.match(script, /Math\.floor\(Math\.random\(\) \* START_INVITATIONS\.length\)/);
  assert.match(script, /Start Game of Life: \$\{this\.startInvitation\}/);
});

test('centres the invitation and safely constrains long copy', () => {
  assert.match(css, /\.gol-control\s*\{[\s\S]*?left:\s*50%/);
  assert.match(css, /\.gol-control\s*\{[\s\S]*?max-width:\s*calc\(100vw - 2rem\)/);
});

test('uses the director cut portrait pair', () => {
  assert.match(home, /Show the director’s cut/);
  assert.match(home, /Return to documentary footage/);
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test tests/game-of-life.test.mjs`

Expected: FAIL because copy is static, the control is right-aligned, and the portrait still uses descriptive labels.

- [ ] **Step 3: Add stable random selection and explicit accessibility copy**

```js
const START_INVITATIONS = [
  'Let there be Life',
  'Add a little chaos',
  'Let there be chaos!',
  'EMERGE',
  'Nobody really knows what happens if you click this',
];

this.startInvitation = START_INVITATIONS[
  Math.floor(Math.random() * START_INVITATIONS.length)
];

setStartInvitation() {
  if (this.controlLabel) this.controlLabel.textContent = this.startInvitation;
  if (this.control) {
    this.control.setAttribute('aria-label', `Start Game of Life: ${this.startInvitation}`);
    this.control.classList.remove('is-active');
  }
}
```

- [ ] **Step 4: Centre and constrain the control**

```css
.gol-control {
  left: 50%;
  right: auto;
  bottom: 1.25rem;
  max-width: calc(100vw - 2rem);
  justify-content: center;
  text-align: center;
  transform: translate(-50%, 8px);
}

.gol-control.is-revealed {
  transform: translate(-50%, 0);
}
```

- [ ] **Step 5: Replace portrait labels**

```html
<span id="profile-hint-label">Show the director’s cut</span>
```

```js
const nextLabel = currentProfileIndex === 0
  ? 'Show the director’s cut'
  : 'Return to documentary footage';
```

- [ ] **Step 6: Run complete verification**

Run: `node --check game-of-life.js && node --test tests/game-of-life.test.mjs && node --test tests/*.test.mjs`

Expected: Syntax and all tests pass.

- [ ] **Step 7: Commit**

```bash
git add tests/game-of-life.test.mjs game-of-life.js index.html styles.css
git commit -m "feat: randomize centred Life invitation"
```
