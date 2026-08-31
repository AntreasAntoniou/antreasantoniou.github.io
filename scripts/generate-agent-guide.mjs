#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = join(root, 'AGENTS.md');
const outputPath = join(root, 'agents', 'index.html');

const escapeHtml = (text) => text
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

function renderInline(text) {
  const tokens = [];
  const hold = (html) => {
    const token = `\u0000${tokens.length}\u0000`;
    tokens.push(html);
    return token;
  };

  let prepared = text
    .replace(/`([^`]+)`/g, (_, code) => hold(`<code>${escapeHtml(code)}</code>`))
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => (
      hold(`<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`)
    ));

  prepared = escapeHtml(prepared)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');

  return prepared.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
}

function renderMarkdown(markdown) {
  const output = [];
  const paragraph = [];
  let listType = null;
  let insideComment = false;

  const closeList = () => {
    if (listType) output.push(`</${listType}>`);
    listType = null;
  };

  const flushParagraph = () => {
    if (!paragraph.length) return;
    output.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
    paragraph.length = 0;
  };

  for (const line of markdown.replaceAll('\r\n', '\n').split('\n')) {
    const trimmed = line.trim();

    if (insideComment) {
      if (trimmed.includes('-->')) insideComment = false;
      continue;
    }
    if (trimmed.startsWith('<!--')) {
      insideComment = !trimmed.includes('-->');
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      output.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      closeList();
      output.push('<hr>');
      continue;
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const nextListType = unordered ? 'ul' : 'ol';
      if (listType !== nextListType) {
        closeList();
        listType = nextListType;
        output.push(`<${listType}>`);
      }
      output.push(`<li>${renderInline((unordered || ordered)[1])}</li>`);
      continue;
    }

    const quote = trimmed.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      closeList();
      output.push(`<blockquote><p>${renderInline(quote[1])}</p></blockquote>`);
      continue;
    }

    closeList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();
  return output.join('\n');
}

const canonicalGuide = readFileSync(sourcePath, 'utf8').trim();
const renderedGuide = renderMarkdown(canonicalGuide);
const encodedSource = escapeHtml(canonicalGuide);
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agent Guide | Antreas Antoniou</title>
  <meta name="description" content="Browser-compatible guide to Antreas Antoniou's research, engineering, systems work, evidence boundaries and public website.">
  <link rel="canonical" href="https://antreas.io/agents/">
  <link rel="alternate" type="text/markdown" href="/AGENTS.md" title="Canonical Markdown source">
  <link rel="alternate" type="text/plain" href="/llms.txt" title="Compact agent trailhead">
  <link rel="icon" type="image/jpeg" href="/images/favicon-bot.jpeg">
  <style>
    :root { color-scheme: light dark; --bg: #fff; --panel: #f8fafc; --text: #0f172a; --muted: #64748b; --accent: #1e3a5f; --border: #e2e8f0; }
    @media (prefers-color-scheme: dark) { :root { --bg: #030712; --panel: #0f172a; --text: #f8fafc; --muted: #94a3b8; --accent: #7ba3d6; --border: #1e293b; } }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--text); font: 16px/1.7 Inter, ui-sans-serif, system-ui, sans-serif; }
    a { color: var(--accent); text-underline-offset: 0.18em; }
    a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    .topbar { display: flex; justify-content: space-between; gap: 1rem; align-items: center; padding: 1rem max(1rem, calc((100vw - 52rem) / 2)); border-bottom: 1px solid var(--border); }
    .brand { color: var(--text); font-weight: 800; text-decoration: none; }
    .formats { display: flex; gap: 1rem; font-size: 0.875rem; }
    main { max-width: 52rem; margin: 0 auto; padding: 4rem 1.25rem 6rem; }
    .bridge { margin: 0 0 3rem; padding: 1rem 1.2rem; border: 1px solid var(--border); border-radius: 0.75rem; background: var(--panel); color: var(--muted); }
    article h1 { margin-top: 0; font-size: clamp(2.25rem, 6vw, 4rem); letter-spacing: -0.04em; }
    article h2 { margin-top: 3.5rem; padding-top: 1rem; border-top: 1px solid var(--border); font-size: 1.65rem; }
    article h3 { margin-top: 2.2rem; font-size: 1.2rem; }
    article p, article li { max-width: 76ch; }
    article li + li { margin-top: 0.55rem; }
    article blockquote { margin: 1.5rem 0; padding: 0.2rem 1.2rem; border-left: 3px solid var(--accent); background: var(--panel); }
    article code { padding: 0.1rem 0.3rem; border-radius: 0.3rem; background: var(--panel); font-size: 0.9em; }
    details { margin-top: 4rem; border-top: 1px solid var(--border); padding-top: 1.5rem; }
    summary { cursor: pointer; color: var(--muted); }
    pre { overflow-wrap: anywhere; white-space: pre-wrap; margin-top: 1rem; padding: 1rem; border: 1px solid var(--border); border-radius: 0.75rem; background: var(--panel); font: 0.82rem/1.55 ui-monospace, SFMono-Regular, Menlo, monospace; }
    @media (max-width: 560px) { .topbar { align-items: flex-start; } .formats { flex-direction: column; gap: 0.25rem; text-align: right; } main { padding-top: 2.5rem; } }
  </style>
</head>
<body>
  <header class="topbar">
    <a class="brand" href="/">Antreas<span aria-hidden="true">.</span></a>
    <nav class="formats" aria-label="Agent guide formats">
      <a href="/AGENTS.md" type="text/markdown">Markdown source</a>
      <a href="/llms.txt" type="text/plain">llms.txt</a>
    </nav>
  </header>
  <main>
    <p class="bridge">Browser-compatible rendering of the canonical <a href="/AGENTS.md">AGENTS.md</a>. The content below is generated from that source so the two formats cannot drift.</p>
    <article id="agent-guide-rendered">
${renderedGuide}
    </article>
    <details>
      <summary>Canonical Markdown source</summary>
      <pre id="agent-guide-source" data-canonical-source="/AGENTS.md">${encodedSource}</pre>
    </details>
  </main>
</body>
</html>
`;

if (process.argv.includes('--check')) {
  if (!existsSync(outputPath) || readFileSync(outputPath, 'utf8') !== html) {
    console.error('agents/index.html is out of date; run node scripts/generate-agent-guide.mjs');
    process.exit(1);
  }
  console.log('agents/index.html matches AGENTS.md');
} else {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html);
  console.log('generated agents/index.html from AGENTS.md');
}
