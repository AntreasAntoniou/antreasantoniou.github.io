import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const root = new URL('../', import.meta.url);
const integer = (n) => Number.isSafeInteger(n) && n >= 0;

export function slugsFor(catalogue) {
  const slugs = catalogue.skills?.map(s => s.slug);
  if (catalogue.owner !== 'AntreasAntoniou' || !slugs?.length ||
      slugs.some(s => typeof s !== 'string' || !/^[a-z0-9-]+$/.test(s)) ||
      new Set(slugs).size !== slugs.length) throw new Error('Invalid or duplicate catalogue');
  return slugs.sort();
}

export async function collect(catalogue, fetcher = fetch, previous = null, now = new Date()) {
  const skills = [];
  const pendingSkills = [];
  for (const slug of slugsFor(catalogue)) {
    const source = `https://clawhub.ai/api/v1/skills/${slug}?ownerHandle=antreasantoniou`;
    const response = await fetcher(source, { signal: AbortSignal.timeout(15000) });
    const old = previous?.skills?.find(s => s.slug === slug);
    // Only explicitly awaiting first publication may be absent. A previously
    // measured listing disappearing is an error, never a silently reduced total.
    if (response.status === 404 && !old && catalogue.skills.find(s => s.slug === slug)?.clawhubPending === true) {
      pendingSkills.push(slug);
      continue;
    }
    if (!response.ok) throw new Error(`ClawHub ${slug}: HTTP ${response.status}`);
    const data = await response.json();
    const downloads = data.skill?.stats?.downloads;
    if (data.skill?.slug !== slug || data.owner?.handle?.toLowerCase() !== 'antreasantoniou' ||
        data.moderation?.blocked || !integer(downloads)) throw new Error(`Invalid source: ${slug}`);
    if (old && downloads < old.downloads) throw new Error(`Download decrease requires review: ${slug}`);
    skills.push({ slug, downloads, source });
  }
  const total = skills.reduce((sum, s) => sum + s.downloads, 0);
  if (!integer(total)) throw new Error('Unsafe total');
  return { schemaVersion: 1, metric: 'clawhub-downloads', label: 'ClawHub downloads',
    total, skillCount: skills.length, catalogueSize: catalogue.skills.length, pendingSkills, checkedAt: now.toISOString(),
    definition: 'Sum of verified ClawHub download counters for listed Agent Toolkit skills. Pending first publications are enumerated separately, not treated as zero. Download events, not unique users. Excludes installs, Git clones and GitHub release assets.', skills };
}

export function badge(snapshot) {
  if (!integer(snapshot.total) || !integer(snapshot.skillCount)) throw new Error('Invalid badge values');
  const date = new Date(snapshot.checkedAt).toISOString().slice(0, 10);
  const value = snapshot.total.toLocaleString('en-US');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="104" viewBox="0 0 360 104" role="img" aria-labelledby="title desc">
  <title id="title">ClawHub downloads: ${value}</title>
  <desc id="desc">Across ${snapshot.skillCount} listed skills. Last verified ${date} UTC. Download events, not unique users.</desc>
  <rect width="360" height="104" rx="10" fill="#0b1626"/>
  <rect x="0" y="16" width="4" height="72" rx="2" fill="#ff7959"/>
  <g font-family="Verdana,Arial,sans-serif">
    <text x="20" y="27" fill="#eef3f1" font-size="13">ClawHub downloads</text>
    <text x="20" y="66" fill="#ffffff" font-size="32" font-weight="700">${value}</text>
    <text x="20" y="89" fill="#bfcdcf" font-size="11">${snapshot.skillCount} listed skills · Verified ${date} UTC</text>
  </g>
</svg>\n`;
}

export async function update(base = root, fetcher = fetch) {
  const catalogue = JSON.parse(await readFile(new URL('skills/catalogue.json', base), 'utf8'));
  let previous = null;
  try { previous = JSON.parse(await readFile(new URL('data/clawhub-downloads.json', base), 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  // No output changes until every source has validated successfully.
  const snapshot = await collect(catalogue, fetcher, previous);
  const svg = badge(snapshot);
  await mkdir(new URL('data/', base), { recursive: true });
  for (const [name, content] of [['clawhub-downloads.json', JSON.stringify(snapshot, null, 2) + '\n'], ['clawhub-downloads.svg', svg]]) {
    await writeFile(new URL(`data/${name}.tmp`, base), content);
    await rename(new URL(`data/${name}.tmp`, base), new URL(`data/${name}`, base));
  }
  return snapshot;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  update().then(s => console.log(`${s.total} ClawHub downloads across ${s.skillCount} skills`))
    .catch(e => { console.error(e.message); process.exitCode = 1; });
}
