import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const home = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('keeps the PhD thesis prominent and directly accessible', () => {
  const thesis = home.match(/<article id="phd-thesis"[\s\S]*?<\/article>/)?.[0] ?? '';

  assert.match(thesis, /publication-featured/);
  assert.doesNotMatch(thesis, /publication-extra|\bhidden\b/);
  assert.match(thesis, /Meta Learning for Supervised and Unsupervised Few-Shot Learning/);
  assert.match(thesis, /University of Edinburgh · 2020/);
  assert.match(thesis, /https:\/\/drive\.google\.com\/file\/d\/1TgH9nCOy3P5Z_jXhPFSC01NDHJB5Ah3l\/view\?usp=sharing/);
  assert.match(home, /href="#phd-thesis"[^>]*>Jump to the thesis →<\/a>/);
});
