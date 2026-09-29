import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root));
const engineering = '/documents/Antreas-Antoniou-Engineering-CV.pdf';
const academic = '/documents/Antreas-Antoniou-Academic-CV.pdf';
const backup = '/documents/archive/AntreasAntoniouResume-before-2026-09-29.pdf';

test('homepage and CV page offer both clearly labelled CVs', () => {
  for (const path of ['index.html', 'cv/index.html']) {
    const html = read(path).toString();
    assert.ok(html.includes(`href="${engineering}"`), path);
    assert.ok(html.includes(`href="${academic}"`), path);
    assert.match(html, /Engineering CV/);
    assert.match(html, /Academic CV/);
  }
  assert.ok(read('cv/index.html').toString().includes(`href="${backup}"`));
});

test('download files are PDFs and the legacy URL serves the new academic version', () => {
  for (const path of [engineering, academic, backup]) {
    assert.equal(read(path.slice(1)).subarray(0, 5).toString(), '%PDF-');
  }
  assert.deepEqual(read('documents/AntreasAntoniouResume.pdf'), read(academic.slice(1)));
});

test('the previously live CV is preserved byte-for-byte', () => {
  const hash = createHash('sha256').update(read(backup.slice(1))).digest('hex');
  assert.equal(hash, '7df0342d8c261b7734c549218271113bcadf0a3704b9f7d3339d62f90ffaaf8a');
});
