import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const blogIndex = readFileSync(new URL('blog/index.html', root), 'utf8');

const essays = [
  {
    slug: 'beyond-the-cloud',
    title: 'Beyond the cloud: SLMs, local AI, agentic constellations, biology and a high value direction for AI progress',
    date: 'Aug 12, 2025',
    original: 'https://pieces.app/blog/direction-of-ai-progress',
  },
  {
    slug: 'the-cost-of-ai-scaling',
    title: 'Too much of a good thing: how chasing scale is stifling AI innovation',
    date: 'Jul 31, 2025',
    original: 'https://pieces.app/blog/the-cost-of-ai-scaling',
  },
];

function visibleWords(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

test('publishes exactly two complete Pieces essays locally', () => {
  assert.equal((blogIndex.match(/data-pieces-local/g) || []).length, 2);

  for (const essay of essays) {
    const html = readFileSync(new URL(`blog/${essay.slug}/index.html`, root), 'utf8');

    assert.match(blogIndex, new RegExp(`href="/blog/${essay.slug}/"`));
    assert.match(html, new RegExp(`<h1[^>]*>${essay.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
    assert.match(html, /Written by\s*<strong>Antreas Antoniou<\/strong>/);
    assert.match(html, new RegExp(essay.date.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(html, /Originally published on the Pieces blog/);
    assert.match(html, new RegExp(essay.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(html, new RegExp(`<link rel="canonical" href="${essay.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">`));
    assert.ok(visibleWords(html) > 1_000, `${essay.slug} should contain the full archived essay`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
});

test('keeps the original Pieces venue visible from index and article pages', () => {
  for (const essay of essays) {
    const html = readFileSync(new URL(`blog/${essay.slug}/index.html`, root), 'utf8');
    assert.match(blogIndex, new RegExp(`${essay.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^>]*`));
    assert.match(html, /target="_blank" rel="noopener noreferrer"/);
  }
});

test('lists AI Memory as an Antreas-authored external article without inventing a local copy', () => {
  assert.match(blogIndex, /AI memory explained: what Perplexity, ChatGPT, Pieces, and Claude remember \(and forget\)/i);
  assert.match(blogIndex, /https:\/\/pieces\.app\/blog\/types-of-ai-memory/);
  assert.match(blogIndex, /Antreas Antoniou/);
  assert.doesNotMatch(blogIndex, /href="\/blog\/types-of-ai-memory\/?"/);
});

test('lists the LinkedIn LLM-ranking article with honest co-authorship', () => {
  assert.match(blogIndex, /There is no universal ranking: How 6 major LLM systems actually find your content/i);
  assert.match(blogIndex, /https:\/\/www\.linkedin\.com\/pulse\/universal-ranking-how-6-major-llm-systems-actually-find-stechenko-mepfe\//);
  assert.match(blogIndex, /Written by Hanna Stechenko &amp; Antreas Antoniou/);
  assert.match(blogIndex, /May 2026/);
});

test('published essay layout is light-first, responsive, and figure-safe', () => {
  const css = readFileSync(new URL('blog/research-notes.css', root), 'utf8');
  assert.match(css, /\.published-essay-figure/);
  assert.match(css, /max-width:\s*100%/);
  assert.match(css, /@media \(max-width: 720px\)/);

  for (const essay of essays) {
    const html = readFileSync(new URL(`blog/${essay.slug}/index.html`, root), 'utf8');
    assert.match(html, /localStorage\.getItem\('theme'\)/);
    assert.match(html, /aria-label="Toggle theme"/);
    assert.match(html, /href="\/blog"/);
  }
});
