import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const siteRoot = process.argv[2];
if (!siteRoot) throw new Error('Pass the site root as the first argument.');

function edit(slug, edits) {
  const file = join(siteRoot, 'blog', slug, 'index.html');
  let html = readFileSync(file, 'utf8');

  for (const [label, pattern, replacement] of edits) {
    const next = html.replace(pattern, replacement);
    if (next === html) throw new Error(`${slug}: editorial edit did not match: ${label}`);
    html = next;
  }

  writeFileSync(file, html);
}

edit('nano-models', [
  ['frontier-scale comparison', /<p>This is essentially what we're doing when we deploy a[\s\S]*?absurdly wasteful\.<\/p>/, `<p>This is essentially what we are doing when we deploy a frontier-scale generalist to classify a timestamp or extract a tag from text. It works, but it spends general-purpose capacity on a narrow decision.</p>`],
  ['public deployment result', /<h2 id="the-fishing-boat-approach">[\s\S]*?<h2 id="the-numbers-that-matter">/, `<h2 id="the-fishing-boat-approach">The Fishing Boat Approach</h2>
<p>In deployment work discussed publicly, I used models below 100 million parameters, each trained for a sharply bounded task.</p>
<p>On tightly specified tasks, a specialist can match or exceed much larger generalist baselines. That is a conditional empirical claim, not a law: the result depends on the data, teacher, task definition, and acceptance test.</p>
<h2 id="the-numbers-that-matter">`],
  ['calibrated comparison', /<p>Here's where it gets interesting:<\/p>[\s\S]*?<h2 id="the-warm-up-effect">/, `<p>No latency or cost figure is universal: hardware, batching, model size, provider load, and network path all matter. The durable comparison is architectural:</p>
<table><thead><tr><th>Metric</th><th>Remote generalist</th><th>Local specialist</th></tr></thead><tbody>
<tr><td>Latency</td><td>Network and serving dependent</td><td>Hardware and task dependent</td></tr>
<tr><td>Marginal cost</td><td>Usually usage-priced</td><td>No per-call API fee</td></tr>
<tr><td>Privacy</td><td>Input crosses a service boundary</td><td>Input can remain on-device</td></tr>
<tr><td>Offline operation</td><td>Usually unavailable</td><td>Architecturally possible</td></tr>
</tbody></table>
<p>Local inference removes network transit and service queues, but the actual gain must be measured end to end on the target device.</p>
<h2 id="the-warm-up-effect">`],
  ['warm-up caveat', /<p>There's another phenomenon we've observed:[\s\S]*?70-billion parameter model\.<\/p>/, `<p>Small local models can exhibit a warm-up effect as weights, kernels, and working memory become resident. The size of that effect is runtime- and hardware-dependent, so cold-start and steady-state latency should be reported separately.</p>`],
  ['frontier teacher wording', /How do you train a 50-million parameter model to match a\s*trillion-parameter one\?/, 'How do you train a 50-million parameter model to approximate a frontier-scale one on a narrow task?'],
  ['teacher is not ceiling', /<p>This is why the teacher model remains unbeatable[\s\S]*?narrow domain\.<\/p>/, `<p>The teacher supplies a target distribution, not ground truth. A student can sometimes outperform its teacher on a held-out metric through regularisation, better task data, or evaluation against independent labels. The result has to be measured, not assumed.</p>`],
]);

edit('fortress-mode', [
  ['Recall historical framing', /<p>When Microsoft announced Recall[\s\S]*?complete control over their\s*data\.<\/strong><\/p>/, `<p>When Microsoft announced Recall—continuous screen capture made searchable—the security community immediately focused on the concentration of sensitive data it implied.</p>
<p>The design and safeguards evolved after that criticism. The durable lesson is broader than one product: there is real demand for AI that remembers, but only if users retain meaningful control over capture, storage, processing, and deletion.</p>`],
  ['frontier models wording', /<p>The models that power modern AI are enormous\.[\s\S]*?reasonable speeds\.<\/p>/, `<p>Frontier models remain expensive to run locally, while even comparatively small general-purpose models can consume substantial memory and power.</p>`],
  ['laptop caveat', /<p>This is where nano models become essential\.[\s\S]*?<h2 id="building-fortress-mode">/, `<p>This is where specialised small models become useful. A frontier-scale cloud model is generally impractical on ordinary client hardware, but a pipeline can combine compact task models with an optional local generalist where the device allows it.</p>
<p>The gain has to be measured for the actual task and target device.</p>
<h2 id="building-fortress-mode">`],
  ['fortress as design target', /<p>At Pieces, we're building toward what we call "fortress mode":[\s\S]*?network\s*access\.<\/p>/, `<p>“Fortress mode” is the strict design target: the useful core remains available with network access disabled.</p>`],
  ['trust wording', /<p>That trust is binary\.[\s\S]*?see Microsoft Recall\.<\/p>/, `<p>Trust is easier to lose than to earn. Architectural limits, inspectable data flows, and meaningful offline operation provide stronger evidence than policy language alone.</p>`],
  ['market growth claim', /which is growing every year/, 'without asking them to take privacy on faith'],
]);

edit('ai-memory-and-cognition', [
  ['productivity anecdote', /My productivity has increased\s*by something like 5-8x for certain tasks\./, 'For some tasks, my throughput has increased several-fold—an anecdotal observation, not a controlled productivity measurement.'],
  ['play as hypothesis', /<h2 id="playful-learning-and-the-thai-fighters">[\s\S]*?<h2 id="vibe-coding-and-its-discontents">/, `<h2 id="play-as-a-training-strategy">Play as a Training Strategy</h2>
<p>I have been struck by the playfulness visible in some Thai martial-arts training: difficult practice can look exploratory rather than punitive. I do not treat that observation as causal evidence about learning.</p>
<p>It does suggest a testable design hypothesis. If practice feels safe enough to explore, people may sustain it longer and sample a wider range of strategies. For AI-displaced skills, enjoyment may therefore be part of retention rather than decoration.</p>
<h2 id="vibe-coding-and-its-discontents">`],
  ['vibe coding multiplier', /A vibe coder who ships 8x more\s*features than a traditional coder is probably more valuable to an\s*employer\./, 'Someone who ships much faster with AI may be more productive in a particular environment.'],
  ['Duolingo causal claim', /This is why Duolingo works better than textbooks for many learners\./, 'Duolingo illustrates the motivational difference between a practice loop and a textbook.'],
  ['education obsolete claim', /The old model—memorize facts, learn procedures, demonstrate\s*competence through recall—is clearly obsolete\./, 'The old model—memorise facts, learn procedures, demonstrate competence through recall—is under pressure.'],
]);

edit('distillation', [
  ['subtitle scale', /How to compress trillion-parameter capabilities into models that\s*run on your laptop/, 'How to compress frontier-scale capabilities into models that run on your laptop'],
  ['opening scale', /we have massive language models with trillions of\s*parameters that can do almost anything/, 'we have frontier-scale language models with remarkably broad capabilities'],
  ['label quality caveat', /Large language models changed this equation\.[\s\S]*?<p>The teacher model becomes your labeling workforce\.<\/p>/, `<p>Large language models changed this equation by making synthetic annotation cheap and scalable. Their labels are not automatically correct or more consistent than human labels: they require validation, disagreement analysis, and targeted human review.</p>
<p>The teacher becomes one source of supervision, not an oracle.</p>`],
  ['teacher ground truth', /<h2 id="the-teacher-ceiling">[\s\S]*?<h2 id="what-you-lose-and-what-you-keep">/, `<h2 id="the-teacher-is-not-ground-truth">The Teacher Is Not Ground Truth</h2>
<p>A student trained only to imitate teacher outputs inherits teacher errors. But “cannot exceed the teacher” is too strong: with independent ground-truth labels, regularisation, better task data, or a narrower evaluation distribution, a student can outperform its teacher on the measured task.</p>
<p>The honest procedure is to evaluate both against an external acceptance set. Teacher agreement is a training signal; it is not the definition of correctness.</p>
<h2 id="what-you-lose-and-what-you-keep">`],
  ['frontier generalist list', /A trillion-parameter LLM can:/, 'A frontier-scale generalist can:'],
  ['multiple teachers impersonal', /For some tasks, we\s*generate labels from multiple strong models and ensemble them\./, 'For some tasks, labels from multiple strong models can be reconciled or ensembled.'],
  ['compression claim', /<p>For narrow, well-defined tasks, the compression can be extreme\.[\s\S]*?maintaining task\s*performance\.<\/p>/, `<p>For narrow, well-defined tasks, compression can be substantial. The ratio is not meaningful without the task, dataset, baseline, hardware, and acceptance threshold, so those belong beside any reported number.</p>`],
  ['deployment table', /<table>[\s\S]*?<\/table>\s*<p>For high-volume production systems,[\s\S]*?unlimited inference\.<\/p>/, `<table><thead><tr><th>Metric</th><th>Remote teacher</th><th>Local student</th></tr></thead><tbody>
<tr><td>Latency</td><td>Network and serving dependent</td><td>Device and task dependent</td></tr>
<tr><td>Marginal cost</td><td>Typically usage-priced</td><td>No per-call API charge</td></tr>
<tr><td>Privacy</td><td>Input crosses a service boundary</td><td>Input can remain local</td></tr>
<tr><td>Throughput</td><td>Service limits</td><td>Hardware limits</td></tr>
</tbody></table>
<p>For high-volume systems, distillation can shift cost from repeated remote inference toward training, validation, and local operation. It does not make inference free.</p>`],
  ['distillation not only route', /Distillation is how AI becomes practical\./, 'Distillation is one route by which AI becomes practical.'],
  ['shipping caveat', /If yes, it can ship to users\. If no, it\s*stays in the cloud\./, 'If yes, it may be deployable locally; if no, the capability may still require a larger model or a different system design.'],
]);

edit('ai-education', [
  ['two sigma caveat', /<p>Individual tutoring is remarkably effective\.[\s\S]*?since the 1980s\.<\/p>/, `<p>Individual tutoring can be highly effective. Bloom’s classic “2 sigma” paper framed one-to-one tutoring as a challenge for instructional design, not a universal effect size that every tutoring intervention reproduces.</p>`],
  ['tutor cost caveat', /But what if the tutor was free after the initial training cost\?/, 'But what if the tutor had low marginal cost after training and evaluation?'],
  ['student shortcut caveat', /Most students choose the shortcut\./, 'The incentive structure makes the shortcut tempting.'],
  ['Duolingo count', /Duolingo has something like 500 million users learning languages\. Not\s*because/, 'Duolingo reached a very large audience not simply because'],
  ['AI social claim', /AI can't teach these\./, 'Current AI systems do not replace these experiences.'],
  ['broken system claim', /<p>The current system is so obviously broken that even imperfect[\s\S]*?30:1\s*classrooms\.<\/p>/, '<p>Classrooms leave some learners underserved. Even modest improvements from carefully evaluated AI tutoring could matter, but effectiveness should be measured through learning outcomes rather than engagement alone.</p>'],
]);

edit('building-jarvis', [
  ['personal vision opening', /<p>When people ask what I'm building at Pieces,[\s\S]*?<p>But the simpler answer is: we're building Jarvis\.<\/p>/, `<p>When people ask what kind of personal AI I want to build, I can give the technical answer: small models, long-term memory pipelines, and local inference.</p>
<p>The simpler answer is: Jarvis.</p>`],
  ['current assistant caveat', /<p>Current AI can't do this\.[\s\S]*?outside those\s*conversations\.<\/p>/, `<p>Most current assistants cannot do this reliably across the full context of a person’s life. Product memory is improving, but durable, inspectable, user-controlled recall across devices and years remains unsolved.</p>`],
  ['incremental voice', /We're not going to wake up one day with Jarvis\. We're building toward\s*it incrementally\./, 'We are not going to wake up one day with Jarvis. The engineering path is incremental.'],
  ['Recall wording', /The Microsoft Recall debacle showed this isn't paranoia\.[\s\S]*?nightmare fuel\.<\/p>/, `<p>The controversy around always-on screen capture showed that this concern is not abstract. Personal memory systems concentrate sensitive data, so local processing, encryption, deletion, and access control are core requirements.</p>`],
]);

edit('cheap-then-clean', [
  ['public technique framing', /<p>Here's how we approach it at Pieces:<\/p>/, `<p>The public technique is a two-pass pipeline:</p>`],
  ['pass one timing', /A lightweight OCR model runs on every capture\. It's fast—single-digit\s*milliseconds\./, 'A lightweight OCR model runs frequently. Its exact latency depends on the model, capture rate, hardware, and runtime.'],
  ['pass two interval', /Every 20 seconds \(or some appropriate interval\), a heavier model\s*processes the accumulated captures\./, 'After a suitable interval, a heavier model processes the accumulated captures. The interval is deployment-dependent and should be selected against latency and compute budgets.'],
  ['pass ratio', /This model is more expensive—maybe 100x slower than Pass 1\. But it\s*only runs occasionally, so the amortized cost is low\./, 'The second pass is deliberately more expensive, but it runs less often; the relevant quantity is measured end-to-end cost per useful unit of information.'],
  ['cleanup ownership', /What does "cleanup" actually mean\? Our cleanup model does several\s*things:/, 'What does “cleanup” actually mean? A cleanup stage can perform several operations:'],
  ['quality promise', /Quality: High \(after cleanup\)\. Cost: Moderate\. Best of both worlds\./, 'Quality: Potentially higher after cleanup. Cost: Moderate. The result still has to be measured.'],
  ['strategy caveat', /Strategic spending almost always wins\./, 'Strategic spending can win when the cheap pass reliably identifies where the expensive pass adds value.'],
]);

edit('attention-learns-its-wiring', [
  ['dominant not universal', /the foundation of essentially every major AI model/, 'a foundation of the dominant family of large AI models'],
  ['connectivity scope', /The network can learn arbitrary connectivity\s*patterns\. Long-range, short-range, structured, unstructured—whatever the\s*data requires\./, 'The network can learn dense, input-dependent connectivity patterns within its parameterisation: long-range, short-range, and mixtures of both.'],
  ['no universal learner', /Compare this to convolutions, which can only learn local patterns, or\s*recurrence, which can only learn sequential patterns\. Self-attention can\s*learn anything\./, 'Convolutions privilege locality and recurrence privileges sequential state. Self-attention offers a broader communication pattern, but it is not a universal learner and still carries architectural assumptions.'],
  ['human priors and cross-modal scope', /<p>Attention learns the connectivity that works for the actual data\.[\s\S]*?when given both\.<\/p>/, `<p>Attention learns connectivity from the data, reducing the amount fixed by the designer. Positional schemes, tokenisation, depth, and other human choices still matter.</p>
<p>This flexibility helps explain why related attention architectures work across text, images, audio, and video.</p>`],
]);

edit('embodied-ai', [
  ['robotics caveat', /Two-legged locomotion is an unsolved\s*problem in robotics\./, 'Robust two-legged locomotion outside controlled conditions remains difficult.'],
  ['timeline speculation', /The pieces are coming together\. We're 5-10 years from this being\s*mainstream\./, 'The pieces are coming together, but the adoption timeline is uncertain.'],
  ['long horizon heading', /<h2 id="the-10-year-vision">The 10-Year Vision<\/h2>\s*<p>What does 2035 look like if this trajectory continues\?<\/p>/, `<h2 id="a-long-horizon-vision">A Long-Horizon Vision</h2>
<p>What might this trajectory enable if the technical and governance problems are solved?</p>`],
  ['consent condition', /They all know who you are, what you're doing, what you might need\./, 'With explicit consent, they know enough about your context to help.'],
]);
