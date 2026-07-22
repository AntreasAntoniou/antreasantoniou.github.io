import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const writingUrl = new URL('writing/index.html', root);
const writing = existsSync(writingUrl) ? readFileSync(writingUrl, 'utf8') : '';
const writingCssUrl = new URL('writing/writing.css', root);
const writingCss = existsSync(writingCssUrl) ? readFileSync(writingCssUrl, 'utf8') : '';
const home = readFileSync(new URL('index.html', root), 'utf8');
const legacyDirectory = readFileSync(new URL('writing_tips_resources/index.html', root), 'utf8');
const legacyFile = readFileSync(new URL('writing_tips_resources.html', root), 'utf8');

test('publishes a dedicated, canonical Writing Advice page', () => {
  assert.ok(existsSync(writingUrl), 'missing writing/index.html');
  assert.match(writing, /<title>Writing Advice \| Antreas Antoniou<\/title>/);
  assert.match(writing, /<link rel="canonical" href="https:\/\/antreas\.io\/writing\/">/);
  assert.match(writing, /<h1[^>]*>Writing advice<\/h1>/);
  assert.equal((writing.match(/<h1\b/g) ?? []).length, 1);
});

test('keeps Antreas deliberate-practice advice as the main body', () => {
  assert.equal((writing.match(/data-writing-practice/g) ?? []).length, 6);
  assert.match(writing, /two-page mini-papers/i);
  assert.match(writing, /teaching/i);
  assert.match(writing, /student reports/i);
  assert.match(writing, /four new papers every week/i);
  assert.match(writing, /collect(?:ed|ing) exemplars/i);
  assert.match(writing, /PhD Survival Guide/i);
});

test('credits the BayesWatch rules and preserves their URL history', () => {
  assert.match(writing, /Amos Storkey/);
  assert.match(writing, /href="https:\/\/www\.bayeswatch\.com\/writing\/"/);
  assert.match(writing, /https:\/\/www\.bayeswatch\.com\/unlisted\//);
  assert.match(writing, /one point/i);
  assert.match(writing, /known information/i);
  assert.match(writing, /Every claim/i);
});

test('links the go-to writing resources Antreas recommends', () => {
  for (const href of [
    'https://cs.stanford.edu/people/widom/paper-writing.html',
    'https://www.easterbrook.ca/steve/2010/01/how-to-write-a-scientific-abstract-in-six-easy-steps/',
    'http://karpathy.github.io/2016/09/07/phd/',
    'https://arxiv-sanity-lite.com',
    'https://www.reddit.com/r/MachineLearning/comments/85cwiu/d_wellwritten_paper_examples/',
  ]) {
    assert.match(writing, new RegExp(`href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
  }
});

test('keeps Amos Storkey’s BayesWatch guide as the fourth resource', () => {
  const resources = [...writing.matchAll(/<a class="resource-card[^"]*" href="([^"]+)"/g)]
    .map((match) => match[1]);
  assert.equal(resources[3], 'https://www.bayeswatch.com/writing/');
});

test('redirects both legacy writing URLs to the new page', () => {
  for (const html of [legacyDirectory, legacyFile]) {
    assert.match(html, /content="0; url=\/writing\/"/);
    assert.match(html, /href="https:\/\/antreas\.io\/writing\/"/);
  }
});

test('makes Writing Advice discoverable from the homepage', () => {
  assert.match(home, /<h4 class="font-semibold">Writing Advice<\/h4>/);
  assert.match(home, /href="\/writing\/"/);
});

test('keeps the page responsive, keyboard-visible, reduced-motion aware, and light-first', () => {
  assert.match(writing, /href="#main-content"[^>]*>Skip to the advice<\/a>/);
  assert.match(writingCss, /:focus-visible/);
  assert.match(writingCss, /@media \(max-width: 760px\)/);
  assert.match(writingCss, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(writing, /localStorage\.getItem\('theme'\)/);
  assert.match(writing, /const saved = localStorage\.getItem\('theme'\);\s*if \(saved === 'dark'\) document\.documentElement\.setAttribute\('data-theme', 'dark'\);/);
  assert.equal((writing.match(/setAttribute\('data-theme', 'dark'\)/g) ?? []).length, 1);
});
