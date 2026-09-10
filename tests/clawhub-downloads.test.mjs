import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { collect, badge, slugsFor, update } from '../scripts/update-clawhub-downloads.mjs';
const catalogue = JSON.parse(await readFile(new URL('../skills/catalogue.json', import.meta.url)));
const response = (url, n = 10) => ({ ok: true, json: async () => ({ skill: { slug: new URL(url).pathname.split('/').pop(), stats: { downloads: n } }, owner: { handle: 'antreasantoniou' } }) });

test('sums each catalogue entry once; badge and timestamp agree', async () => {
  const s = await collect(catalogue, async url => response(url), null, new Date('2026-09-10T00:00:00Z'));
  assert.equal(s.total, catalogue.skills.length * 10);
  assert.equal(s.skillCount, catalogue.skills.length);
  assert.equal(s.skills.length, new Set(s.skills.map(x => x.slug)).size);
  assert.match(badge(s), new RegExp(`ClawHub downloads: ${s.total}`));
  assert.match(badge(s), /Verified 2026-09-10 UTC/);
});
test('rejects empty and duplicate catalogues', () => {
  assert.throws(() => slugsFor({ ...catalogue, skills: [] }));
  assert.throws(() => slugsFor({ ...catalogue, skills: [catalogue.skills[0], catalogue.skills[0]] }));
});
test('rejects unavailable, malformed, wrong-owner and decreasing counters', async () => {
  for (const n of [-1, 1.5, null, '10', Number.MAX_SAFE_INTEGER + 1]) {
    await assert.rejects(collect(catalogue, async url => response(url, n)));
  }
  await assert.rejects(collect(catalogue, async () => ({ ok: false, status: 503 })));
  await assert.rejects(collect(catalogue, async () => { throw new Error('timeout'); }));
  await assert.rejects(collect(catalogue, async () => ({ ok: true, json: async () => ({}) })));
  await assert.rejects(collect(catalogue, async url => ({ ok: true, json: async () => ({ ...(await response(url).json()), owner: { handle: 'someone-else' } }) })));
  await assert.rejects(collect(catalogue, async url => response(url), { skills: [{ slug: slugsFor(catalogue)[0], downloads: 11 }] }));
});
test('partial collection leaves previous published files untouched', async () => {
  const dir = await mkdtemp(`${tmpdir()}/clawhub-counter-test-`);
  const base = pathToFileURL(`${dir}/`);
  await mkdir(new URL('skills/', base)); await mkdir(new URL('data/', base));
  await writeFile(new URL('skills/catalogue.json', base), JSON.stringify(catalogue));
  await writeFile(new URL('data/clawhub-downloads.json', base), '{}');
  await writeFile(new URL('data/clawhub-downloads.svg', base), 'previous');
  let calls = 0;
  await assert.rejects(update(base, async url => { if (++calls === 2) throw new Error('offline'); return response(url); }));
  assert.equal(await readFile(new URL('data/clawhub-downloads.json', base), 'utf8'), '{}');
  assert.equal(await readFile(new URL('data/clawhub-downloads.svg', base), 'utf8'), 'previous');
});

test('published real snapshot reconciles with the catalogue and SVG', async () => {
  const root = new URL('../', import.meta.url);
  const snapshot = JSON.parse(await readFile(new URL('data/clawhub-downloads.json', root)));
  assert.deepEqual(snapshot.skills.map(s => s.slug), slugsFor(catalogue));
  assert.equal(snapshot.total, snapshot.skills.reduce((n, s) => n + s.downloads, 0));
  assert.equal(snapshot.skillCount, catalogue.skills.length);
  assert.equal(await readFile(new URL('data/clawhub-downloads.svg', root), 'utf8'), badge(snapshot));
  const page = await readFile(new URL('skills/index.html', root), 'utf8');
  assert.match(page, /raw.githubusercontent.com\/AntreasAntoniou\/antreasantoniou.github.io\/main\/data\/clawhub-downloads.svg/);
  assert.match(page, /Download events, not unique users/);
});
