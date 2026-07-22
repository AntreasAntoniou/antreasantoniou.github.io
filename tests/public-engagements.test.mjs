import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('lists the einspace Remote AI Paper Discussion Group engagement', () => {
  assert.match(home, /data-public-engagement="pdg-478-einspace"/);
  assert.match(home, /\[PDG 478\] einspace: NAS from Fundamental Operations/);
  assert.match(home, /Invited author discussion · Remote AI Paper Discussion Group · 17 March 2026/);
  assert.match(home, /https:\/\/www\.meetup\.com\/ai-paper-discussion-group-ml-ka\/events\/313755458\//);
  assert.match(home, /https:\/\/arxiv\.org\/abs\/2405\.20838/);
});
