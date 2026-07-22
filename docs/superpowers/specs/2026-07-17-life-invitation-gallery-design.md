# Game of Life Invitation Gallery

## Goal

Let Antreas compare all twenty proposed Game of Life invitations in the live homepage, ordered from least to most aggressive, without changing the simulation itself.

## Review control

A compact, fixed `Invitation lab` selector sits below the navigation. It is visibly separate from the candidate treatment, carries options `01` through `20`, and defaults to option 1. Changing it immediately removes the previous treatment and mounts the selected one. The selector is a local review instrument, not a proposed production element.

## Variant model

All twenty treatments share one semantic start button and one `GameOfLife` instance. A variant registry defines the invitation copy, icon, placement, presentation class, optional atmospheric elements, and whether the treatment is immediately visible or follows the existing inactivity delay. Escalation proceeds from inline whisper, through hero-anchored controls and floating prompts, to viewport-level theatrical interventions.

The twenty treatments are:

1. Quiet inline link beneath the portrait caption.
2. Pulsing life-cell icon with hover/focus label.
3. Faint `EMERGE` beneath the hero introduction.
4. Small pill beside the current-work navigation target.
5. Ghost button beneath the portrait interaction.
6. Quiet prompt beneath the hero social links.
7. Glowing `EMERGE` pill attached to the portrait.
8. Centred invitation between hero copy and calls to action.
9. Compact centred `EMERGE` button with a slow pulse.
10. Centred button surrounded by dormant preview cells.
11. A sealed-experiment card.
12. A full-width divider interrupted by `EMERGE`.
13. A persistent bottom-centre pill.
14. A floating pill whose surrounding cells accumulate.
15. A guide-cell trail pointing toward `EMERGE`.
16. A translucent bottom panel with the nature line.
17. A dimmed page with a sharply illuminated control.
18. Viewport-edge cells converging on the control.
19. A dramatic central `LET THERE BE CHAOS` interruption.
20. A full-screen cellular breach with an enormous `EMERGE` command.

## Interaction and cleanup

Selecting a variant resets the invitation state but does not reload the page. Variant-specific decoration lives in one presentation layer and is replaced atomically. Starting Life dismisses theatrical overlays, preserves the active simulation across the page, and changes the shared control to deterministic pause/resume states. Keyboard operation, focus visibility, reduced-motion behaviour, light/dark themes, and small screens remain supported.

## Verification

Automated tests require exactly twenty labelled selector options, twenty registry entries, distinct escalation classes, one shared start control, clean variant selection, and reduced-motion handling. Browser verification covers representative low-, middle-, and maximum-aggression options on the local preview.
