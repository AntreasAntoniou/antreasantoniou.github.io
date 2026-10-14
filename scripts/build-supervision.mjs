import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const featured = JSON.parse(readFileSync(resolve(root, 'supervision/projects.json'), 'utf8'));
const catalogue = JSON.parse(readFileSync(resolve(root, 'supervision/catalogue.json'), 'utf8'));
const projects = [...featured, ...catalogue];
const depthLabels = { 'case-study': 'Detailed case study', 'research-note': 'Research note', review: 'Review contribution' };
const writingPage = readFileSync(resolve(root, 'writing/index.html'), 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const nav = writingPage.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0];
if (!nav) throw new Error('The shared Writing navigation could not be found.');
const themes = [...new Set(projects.map(project => project.theme))];
if (new Set(projects.map(project => project.id)).size !== projects.length) throw new Error('Duplicate project IDs.');
for (const project of projects) {
  if (!/^[a-z0-9-]+$/.test(project.id)) throw new Error('Invalid project ID.');
  if (!depthLabels[project.entryType || 'case-study']) throw new Error('Invalid entry type.');
  for (const link of project.links) {
    if (!/^https:\/\//.test(link.url)) throw new Error('Only explicit public HTTPS artefacts are allowed.');
  }
}
const cards = projects.map(project => `
      <article class="project" id="${escape(project.id)}" data-project data-period="${escape(project.period)}" data-cohort="${escape(project.years.slice(0, 4))}" data-depth="${escape(project.entryType || 'case-study')}" data-theme-name="${escape(project.theme)}" data-search="${escape([project.title, project.years, project.context, project.question, project.mechanism, project.contribution, project.outcome, ...project.tags, ...project.discuss].join(' '))}">
        <div class="project-meta"><span>${escape(project.years)} · ${escape(project.context)}</span><a class="project-permalink" href="#${escape(project.id)}" aria-label="Link to ${escape(project.title)}">↗</a></div>
        <p class="project-depth-label">${depthLabels[project.entryType || 'case-study']}</p>
        <h2>${escape(project.title)}</h2>
        <p class="project-question">${escape(project.question)}</p>
        <ul class="project-tags" aria-label="Methods">${project.tags.map(tag => `<li>${escape(tag)}</li>`).join('')}</ul>
        <details>
          <summary>The project, my role &amp; discussion points</summary>
          <div class="project-detail">
            <h3>What we explored</h3><p>${escape(project.mechanism)}</p>
            <h3>My part</h3><p>${escape(project.contribution)}</p>
            <h3>Where it got to</h3><p>${escape(project.outcome)}</p>
            <h3>Worth discussing</h3><ul>${project.discuss.map(point => `<li>${escape(point)}</li>`).join('')}</ul>
            ${project.links.length ? `<div class="project-links">${project.links.map(link => `<a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer">${escape(link.label)} <span aria-hidden="true">↗</span></a>`).join('')}</div>` : ''}
          </div>
        </details>
      </article>`).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Research with students | Antreas Antoniou</title>
  <meta name="description" content="Research projects I helped conceive, develop and supervise during my PhD and postdoc years: the questions, the mechanisms, and what we learned.">
  <link rel="canonical" href="https://antreas.io/supervision/">
  <meta property="og:title" content="Research with students | Antreas Antoniou">
  <meta property="og:description" content="From generative models and relational reasoning to adaptive augmentation and neuroevolution. Explore the projects and the questions behind them.">
  <meta property="og:url" content="https://antreas.io/supervision/">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://antreas.io/images/profile.jpg">
  <link rel="icon" type="image/jpeg" href="/images/favicon-bot.jpeg">
  <link rel="stylesheet" href="/styles.css?v=20260724-daedalus-work">
  <link rel="stylesheet" href="/tailwind-built.css">
  <link rel="stylesheet" href="/supervision/supervision.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script>try { if (localStorage.getItem('theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark'); } catch {}</script>
  <script type="module" src="/supervision/supervision.mjs"></script>
</head>
<body class="supervision-page">
  <a class="skip-link" href="#main-content">Skip to the projects</a>
  ${nav.replace(/ aria-current="page"/g, '').replace(/class="text-accent font-semibold transition"/g, 'class="text-secondary hover:text-accent transition"').replace(/class="block text-accent font-semibold"(?=>Writing advice)/g, 'class="block text-secondary hover:text-accent"')}
  <main class="supervision-shell" id="main-content">
    <header class="supervision-header">
      <a class="back-link" href="/#teaching">← Teaching</a>
      <p class="supervision-eyebrow">Edinburgh · PhD &amp; postdoc years</p>
      <h1>Research with students</h1>
      <p class="supervision-intro">Could a GAN generate useful training data? Could a classifier choose what to learn next? Research I conceived, developed, supervised or reviewed with Machine Learning Practical (MLP) and MSc students during my PhD and postdoc years.</p>
      <p class="supervision-scope">I proposed many of these directions and helped with architectures, experiments and code. Some grew into further research; others were useful explorations or projects I reviewed. Each entry separates the idea, my contribution and what the work actually established.</p>
      <p class="catalogue-summary">${projects.length} research entries, including ${featured.length} detailed case studies. Browse the full catalogue or filter by year, theme and level of detail.</p>
    </header>

    <section class="project-browser" aria-label="Browse research projects">
      <form class="project-controls" id="project-controls" hidden role="search">
        <div class="search-field"><label for="project-search">Find a project or method</label><input type="search" id="project-search" placeholder="Try GANs, curriculum, CLIP…" autocomplete="off"></div>
        <div><label for="project-period">When</label><select id="project-period"><option value="all">All years</option><option value="phd">All MLP years</option><option value="postdoc">Postdoc / MSc</option>${[...new Set(projects.map(p => p.years.slice(0, 4)))].sort().map(year => `<option value="${escape(year)}">${escape(year)} cohort</option>`).join('')}</select></div>
        <div><label for="project-theme">Research theme</label><select id="project-theme"><option value="all">All themes</option>${themes.map(theme => `<option value="${escape(theme)}">${escape(theme)}</option>`).join('')}</select></div>
        <div><label for="project-depth">Explore</label><select id="project-depth"><option value="all">All entries</option><option value="case-study">Detailed case studies</option><option value="research-note">Research notes</option><option value="review">Review contributions</option></select></div>
      </form>
      <div class="project-toolbar" id="project-toolbar" hidden><p id="project-count" role="status" aria-live="polite" aria-atomic="true"></p><div><button type="button" id="reset-projects">Reset filters</button><button type="button" id="expand-projects" aria-expanded="false">Expand details</button><button type="button" id="print-projects">Print matching projects</button></div></div>
      <noscript><p>All projects are shown below. Open an entry for the technical details and my contribution.</p></noscript>
      <div class="project-grid" id="project-grid">${cards}
      </div>
      <div class="project-empty" id="project-empty" hidden><h2>No projects match those filters.</h2><p>Try a broader term, or <button type="button" id="empty-reset">show all projects</button>.</p></div>
    </section>

    <aside class="supervision-footnote"><h2>About the catalogue</h2><p>MLP is Edinburgh’s Machine Learning Practical course. This catalogue brings together recovered projects, research discussions and review contributions, not only publications. Detailed case studies have fuller accounts of the work; research notes preserve narrower evidence. Review contributions are identified separately. The entry count is not a count of projects I personally implemented or teams I formally supervised.</p><p>Discussion points are prompts for exploring the work, not claims that every suggested experiment was carried out. Records without an established topic remain in the private archive while I reconstruct them; this is not an exhaustive census of every project.</p><p>The 2021 MLP projects sit in my PhD-to-postdoc transition year and are grouped with the earlier MLP work. Student reports, private correspondence and assessment records stay private. Public papers and code are linked where available.</p></aside>
  </main>
  <footer class="supervision-footer"><div class="supervision-shell"><a href="/">Antreas Antoniou</a><div><a href="/#teaching">Teaching</a><a href="/writing/">Writing advice</a><a href="/#research">Research</a></div></div></footer>
</body>
</html>
`;
mkdirSync(resolve(root, 'supervision'), { recursive: true });
writeFileSync(resolve(root, 'supervision/index.html'), html.replace(/[ \t]+$/gm, ''));
console.log(`Built supervision/index.html with ${projects.length} projects.`);
