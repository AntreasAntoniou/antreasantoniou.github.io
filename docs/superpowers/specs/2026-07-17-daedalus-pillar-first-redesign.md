# DAEDALUS pillar-first page redesign

Date: 2026-07-17  
Status: approved direction; implementation pending

## Objective

Replace the current five-project presentation at `/daedalus/` with a faithful public account of **DAEDALUS: Compositional Intelligence**. The page must make the seven research pillars the primary ontology and treat named projects only as memorable implementation handles.

The page has one job: let a technically serious reader understand what DAEDALUS changes about learning, state, compute, improvement, governance, and optimisation—and how those changes compose—without mistaking research targets for achieved results.

## Source authority

Use sources in this order:

1. `NFAI Submission Axiotic AI.docx` and its matching submitted PDF define the C1–C7 pillar ontology and the compositional architecture.
2. `profile/facts-addendum.md` governs current numerical claims, corrected interpretations, attribution, and retired numbers.
3. `profile/cv.md` and `profile/narratives/daedalus-sprind.md` provide public-safe context where they do not conflict with the two sources above.
4. The existing `/daedalus/` page supplies visual continuity and verified public links, but not the programme ontology.

The public PDF is the final NFAI submission, not a superseded draft. The page must remove every “superseded” or “historical six-component version” description while retaining a concise warning that programme-scale numbers in the submission are research targets rather than achieved results.

## Correct ontology

| Pillar | Public concept | Secondary implementation handle | Function in the composition |
|---|---|---|---|
| C1 | Better learning signals | CHRONOS | Jointly predicts past, masked present, and future; creates richer temporal pressure than next-token prediction alone. |
| C2 | World modelling for planning | GESTALT | Predicts multimodal world states and simulates candidate actions in latent space before acting. |
| C3 | Explicit memory and recursive latent reasoning | MNEME + ANUBIS | Externalises editable state into read/write memory and performs recurrent reasoning in compact latent space. |
| C4 | Compute-aware attention | SOMA | Routes compute according to predicted information value; makes capability-per-watt a training objective. |
| C5 | Audited self-improvement | CONSENSUS | Generates and filters new training data through multi-agent verification so the improvement loop is inspectable. |
| C6 | Governance by construction | TALOS | Compiles explicit norms and audit traces into the system rather than adding compliance as a wrapper. |
| C7 | Learning beyond backprop | APEX | Uses evolutionary search for non-differentiable parts, architectures, and hyperparameters that gradients cannot directly optimise. |

Project names must never be the main section headings. They appear as compact labels such as `IMPLEMENTATION: CHRONOS` beneath the corresponding concept.

## Compositional model

The page must explain the interaction, not merely list seven ideas:

- C1 creates the temporal learning signal.
- C4 learns where that signal deserves compute.
- C3 gives the system persistent state and a compact recursive workspace.
- C2 uses that state to model futures, compare candidate actions, and act.
- C5 feeds verified experience back into learning.
- C6 constrains and traces the full loop.
- C7 searches learning rules and structures across the stack, especially where end-to-end gradients are inadequate.

The claim is that the pillars **compose rather than add**. The scientific test is compute-matched evaluation, pairwise coupling tests, and leave-one-component-out ablation. A component that supplies no measurable gain is removed unless it provides a separately required capability such as governance.

## Information architecture

### 1. Hero: the thesis

- Eyebrow: `Axiotic AI research programme · submitted to SPRIND NFAI`
- Title: `DAEDALUS`
- Subtitle: `Compositional Intelligence`
- Lead: resource-rational AI that organises function, topology, and energy instead of treating parameter count as the only scaling axis.
- Existence proof: the brain’s roughly 20-watt operating budget, expressed in the “three bananas” register.
- Target discipline: the 1B-versus-100B and ~1/100-compute claims are explicitly labelled programme targets.

### 2. Signature architecture circuit

An accessible HTML/CSS system diagram presents the seven pillars as coupled interfaces around a central `COMPOSED DAEDALUS` node.

Desktop reading order:

```text
               C6 GOVERNANCE ENVELOPE
   C1 SIGNALS → C2 WORLD MODEL → ACTION
        ↓          ↕
   C4 ROUTING ↔ C3 STATE + REASONING
        ↑          ↓
   C7 SEARCH  ← C5 VERIFIED EXPERIENCE LOOP
```

This is conceptual, not a literal tensor graph. A caption must say so. On narrow screens it becomes a linear, numbered sequence with the same semantic order. The diagram must remain understandable with CSS disabled and to screen readers.

### 3. Seven-pillar ledger

Each pillar receives one editorial block with exactly five fields:

1. Missing capability
2. Mechanism
3. Role in the composition
4. Falsifiable test/current state
5. Secondary project label

The ledger replaces the current two-column “five projects” grid. C1–C7 numbering is retained because it is the actual submission taxonomy, not decorative numbering.

### 4. Composition and falsification

Explain why composition is the central research bet. Show the evaluation discipline:

- fixed and compute-matched baselines;
- pairwise integration sweeps;
- leave-one-component-out ablations;
- capability-per-watt accounting;
- negative results recorded rather than hidden.

Current evidence must obey `facts-addendum.md`:

- structure programme: 432 controlled runs, 144 conditions, 3 seeds;
- “sharp capability transitions,” never “proven phase transitions”;
- CHRONOS: the historical 79.7% figure is a non-tie win rate at ~10M, not an accuracy improvement; H1 was falsified at 150M; the remaining hypothesis is a scale/data-regime crossover;
- MNEME results belong to the programme/team and Samuel Jones owns MNEME;
- retired 6,448-run and unverified ReSA/GESTALT performance numbers do not appear.

### 5. Readiness ledger

Present maturity without implying end-to-end completion:

- integrated DAEDALUS: TRL 2–3;
- C1: TRL 4;
- C2: TRL 2–3;
- C3: TRL 3–4;
- C4: TRL 3–4;
- C5: deployed technique TRL 5, training-filter use TRL 3;
- C6: TRL 2–3;
- C7: TRL 4.

Use these as source-reported maturity bands, accompanied by plain-language status. Do not show them as progress bars or percentages.

### 6. Public record

- Link the final NFAI PDF as `Read the final NFAI submission`.
- State that it records the submitted programme and its targets; it is not evidence that programme-level goals have already been achieved.
- Retain links to the Axiotic organisation, public TSP repository, Axiotic site, and INIT.
- Preserve the current attribution note for MNEME and add programme-architect attribution for Antreas where relevant.

## Visual system

The redesign remains recognisably part of `antreas.io` while acquiring a systems-research visual language.

### Colour tokens

- Void: `#050914` — page background
- Deep slate: `#0D1526` — component surfaces
- Circuit blue: `#65A9FF` — active connections and primary accents
- Signal cyan: `#69E3D5` — feedback-loop accent used sparingly
- Paper: `#F4F7FC` — primary type
- Muted steel: `#A8B3C5` — explanatory type

Light mode derives from the existing site variables; the circuit remains legible without relying on colour alone.

### Typography

- Display/thesis: `Source Serif 4`
- Body/navigation: `Inter`
- C1–C7, status, implementation labels, and metrics: `Roboto Mono`

### Layout and signature

- Maximum content width remains approximately 70rem.
- The architecture circuit is the sole expressive visual risk and the page’s signature element.
- Everything below it is editorial and restrained: strong rules, generous spacing, no generic rounded-card wall, no decorative gradients, and no animation beyond one optional reduced-motion-safe circuit reveal.
- Project handles are visually subordinate to concept names.

## Accessibility and responsive behaviour

- Semantic sections and headings; exactly one `h1`.
- Architecture circuit implemented as an ordered list plus CSS, not canvas or an image.
- Visible keyboard focus and descriptive link labels.
- Contrast meeting WCAG AA in light and dark themes.
- `prefers-reduced-motion` disables any reveal.
- At 720px and below, the circuit becomes a single readable column with no horizontal overflow.

## Scope

In scope:

- Rebuild `daedalus/index.html` around C1–C7.
- Correct metadata and public-PDF language.
- Preserve homepage and existing public URLs unless a small homepage copy correction is required for consistency.
- Re-verify the already published NFAI PDF; do not replace it unless byte/content comparison proves it differs from the final submission.

Out of scope:

- Publishing internal repositories or the source DOCX.
- Rewriting Axiotic’s wider website.
- Claiming planned 1B/100B outcomes as results.
- Adding unapproved component benchmarks or retired run counts.

## Acceptance criteria

1. The page names all seven pillars in concept-first C1–C7 order.
2. Project names appear only as secondary implementation labels.
3. The architecture circuit and prose explain how all seven interact.
4. The public NFAI link is described as final, not superseded.
5. Targets, current observations, negative results, TRLs, and attribution are visibly distinct.
6. No retired 6,448-run claim, unqualified 79.7% improvement, “phase transition” claim, or personal MNEME ownership appears.
7. All internal and external links resolve.
8. Desktop/mobile, light/dark, keyboard, reduced-motion, and overflow checks pass.
9. The live PDF remains byte-identical to the approved public source.

