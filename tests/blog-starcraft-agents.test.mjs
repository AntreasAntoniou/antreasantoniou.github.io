import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const slug = 'go-play-starcraft-ii';
const articleUrl = new URL(`blog/${slug}/index.html`, root);
const indexUrl = new URL('blog/index.html', root);
const sitemapUrl = new URL('sitemap.xml', root);

const expectedAssets = [
  'hero-protoss-command-chair.jpg',
  'fig1-cognitive-regime-map.png',
  'fig2-hud-scoreboard.png',
  'fig3-tiny-wheel-app.png',
  'fig4-guitar-split-scene.jpg',
  'fig5-scaling-staircase.png',
  'fig6-clunky-days-curve.png',
  'fig7-flow-state-finale.jpg',
];

test('publishes the StarCraft II and AI agents essay with all eight local figures and social metadata', () => {
  assert.ok(fs.existsSync(articleUrl), 'essay page should exist');

  const html = fs.readFileSync(articleUrl, 'utf8');
  const index = fs.readFileSync(indexUrl, 'utf8');
  const sitemap = fs.readFileSync(sitemapUrl, 'utf8');

  assert.match(html, /<h1>Go Play StarCraft II to Get Better at AI Agents<\/h1>/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /<link rel="canonical" href="https:\/\/antreas\.io\/blog\/go-play-starcraft-ii\/">/);
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/antreas\.io\/blog\/go-play-starcraft-ii\/assets\/hero-protoss-command-chair\.jpg">/,
  );
  assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
  assert.match(html, /Written by <strong>Antreas Antoniou<\/strong>/);
  assert.match(html, /datetime="2026-11-24"/);
  assert.match(html, /localStorage\.getItem\('theme'\)/);
  assert.match(html, /aria-label="Toggle theme"/);
  assert.match(html, /href="\/blog"/);

  assert.doesNotMatch(html, /\/Users\/|Written without AI|Private Preview|AI-Assisted Draft/);

  for (const asset of expectedAssets) {
    const assetPath = new URL(`blog/${slug}/assets/${asset}`, root);
    assert.ok(fs.existsSync(assetPath), `missing asset: ${asset}`);
    assert.ok(
      html.includes(`/blog/${slug}/assets/${asset}`),
      `article should reference ${asset}`,
    );
  }

  assert.match(index, /href="\/blog\/go-play-starcraft-ii\/"/);
  assert.match(index, /Go Play StarCraft II to Get Better at AI Agents/);
  assert.match(sitemap, /<loc>https:\/\/antreas\.io\/blog\/go-play-starcraft-ii\/<\/loc>/);
});
