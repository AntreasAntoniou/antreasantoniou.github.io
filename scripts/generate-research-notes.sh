#!/usr/bin/env bash
set -euo pipefail

SITE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
: "${RESEARCH_ARCHIVUM_POSTS_DIR:?Set RESEARCH_ARCHIVUM_POSTS_DIR to the Archivum 09_blog_posts directory}"
: "${DISTILLED_MICRO_MODELS_SOURCE_DIR:?Set DISTILLED_MICRO_MODELS_SOURCE_DIR to the corresponding private Archivum source directory name}"
ARCHIVUM_ROOT="$RESEARCH_ARCHIVUM_POSTS_DIR"
TEMPLATE="$SITE_ROOT/scripts/research-note-template.html"
FILTER="$SITE_ROOT/scripts/drop-source-title.lua"

build_post() {
  local slug="$1"
  local source_file="$2"
  local title="$3"
  local description="$4"
  local deck="$4"
  local idea="$5"
  local mechanism="$6"
  local implication="$7"
  local destination="$SITE_ROOT/blog/$slug/index.html"

  mkdir -p "$(dirname "$destination")"
  pandoc "$ARCHIVUM_ROOT/$source_file/content.md" \
    --from=gfm \
    --to=html5 \
    --standalone \
    --template="$TEMPLATE" \
    --lua-filter="$FILTER" \
    --metadata "title=$title" \
    --metadata "description=$description" \
    --metadata "canonical=https://antreas.io/blog/$slug/" \
    --metadata "deck=$deck" \
    --metadata "idea=$idea" \
    --metadata "mechanism=$mechanism" \
    --metadata "implication=$implication" \
    --output="$destination"
}

build_post \
  "distilled-micro-models" \
  "$DISTILLED_MICRO_MODELS_SOURCE_DIR" \
  "Aircraft Carriers and Fishing Boats" \
  "General-purpose models are extraordinary. Deploying one for every tiny decision is still like taking an aircraft carrier fishing." \
  "Most production tasks need surgical precision, not general intelligence." \
  "Distil a broad teacher into local specialists with sharply defined jobs." \
  "Optimise the system for latency, privacy, reliability, and energy—not parameter count."

build_post \
  "fortress-mode" \
  "04_local_first_ai" \
  "Fortress Mode: Why Your AI Should Never Phone Home" \
  "A practical argument for local-first personal AI and privacy enforced by architecture." \
  "The AI features that know you best are also the ones that create the largest privacy surface." \
  "Keep storage and inference local by default; make every network boundary explicit." \
  "Trust becomes an architectural property rather than a line in a privacy policy."

build_post \
  "ai-memory-and-cognition" \
  "05_ai_memory_cognition" \
  "If You Don’t Use It, You Lose It" \
  "What cognitive offloading changes when AI takes over more writing, recall, and mechanical production." \
  "AI does not simply increase productivity; it reallocates which human abilities get exercised." \
  "Use AI aggressively where speed matters, while practising deliberately where retained fluency matters." \
  "The goal is not to reject offloading, but to choose which cognitive muscles we are willing to lose."

build_post \
  "distillation" \
  "08_distillation" \
  "Distillation: Teaching Small Models Big Tricks" \
  "How task-specific students turn broad model capability into fast, local inference—and what gets lost." \
  "A large model can be a capability frontier without being the model that ships." \
  "Generate and curate task-specific supervision, then train the smallest student that clears the real acceptance tests." \
  "Frontier research and efficient deployment become complementary layers of one system."

build_post \
  "ai-education" \
  "09_ai_education" \
  "The Gamification Hypothesis" \
  "Why personalisation is only half of AI tutoring; motivation and incentive design are the harder half." \
  "A tutor that can explain anything still fails if the learner is rewarded for taking shortcuts." \
  "Combine adaptive Socratic guidance with mechanics that reward explanation, connection, and persistence." \
  "AI could make individual tutoring abundant, but learning design determines whether abundance becomes understanding."

build_post \
  "building-jarvis" \
  "10_building_jarvis" \
  "Building Jarvis" \
  "The engineering path from stateless chatbots to personal AI with durable, private context." \
  "Without memory, an AI assistant is a clever stranger at the start of every conversation." \
  "Capture, structure, retrieve, synthesise, then earn the right to become proactive." \
  "Persistent context turns isolated prompts into collaboration—but only if the memory remains under user control."

build_post \
  "cheap-then-clean" \
  "12_ocr_pipelines" \
  "The Cheap-Then-Clean Architecture" \
  "A two-pass pattern for continuous AI pipelines operating under strict local compute budgets." \
  "Uniformly spending expensive compute on a repetitive stream wastes most of the budget." \
  "Run a cheap first pass continuously; consolidate and clean only when enough new signal has accumulated." \
  "Resource-rational pipelines can improve both quality and efficiency by deciding when expensive processing is deserved."

build_post \
  "attention-learns-its-wiring" \
  "14_attention_explained" \
  "Attention Learns Its Own Wiring" \
  "Attention as dynamic connectivity: a model choosing which relationships matter for this input." \
  "Architecture is a communication graph, and fixed graphs bake assumptions into what a network can compute efficiently." \
  "Queries and keys make the effective connectivity pattern conditional on the input." \
  "Topology becomes a learnable computational resource—and therefore a candidate scaling axis."

build_post \
  "failing-optimally" \
  "17_failing_optimally" \
  "Failing Optimally" \
  "The research craft of turning failed experiments into maximum information per unit of time." \
  "Failure is not judgment; it is data about which part of the search space is empty." \
  "Set kill criteria, seek early signal, and choose experiments that distinguish between hypotheses." \
  "A good research culture does not avoid failure. It makes failure legible, cheap, and cumulative."

build_post \
  "embodied-ai" \
  "20_embodied_ai" \
  "Embodied AI: Fluffy Balls That Float" \
  "A deliberately non-humanoid vision of soft, ambient, local intelligence in the physical world." \
  "Embodiment should fit the function; intelligence does not require a metal imitation of the human form." \
  "Combine specialised local models, low-power sensors, visible presence, and user-controlled data." \
  "The most useful embodied AI may be a distributed ecology of helpful objects rather than one general-purpose robot."

node "$SITE_ROOT/scripts/editorial-cleanup.mjs" "$SITE_ROOT"
