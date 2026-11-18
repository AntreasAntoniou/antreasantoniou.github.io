"use strict";
let atlas;
const main = document.querySelector("main");
const privateEdition = document.documentElement.dataset.edition === "private";
const mediaLoads = new Set();
const mediaUrls = new Set();
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const iso = (n) => n.toLocaleString("en-US");
const clock = (n) =>
  Math.floor(n / 60) + ":" + String(Math.floor(n % 60)).padStart(2, "0");
const tag = (text) => '<p class="eyebrow">' + esc(text) + "</p>";
const button = (url, label, light = false) =>
  '<a class="btn' +
  (light ? " light" : "") +
  '" href="' +
  esc(url) +
  '">' +
  esc(label) +
  "</a>";
const link = (url, label) =>
  '<a href="' + esc(url) + '">' + esc(label) + "</a>";
const external = (url, label) =>
  '<a rel="external noreferrer" href="' +
  esc(url) +
  '">' +
  esc(label) +
  " ↗</a>";
const watch = (r, offset = 0) =>
  "https://www.youtube.com/watch?v=" +
  r.video +
  "&t=" +
  Math.floor(r.start + offset) +
  "s";
const headings = (title, description) =>
  "<h1>" + esc(title) + '</h1><p class="lead">' + esc(description) + "</p>";
const back = (route, label) =>
  '<p class="crumb">' + link(route, "← " + label) + "</p>";
const section = (title, body, more = "") =>
  '<section class="section"><div class="section-head"><h2>' +
  esc(title) +
  "</h2>" +
  more +
  "</div>" +
  body +
  "</section>";
const pic = (wid, alt, cls = "photo", lazy = true) =>
  atlas.images[wid]
    ? '<img class="' +
      cls +
      '" src="' +
      esc(atlas.images[wid].asset) +
      '" alt="' +
      esc(alt) +
      '" ' +
      (lazy ? 'loading="lazy"' : 'fetchpriority="high"') +
      ' decoding="async">'
    : "";
function credit(wid) {
  const x = atlas.images[wid];
  if (!x) return "";
  return (
    '<figcaption class="credit">' +
    (x.cropped ? "Cropped detail · " : "") +
    external(x.file, "Original image and creator credit") +
    " · " +
    external(x.terms, x.license) +
    "</figcaption>"
  );
}
function photo(wid, label) {
  return (
    "<figure>" +
    pic(wid, label) +
    '<p class="credit">' +
    esc(label) +
    "</p>" +
    credit(wid) +
    "</figure>"
  );
}
function ticks(row, end) {
  const width = end || Math.max(...row.starts, 10);
  const marks = row.starts
    .map(
      (t) =>
        '<i aria-hidden="true" ' +
        (t === row.start ? 'class="selected" ' : "") +
        'style="left:' +
        (100 * t) / width +
        '%"></i>',
    )
    .join("");
  return (
    '<div class="sig" role="img" aria-label="' +
    row.starts.length +
    " retained starts; highlighted window at " +
    clock(row.start) +
    '">' +
    marks +
    '</div><div class="scale"><span>0:00</span><span>' +
    clock(width) +
    "</span></div>"
  );
}
function recordBox(
  id,
  title,
  frame = null,
  commonEnd = null,
  sourceView = false,
) {
  const r = atlas.rows[id];
  if (!r) return "";
  const excerpt = frame === null ? r.start : r.start + frame;
  const ref = sourceView ? "" : link("#record/" + id, "Record " + id);
  const start = r.cues
    .map((t) => "+" + Math.round(t * 100) / 100 + " s")
    .join(", ");
  return (
    '<article class="record-box"><h3>' +
    esc(title) +
    "</h3>" +
    ticks(r, commonEnd) +
    '<p class="measure">' +
    r.starts.length +
    " retained " +
    (r.starts.length === 1 ? "start" : "starts") +
    " · selected window " +
    clock(r.start) +
    "–" +
    clock(r.start + 10) +
    "</p>" +
    '<div class="links">' +
    (r.clipHash && window.isSecureContext
      ? '<button class="btn load-clip" type="button" data-id="' +
        esc(id) +
        '" data-offset="' +
        (frame || 0) +
        '">Load TALI clip at ' +
        clock(excerpt) +
        "</button>"
      : "") +
    (id === "564000649"
      ? ""
      : '<button class="btn light play" type="button" data-video="' +
        esc(r.video) +
        '" data-time="' +
        Math.floor(excerpt) +
        '">Play on YouTube</button>') +
    (id === "564000649"
      ? '<span class="fine">The original YouTube upload is unavailable.</span>'
      : external(watch(r, frame || 0), "YouTube source")) +
    ref +
    (privateEdition ? link("/#record/" + id, "Load release media") : "") +
    "</div>" +
    (sourceView
      ? '<p class="sub">Stored subtitle cue starts in this window: ' +
        (start || "none") +
        ".</p>"
      : "") +
    "</article>"
  );
}
function tile(route, img, alt, over, title, desc = "", cls = "") {
  return (
    '<a class="tile ' +
    cls +
    '" href="' +
    esc(route) +
    '">' +
    (img
      ? '<img loading="lazy" decoding="async" src="' +
        esc(img) +
        '" alt="' +
        esc(alt) +
        '">'
      : "") +
    "<article>" +
    tag(over) +
    "<h3>" +
    esc(title) +
    "</h3>" +
    (desc ? "<p>" + esc(desc) + "</p>" : "") +
    "</article></a>"
  );
}
function featureTile(h) {
  const r = atlas.rows[h.rid];
  return tile(
    "#case/" + h.slug,
    atlas.images[r.wit]?.asset,
    h.reference,
    h.name,
    h.title,
    h.reference,
  );
}
function plateTile(p) {
  return tile(
    "#atlas/" + p.key,
    p.thumb,
    "",
    p.chapter + " · " + p.key,
    p.title,
    "",
    "plate",
  );
}
function pairTile(p) {
  return tile(
    "#pairs/" + p.wit,
    atlas.images[p.wit]?.asset,
    p.reference,
    "Two recordings",
    p.title,
    p.reference,
  );
}
function mini(route, title, desc) {
  return (
    '<a class="mini-link" href="' +
    esc(route) +
    '"><strong>' +
    esc(title) +
    "</strong><p>" +
    esc(desc) +
    "</p></a>"
  );
}
const grid = (list) => '<div class="grid">' + list.join("") + "</div>";
const minis = (list) => '<div class="mini-grid">' + list.join("") + "</div>";
function coverFrame() {
  const c=atlas.paper.companion;
  return '<figure class="visor-cover"><div class="visor-stage" data-cover-frame>' +
    '<img class="standby-portrait" src="'+esc(c.asset)+'" alt="Detail of a masked Tali cosplay at San Diego Comic-Con in 2015">' +
    '</div><figcaption class="credit">Companion photograph from WIT · cropped · '+
    external(c.file, c.creator)+' · '+external(c.terms,c.license)+'</figcaption></figure>';
}

const stillCache = new Map();
async function showCoverFrame(stage) {
  const row=atlas.rows["504001602"];
  const alt="Tali’s visor in the Mass Effect retrospective at 6:39";
  const present = (src) => {
    if (!stage.isConnected) return;
    const image = new Image();
    image.alt=alt;
    image.className="cover-still";
    image.src=src;
    stage.replaceChildren(image);
    stage.parentElement.querySelector("figcaption").innerHTML =
      link("#record/504001602","Tali at 6:39 · verified release frame");
    stage.dataset.verified = "true";
  };
  if (stillCache.has(row.clipHash)) { present(stillCache.get(row.clipHash)); return; }
  if (navigator.connection?.saveData) return;
  const controller=new AbortController();
  mediaLoads.add(controller);
  let url, timer;
  try {
    timer = setTimeout(() => controller.abort(),25000);
    url = await verifiedClipURL(row,controller);
    if (!stage.isConnected || controller.signal.aborted) return;
    const video=document.createElement("video");
    video.muted=true; video.playsInline=true; video.preload="auto";
    await new Promise((resolve,reject) => {
      controller.signal.addEventListener("abort",() => reject(new Error("Cover load stopped")), {once:true});
      video.addEventListener("error",() => reject(new Error("Cover decode failed")),{once:true});
      video.addEventListener("loadedmetadata",() => { video.currentTime=9; },{once:true});
      video.addEventListener("seeked",resolve,{once:true});
      video.src=url;
    });
    if (controller.signal.aborted || !stage.isConnected) return;
    if (!video.videoWidth || Math.abs(video.currentTime-9)>.1) throw Error("Cover time changed");
    const canvas=document.createElement("canvas");
    canvas.width=video.videoWidth; canvas.height=video.videoHeight;
    canvas.getContext("2d").drawImage(video,0,0);
    const frame=canvas.toDataURL("image/webp",.91);
    stillCache.set(row.clipHash,frame);
    present(frame);
  } catch {
    // Keep the separately credited WIT portrait available on slow or offline connections.
  } finally {
    clearTimeout(timer);
    if (url) URL.revokeObjectURL(url);
    mediaLoads.delete(controller);
  }
}

function selectedItems() {
  return [
    ...atlas.paper.main.map((s,i) => ({...s,number:"Figure "+(i+2)})),
    ...atlas.paper.appendix.flatMap(g=>g.items).map((s,i) => ({...s,number:"Figure A"+(i+1)})),
  ];
}
function recordPhotos(p) {
  return '<div class="photo-rail">'+p.records.map(({id,label}) => {
    const w=atlas.rows[id].wit;
    return '<figure><a href="#record/'+esc(id)+'">'+pic(w,label)+
      '<span>'+esc(label)+'</span></a>'+credit(w)+'</figure>';
  }).join("")+'</div>';
}
function guideTile(item) {
  const p=atlas.plates[item.key];
  const two=p.key==="original-02" || p.key==="original-03";
  const art=two?'<div class="photo-strip">'+p.records.slice(0,3).map(({id,label})=>pic(atlas.rows[id].wit,label)).join("")+'</div>':
    '<img loading="lazy" decoding="async" src="'+esc(p.thumb)+'" alt="">';
  return '<a class="guide-tile" href="#atlas/'+esc(p.key)+'">'+art+'<article>'+tag(item.number)+
    '<h3>'+esc(item.title||p.title)+'</h3><p>'+esc(item.note)+'</p>'+
    (item.scope?'<small>'+esc(item.scope)+'</small>':'')+'</article></a>';
}
function paperGuide() {
  const entries=selectedItems();
  let n=4;
  const groups=atlas.paper.appendix.map(g=>{
    const cards=entries.slice(n,n+g.items.length);n+=g.items.length;
    return section(g.title,'<div class="guide-grid appendix-grid">'+cards.map(guideTile).join("")+'</div>');
  }).join("");
  return back("#highlights","Atlas highlights")+headings("The illustrated paper",
      "Follow one reference photograph into two recordings, then explore the paper’s figures and the data behind them.")+
    '<section class="cover-intro">'+coverFrame()+'<div>'+tag("Figure 1")+
    '<h2>TALI contains Tali.</h2><p>A Mass Effect retrospective and a Minecraft meetup share the same WIT photograph of Legion at PAX Prime. The two recording timelines show how.</p>'+
    button("#case/mass-effect","Open the recordings →")+'</div></section>'+
    section("The main figures",'<div class="guide-grid">'+entries.slice(0,4).map(guideTile).join("")+'</div>')+
    '<section class="edition-callout">'+tag("Figure 6")+'<h2>'+link("#editions","Topics across Wikipedia editions")+'</h2>'+
    '<p>43 release photographs illustrate eleven topic lists across four editions. Each cell counts distinct entries and recordings. Explore all 108 editions in the atlas.</p>'+
    link("#editions","Open the contact sheet →")+'</section>'+
    '<div class="appendix-intro"><h2>The visual appendix</h2><p>Sixteen plates, each with its own observations and population.</p></div>'+groups;
}

function home() {
  const h = atlas.highlights[0],
    r = atlas.rows[h.rid],
    rr = atlas.rows["504001609"];
  const heroLine = (id, title) => {
    const row = atlas.rows[id];
    return (
      '<div class="hero-stat">' +
      link("#record/" + id, title) +
      "<small>" +
      row.starts.length +
      " retained starts</small>" +
      ticks(row, 570) +
      "</div>"
    );
  };
  const hero =
    '<section class="hero"><div>' +
    tag("Mass Effect · featured pair") +
    "<h1>TALI contains <em>Tali.</em></h1>" +
    "<p>A Legion cosplay photograph links to two recordings. One follows the character and cuts to Tali at 6:39. The other follows a Minecraft meetup at the convention where the photograph was taken.</p>" +
    '<div class="actions">' +
    button("#case/mass-effect", "Explore the two recordings →") +
    link(
      privateEdition ? "/#record/" + h.rid : "#case/mass-effect/clip",
      "See Tali at 6:39",
    ) +
    "</div><footer>Temporal Audio Language and Images</footer></div>" +
    '<div class="hero-media">' + coverFrame() + "<div>" +
    heroLine(h.rid, "Mass Effect retrospective") +
    heroLine("504001609", "PAX Prime meetup") +
    "</div></div></section>";
  const selected = ["002", "080", "077", "original-03"];
  const top = atlas.highlights.slice(1).map(featureTile);
  const rail = atlas.pairs.find((p) =>
    p.title.toLowerCase().includes("sentosa"),
  );
  if (rail)
    top.push(
      tile(
        "#pairs/" + rail.wit,
        atlas.images[rail.wit]?.asset,
        "Sentosa monorail",
        "Rail simulation",
        "The sim-to-rail gap",
        "A station photograph, a real ride and a simulated one.",
      ),
    );
  return (
    hero +
    section("Figures from the illustrated paper",
      '<p class="guide-intro">Six paired views, two recording timelines and an answer to what happens when no subtitle starts.</p>' +
      '<div class="guide-grid compact">'+selectedItems().slice(0,4).map(guideTile).join("")+"</div>",
      link("#paper", "All paper figures →")) +
    section("More unexpected pairs", grid(top)) +
    section(
      "Look inside the dataset",
      grid(selected.map((k) => plateTile(atlas.plates[k]))),
      link("#plates", "All 110 plates →"),
    ) +
    section(
      "Explore by question",
      minis([
        mini(
          "#pairs",
          "One photograph, two accounts",
          "30 reviewed WIT entries, each with two distinct source recordings.",
        ),
        mini(
          "#editions",
          "Topics across Wikipedia editions",
          "Compare counts of entries and recordings and open the examples behind the cells.",
        ),
        mini(
          "#tours",
          "Five reading paths",
          "Each path starts with four plates, followed by sixteen more.",
        ),
        mini(
          "#matches",
          "Which terms actually occur?",
          "Distinct recording counts across the full 1,172,262-row release.",
        ),
      ]),
    )
  );
}
function matches() {
  return (
    back("#highlights", "Highlights") +
    headings(
      "Which terms actually occur?",
      "A literal search across 143,250 unique recording IDs in the 1,172,262-row release. A recording can match through a Wikipedia field even when the term never appears in its own title.",
    ) +
    '<div class="table-wrap"><table><thead><tr><th>Topic</th><th>Recording title</th><th>Title, Wikipedia page title or reference caption</th></tr></thead><tbody>' +
    atlas.highlights
      .map(
        (h) =>
          "<tr><th>" +
          link("#case/" + h.slug, h.name) +
          "</th><td>" +
          h.counts[0] +
          "</td><td>" +
          h.counts[1] +
          "</td></tr>",
      )
      .join("") +
    "</tbody></table></div>"
  );
}
function feature(h) {
  const r = atlas.rows[h.rid];
  const companion = h.slug === "mass-effect";
  let related = atlas.related.filter((o) =>
    o[2].some((pair) => String(pair[0]) === h.rid),
  );
  return (
    back("#highlights", "Highlights") +
    tag(h.name) +
    headings(h.title, h.blurb) +
    '<div class="case-detail">' +
    (companion ? '<figure class="linked-inset"><div>'+pic(r.wit,"Detail of the linked Legion helmet at PAX Prime 2013")+'</div><figcaption>Linked WIT photograph · helmet detail.</figcaption>'+credit(r.wit)+'</figure>' : photo(r.wit, h.reference)) +
    "<div>" +
    recordBox(
      h.rid,
      companion ? "Mass Effect retrospective" : h.name,
      h.frame,
      companion ? 570 : null,
    ) +
    (companion
      ? recordBox("504001609", "Minecraft meetup at PAX Prime", 1, 570)
      : "") +
    "</div></div>" +
    (related.length && !companion
      ? section(
          "Follow the other links",
          minis(
            related.flatMap((a) =>
              a[2]
                .filter((x) => String(x[0]) !== h.rid)
                .map((x) =>
                  mini(
                    "#record/" + x[0],
                    x[1],
                    "Open the retained window and source recording.",
                  ),
                ),
            ),
          ),
        )
      : "") +
    section(
      "Find this term across TALI",
      "<p>" +
        h.counts[0] +
        " distinct recordings match in their title. The count is " +
        h.counts[1] +
        " when stored Wikipedia page titles and reference captions are included. " +
        link("#matches", "Compare all six searches") +
        "</p>",
    )
  );
}
function pair(p) {
  const end = Math.max(...p.rows.flatMap((id) => atlas.rows[id].starts));
  return (
    back("#pairs", "All two-recording pairs") +
    tag("WIT " + p.wit) +
    headings(p.title, p.reference + ".") +
    '<div class="case-detail">' +
    photo(p.wit, p.reference) +
    "<div>" +
    p.rows
      .map((id, i) => recordBox(id, p.labels[i], p.frames[i], end))
      .join("") +
    "</div></div>"
  );
}
function pairs() {
  return (
    back("#highlights", "Highlights") +
    headings(
      "One photograph, two accounts.",
      "Thirty examples selected from all 37,706 WIT entries linked to two distinct recordings. Each pair uses the same stored reference image and a verified ten-second window from each recording.",
    ) +
    section("The thirty pairs", grid(atlas.pairs.map(pairTile)))
  );
}
function plate(p) {
  const pick = selectedItems().find(item => item.key === p.key);
  return (
    back("#plates", "All 110 plates") +
    tag(p.chapter + " · " + p.key) +
    headings(p.title, p.caption) +
    (pick ? '<p class="paper-back">' + link("#paper",pick.number + " · illustrated paper")+"</p>" : "") +
    (["original-02","original-03"].includes(p.key) ? recordPhotos(p) : "") +
    '<figure><a href="' +
    esc(p.image) +
    '" aria-label="Open full-size figure"><img class="plate-large" src="' +
    esc(p.image) +
    '" alt="' +
    esc(p.title) +
    '"></a></figure>' +
    '<div class="meta">' +
    (p.scope ? "<div><b>Population</b><p>" + esc(p.scope) + "</p></div>" : "") +
    (p.method
      ? "<div><b>How to read it</b><p>" + esc(p.method) + "</p></div>"
      : "") +
    '</div><div class="links">' +
    (p.data ? link(p.data, "Plotted data (JSON)") : "") +
    link(p.image, "Full-size figure") +
    "</div>" +
    (p.records.length
      ? section(
          "Linked records",
          minis(
            p.records.map((r) =>
              mini(
                "#record/" + r.id,
                r.label === "Open record" ? "View the source window" : r.label,
                "WIT " +
                  atlas.rows[r.id].wit +
                  " · recording at " +
                  clock(atlas.rows[r.id].start),
              ),
            ),
          ),
        )
      : "")
  );
}
let filter = "",
  chapter = "",
  page = 0;
const PAGE_SIZE = 18;
function plates() {
  const chapters = [
    ...new Set(Object.values(atlas.plates).map((p) => p.chapter)),
  ].sort();
  return (
    back("#highlights", "Highlights") +
    headings(
      "The visual plates.",
      "100 numbered plates and ten original figures. Each plate identifies the data behind the picture.",
    ) +
    '<div class="toolbar"><label>Search plates<input id="filter" type="search" maxlength="150" value="' +
    esc(filter) +
    '" placeholder="Try subtitles, sound, colour…"></label>' +
    '<label>Chapter<select id="chapter"><option value="">All chapters</option>' +
    chapters
      .map(
        (c) =>
          "<option " +
          (c === chapter ? "selected" : "") +
          ">" +
          esc(c) +
          "</option>",
      )
      .join("") +
    '</select></label><output id="count" aria-live="polite"></output></div><div id="results"></div><div id="pager" class="gallery-nav"></div>'
  );
}
function drawResults() {
  const list = Object.values(atlas.plates)
    .sort((a, b) => a.key.localeCompare(b.key))
    .filter(
      (p) =>
        (!chapter || chapter === p.chapter) &&
        filter
          .toLowerCase()
          .trim()
          .split(/\s+/)
          .every((s) =>
            [p.key, p.title, p.chapter, p.caption, p.scope]
              .join(" ")
              .toLowerCase()
              .includes(s),
          ),
    );
  const pages = Math.ceil(list.length / PAGE_SIZE);
  page = Math.max(0, Math.min(page, pages - 1));
  const start = page * PAGE_SIZE;
  document.querySelector("#count").textContent = list.length
    ? "Showing " +
      (1 + start) +
      "–" +
      Math.min(start + PAGE_SIZE, list.length) +
      " of " +
      list.length +
      " plates"
    : "0 plates";
  document.querySelector("#results").innerHTML = list.length
    ? grid(list.slice(start, start + PAGE_SIZE).map(plateTile))
    : '<p class="empty">No plates match. <button type="button" id="clear">Clear filters</button></p>';
  const pager = document.querySelector("#pager");
  pager.innerHTML =
    pages > 1
      ? '<button class="btn light" id="prev" ' +
        (page === 0 ? "disabled" : "") +
        ">← Previous</button><span>Page " +
        (page + 1) +
        " of " +
        pages +
        '</span><button id="next" class="btn light" ' +
        (page === pages - 1 ? "disabled" : "") +
        ">Next →</button>"
      : "";
  for (const [sel, delta] of [
    ["#prev", -1],
    ["#next", 1],
  ]) {
    const b = document.querySelector(sel);
    if (b)
      b.onclick = () => {
        page += delta;
        drawResults();
        document.querySelector(".toolbar").scrollIntoView();
      };
  }
  const clear = document.querySelector("#clear");
  if (clear)
    clear.onclick = () => {
      filter = "";
      chapter = "";
      page = 0;
      render(false);
    };
}
function tours(t) {
  if (!t)
    return (
      back("#highlights", "Highlights") +
      headings(
        "Five reading paths.",
        "Four opening plates and sixteen more for each question. Follow a path in order or jump straight to the figure that catches your eye.",
      ) +
      section(
        "Choose a question",
        minis(
          atlas.tours.map((x) =>
            mini("#tours/" + x.key, x.title, x.description),
          ),
        ),
      )
    );
  return (
    back("#tours", "Five reading paths") +
    headings(t.title, t.description) +
    section(
      "Start with these four",
      grid(t.main.map((k) => plateTile(atlas.plates[k]))),
    ) +
    section(
      "Sixteen more",
      grid(t.appendix.map((k) => plateTile(atlas.plates[k]))),
    )
  );
}
function editions() {
  const s = atlas.sheet;
  const choices = Object.keys(s.counts).sort();
  return (
    back("#highlights", "Highlights") +
    headings(
      "Topics across Wikipedia editions.",
      "A fixed title-word search matches 13,171 WIT entries linked to 17,689 distinct recordings. A photograph illustrates one entry in its cell. A single entry can contribute to several cells.",
    ) +
    '<div class="toolbar"><label>Wikipedia edition<select id="edition"><option value="">English, Spanish, Japanese and Swahili</option>' +
    choices
      .map((x) => '<option value="' + esc(x) + '">' + esc(x) + "</option>")
      .join("") +
    "</select></label>" +
    link("topic-editions.csv", "All 1,188 cells (CSV)") +
    '</div><div class="table-wrap" id="matrix"></div><p class="fine">Counts use the Wikipedia edition of the stored article. A recording can contain a different spoken language.</p>'
  );
}
function matrix(code) {
  const s = atlas.sheet;
  const names = { en: "English", es: "Spanish", ja: "Japanese", sw: "Swahili" };
  const cols = code ? [code] : s.highlighted;
  const edits =
    "<thead><tr><th>Topic</th>" +
    cols
      .map((c) => '<th scope="col">' + esc(names[c] || c) + "</th>")
      .join("") +
    "</tr></thead>";
  const lines = Object.keys(s.topics)
    .map(
      (t) =>
        '<tr><th scope="row">' +
        esc(t) +
        "</th>" +
        cols
          .map((c) => {
            const [nw, nv] = s.counts[c][t];
            const ex = s.illustrated.find(
              (x) => x.topic === t && x.edition === c && x.record,
            );
            const ph = ex ? link("#record/" + ex.record, ex.example_title) : "";
            return (
              "<td>" +
              (ex && atlas.images[ex.wit]
                ? '<a href="#record/' +
                  ex.record +
                  '">' +
                  pic(ex.wit, ex.example_title, "cellpic") +
                  "</a>"
                : "") +
              '<span class="entrycounts">' +
              iso(nw) +
              " / " +
              iso(nv) +
              "</span><small>entries / recordings</small><small>" +
              ph +
              "</small></td>"
            );
          })
          .join("") +
        "</tr>",
    )
    .join("");
  document.querySelector("#matrix").innerHTML =
    "<table>" + edits + "<tbody>" + lines + "</tbody></table>";
}
function record(id) {
  const r = atlas.rows[id];
  const p = atlas.pairs.find((x) => x.rows.includes(id));
  const h = atlas.highlights.find((x) => x.rid === id);
  const c = atlas.sheet.illustrated.find((x) => String(x.record) === id);
  const rel = atlas.related
    .flatMap((x) => x[2])
    .find((x) => String(x[0]) === id);
  const pl = Object.values(atlas.plates).find((x) =>
    x.records.some((y) => String(y.id) === id),
  );
  const title =
    h?.name ||
    p?.title ||
    c?.example_title ||
    rel?.[1] ||
    pl?.title ||
    "Retained recording window";
  return (
    back("#highlights", "Atlas highlights") +
    tag("Release record " + id) +
    headings(
      title,
      "WIT " +
        r.wit +
        " · retained source window beginning at " +
        clock(r.start) +
        ".",
    ) +
    '<div class="case-detail">' +
    (atlas.images[r.wit]
      ? photo(
          r.wit,
          h?.reference || p?.reference || "Linked Wikipedia reference",
        )
      : "") +
    "<div>" +
    recordBox(id, "Listen and watch", null, null, true) +
    '<p class="fine top-space">' +
    external(
      "https://huggingface.co/datasets/Antreas/TALI/viewer/default/" +
        r.split +
        "?row=" +
        r.viewerRow,
      "Open the released row",
    ) +
    " · " +
    external(
      "https://huggingface.co/datasets/Antreas/TALI/blob/" +
        atlas.revision +
        "/" +
        r.shard,
      "Pinned source shard",
    ) +
    " · zero-based shard row " +
    r.row +
    ".</p></div></div>" +
    '<div class="links">' +
    (h ? link("#case/" + h.slug, "Read the featured example") : "") +
    (p ? link("#pairs/" + p.wit, "Compare both recordings") : "") +
    (pl ? link("#atlas/" + pl.key, "Open the linked plate") : "") +
    "</div>"
  );
}
function credits() {
  const list = Object.entries(atlas.images).sort(
    (a, b) => Number(a[0]) - Number(b[0]),
  );
  return (
    back("#highlights", "Highlights") +
    headings(
      "Image credits.",
      "The reference pictures are resized copies of the images stored in TALI. The original file page records the creator, attribution and licence for each image.",
    ) +
    '<div class="table-wrap"><table><thead><tr><th>WIT entry</th><th>Original file and attribution</th><th>Licence</th></tr></thead><tbody>' +
    list
      .map(
        ([wid, x]) =>
          "<tr><th>" +
          esc(wid) +
          "</th><td>" +
          external(
            x.file,
            decodeURIComponent(x.file.split("File:").at(-1)).replaceAll(
              "_",
              " ",
            ),
          ) +
          "</td><td>" +
          external(x.terms, x.license) +
          "</td></tr>",
      )
      .join("") +
    "</tbody></table></div>"
  );
}
async function verifiedClipURL(row, controller, onProgress = () => {}) {
  const args = new URLSearchParams({
    dataset: "Antreas/TALI",
    config: "default",
    split: row.split,
    offset: row.viewerRow,
    length: 1,
  });
  const response = await fetch(
    "https://datasets-server.huggingface.co/rows?" + args,
    { credentials: "omit", signal: controller.signal },
  );
  if (!response.ok || !response.body) throw Error("Dataset request failed");
  const pieces = [];
  let bytes = 0;
  const reader = response.body.getReader();
  const expected = Math.ceil(row.clipBytes / 3) * 4;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    pieces.push(value);
    bytes += value.length;
    onProgress(bytes, expected);
  }
  onProgress(bytes, expected, true);
  const payload = JSON.parse(await new Blob(pieces).text()).rows[0];
  const source = payload.row;
  if (
    payload.row_idx !== row.viewerRow ||
    Number(source.wit_idx) !== row.wit ||
    Number(source.youtube_video_starting_time) !== row.start ||
    !String(source.youtube_video_file_path).includes(row.video)
  )
    throw Error("Source identity changed");
  const media = Uint8Array.from(atob(source.youtube_video_content), (c) =>
    c.charCodeAt(0),
  );
  if (media.length !== row.clipBytes) throw Error("Clip length changed");
  if (crypto.subtle) {
    const digest = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", media)),
      b => b.toString(16).padStart(2, "0")).join("");
    if (digest !== row.clipHash) throw Error("Clip checksum changed");
  } else {
    // The private mini serves plain HTTP. Fetch integrity still checks the pinned bytes.
    const pin = btoa(String.fromCharCode(...row.clipHash.match(/../g).map(h => parseInt(h,16))));
    const testURL = URL.createObjectURL(new Blob([media]));
    try {
      await (await fetch(testURL, { integrity: "sha256-" + pin, signal: controller.signal })).arrayBuffer();
    } finally { URL.revokeObjectURL(testURL); }
  }
  controller.signal.throwIfAborted();
  return URL.createObjectURL(new Blob([media], { type: "video/mp4" }));
}

async function loadClip(button) {
  const row = atlas.rows[button.dataset.id];
  const offset = Number(button.dataset.offset);
  const container = button.closest("article");
  container.querySelector(".clip-status")?.remove();
  const status = document.createElement("div");
  status.className = "clip-status";
  const progress = document.createElement("progress"),
    label = document.createElement("span");
  label.setAttribute("role", "status");
  label.textContent = "Waiting for the public dataset…";
  progress.setAttribute("aria-label", "Release clip download");
  status.append(progress, label);
  container.append(status);
  button.disabled = true;
  const controller = new AbortController();
  mediaLoads.add(controller);
  try {
    const url = await verifiedClipURL(row, controller, (bytes,expected,checking) => {
      progress.max = 1;
      progress.value = Math.min(.98,bytes/expected);
      label.textContent = checking ? "Checking the source and clip checksum…" :
        "Receiving clip · " + (bytes / 1e6).toFixed(1) + " MB received";
    });
    mediaUrls.add(url);
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "auto";
    video.className = "release-video";
    video.setAttribute(
      "aria-label",
      "Verified TALI recording at " + clock(row.start + offset),
    );
    video.addEventListener(
      "loadedmetadata",
      () => {
        video.currentTime = offset;
      },
      { once: true },
    );
    video.src = url;
    status.replaceChildren(video, label);
    label.textContent =
      "Release clip verified · source window begins at " +
      clock(row.start) +
      ".";
    button.textContent = "Release clip loaded";
  } catch (e) {
    if (controller.signal.aborted) return;
    progress.remove();
    label.replaceChildren("The release clip could not be verified here. ");
    const a = document.createElement("a");
    a.href =
      "https://huggingface.co/datasets/Antreas/TALI/viewer/default/" +
      row.split +
      "?row=" +
      row.viewerRow;
    a.textContent = "Open the source row";
    label.append(a);
    button.disabled = false;
    button.textContent = "Retry release clip";
  } finally {
    mediaLoads.delete(controller);
  }
}
function render(focus = false) {
  for (const load of mediaLoads) load.abort();
  mediaLoads.clear();
  for (const url of mediaUrls) URL.revokeObjectURL(url);
  mediaUrls.clear();
  const [sectionName = "highlights", key = ""] = location.hash
    .slice(1)
    .split("/");
  let content,
    active = sectionName || "highlights";
  if (!sectionName || ["highlights", "main", "explore"].includes(sectionName)) {
    content = home();
    active = "highlights";
  } else if (
    sectionName === "case" &&
    atlas.highlights.some((x) => x.slug === key)
  ) {
    content = feature(atlas.highlights.find((x) => x.slug === key));
    active = "highlights";
  } else if (sectionName === "paper" && !key) {
    content = paperGuide();
    active = "paper";
  } else if (sectionName === "matches") {
    content = matches();
    active = "highlights";
  } else if (sectionName === "credits") {
    content = credits();
    active = "";
  } else if (
    sectionName === "pairs" &&
    (!key || atlas.pairs.some((x) => String(x.wit) === key))
  )
    content = key
      ? pair(atlas.pairs.find((x) => String(x.wit) === key))
      : pairs();
  else if (
    (sectionName === "plates" || sectionName === "atlas") &&
    (!key || key === "contents")
  ) {
    content = plates();
    active = "plates";
  } else if (sectionName === "atlas" && Object.hasOwn(atlas.plates, key)) {
    content = plate(atlas.plates[key]);
    active = "plates";
  } else if (
    sectionName === "editions" ||
    (sectionName === "atlas" && key === "topic-editions")
  ) {
    content = editions();
    active = "editions";
  } else if (
    sectionName === "tours" &&
    (!key || atlas.tours.some((x) => x.key === key))
  )
    content = tours(atlas.tours.find((x) => x.key === key));
  else if (sectionName === "record" && Object.hasOwn(atlas.rows, key))
    content = record(key);
  else
    content =
      headings("Page not found.", "This item is outside the atlas catalogue.") +
      button("#highlights", "Atlas highlights");
  main.innerHTML = content;
  const stage = main.querySelector("[data-cover-frame]");
  if (stage) showCoverFrame(stage);
  document.title =
    main.querySelector("h1").textContent + " · TALI visual atlas";
  document.querySelectorAll(".mast nav a").forEach((a) => {
    if (a.hash === "#" + active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (document.querySelector("#filter")) {
    const f = document.querySelector("#filter"),
      c = document.querySelector("#chapter");
    f.oninput = () => {
      filter = f.value;
      page = 0;
      drawResults();
    };
    c.onchange = () => {
      chapter = c.value;
      page = 0;
      drawResults();
    };
    drawResults();
  }
  if (document.querySelector("#edition")) {
    const select = document.querySelector("#edition");
    select.onchange = () => matrix(select.value);
    matrix("");
  }
  main.querySelectorAll("button.load-clip").forEach((b) => {
    b.onclick = () => loadClip(b);
  });
  if (location.hash === "#case/mass-effect/clip")
    main.querySelector("button.load-clip")?.click();
  main.querySelectorAll("button.play").forEach((b) => {
    b.onclick = () => {
      const player = document.createElement("iframe");
      player.className = "player";
      player.title = "Source recording at " + clock(Number(b.dataset.time));
      player.allow =
        "autoplay; encrypted-media; fullscreen; picture-in-picture";
      player.allowFullscreen = true;
      player.referrerPolicy = "strict-origin-when-cross-origin";
      player.src =
        "https://www.youtube-nocookie.com/embed/" +
        encodeURIComponent(b.dataset.video) +
        "?start=" +
        Number(b.dataset.time) +
        "&autoplay=1";
      b.closest("article").append(player);
      b.disabled = true;
      b.textContent = "Player opened";
    };
  });
  if (focus) {
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}
const catalogueVersion = document.documentElement.dataset.catalogue;
fetch(catalogueVersion ? "atlas.json?v=" + catalogueVersion : "atlas.json")
  .then((r) => {
    if (!r.ok) throw Error("Atlas unavailable");
    return r.json();
  })
  .then((data) => {
    atlas = data;
    render();
    window.addEventListener("hashchange", () => render(true));
  })
  .catch(() => {
    main.innerHTML =
      '<h1>The atlas could not load.</h1><p class="sub">Reload to request the catalogue again.</p><button class="btn top-space" id="retry">Reload atlas</button>';
    document.querySelector("#retry").onclick = () => location.reload();
  });
