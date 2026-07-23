import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const articleUrl = new URL('blog/architecture-becomes-a-learner/index.html', root);
const indexUrl = new URL('blog/index.html', root);

test('publishes the inner-learner research note with an honest maturity boundary', () => {
  assert.ok(fs.existsSync(articleUrl), 'research-note article should exist');

  const article = fs.readFileSync(articleUrl, 'utf8');
  const index = fs.readFileSync(indexUrl, 'utf8');

  assert.match(article, /When Does an Architecture Become a Learner\?/);
  assert.match(article, /Maturity: hypothesis/i);
  assert.match(article, /has not yet been established experimentally/i);
  assert.match(article, /The interesting object is the reversal\./);
  assert.match(article, /https:\/\/arxiv\.org\/abs\/2102\.11174/);
  assert.match(article, /https:\/\/arxiv\.org\/abs\/2212\.07677/);
  assert.match(
    index,
    /href="\/blog\/architecture-becomes-a-learner\/"/,
  );
});
