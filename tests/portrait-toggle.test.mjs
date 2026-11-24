import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const home = readFileSync(new URL('index.html', root), 'utf8');
const css = readFileSync(new URL('styles.css', root), 'utf8');

test('pre-mounts both documentary and lightweight WebP anime portrait layers for instant transitions', () => {
  const webpPath = new URL('images/profile-anime.webp', root);
  const pngPath = new URL('images/profile-anime.png', root);
  assert.ok(existsSync(pngPath), 'original images/profile-anime.png fallback must remain available');
  assert.ok(existsSync(webpPath), 'optimized images/profile-anime.webp asset must exist');
  assert.ok(
    statSync(webpPath).size < 160_000,
    `images/profile-anime.webp should stay under 160 KB (got ${statSync(webpPath).size} bytes)`,
  );

  const buttonMarkup = home.match(/<button id="profile-evolve-control"[\s\S]*?<\/button>/)?.[0] ?? '';
  assert.ok(buttonMarkup, 'homepage must include #profile-evolve-control');
  assert.match(buttonMarkup, /aria-pressed="false"/);
  assert.match(buttonMarkup, /id="hero-profile"[^>]*src="images\/profile\.jpg"/);
  assert.match(buttonMarkup, /srcset="images\/profile-anime\.webp"/);
  assert.match(buttonMarkup, /id="hero-profile-anime"[^>]*src="images\/profile-anime\.png"/);
});

test('reads cleanly as director’s cut at rest and reveals cat on hover/focus without inline transform clobbering', () => {
  const buttonMarkup = home.match(/<button id="profile-evolve-control"[\s\S]*?<\/button>/)?.[0] ?? '';
  const labelMarkup = buttonMarkup.match(/<span id="profile-hint-label">(.*)<\/span>/)?.[1] ?? '';
  const plainLabel = labelMarkup.replace(/<[^>]+>/g, '').trim();
  assert.equal(plainLabel, 'Show the director’s cut');
  assert.match(buttonMarkup, /class="profile-hint__word"/);
  assert.match(buttonMarkup, /class="profile-hint__swap"[^>]*data-alt="a"/);
  assert.match(buttonMarkup, /aria-label="Show the director’s cut \(anime portrait with cat\)"/);
  assert.match(buttonMarkup, /id="profile-hint-icon"[^>]*fa-clapperboard/);

  const portraitFunction = home.match(/function toggleProfileImage\(\) \{[\s\S]*?\n    \}/)?.[0] ?? '';
  assert.ok(portraitFunction, 'toggleProfileImage() must exist');
  assert.doesNotMatch(
    portraitFunction,
    /heroProfile\.style\.transform/,
    'toggleProfileImage() must use CSS state classes rather than inline transform overrides that break :hover',
  );
  assert.match(portraitFunction, /is-anime/);
  assert.match(portraitFunction, /aria-pressed/);
  assert.match(portraitFunction, /fa-cat/);
  assert.match(portraitFunction, /profile-hint__word/);
  assert.match(portraitFunction, /data-alt="a"/);
  assert.match(portraitFunction, /Return to documentary footage/);
});

test('defines smooth crossfade and cut-to-cat hover styles while honoring reduced motion', () => {
  assert.match(css, /\.profile-portrait\s*\{[\s\S]*?transition:/);
  assert.match(css, /\.profile-evolve-control\.is-anime\s+\.profile-portrait--anime\s*\{[\s\S]*?opacity:\s*1/);
  assert.match(css, /\.profile-evolve-control\.is-anime\s+\.profile-portrait--photo\s*\{[\s\S]*?opacity:\s*0/);
  assert.match(css, /\.profile-hint__word\s*\{/);
  assert.match(css, /\.profile-hint__swap::after\s*\{[\s\S]*?content:\s*attr\(data-alt\)/);
  assert.match(css, /:hover\s+\.profile-hint__swap::after/);
  assert.match(css, /@keyframes profile-cut-flash/);
  assert.match(
    css,
    /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.profile-evolve-control \*[\s\S]*animation:\s*none\s*!important/,
  );
});
