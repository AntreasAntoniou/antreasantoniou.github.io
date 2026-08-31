import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function section(id) {
  const match = home.match(new RegExp(`<section\\s+id="${id}"[\\s\\S]*?<\\/section>`));
  assert.ok(match, `missing #${id} section`);
  return match[0];
}

test('LeRobot calls to action use the current event host', () => {
  const outreach = section('outreach');

  assert.match(
    outreach,
    /href="https:\/\/lerobot-edinburgh\.mlguild\.ai\/"[^>]*>[\s\S]*?Event Website/,
  );
  assert.match(
    outreach,
    /href="https:\/\/lerobot-edinburgh\.mlguild\.ai\/submissions\.html"[^>]*>[\s\S]*?Submissions/,
  );
  assert.doesNotMatch(home, /https?:\/\/lerobot-edinburgh\.com(?:\/|\b)/i);
});

test('homepage chronology matches the resume', () => {
  const teaching = section('teaching');
  const experience = section('experience');

  assert.match(teaching, /Machine Learning Practical \(2017-2020\)/);
  for (const expectedCard of [
    /Lead Research Scientist[\s\S]*?2024 - 2025[\s\S]*?Malted AI/,
    /Speech-Scientist Intern[\s\S]*?2016[\s\S]*?Amazon/,
    /Research Intern[\s\S]*?2020 - 2021[\s\S]*?Google/,
    /Research Associate[\s\S]*?2021 - 2024[\s\S]*?University of Edinburgh/,
    /PhD in Machine Learning[\s\S]*?2017 - 2021[\s\S]*?University of Edinburgh/,
  ]) {
    assert.match(experience, expectedCard);
  }
});
