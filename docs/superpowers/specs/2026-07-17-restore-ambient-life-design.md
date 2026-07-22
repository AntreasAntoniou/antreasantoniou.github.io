# Restore the ambient Game of Life

## Intent

Return the homepage interaction to the restrained version that worked as an easter egg, not a research instrument.

## Experience

- Remove experiment modes, metrics, protocol copy, hypotheses, and comparison panels.
- Use only introduction 16, “Rising nature panel”; remove the comparison selector and introduction 11.
- Keep the introduction fixed to the viewport so it appears wherever the reader happens to be.
- `EMERGE` launches the simulation; after activation the panel collapses to a quiet pause control.
- Keep the Game of Life field fixed across the whole homepage.
- Keep cells slightly more visible than the original implementation.
- After activation, clicking empty page space seeds a pattern and dwelling adds a local disturbance.
- The portrait remains an independent interaction.

## Initial conditions

The first activation creates a fresh world every time. It chooses a small random set of known Life patterns, random positions, and random rotations. Pause and resume do not reseed the world; reloading and activating again creates a different one.

Curated patterns are preferable to a fully random bitmap because they preserve surprise without frequently collapsing into immediate visual noise or extinction.

## Accessibility and scope

- Respect `prefers-reduced-motion` by hiding the animation and introduction.
- Keep the canvas non-interactive so normal page controls remain usable.
- Remove the now-unused experiment runtime and its experiment-specific tests.
- Test the single-introduction DOM contract, random initial seeding, page-wide interaction, and absence of experiment UI.
