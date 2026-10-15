export function normalize(text) {
  return String(text).normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().trim();
}

export function matchesProject(project, { query = '', mentorship = 'all', theme = 'all', depth = 'all' } = {}) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return (mentorship === 'all' || project.mentorship === mentorship)
    && (theme === 'all' || project.theme === theme)
    && (depth === 'all' || project.depth === depth)
    && terms.every(term => normalize(project.text).includes(term));
}

if (typeof document !== 'undefined') {
  const search = document.getElementById('project-search');
  const mentorship = document.getElementById('project-mentorship');
  const theme = document.getElementById('project-theme');
  const depth = document.getElementById('project-depth');
  const expand = document.getElementById('expand-projects');
  const print = document.getElementById('print-projects');
  const cards = [...document.querySelectorAll('[data-project]')];
  const visibleDetails = () => cards.filter(card => !card.hidden).map(card => card.querySelector('details'));
  const updateExpand = () => {
    const visible = visibleDetails();
    const allOpen = visible.length > 0 && visible.every(detail => detail.open);
    expand.textContent = allOpen ? 'Collapse details' : 'Expand details';
    expand.setAttribute('aria-expanded', String(allOpen));
    expand.disabled = visible.length === 0;
    expand.hidden = visible.length === 0;
  };
  const filter = () => {
    const selection = { query: search.value, mentorship: mentorship.value, theme: theme.value, depth: depth.value };
    for (const card of cards) card.hidden = !matchesProject({ mentorship: card.dataset.mentorship, depth: card.dataset.depth, theme: card.dataset.themeName, text: card.dataset.search }, selection);
    const count = cards.filter(card => !card.hidden).length;
    document.getElementById('project-count').textContent = `${count} of ${cards.length} research entries`;
    document.getElementById('project-empty').hidden = count !== 0;
    print.disabled = count === 0;
    print.hidden = count === 0;
    updateExpand();
  };
  const reset = () => { search.value = ''; mentorship.value = 'all'; theme.value = 'all'; depth.value = 'all'; filter(); };
  const openHash = () => {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const card = cards.find(item => item.id === id);
    if (!card) return;
    reset();
    card.querySelector('details').open = true;
    updateExpand();
    requestAnimationFrame(() => card.scrollIntoView({ block: 'start' }));
  };
  document.getElementById('project-controls').addEventListener('submit', event => event.preventDefault());
  search.addEventListener('input', filter);
  mentorship.addEventListener('change', filter);
  theme.addEventListener('change', filter);
  depth.addEventListener('change', filter);
  document.getElementById('reset-projects').addEventListener('click', reset);
  document.getElementById('empty-reset').addEventListener('click', () => { reset(); search.focus(); });
  expand.addEventListener('click', () => {
    const details = visibleDetails();
    const open = !details.every(detail => detail.open);
    details.forEach(detail => { detail.open = open; });
    updateExpand();
  });
  cards.forEach(card => card.querySelector('details').addEventListener('toggle', updateExpand));
  let beforePrint;
  window.addEventListener('beforeprint', () => {
    beforePrint = new Map(cards.map(card => [card.querySelector('details'), card.querySelector('details').open]));
    visibleDetails().forEach(detail => { detail.open = true; });
  });
  window.addEventListener('afterprint', () => { beforePrint?.forEach((open, detail) => { detail.open = open; }); beforePrint = null; updateExpand(); });
  print.addEventListener('click', () => window.print());
  window.toggleTheme = () => {
    const dark = document.documentElement.getAttribute('data-theme') !== 'dark';
    if (dark) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  };
  window.toggleMobileMenu = button => {
    const menu = document.getElementById('mobile-menu');
    const open = menu.classList.contains('hidden');
    menu.classList.toggle('hidden', !open);
    button.setAttribute('aria-expanded', String(open));
  };
  document.getElementById('mobile-menu').addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    document.getElementById('mobile-menu').classList.add('hidden');
    document.querySelector('[aria-controls="mobile-menu"]').setAttribute('aria-expanded', 'false');
  });
  window.addEventListener('hashchange', openHash);
  document.getElementById('project-controls').hidden = false;
  document.getElementById('project-toolbar').hidden = false;
  filter();
  openHash();
}
