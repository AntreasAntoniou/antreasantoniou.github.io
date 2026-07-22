# Random Game of Life invitation design

## Objective

Make the optional Game of Life invitation more central, memorable, and alive without allowing it to distract from the portfolio before the visitor pauses.

## Placement and reveal

- Move the fixed invitation from the lower-right corner to the horizontal centre of the viewport near the bottom edge.
- Retain the existing 12-second inactivity reveal and dormant-by-default simulation.
- Keep the invitation visible after discovery and preserve the existing Start, Pause, and Resume interaction states.

## Random invitation copy

Choose one line uniformly at random once per page load:

1. **Let there be Life**
2. **Add a little chaos**
3. **Let there be chaos!**
4. **EMERGE**
5. **Nobody really knows what happens if you click this**

The selected line remains stable for the page lifetime. Pausing and resuming never rerolls it. The visual text uses the selected line while the accessible label remains explicit: `Start Game of Life: {selected line}`.

**EMERGE** remains uppercase, has no punctuation, and receives the same utility-pill styling as the other lines. The control width adapts to its contents and wraps the longest line safely on narrow screens.

After activation, the visible and accessible labels become **Pause Game of Life** and **Resume Game of Life** so state remains unambiguous.

## Portrait copy

Replace the current portrait labels with:

- Photograph visible: **Show the director’s cut**
- Illustration visible: **Return to documentary footage**

Portrait switching remains completely independent from Game of Life.

## Acceptance criteria

1. The invitation is horizontally centred near the bottom of the viewport on desktop and mobile.
2. Exactly one of the five approved lines is selected per page load and remains stable until reload.
3. The start control remains hidden until 12 seconds of inactivity.
4. Accessible start copy names Game of Life even when the visible line is cryptic.
5. Pause and Resume labels remain deterministic.
6. The longest invitation wraps without overflowing the viewport.
7. Portrait copy alternates between the approved director’s-cut phrases and never affects the simulation.
