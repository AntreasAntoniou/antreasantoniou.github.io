import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const script = readFileSync(new URL('../game-of-life.js', import.meta.url), 'utf8');

function initialSeedGenerator() {
  const source = script.match(/function createInitialSeeds\([\s\S]*?\n  \}\n\n  class GameOfLife/)?.[0]
    .replace(/\n\n  class GameOfLife$/, '');
  assert.ok(source, 'createInitialSeeds must remain a standalone, testable function');
  return Function(`return (${source})`)();
}

test('publishes only the chosen rising nature introduction', () => {
  assert.equal((home.match(/id="gol-control"/g) ?? []).length, 1);
  assert.equal((home.match(/id="gol-control-label"/g) ?? []).length, 1);
  assert.equal((home.match(/id="gol-presentation-select"/g) ?? []).length, 0);
  assert.match(home, /id="gol-presentation"[^>]+data-variant="16"/);
  assert.match(home, /Nature abhors a static portfolio\./);
  assert.doesNotMatch(home, /Sealed experiment|SEALED EXPERIMENT|gol-experiment-select|Protocol ready|Run the comparison/);
  assert.match(home, />EMERGE</);
});

test('keeps the rising nature introduction fixed wherever the reader is', () => {
  assert.match(css, /\[data-variant="16"\]\s*\{[\s\S]*?position:\s*fixed/);
  assert.match(css, /\[data-variant="16"\][\s\S]*?border-top:/);
  assert.doesNotMatch(css, /\[data-variant="11"\]|gol-presentation-picker/);
  assert.doesNotMatch(script, /PRESENTATIONS|presentationSelect|applyPresentation/);
});

test('reveals EMERGE five seconds after the visit begins without activity resets', () => {
  assert.match(script, /discoveryDelay:\s*5000/);
  assert.match(script, /setTimeout\(\(\) => this\.revealControl\(\), CONFIG\.discoveryDelay\)/);
  assert.doesNotMatch(script, /registerActivity/);
});

test('versions the Game of Life script so returning visitors cannot keep stale reveal logic', () => {
  assert.match(home, /<script src="game-of-life\.js\?v=20260724-5s"><\/script>/);
});

test('uses one non-blocking canvas across the whole viewport', () => {
  assert.match(css, /#gol-canvas\s*\{[\s\S]*?position:\s*fixed/);
  assert.match(css, /#gol-canvas\s*\{[\s\S]*?pointer-events:\s*none/);
  assert.match(css, /#gol-canvas\s*\{[\s\S]*?opacity:\s*0\.[3-6]/);
  assert.equal((script.match(/document\.createElement\('canvas'\)/g) ?? []).length, 1);
  assert.match(script, /document\.body\.appendChild\(canvas\)/);
});

test('keeps the EMERGE, click, and dwell interactions', () => {
  assert.match(script, /startInvitation = 'EMERGE'/);
  assert.match(script, /this\.control\.addEventListener\('click', \(\) => this\.toggle\(\)\)/);
  assert.match(script, /document\.addEventListener\('click'/);
  assert.match(script, /this\.spawnAtClientPoint\(event\.clientX, event\.clientY\)/);
  assert.match(script, /document\.addEventListener\('pointermove'/);
  assert.match(script, /this\.spawnRandom\(x, y, CONFIG\.dwellRadius\)/);
});

test('keeps the portrait independent and respects reduced motion', () => {
  const portraitFunction = home.match(/function toggleProfileImage\(\) \{[\s\S]*?\n    \}/)?.[0] ?? '';
  assert.doesNotMatch(portraitFunction, /gameOfLife|gol-control/);
  assert.match(script, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*#gol-canvas/);
});

test('creates fresh, bounded, curated initial conditions from the supplied randomness', () => {
  const createInitialSeeds = initialSeedGenerator();
  const patterns = ['glider', 'acorn', 'pulsar'];
  const low = createInitialSeeds(100, 60, patterns, () => 0.1);
  const high = createInitialSeeds(100, 60, patterns, () => 0.9);

  assert.notDeepEqual(low, high);
  assert.ok(low.length >= 3 && low.length <= 6);
  assert.ok(high.length >= 3 && high.length <= 6);

  for (const seed of [...low, ...high]) {
    assert.ok(seed.x >= 0 && seed.x < 100);
    assert.ok(seed.y >= 0 && seed.y < 60);
    assert.ok(patterns.includes(seed.patternName));
    assert.ok(Number.isInteger(seed.rotation) && seed.rotation >= 0 && seed.rotation < 4);
  }
});

test('randomized initial conditions are created once on activation, not on resume', () => {
  const spawnInitialPatterns = script.match(/spawnInitialPatterns\(\) \{[\s\S]*?\n    \}/)?.[0] ?? '';
  const start = script.match(/start\(\) \{[\s\S]*?\n    \}/)?.[0] ?? '';
  const resume = script.match(/resume\(\) \{[\s\S]*?\n    \}/)?.[0] ?? '';

  assert.match(spawnInitialPatterns, /createInitialSeeds/);
  assert.match(start, /this\.spawnInitialPatterns\(\)/);
  assert.doesNotMatch(resume, /spawnInitialPatterns|createInitialSeeds/);
});
