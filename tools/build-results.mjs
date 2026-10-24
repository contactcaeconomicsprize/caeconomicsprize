import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

export function canPublishEssay(essay) {
  return essay.publicationStatus === 'Published' && essay.fullWorkPermission === true && essay.accessiblePdfVerified === true && typeof essay.pdf === 'string' && /^\/assets\/essays\/[a-z0-9-]+\.pdf$/.test(essay.pdf);
}

export function validateResults(data) {
  if (data.status !== 'completed' || data.year !== 2026 || data.announcementDate !== '2026-10-24') throw new Error('Unexpected edition status or announcement date.');
  if (data.submissions !== 183 || data.countriesAndTerritories !== 34 || data.finalists !== 12 || data.categories.length !== 4) throw new Error('Unexpected competition statistics.');
  const people = new Map();
  data.people.forEach(person => {
    if (!person.id || !person.name || people.has(person.id) || person.namePublicationPermission !== 'Permission granted') throw new Error('Every public person needs a unique identifier and confirmed name publication permission.');
    people.set(person.id,person);
  });
  const finalistIds = new Set();
  const winnerIds = new Set();
  data.categories.forEach(category => {
    if (category.finalistIds.length > category.finalistCount || !category.winnerIds.length) throw new Error('Invalid category finalist or winner count.');
    [...category.winnerIds,...category.honorableMentionIds,...category.finalistIds].forEach(id => { if (!people.has(id)) throw new Error(`Unapproved or missing person: ${id}`); });
    category.finalistIds.forEach(id => { if (finalistIds.has(id)) throw new Error('Duplicate finalist.'); finalistIds.add(id); });
    category.winnerIds.forEach(id => { if (!category.finalistIds.includes(id)) throw new Error('A category winner must be a verified finalist.'); winnerIds.add(id); });
    category.honorableMentionIds.forEach(id => { if (category.finalistIds.includes(id)) throw new Error('Honorable mentions are separate from finalists.'); });
  });
  if (data.categories.reduce((sum,category) => sum + category.finalistCount,0) !== data.finalists) throw new Error('Finalist counts do not total 12.');
  if (!winnerIds.has(data.overallWinnerId)) throw new Error('Overall winner must be a category winner.');
  if (new Set(data.essays.map(essay => essay.authorId)).size !== winnerIds.size || data.essays.length !== winnerIds.size) throw new Error('Each winning author needs one publication record.');
  data.essays.forEach(essay => {
    if (!winnerIds.has(essay.authorId) || !['Permission pending','Permission granted','Published'].includes(essay.publicationStatus)) throw new Error('Invalid essay author or publication status.');
    if (essay.publicationStatus !== 'Permission pending' && essay.fullWorkPermission !== true) throw new Error('Explicit full-work permission is required.');
    if (essay.publicationStatus === 'Published' && !canPublishEssay(essay)) throw new Error('Published PDFs require permission, verified accessibility, and a local approved path.');
    if (essay.publicationStatus !== 'Published' && essay.pdf !== null) throw new Error('Do not upload or link an unpublished essay.');
    if (Object.hasOwn(essay,'fullText')) throw new Error('Full essay text is not supported in public results data.');
  });
  return people;
}

function personList(ids,people) {
  return `<ul class="recipient-list">${ids.map(id => { const person = people.get(id); return `<li><strong>${escapeHtml(person.name)}</strong>${person.country ? `<span class="recipient-country">${escapeHtml(person.country)}</span>` : ''}</li>`; }).join('')}</ul>`;
}

export function renderResults(data) {
  const people = validateResults(data);
  const winner = people.get(data.overallWinnerId);
  const overallEssay = data.essays.find(essay => essay.authorId === winner.id);
  const categoryCards = data.categories.map(category => `<article class="recipient-card"><p class="award-kind">${category.winnerIds.length > 1 ? 'Joint Category Winners' : 'Category Winner'}</p><h3>${escapeHtml(category.name)}</h3>${personList(category.winnerIds,people)}</article>`).join('\n');
  const honorsCards = data.categories.map(category => `<article class="recipient-card honors-card"><h3>${escapeHtml(category.name)}</h3>${personList(category.honorableMentionIds,people)}</article>`).join('\n');
  const finalistsCards = data.categories.map(category => `<article class="recipient-card finalist-card"><p class="award-kind">${category.finalistCount} Finalists</p><h3>${escapeHtml(category.name)}</h3>${personList(category.finalistIds,people)}${category.finalistIds.length < category.finalistCount ? '<p class="roster-note">Additional finalist recognition will be added following publication confirmation.</p>' : ''}</article>`).join('\n');
  const essays = data.essays.map(essay => {
    const author = people.get(essay.authorId);
    const category = data.categories.find(item => item.winnerIds.includes(author.id));
    return `<li><div><h3>${escapeHtml(essay.title || author.name)}</h3><p>${essay.title ? `${escapeHtml(author.name)} · ` : ''}${escapeHtml(category.name)}</p></div>${canPublishEssay(essay) ? `<a class="button navy" href="${escapeHtml(essay.pdf)}" download>Download ${escapeHtml(author.name)}’s essay (PDF)</a>` : `<span class="essay-status">${escapeHtml(essay.publicationStatus)}</span>`}</li>`;
  }).join('\n');
  const acknowledgments = data.acknowledgments;
  const simpleList = names => `<ul>${names.map(name => `<li>${escapeHtml(name)}</li>`).join('')}</ul>`;
  const schema = JSON.stringify({'@context':'https://schema.org','@type':'WebPage',name:'CAEP 2026 Results — Inaugural Edition',url:'https://caeconomicsprize.org/2026/results/',description:'Official winners and honorable mentions of the inaugural Central Asia Economics Prize. Winners announced October 24, 2026.',datePublished:data.announcementDate,publisher:{'@type':'Organization',name:'Central Asia Economics Prize',url:'https://caeconomicsprize.org/'}}).replace(/</g,'\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CAEP 2026 Results — Inaugural Edition | Central Asia Economics Prize</title>
  <meta name="description" content="Official CAEP 2026 results. Overall Winner: ${escapeHtml(winner.name)}, ${escapeHtml(winner.country)}. Discover the category winners, honorable mentions, and finalists of the inaugural edition.">
  <meta name="theme-color" content="#0F2A43">
  <link rel="canonical" href="https://caeconomicsprize.org/2026/results/">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="website">
  <meta property="og:title" content="CAEP 2026 Results — Inaugural Edition">
  <meta property="og:description" content="183 submissions. 34 countries and territories. Four economics categories. Winners announced October 24, 2026.">
  <meta property="og:url" content="https://caeconomicsprize.org/2026/results/">
  <meta property="og:image" content="https://caeconomicsprize.org/assets/og-results-2026.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="CAEP 2026 — Inaugural Edition. Official Results. Winners announced October 24, 2026.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="CAEP 2026 — Official Results">
  <meta name="twitter:description" content="Discover the winners of the inaugural Central Asia Economics Prize.">
  <meta name="twitter:image" content="https://caeconomicsprize.org/assets/og-results-2026.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,500;0,600;1,500&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/results.css">
  <script type="application/ld+json">${schema}</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PP4ZLX8654"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-PP4ZLX8654');</script>
  <script defer src="/site.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="scroll-progress" aria-hidden="true"><span></span></div>
  <header class="site-header" id="top"><div class="shell nav-wrap">
    <a class="brand" href="/" aria-label="Central Asia Economics Prize home"><img src="/assets/logo.svg" alt="Central Asia Economics Prize"></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span><span class="sr-only">Open menu</span></button>
    <nav class="site-nav" id="site-nav" aria-label="Primary navigation"><a href="/">Home</a><a href="/#about">About</a><a href="/#team">Team</a><a href="/#partners">Partners</a><a href="/#archive">2026 Archive</a><a href="/2026/results/" aria-current="page">Results</a><a href="/#contact">Contact</a></nav>
  </div></header>
  <main id="main">
    <section class="edition-hero"><div class="shell">
      <nav class="edition-breadcrumb" aria-label="Breadcrumb"><a href="/">CAEP</a><span aria-hidden="true">/</span><span>2026 Results</span></nav>
      <p class="kicker light">CAEP 2026 — Inaugural Edition</p><h1>2026 <em>Results</em></h1>
      <p class="edition-intro">The official results of the inaugural Central Asia Economics Prize, announced at the Winners Announcement Ceremony on October 24, 2026.</p>
      <div class="edition-meta"><span>183 submissions</span><span>34 countries and territories</span><span>12 finalists</span><span>Four economics categories</span></div>
    </div></section>
    <nav class="edition-nav" aria-label="Results sections"><div class="shell"><a href="#overall-winner">Overall Winner</a><a href="#category-winners">Category Winners</a><a href="#honorable-mentions">Honorable Mentions</a><a href="#finalists">Finalists</a><a href="#winning-essays">Winning Essays</a><a href="#acknowledgments">Acknowledgments</a></div></nav>
    <section class="edition-section overall-winner" id="overall-winner" aria-labelledby="overall-heading"><div class="shell">
      <article class="winner-feature"><p class="kicker light" id="overall-heading">Overall Winner · CAEP 2026</p><h2>${escapeHtml(winner.name)}</h2><p class="winner-country">${escapeHtml(winner.country)}</p>${overallEssay.title ? `<p class="winner-essay">“${escapeHtml(overallEssay.title)}”</p>` : ''}<p class="winner-note">Also the category winner in ${escapeHtml(data.categories.find(category => category.winnerIds.includes(winner.id)).name)}.</p></article>
    </div></section>
    <section class="edition-section" id="category-winners"><div class="shell"><p class="kicker">Four economics categories</p><h2>Category <em>Winners</em></h2><p class="section-lead">Recognizing outstanding work in each of the inaugural competition’s four categories.</p><div class="recipient-grid">${categoryCards}</div></div></section>
    <section class="edition-section cream" id="honorable-mentions"><div class="shell"><p class="kicker">Further recognition</p><h2>Honorable <em>Mentions</em></h2><p class="section-lead">Honorable Mention recognizes strong work across the four categories and is distinct from finalist and winner awards.</p><div class="recipient-grid">${honorsCards}</div></div></section>
    <section class="edition-section" id="finalists"><div class="shell"><p class="kicker">The Final Round</p><h2>Twelve <em>Finalists</em></h2><p class="section-lead">Twelve essays reached the Final Round across four categories. We recognize the finalists below with confirmed permission to publish their names.</p><div class="recipient-grid">${finalistsCards}</div></div></section>
    <section class="edition-section cream" id="winning-essays"><div class="shell"><p class="kicker">Selected work</p><h2>Winning <em>Essays</em></h2><p class="section-lead">Full essays are not yet available. Complete essays will be published only with their authors’ explicit permission.</p><ul class="essay-list">${essays}</ul></div></section>
    <section class="edition-section" id="acknowledgments"><div class="shell"><p class="kicker">With gratitude</p><h2>Acknowledgments</h2><p class="section-lead">Thank you to the judges, preliminary reviewers, organizing team, and partners who supported the inaugural Central Asia Economics Prize.</p><div class="acknowledgment-grid">
      <div><h3>Final Judging Panel</h3>${simpleList(acknowledgments.finalJudges)}</div>
      <div><h3>Preliminary Reviewers</h3>${simpleList(acknowledgments.preliminaryReviewers)}</div>
      <div><h3>Organizing Team</h3><ul>${acknowledgments.organizers.map(person => `<li>${escapeHtml(person.name)}<small>${escapeHtml(person.role)}</small></li>`).join('')}</ul><p><a href="/#team">Meet the organizing team</a></p></div>
      <div><h3>Partners</h3><ul>${acknowledgments.partners.map(partner => `<li><a href="${escapeHtml(partner.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(partner.name)}</a><small>${escapeHtml(partner.role)}</small></li>`).join('')}</ul></div>
    </div></div></section>
    <section class="archive-intro"><div class="shell"><p class="kicker">The competition record</p><h2>Explore the <em>2026 archive.</em></h2><p>The original essay questions, rules, review process, timeline, and global submissions map remain available.</p><div class="archive-links"><a href="/#questions">Essay questions</a><a href="/#rules">Competition rules</a><a href="/#timeline">Edition timeline</a><a href="/#global-reach">Global reach</a></div></div></section>
  </main>
  <footer class="site-footer"><div class="shell footer-grid"><img src="/assets/logo.svg" alt="Central Asia Economics Prize"><p>Economics. Evidence. Central Asia.</p><nav aria-label="Footer navigation"><a href="/">Home</a><a href="/2026/results/" aria-current="page">2026 Results</a><a href="/#archive">2026 Archive</a><a href="/#team">Organizing Team</a><a href="/#contact">Contact</a></nav><a href="mailto:contact@caeconomicsprize.org">contact@caeconomicsprize.org</a><p class="disclaimer">CAEP 2026 — Inaugural Edition. Winners announced October 24, 2026.</p><p class="copyright">© 2026 Central Asia Economics Prize</p></div></footer>
  <button class="back-top" type="button" aria-label="Back to top">↑</button>
</body>
</html>
`;
}

async function checkEssayAssets(data) {
  const published = new Set(data.essays.filter(canPublishEssay).map(essay => essay.pdf.slice(1)));
  let files;
  try { files = await readdir(path.join(root,'assets/essays'),{withFileTypes:true}); }
  catch (error) { if (error.code !== 'ENOENT') throw error; files = []; }
  for (const file of files) {
    if (!file.isFile() || !published.has(`assets/essays/${file.name}`)) throw new Error('Unapproved essay asset found. Remove it from the public site.');
  }
  for (const location of published) {
    const bytes = await readFile(path.join(root,location));
    if (bytes.subarray(0,5).toString() !== '%PDF-') throw new Error('Approved essay asset is not a PDF.');
  }
}

export async function buildResults(checkOnly = false) {
  const data = JSON.parse(await readFile(path.join(root,'data/caep-2026.json'),'utf8'));
  const submissions = JSON.parse(await readFile(path.join(root,'assets/submissions-2026.json'),'utf8'));
  if (Object.keys(submissions).length !== data.countriesAndTerritories || Object.values(submissions).reduce((sum,count) => sum + count,0) !== data.submissions) throw new Error('Results statistics do not match submissions data.');
  const html = renderResults(data);
  await checkEssayAssets(data);
  const destination = path.join(root,'2026/results/index.html');
  if (checkOnly) { if (await readFile(destination,'utf8') !== html) throw new Error('Results HTML is out of date. Run node tools/build-results.mjs.'); }
  else await writeFile(destination,html);
  console.log(`${checkOnly ? 'Verified' : 'Generated'} CAEP 2026 results: 183 submissions, 34 locations, 12 finalists; ${data.people.length} approved public names; ${data.essays.filter(canPublishEssay).length} published essays.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildResults(process.argv.includes('--check')).catch(error => { console.error(error.message); process.exitCode = 1; });
}
