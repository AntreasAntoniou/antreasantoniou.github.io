import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const blogIndex = fs.readFileSync(new URL('blog/index.html', root), 'utf8');
const globalStyles = fs.readFileSync(new URL('styles.css', root), 'utf8');
const researchNotesCss = fs.readFileSync(
  new URL('blog/research-notes.css', root),
  'utf8',
);

const collectionTwo = [
  'needle-in-the-haystack',
  'transformers-as-lego',
  'why-i-dont-regret-my-phd',
  'the-imagenet-moment',
  'the-warm-up-effect',
  'ocr-two-pass-pipeline',
  'context-window-is-lying',
  'from-drones-to-deep-learning',
  'small-model-revolution',
  'multimodal-convergence',
];

const collectionThree = [
  'organisational-nervous-system',
  'context-reentry-problem',
  'market-in-lived-intelligence',
  'disagreement-is-an-architecture',
  'build-the-kill-switch-first',
  'most-useless-ai-app',
  'ai-for-a-user-who-cannot-read',
  'laboratory-is-part-of-the-research',
  'fast-answer-or-deep-research',
  'memory-that-quizzes-you-back',
];

const collectionThreeMaturity = {
  'organisational-nervous-system': 'Design proposal',
  'context-reentry-problem': 'Design proposal',
  'market-in-lived-intelligence': 'Speculative research',
  'disagreement-is-an-architecture': 'Prototype',
  'build-the-kill-switch-first': 'Design proposal',
  'most-useless-ai-app': 'Prototype',
  'ai-for-a-user-who-cannot-read': 'Design proposal',
  'laboratory-is-part-of-the-research': 'Built work',
  'fast-answer-or-deep-research': 'Design proposal',
  'memory-that-quizzes-you-back': 'Speculative research',
};

const articles = [...collectionTwo, ...collectionThree];

function articleUrl(slug) {
  return new URL(`blog/${slug}/index.html`, root);
}

function readArticle(slug) {
  const url = articleUrl(slug);
  assert.ok(fs.existsSync(url), `missing article page: blog/${slug}/index.html`);
  return fs.readFileSync(url, 'utf8');
}

function visibleText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .trim();
}

function visibleWords(html) {
  return visibleText(html)
    .split(/\s+/)
    .filter(Boolean).length;
}

function attributeValue(tag, attribute) {
  return tag.match(new RegExp(`\\b${attribute}=(["'])(.*?)\\1`, 'i'))?.[2];
}

function flexibleAttributeValue(tag, attribute) {
  const match = tag.match(
    new RegExp(
      `\\s${attribute}\\s*=\\s*(?:(["'])([\\s\\S]*?)\\1|([^\\s>]+))`,
      'i',
    ),
  );

  return match?.[2] ?? match?.[3];
}

function metaContent(html, attribute, value) {
  const tag = [...html.matchAll(/<meta\b[^>]*>/gi)].find(
    ([candidate]) => attributeValue(candidate, attribute) === value,
  )?.[0];

  return tag && attributeValue(tag, 'content');
}

function hasStylesheet(html, href) {
  return [...html.matchAll(/<link\b[^>]*>/gi)].some(
    ([tag]) =>
      attributeValue(tag, 'href') === href &&
      (attributeValue(tag, 'rel') ?? '').split(/\s+/).includes('stylesheet'),
  );
}

function hasThemeToggle(html) {
  return [...html.matchAll(/<(?:button|input)\b[^>]*>/gi)].some(([tag]) => {
    const classes = (attributeValue(tag, 'class') ?? '').split(/\s+/);
    return (
      attributeValue(tag, 'id') === 'theme-toggle' ||
      classes.includes('theme-toggle')
    );
  });
}

function elementsWithClass(html, tagName, className) {
  return [
    ...html.matchAll(
      new RegExp(`<${tagName}\\b[^>]*>[\\s\\S]*?<\\/${tagName}>`, 'gi'),
    ),
  ]
    .map((match) => match[0])
    .filter((element) => {
      const openingTag = element.match(
        new RegExp(`^<${tagName}\\b[^>]*>`, 'i'),
      )?.[0];
      return (flexibleAttributeValue(openingTag ?? '', 'class') ?? '')
        .trim()
        .split(/\s+/)
        .includes(className);
    });
}

function declarationBlocksForSelector(css, selector) {
  const selectorPattern = new RegExp(
    `${selector.replace('.', '\\.')}(?=$|[^\\w-])`,
  );

  return [
    ...css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .matchAll(/([^{}]+)\{([^{}]*)\}/g),
  ]
    .filter((match) =>
      match[1]
        .split(',')
        .some((candidate) => selectorPattern.test(candidate.trim())),
    )
    .map((match) => match[2]);
}

function collectionCards(marker) {
  return [
    ...blogIndex.matchAll(
      new RegExp(
        `<article\\b(?=[^>]*\\s${marker}(?=\\s|=|/?>))[^>]*>[\\s\\S]*?<\\/article>`,
        'gi',
      ),
    ),
  ].map((match) => match[0]);
}

test('publishes all twenty article files', () => {
  const missing = articles.filter((slug) => !fs.existsSync(articleUrl(slug)));

  assert.deepEqual(missing, [], `missing article pages: ${missing.join(', ')}`);
});

test('publishes two complete ten-essay collections', () => {
  for (const [marker, otherMarker, slugs] of [
    ['data-collection-two', 'data-collection-three', collectionTwo],
    ['data-collection-three', 'data-collection-two', collectionThree],
  ]) {
    const cards = collectionCards(marker);

    assert.equal(cards.length, 10, `${marker} should mark exactly ten cards`);
    const cardSlugs = cards.map((card) => {
      const openingTag = card.match(/^<article\b[^>]*>/i)?.[0] ?? '';
      assert.doesNotMatch(
        openingTag,
        new RegExp(`\\s${otherMarker}(?=\\s|=|/?>)`, 'i'),
        `${marker} cards must not also carry ${otherMarker}`,
      );
      const uniqueSlugs = [
        ...new Set(
          [
            ...card.matchAll(
              /<a\b[^>]*\shref\s*=\s*(["'])\/blog\/([^/"']+)\/\1[^>]*>/gi,
            ),
          ].map((match) => match[2]),
        ),
      ];
      assert.equal(
        uniqueSlugs.length,
        1,
        `${marker} cards should link to exactly one distinct local blog slug`,
      );
      return uniqueSlugs[0];
    });

    assert.deepEqual(cardSlugs.sort(), [...slugs].sort());
  }
});

test('publishes complete article copy and metadata instead of shells', () => {
  for (const slug of articles) {
    const html = readArticle(slug);
    const title = html.match(/<title>([\s\S]*?)<\/title>/i);
    const description = html.match(
      /<meta\s+name="description"\s+content="([^"]*)"\s*\/?\s*>/i,
    );
    const articleMatches = [
      ...html.matchAll(
        /<article\b[^>]*\bclass=(["'])(.*?)\1[^>]*>([\s\S]*?)<\/article>/gi,
      ),
    ].filter((match) => {
      const classes = match[2].trim().split(/\s+/);
      return (
        classes.includes('essay-body') &&
        classes.includes('research-note-article')
      );
    });
    const article = articleMatches[0]?.[3];
    const provenance = html.match(
      /<([a-z][\w-]*)\b[^>]*class="[^"]*\bresearch-note-provenance\b[^"]*"[^>]*>([\s\S]*?)<\/\1>/i,
    );
    const section = metaContent(html, 'property', 'article:section');
    const readingTime = metaContent(html, 'name', 'reading-time');

    assert.ok(title?.[1].trim(), `${slug} should have a non-empty title`);
    assert.ok(
      description?.[1].trim(),
      `${slug} should have a non-empty meta description`,
    );
    assert.match(
      html,
      new RegExp(
        `<link rel="canonical" href="https://antreas\\.io/blog/${slug}/">`,
      ),
    );
    assert.ok(
      section?.trim(),
      `${slug} should have a non-empty article:section meta tag`,
    );
    assert.match(
      readingTime?.trim() ?? '',
      /^[1-9]\d*\s+min$/,
      `${slug} reading-time should be a positive integer followed by "min"`,
    );
    assert.ok(
      hasStylesheet(html, '/styles.css'),
      `${slug} should load /styles.css`,
    );
    assert.ok(
      hasStylesheet(html, '/blog/research-notes.css'),
      `${slug} should load /blog/research-notes.css`,
    );
    assert.ok(
      hasThemeToggle(html),
      `${slug} should contain a theme-toggle control`,
    );
    assert.equal(
      articleMatches.length,
      1,
      `${slug} should contain one essay-body research-note-article`,
    );
    assert.ok(
      provenance && visibleWords(provenance[2]) > 0,
      `${slug} should contain non-empty provenance`,
    );
    if (collectionTwo.includes(slug)) {
      const provenanceText = visibleText(provenance?.[2] ?? '');
      assert.match(provenanceText, /2025/);
      assert.match(provenanceText, /conversation/i);
      assert.match(provenanceText, /Research Archivum/);
      assert.doesNotMatch(provenanceText, /January 2025/i);
    }
    assert.match(html, /Back to all writing/);
    assert.doesNotMatch(
      html,
      /\b(?:TBD|TODO|PLACEHOLDER|FIXME|Lorem ipsum)\b|\[[^\]]*\b(?:insert|draft|placeholder)\b[^\]]*\]/i,
    );

    const wordCount = visibleWords(article ?? '');
    assert.ok(
      wordCount >= 800,
      `${slug} should contain at least 800 visible article words; found ${wordCount}`,
    );
    assert.ok(
      (article?.match(/<h2\b/gi) || []).length >= 4,
      `${slug} should contain at least four article section headings`,
    );
  }
});

test('keeps audited blog navigation and links perceivable', () => {
  assert.match(blogIndex, /aria-label="Toggle navigation"/);
  assert.match(blogIndex, /aria-controls="mobile-menu"/);
  assert.match(blogIndex, /aria-expanded="false"/);
  assert.match(
    blogIndex,
    /\.archivum-source-note a\s*\{[^}]*text-decoration:\s*underline/s,
  );
  assert.match(
    globalStyles,
    /\[data-theme="dark"\]\s+\.btn-primary\s*\{[^}]*background:\s*#[0-9a-f]{6}/i,
  );
  assert.match(blogIndex, /\.writing-intro\s*\{[^}]*max-width:\s*72ch/s);
  assert.match(
    researchNotesCss,
    /\.essay-body\s*\{[^}]*max-width:\s*65ch/s,
  );
  assert.doesNotMatch(
    researchNotesCss,
    /\.research-note-actions\s*>\s*a\s*\{[^}]*display:\s*none/s,
  );
});

test('labels Collection III maturity honestly', () => {
  for (const selector of [
    '.research-note-header',
    '.research-note-maturity',
  ]) {
    for (const declarations of declarationBlocksForSelector(
      researchNotesCss,
      selector,
    )) {
      assert.doesNotMatch(
        declarations,
        /\b(?:display\s*:\s*none|visibility\s*:\s*hidden)\b/i,
        `${selector} should not be hidden by research-notes.css`,
      );
    }
  }

  for (const slug of collectionThree) {
    const html = readArticle(slug);
    const visibleHtml = html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
    const headers = elementsWithClass(
      visibleHtml,
      'header',
      'research-note-header',
    );
    const maturityParagraphs = elementsWithClass(
      visibleHtml,
      'p',
      'research-note-maturity',
    );

    assert.equal(
      maturityParagraphs.length,
      1,
      `${slug} should contain exactly one p.research-note-maturity`,
    );

    const maturity = maturityParagraphs[0];
    const openingTag = maturity.match(/^<p\b[^>]*>/i)?.[0] ?? '';
    const containingHeaders = headers.filter((header) =>
      header.includes(maturity),
    );
    assert.equal(
      containingHeaders.length,
      1,
      `${slug} maturity paragraph should be inside a research-note-header`,
    );
    const headerOpeningTag =
      containingHeaders[0]?.match(/^<header\b[^>]*>/i)?.[0] ?? '';
    assert.doesNotMatch(
      headerOpeningTag,
      /\shidden(?=\s|=|\/?>)/i,
      `${slug} research-note-header should not have hidden`,
    );
    assert.notEqual(
      flexibleAttributeValue(headerOpeningTag, 'aria-hidden')
        ?.trim()
        .toLowerCase(),
      'true',
      `${slug} research-note-header should not have aria-hidden="true"`,
    );
    assert.doesNotMatch(
      flexibleAttributeValue(headerOpeningTag, 'style') ?? '',
      /\b(?:display\s*:\s*none|visibility\s*:\s*hidden)\b/i,
      `${slug} research-note-header should not be hidden by inline style`,
    );
    assert.doesNotMatch(
      openingTag,
      /\shidden(?=\s|=|\/?>)/i,
      `${slug} maturity paragraph should not have hidden`,
    );
    assert.notEqual(
      flexibleAttributeValue(openingTag, 'aria-hidden')?.trim().toLowerCase(),
      'true',
      `${slug} maturity paragraph should not have aria-hidden="true"`,
    );
    assert.doesNotMatch(
      flexibleAttributeValue(openingTag, 'style') ?? '',
      /\b(?:display\s*:\s*none|visibility\s*:\s*hidden)\b/i,
      `${slug} maturity paragraph should not be hidden by inline style`,
    );

    const maturityText = visibleText(maturity).replace(/\s+/g, ' ');
    assert.equal(
      maturityText,
      `Maturity: ${collectionThreeMaturity[slug]}`,
      `${slug} should show its source-traceable maturity label`,
    );
  }
});
