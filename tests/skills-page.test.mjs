import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const page = readFileSync(new URL('skills/index.html', root), 'utf8');
const catalogue = JSON.parse(readFileSync(new URL('skills/catalogue.json', root), 'utf8'));

test('publishes the complete GitHub-verified standalone skill inventory', () => {
  const expected = [
    'agent-orchestra',
    'agent-collaboration-control',
    'grade-a-pipeline',
    'plus-ultra',
    'visual-qa',
    'heimdall',
    'cross-agent-sync',
    'argus-skill',
    'chronicle',
    'archivum',
    'doppel',
    'beautiful-pdf',
    'local-uis',
    'gcp-keyless',
    'bitwarden-lease',
    'mailbutler-agent-skill',
  ];

  assert.deepEqual(catalogue.skills.map((skill) => skill.slug), expected);
  for (const slug of expected) {
    assert.match(page, new RegExp(`data-skill="${slug}"`));
    assert.match(page, new RegExp(`https://github\\.com/AntreasAntoniou/${slug}`));
    assert.match(page, new RegExp(`npx skills add AntreasAntoniou/${slug}`));
  }
  assert.equal((page.match(/data-skill="/g) ?? []).length, expected.length);
});

test('states important host and safety boundaries without overstating the tools', () => {
  assert.match(page, /On Claude Code it can enforce the sequence through hooks; on Codex it is explicitly convention-only/);
  assert.match(page, /editorial assistance does not become impersonation/);
  assert.match(page, /reduces repeated prompts without writing <code>BW_SESSION<\/code>/);
  assert.match(page, /Remote pushes remain opt-in/);
  assert.match(page, /instead of recurring browser OAuth and long-lived service-account key files/);
  assert.match(page, /keeps drafting and sending behind separate per-message approvals/);
  assert.match(page, /prompt-injection boundary/);
  assert.match(page, /Each repository is public, MIT-licensed, and includes a <code>SKILL\.md<\/code> entry point/);
  assert.match(page, /Archivum keeps its skill in <code>skills\/archivum\/<\/code>/);
  assert.match(page, /npx skills add AntreasAntoniou\/archivum --skill archivum/);
  assert.match(page, /16 MODULES/);
  assert.match(page, /Sixteen tools/);
});

test('provides metadata, accessible navigation, and a reduced-motion treatment', () => {
  assert.match(page, /<link rel="canonical" href="https:\/\/antreas\.io\/skills\/">/);
  assert.match(page, /<main id="skills-catalogue">/);
  assert.match(page, /aria-current="page">Agent Toolkit<\/a>/);
  assert.match(page, /role="status" aria-live="polite"/);
  const css = readFileSync(new URL('skills/skills.css', root), 'utf8');
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
});

test('keeps the homepage skill preview complete and linked to the catalogue', () => {
  const home = readFileSync(new URL('index.html', root), 'utf8');
  assert.match(home, /<section id="skills"/);
  assert.match(home, /Skills for the work between prompt and outcome/);
  assert.match(home, /href="\/skills\/" class="btn-primary">Explore the agent toolkit/);
  for (const skill of catalogue.skills) {
    assert.match(home, new RegExp(`https://github\\.com/AntreasAntoniou/${skill.slug}`));
  }
});
