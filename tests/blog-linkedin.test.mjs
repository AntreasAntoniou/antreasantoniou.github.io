import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const posts = JSON.parse(readFileSync(new URL('fixtures/linkedin-originals.json', import.meta.url), 'utf8'));
const index = readFileSync(new URL('blog/index.html', root), 'utf8');

test('recent LinkedIn originals are discoverable before older collections', () => {
  assert.equal((index.match(/data-linkedin-post/g) || []).length, posts.length);
  assert.ok(index.indexOf('id="linkedin-notes-heading"') < index.indexOf('id="archivum-heading"'));
  for (const { slug, date, title } of posts) {
    assert.ok(index.includes(`href="/blog/${slug}/"`));
    assert.ok(index.includes(title));
    assert.ok(index.includes(`datetime="${date}"`));
  }
});

for (const post of posts) {
  const html = readFileSync(new URL(`blog/${post.slug}/index.html`, root), 'utf8');
  test(`${post.slug}: original wording, paragraphs, date, and source survive republication`, () => {
    const body = html.match(/<article\b[^>]*data-linkedin-original[^>]*>([\s\S]*?)<\/article>/)?.[1];
    assert.ok(body, 'explicit original-text boundary');
    const paragraphs = [...body.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(match => match[1].trim());
    assert.deepEqual(paragraphs, post.paragraphs);
    assert.ok(html.includes(`href="${post.source}"`));
    assert.ok(html.includes(`content="${post.date}"`));
    assert.ok(html.includes(`datetime="${post.date}"`));
    assert.ok(html.includes(`href="https://antreas.io/blog/${post.slug}/"`));
    assert.match(html, /name="author" content="Antreas Antoniou"/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.doesNotMatch(html, /<iframe|platform\.linkedin|\/Users\/|Visibility: Group members/);
    assert.match(html, /href="\/blog\/"/);
    assert.match(html, /localStorage\.getItem\('theme'\)/);
    assert.match(html, /aria-label="Toggle theme"/);
  });
}

test('no-AI authorship is claimed only for the source that explicitly confirms it', () => {
  for (const post of posts) {
    const html = readFileSync(new URL(`blog/${post.slug}/index.html`, root), 'utf8');
    assert.equal(html.includes('Written without AI'), Boolean(post.authorship_evidence));
  }
});
