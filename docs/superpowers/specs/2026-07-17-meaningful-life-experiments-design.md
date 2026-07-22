# Meaningful Game of Life Experiments

## Purpose

Replace the twenty invitation mockups with a persistent experimental playground that expresses ten of Antreas's actual research questions. The interaction must remain a cellular-automata demonstration, not be presented as evidence about neural networks or intelligence.

## Persistent presentation

The review lab exposes two independent selectors:

- `Experiment`: ten substantive experimental modes.
- `Presentation`: `11 · Sealed experiment` and `16 · Persistent field panel`.

Both presentations are fixed to the viewport and therefore follow the reader anywhere on the homepage. The sealed experiment is a compact bottom-right instrument card. The field panel is a full-width bottom instrument strip. Starting a run keeps the selected instrument visible so live metrics and controls remain legible.

## Shared experimental engine

A deterministic cellular engine owns grids, cell types, age, memory traces, preview states, generation count, update budget, state-change count, and run outcomes. Every mode uses the same engine and seeded pseudorandom generator. Split comparisons receive explicit spatial panels with independent boundaries and labels.

The engine exposes reset, step, pointer interaction, perturbation, preview, rendering, and readout operations. Changing experiment or presentation clears transient state and never creates another canvas or Life instance.

## Ten modes

1. **Same budget, different structure.** Two equal-size populations receive the same rules, initial live-cell count, and generation budget. One is random and one is composed from known motifs. Report active generations, state changes, and live cells. Conclusion copy states only what happened in this run.
2. **Structure versus scale.** A larger random population is compared with a smaller structured population under the same rules. Report population and activity separately; do not imply that one run establishes a general scaling law.
3. **Adaptive compute.** A fixed update budget is routed around the pointer. Cells outside the active compute radius retain state. Report updates spent and remaining budget.
4. **Sharp behavioural transition.** A coupling slider continuously changes the weight of diagonal neighbours. Report the selected coupling and observed regime as extinction, stable, active, or expansive. Use “sharp behavioural transition,” not “phase transition.”
5. **Antifragility test.** A perturbation control removes a region and injects noise. Report pre-perturbation activity and recovery after thirty generations as collapse, recovery, or reorganisation.
6. **Memory changes the future.** Equal starting populations run side by side. One uses decaying state traces as a small contribution to future updates; the other uses canonical local state only.
7. **Internal simulation.** Pointer movement previews a faint eight-generation rollout of a candidate intervention. Clicking commits the preview. Preview cells are explicitly labelled as simulated, not observed.
8. **Computational diversity.** Three visible cell types use distinct survival tolerances while sharing one budget. Report type diversity and population without describing the system as intelligent.
9. **Attached to the truth.** Each deterministic trial displays its prediction before running and records the actual outcome, including extinction and fixed points. A secondary control advances through preregistered trials.
10. **Substrate independence.** Equal seeds run over square, hexagonal, and sparse long-range neighbourhoods in three labelled panels. Report outcomes per substrate.

## Semantic colour

Cell colour is instrumentation:

- bright cyan: newly born cells;
- high-contrast navy or pale blue: persistent cells;
- violet and amber: additional cell types;
- warm amber afterimage: recently dead cells;
- slate: random or control populations;
- translucent cyan: simulated future cells.

Canvas opacity and per-cell alpha are increased from the ambient prototype, while text-bearing cards retain a blurred opaque backing for readability in both themes.

## Interface and honesty

Every mode shows an experiment number, question, hypothesis or protocol, live metrics, primary run/pause control, context-specific secondary control, and a one-line interpretation. The persistent caveat reads: `A cellular-automata demonstration, not evidence about neural networks.`

Reduced-motion users can inspect every experiment and its protocol, but animation does not start. Keyboard focus, touch targets, small screens, light/dark themes, and portrait independence remain supported.

## Verification

Automated tests cover exactly ten experiment definitions, exactly two presentations, deterministic seeded runs, equal-budget guarantees where claimed, all specialised mechanics, semantic colours, one canvas, state cleanup, and honest language. Browser verification covers both presentations and all ten modes, with direct interaction checks for adaptive compute, coupling, perturbation, preview commitment, trial advancement, pause/resume, scrolling, and theme changes.
