# Ambient Game of Life interaction design

## Objective

Make the homepage's Game of Life discoverable within the first second, clearly connect the profile photograph to an interaction, and let the same simulation remain present while a visitor scrolls beyond the hero.

## Chosen interaction

- Replace the hero-owned canvas with one fixed, viewport-sized canvas that remains in place as the document scrolls.
- Enable the simulation after 900 ms instead of 3 seconds.
- Keep the canvas pointer-transparent. Listen for pointer movement and clicks at document level so links, buttons, and text selection continue to work normally.
- Retain click-to-seed and dwell-to-seed behaviour throughout the page.
- Present an always-visible, understated **Click to evolve** cue below the profile image. The image itself remains keyboard-focusable and exposes the same action to assistive technology.
- Clicking the profile photograph swaps between the photographic and illustrated portraits and seeds a recognisable pattern near the portrait.

## Visual treatment

Preserve the site's existing Inter typography and light/dark tokens. The canvas uses the existing accent colour and sits above section fills but below navigation and interactive content. Its opacity is reduced from the hero-only treatment so cells remain atmospheric and do not impair reading. The profile cue uses the existing muted/accent colours, with a small directional icon and a restrained hover/focus response rather than a looping attention animation.

The signature remains specific to the research identity: one evolving computational field follows the reader through the entire research portfolio, and the profile acts as its explicit entry point.

## Responsive, accessibility, and performance behaviour

- Size the grid to the viewport rather than the full document; this avoids allocating cells for thousands of off-screen pixels.
- Preserve the live grid across viewport resizes where possible.
- Throttle pointer-driven seeding and retain the existing bounded update interval.
- Disable automatic evolution and pointer seeding when `prefers-reduced-motion: reduce` is active; the profile-image toggle remains usable without animation.
- Use a real button for the profile control, with a descriptive accessible label and visible keyboard focus.

## Acceptance criteria

1. The simulation accepts interaction 900 ms after initialisation.
2. The same living grid remains visible from hero through contact section while scrolling.
3. The canvas never blocks navigation, links, buttons, or text selection.
4. The profile control visibly says **Click to evolve**, works by pointer and keyboard, swaps portraits, and seeds the simulation.
5. Light and dark themes remain legible on desktop and mobile.
6. Reduced-motion users do not receive the ambient animation.
