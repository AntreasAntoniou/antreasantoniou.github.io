import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const page = fs.readFileSync(new URL('../archivum/index.html', import.meta.url), 'utf8');
const homepage = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const blog = fs.readFileSync(new URL('../blog/index.html', import.meta.url), 'utf8');

test('publishes the canonical Archivum landing page', () => {
  assert.match(page, /<link rel="canonical" href="https:\/\/antreas\.io\/archivum\/">/);
  assert.match(page, /Chats disappear\. Research should accumulate\./);
  assert.match(page, /Capture/);
  assert.match(page, /Write back/);
});

test('connects the page to the public repository and project mark', () => {
  assert.match(page, /https:\/\/github\.com\/AntreasAntoniou\/archivum/);
  assert.match(page, /Use the GitHub template/);
  assert.match(page, /skills\/archivum/);
  assert.match(page, /images\/archivum-mimic\.png/);
  assert.match(page, /images\/archivum-icon\.png/);
});

test('makes Archivum discoverable from the portfolio and blog', () => {
  assert.match(homepage, /href="archivum\/"/);
  assert.match(homepage, /Git-backed, agent-readable operating system/);
  assert.match(blog, /href="\/archivum\/"/);
});

test('documents privacy-safe use cases proven in sustained use', () => {
  assert.match(page, /Return to my work after weeks or months/);
  assert.match(page, /Recover useful state from my conversations/);
  assert.match(page, /Develop my research without flattening uncertainty/);
  assert.match(page, /Publish the result, not my private process/);
  assert.match(page, /Move my work between agents without starting again/);
  assert.match(page, /Run my week without losing the long term/);
  assert.match(page, /Build tools around my archive/);
  assert.match(page, /My personal records, private decisions, unpublished work, and confidential project details remain private/);
});

test('speaks from Antreas’s lived use before offering the system to others', () => {
  assert.match(page, /I built to carry my knowledge, projects, research, decisions, and long-horizon work/);
  assert.match(page, /beneath my research, software, writing, planning/);
  assert.match(page, /I use it in two modes/);
  assert.match(page, /across my personal, administrative, and research archives/);
  assert.match(page, /My personal and research archives remain private/);
});

test('orders usefulness before mechanics and adoption details', () => {
  const useCases = page.indexOf('id="use-cases"');
  const durableValue = page.indexOf('id="what-persists"');
  const operatingLoop = page.indexOf('id="how-it-works"');
  const adoption = page.indexOf('id="adopt"');
  const lineage = page.indexOf('id="lineage"');

  assert.ok(useCases > 0);
  assert.ok(useCases < durableValue);
  assert.ok(durableValue < operatingLoop);
  assert.ok(operatingLoop < adoption);
  assert.ok(adoption < lineage);
  assert.match(page, /href="#use-cases">See what it enables<\/a>/);
});
