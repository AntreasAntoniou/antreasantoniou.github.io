#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const [, , localSourceArg, scalingSourceArg] = process.argv;

if (!localSourceArg || !scalingSourceArg) {
  throw new Error('Usage: node scripts/import-pieces-essays.mjs <local-ai-content.md> <scaling-content.md>');
}

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function nonEmptyLines(source) {
  return readFileSync(source, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim());
}

function paragraph(text) {
  return `<p>${escapeHtml(text)}</p>`;
}

function renderLocalEssay(lines) {
  const headings = new Set([
    'The local imperative',
    'The gift of constraints',
    'The new frontier: architecture, algorithms, and orchestration',
    "Nature's blueprint",
    'The path forward',
  ]);

  const chunks = [];
  const references = [];
  let inReferences = false;

  for (const line of lines.slice(12, 157)) {
    if (!line) continue;
    if (line === 'References') {
      inReferences = true;
      continue;
    }
    if (inReferences) {
      references.push(line.replace(/^\[\d+\]\s*/, ''));
      continue;
    }
    if (headings.has(line)) {
      chunks.push(`<h2>${escapeHtml(line)}</h2>`);
      continue;
    }
    chunks.push(paragraph(line));
  }

  chunks.push('<h2>References</h2>');
  chunks.push('<ol class="published-essay-references">');
  for (const reference of references) chunks.push(`<li>${escapeHtml(reference)}</li>`);
  chunks.push('</ol>');
  return chunks.join('\n');
}

function renderScalingEssay(lines) {
  const headings = new Set([
    'The Cambrian explosion and the wild bet',
    'The Great Convergence and The Amnesia',
    'The technical debt of scale and the search for new paths',
    'Escaping the local maximum',
  ]);

  const figures = new Map([
    [
      'An imaginative depiction of how the AI research field felt in 2010-2020  – The Cambrian Explosion',
      {
        src: '/blog/the-cost-of-ai-scaling/assets/cambrian-explosion.avif',
        alt: 'An imaginative workshop filled with diverse experiments, representing the Cambrian explosion of AI research',
        caption: 'Figure 1: An imaginative depiction of how the AI research field felt in 2010–2020 — the Cambrian Explosion.',
      },
    ],
    [
      'The Monolith of LLM Scaling',
      {
        src: '/blog/the-cost-of-ai-scaling/assets/monolith.webp',
        alt: 'A lone person facing an immense pyramid assembled from uniform blocks',
        caption: 'Figure 2: The Monolith of LLM Scaling.',
      },
    ],
    [
      'Figure 3: The search for new paths, within the limitations of the current monolith',
      {
        src: '/blog/the-cost-of-ai-scaling/assets/new-paths.webp',
        alt: 'Colourful plants emerging through cracks in a uniform road',
        caption: 'Figure 3: The search for new paths within the limitations of the current monolith.',
      },
    ],
  ]);

  const chunks = [];
  for (let index = 12; index < 122; index += 1) {
    let line = lines[index];
    if (!line) continue;
    if (/^Figure [12]:/.test(line)) continue;
    if (headings.has(line)) {
      chunks.push(`<h2>${escapeHtml(line)}</h2>`);
      continue;
    }
    if (figures.has(line)) {
      const figure = figures.get(line);
      chunks.push([
        '<figure class="published-essay-figure">',
        `  <img src="${figure.src}" alt="${escapeHtml(figure.alt)}" loading="lazy">`,
        `  <figcaption>${escapeHtml(figure.caption)}</figcaption>`,
        '</figure>',
      ].join('\n'));
      continue;
    }
    if (line.endsWith('foundation itself. T')) line = line.slice(0, -2);
    chunks.push(paragraph(line));
  }
  return chunks.join('\n');
}

function page({ slug, title, description, dateDisplay, dateIso, originalUrl, body, hero }) {
  const localUrl = `https://antreas.io/blog/${slug}/`;
  const heroMarkup = hero
    ? `<figure class="published-essay-hero"><img src="${hero.src}" alt="${escapeHtml(hero.alt)}"></figure>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | Antreas Antoniou</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="author" content="Antreas Antoniou">
  <link rel="canonical" href="${originalUrl}">
  <meta property="og:title" content="${escapeHtml(title)} | Antreas Antoniou">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${localUrl}">
  <meta property="article:author" content="Antreas Antoniou">
  <meta property="article:published_time" content="${dateIso}">
  <link rel="icon" type="image/jpeg" href="/images/favicon-bot.jpeg">
  <link rel="apple-touch-icon" href="/images/favicon-bot.jpeg">
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/blog/research-notes.css">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Article","headline":${JSON.stringify(title)},"author":{"@type":"Person","name":"Antreas Antoniou","url":"https://antreas.io/"},"datePublished":"${dateIso}","mainEntityOfPage":"${originalUrl}","url":"${localUrl}","isBasedOn":"${originalUrl}"}
  </script>
  <script>
    (function() {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    })();
  </script>
</head>
<body>
  <nav class="research-note-nav" aria-label="Primary navigation">
    <div class="research-note-nav__inner">
      <a class="research-note-wordmark" href="/">Antreas<span>.</span></a>
      <div class="research-note-actions">
        <a href="/blog">← All writing</a>
        <button type="button" class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">◐</button>
      </div>
    </div>
  </nav>

  <main class="research-note-shell published-essay-shell">
    <header class="research-note-header published-essay-header">
      <p class="research-note-kicker">Essay · Originally published by Pieces</p>
      <h1>${escapeHtml(title)}</h1>
      <p class="research-note-deck">${escapeHtml(description)}</p>
      <p class="research-note-provenance">Originally published on the Pieces blog on <time datetime="${dateIso}">${dateDisplay}</time>. Read the <a href="${originalUrl}" target="_blank" rel="noopener noreferrer">original article on Pieces ↗</a>.</p>
    </header>

    <dl class="field-note-rail published-essay-rail" aria-label="Publication details">
      <div><dt>Author</dt><dd>Written by <strong>Antreas Antoniou</strong></dd></div>
      <div><dt>Published</dt><dd><time datetime="${dateIso}">${dateDisplay}</time></dd></div>
      <div><dt>Original venue</dt><dd><a href="${originalUrl}" target="_blank" rel="noopener noreferrer">Pieces Blog ↗</a></dd></div>
    </dl>

    ${heroMarkup}

    <article class="essay-body published-essay-body">
${body}
    </article>

    <aside class="original-publication" aria-label="Original publication">
      <p><strong>Original publication</strong></p>
      <p>This essay was written by Antreas Antoniou and first published on the Pieces blog. <a href="${originalUrl}" target="_blank" rel="noopener noreferrer">Read it at the original venue ↗</a></p>
    </aside>

    <footer class="research-note-footer">
      <a href="/blog">← Return to all writing</a>
    </footer>
  </main>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    }
  </script>
</body>
</html>
`;
}

const localLines = nonEmptyLines(resolve(localSourceArg));
const scalingLines = nonEmptyLines(resolve(scalingSourceArg));

const pages = [
  {
    slug: 'beyond-the-cloud',
    html: page({
      slug: 'beyond-the-cloud',
      title: localLines[8],
      description: localLines[9],
      dateDisplay: localLines[6],
      dateIso: '2025-08-12',
      originalUrl: 'https://pieces.app/blog/direction-of-ai-progress',
      body: renderLocalEssay(localLines),
      hero: {
        src: '/blog/beyond-the-cloud/assets/local-ai-horizon.avif',
        alt: 'A person looking toward a luminous horizon framed by a cosmic ring',
      },
    }),
  },
  {
    slug: 'the-cost-of-ai-scaling',
    html: page({
      slug: 'the-cost-of-ai-scaling',
      title: scalingLines[8],
      description: scalingLines[9],
      dateDisplay: scalingLines[6],
      dateIso: '2025-07-31',
      originalUrl: 'https://pieces.app/blog/the-cost-of-ai-scaling',
      body: renderScalingEssay(scalingLines),
    }),
  },
];

for (const item of pages) {
  const output = resolve(repoRoot, 'blog', item.slug, 'index.html');
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, item.html);
}
