# Deferred Game of Life control design

## Objective

Keep the portfolio content visually dominant until a visitor has paused, then offer the Game of Life as an optional interactive layer. Starting, pausing, and interacting with Life must remain separate from changing the profile portrait.

## Interaction model

### Before discovery

- The Game of Life canvas exists but is empty, paused, and visually absent.
- No timer starts the simulation automatically.
- A 12-second inactivity timer watches meaningful pointer movement, scrolling, clicking, and keyboard input.
- Activity resets the timer until the control has been revealed.

### Discovery

- After 12 uninterrupted seconds of inactivity, a restrained fixed control fades into the lower-right corner.
- The control reads **Start Game of Life** and uses the site's existing navy, border, background, and typography tokens.
- Once revealed, the control remains available; moving toward it does not hide it.

### Active play

- Selecting **Start Game of Life** seeds the initial patterns, begins evolution, and changes the control to **Pause Game of Life**.
- Clicking empty page space seeds a distinct pattern at that viewport position.
- Dwelling with the pointer generates local cells.
- Links, buttons, inputs, labels, and text selection remain unaffected because the canvas remains pointer-transparent and document listeners ignore interactive controls.
- Selecting **Pause Game of Life** stops evolution and pointer/click seeding without clearing the visible state. Selecting **Resume Game of Life** continues the same state.

### Portrait interaction

- Clicking the portrait only swaps the image; it never starts, seeds, pauses, or otherwise changes Game of Life.
- The portrait caption initially reads **View illustrated portrait** and changes to **View photograph** while the illustration is shown.
- The portrait control's accessible label changes with the visible caption.

## Visual treatment

The page retains its existing Inter typography and light/dark colour tokens. The optional Life control is a compact utility pill rather than a primary CTA. It sits above the canvas and below the navigation, with a small grid icon and low-contrast resting state. Its reveal is the only new entrance animation. The control gains normal accent contrast on hover and focus.

The canvas retains the fixed viewport treatment so the same evolving field follows the reader through the whole homepage. It stays subtle enough to preserve text legibility.

## Accessibility and performance

- The Life control is a real button with visible keyboard focus and an accurate accessible label.
- `prefers-reduced-motion: reduce` prevents the control from revealing and keeps the simulation unavailable.
- Inactivity tracking uses passive pointer and scroll listeners where appropriate and stops resetting after discovery.
- Starting and resuming reuse one simulation instance; no duplicate timers or canvases are created.

## Acceptance criteria

1. Life does not begin automatically and the initial grid remains empty.
2. The start control appears only after 12 seconds without meaningful activity and remains visible afterward.
3. Start, pause, and resume labels accurately reflect simulation state.
4. Once started, empty-space clicks and pointer dwell add cells throughout the page.
5. Portrait clicks only swap portraits, with captions alternating between **View illustrated portrait** and **View photograph**.
6. Interactive page controls continue to work without triggering Life.
7. Reduced-motion users receive neither the reveal nor the ambient simulation.
