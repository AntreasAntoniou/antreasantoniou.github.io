# Pieces Essays Republication Design

## Goal

Publish Antreas Antoniou's two complete, locally archived Pieces essays on antreas.io and make the blog index lead to the local reading experience without obscuring Pieces as the original venue.

## Scope

- Publish `/blog/beyond-the-cloud/` from the archived 12 August 2025 article.
- Publish `/blog/the-cost-of-ai-scaling/` from the archived 31 July 2025 article.
- Retain Antreas Antoniou as the visible author and link prominently to each original Pieces page.
- Add the third Antreas-authored Pieces article, “AI memory explained,” to the index as an external-only item because no complete local source is archived.
- Leave the ten Research Archivum field notes unchanged.

## Editorial and provenance policy

The two local pages preserve the published article text, correcting only the obvious export artefact `T` after “foundation itself.” Each page says “Originally published on the Pieces blog,” includes the original date and URL, and uses the original Pieces URL as its canonical URL to avoid presenting a duplicate publication as the primary copy.

## Presentation

Reuse the light-first site theme, article typography, navigation, and dark-mode control. Published Pieces essays receive a compact publication rail (author, original date, venue), a clear original-article callout, responsive figures where archived artwork exists, and a return link to all writing. On the index, the two cards use a local primary reading link and a secondary “Original on Pieces” link.

## Acceptance criteria

- Both local routes contain the full archived article body, byline, date, and original link.
- Blog index exposes exactly two local Pieces essays and the external-only AI Memory article.
- Canonical and provenance metadata are honest and machine-readable.
- Existing blog and DAEDALUS tests remain green; dedicated republication tests cover routes, links, attribution, content depth, accessibility, and responsive styling.
