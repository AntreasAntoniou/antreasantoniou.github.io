import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const home = readFileSync(join(root, 'index.html'), 'utf8');
const blog = readFileSync(join(root, 'blog', 'index.html'), 'utf8');
const redditUrl = 'https://www.reddit.com/user/AntreasAntoniou/submitted/?screen_view_count=1&sort=top&t=all';
const redditHref = redditUrl.replaceAll('&', '&amp;');

test('Reddit is a first-class social profile on the homepage', () => {
  assert.equal(
    home.includes(redditUrl),
    true,
    'expected the Reddit profile in JSON-LD',
  );
  assert.equal(
    home.match(new RegExp(redditHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))?.length,
    2,
    'expected top-submissions Reddit links in the hero and contact sections',
  );
  assert.equal((home.match(/aria-label="Reddit"/g) ?? []).length, 2);
  assert.equal((home.match(/class="fab fa-reddit-alien"/g) ?? []).length, 2);
});

test('the writing index points readers to Antreas’s Reddit voice', () => {
  assert.match(
    blog,
    /href="https:\/\/www\.reddit\.com\/user\/AntreasAntoniou\/submitted\/\?screen_view_count=1&amp;sort=top&amp;t=all"[^>]*>u\/AntreasAntoniou<\/a>/,
  );
  assert.match(blog, /target="_blank" rel="noopener noreferrer"/);
});
