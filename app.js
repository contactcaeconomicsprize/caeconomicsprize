const competition = {
  name: "Central Asia Economics Prize",
  abbreviation: "CAEP",
  year: 2026,
  email: "contact@caeconomicsprize.org",
  domain: "https://caeconomicsprize.org",
  submissionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd_koG5rX0X-jh8Q7vupXcYGySmzLPMPuGzQNK4cCeZIjZDzQ/viewform?usp=publish-editor",
  submissionsOpen: true,
  deadline: "2026-09-24T23:59:00+05:00"
};

const facts = [["4","Economics Categories"],["1,200","Maximum Words"],["14–19","Eligible Ages"],["Free","Entry"],["Worldwide","Eligibility"],["24 September","Submission Deadline"]];
const principles = [["01","Economic Reasoning","Apply economics rather than simply describing an issue."],["02","Evidence","Use research, statistics, and credible sources to support important claims."],["03","Independent Thinking","Develop an argument rather than searching for a predetermined “correct” answer."]];
const requirements = [["Maximum Length","1,200 words"],["Language","English"],["Entry","Free"],["Format","PDF"],["Entries","Individual only"],["Number of Entries","One per participant"],["Central Asian Focus","Required"],["University Students","Not eligible after beginning full-time undergraduate study"]];

const questions = [
  {category:"Development Economics",description:"Migration & Long-Term Development",status:"Official question",question:"Does labor migration help or hinder Central Asia's long-term economic development?"},
  {category:"Behavioral Economics",description:"Behavioral Barriers & Government Programs",status:"Official question",question:"Why do households in Central Asia underutilize subsidized green programs, and is simplifying complex application processes more effective than using behavioral nudges?"},
  {category:"Labor & Public Economics",description:"Childcare & Female Labor-Force Participation",status:"Official question",question:"Should Central Asian governments subsidize childcare to increase female labor-force participation?"},
  {category:"Political Economics",description:"Energy Subsidies, Welfare & Political Stability",status:"Official question",question:"Should Central Asian governments phase out energy price subsidies even when doing so risks political instability? Using one Central Asian country, assess whether targeted income support could replace broad energy subsidies without significantly worsening household welfare."}
];

const rules = [
  {title:"Eligibility",content:"Open to high-school students aged 14–19. Students worldwide may participate as long as the essay directly addresses Central Asia. Participants may focus on one or multiple Central Asian countries and must choose one of the four official categories."},
  {title:"Word Limit",content:"Maximum 1,200 words. The bibliography or reference list is excluded. Appendices are not permitted. Tables and graphs may be included where relevant, but substantive text cannot be hidden in figures to bypass the limit."},
  {title:"Language",content:"Essays must be written in English. Non-native speakers will not be penalized simply for their language background."},
  {title:"Anonymous Submission",content:"PDF only. Do not include your name, email address, school name, photograph, or unnecessary identifying information inside the essay. Personal information will be collected separately through the submission form, and the organizing team will associate each eligible essay with an anonymous competition ID for judging."},
  {title:"Citations",content:"Any recognized academic citation style may be used consistently, including APA, Chicago, Harvard, or MLA. A bibliography or reference list is required."},
  {title:"Research",content:"Participants may use academic papers, books, government statistics, central banks, the World Bank, IMF, Asian Development Bank, UN organizations, national statistical agencies, reputable research organizations, and credible journalism where relevant. Original econometric analysis is not required."},
  {title:"Academic Integrity",content:"Every submission must be the participant's own original intellectual and written work. Sources, data, evidence, and ideas taken from others must be appropriately acknowledged. Plagiarism, fabricated evidence, fabricated citations, and third-party authorship are prohibited. Serious academic-integrity violations may result in disqualification."},
  {title:"Artificial Intelligence",content:"Generative AI must not produce substantive ideas, arguments, analysis, essay text, or conclusions on the participant's behalf. Spellcheck, basic grammar correction, dictionaries, citation management, ordinary search, and academic database discovery are permitted."},
  {title:"Authorship Verification",content:"Where reasonable authorship or integrity concerns arise, CAEP may ask a participant to briefly discuss their essay, argument, evidence, or research process. CAEP does not claim that an AI detector alone can determine a violation."},
  {title:"Participants Under 18",content:"If you are under 18, CAEP may require consent from a parent or legal guardian if your essay is shortlisted, selected for publication, or you are invited to certain competition-related activities. Guardian information is not required at initial submission. If consent is needed, CAEP will contact you using the email address provided with your submission and explain the next steps."},
  {title:"Deadline",content:"Essays must be submitted by 24 September 2026 at 23:59 Uzbekistan Time (UTC+5). Late entries will normally not be accepted."},
  {title:"Changes Before Deadline",content:"Participants may replace their submission before the deadline. Revisions will normally not be accepted afterward."}
];

const stages = [
  {number:"01",title:"Administrative Screening",text:"Eligibility, category, word limit, citations, file format, academic integrity, and AI-policy compliance are checked."},
  {number:"02",title:"Anonymous Preliminary Review",text:"Identifying information is separated before each essay is normally assessed independently by two reviewers with demonstrated experience in economics and academic competitions. A substantially different pair of assessments may prompt an additional review."},
  {number:"03",title:"Shortlisting",text:"The highest-rated essays in each category will advance to the final round. The number selected will reflect submission quality and quantity."},
  {number:"04",title:"Academic Judging",text:"Qualified specialists evaluate finalist essays. One Category Winner will normally be selected from each category, with a possible Overall Winner."}
];
const rubric = [["Economic Reasoning & Understanding","Appropriate and accurate use of economic concepts."],["Evidence","Relevant, credible, and appropriately interpreted evidence."],["Argument","A strong, coherent, and well-supported line of reasoning."],["Originality","Independent and interesting economic thinking."],["Counterarguments","Serious engagement with competing explanations and objections."],["Central Asian Relevance","Meaningful application to the economic context of Central Asia."],["Structure & Clarity","Organization, precision, and readable academic writing."]];

const judges = [];
const reviewers = [{name:"",credentials:"",confirmed:false}];
const organizingTeam = [];
const partners = [];
const awards = [["Publication","Outstanding participants may be considered for publication opportunities where arrangements are confirmed."],["Academic Recognition","Outstanding work may receive academic recognition from the Central Asia Economics Prize."],["Further Engagement","Outstanding participants may receive opportunities for further engagement with economists and researchers."]];
const timeline = [["Submission Deadline","24 September 2026 · 23:59 Uzbekistan Time (UTC+5)"],["Preliminary Review","Schedule to be announced"],["Final Round","Schedule to be announced"],["Results","Schedule to be announced"]];
const faq = [["Who can enter?","High-school students aged 14–19."],["Do I have to live in Central Asia?","No. The competition is open worldwide, but every essay must directly address the Central Asian context."],["When is the submission deadline?","24 September 2026 at 23:59 Uzbekistan Time (UTC+5)."],["How much does it cost?","Entry is free."],["How long can my essay be?","Maximum 1,200 words. The bibliography or reference list is excluded."],["What language should I write in?","English."],["How many essays can I submit?","One essay per participant."],["Can I answer more than one question?","No. Select one of the four official categories and answer its question."],["Can my name appear on the essay?","No. Essays must be submitted without identifying information to facilitate anonymous review."],["Do I need to discuss every Central Asian country?","No. Participants may focus on one or more countries, but a Central Asian focus is required."],["Can teams submit?","No. Entries are individual only."],["Do I need advanced economics knowledge?","No. Strong reasoning and evidence matter more than advanced mathematics."],["Is econometric analysis required?","No."],["Can I use AI?","Generative AI must not produce substantive ideas, arguments, analysis, essay text, or conclusions on the participant's behalf."],["Which citation style should I use?","Any recognized academic citation style used consistently."],["How are essays judged?","All eligible essays undergo anonymous preliminary review. The strongest submissions advance to a final round evaluated by academics and economists."],["Will every participant receive feedback?","No. Individual feedback cannot be guaranteed."],["Will winning essays be published?","Outstanding participants may receive publication opportunities where arrangements are confirmed; publication is not guaranteed."]];

const add = (selector, html) => document.querySelector(selector)?.insertAdjacentHTML("beforeend", html);
facts.forEach(([value,label]) => add("#facts-grid", `<div class="fact"><strong>${value}</strong><span>${label}</span></div>`));
principles.forEach(([number,title,text]) => add("#principles-grid", `<article class="principle reveal"><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`));
requirements.forEach(([label,value]) => add("#requirements-grid", `<article class="requirement reveal"><span>${label}</span><strong>${value}</strong></article>`));
questions.forEach((item,index) => add("#question-grid", `<article class="question-card reveal"><div class="question-top"><span>Category ${index + 1}</span><small>${item.status}</small></div><h3>${item.category}</h3><p class="question-description">${item.description}</p><blockquote>${item.question}</blockquote></article>`));
rules.forEach((item,index) => add("#rule-list", `<article class="rule-item"><button type="button" aria-expanded="false" aria-controls="rule-${index}"><span>${String(index + 1).padStart(2,"0")} — ${item.title}</span><i>+</i></button><div id="rule-${index}" class="rule-content" hidden><p>${item.content}</p></div></article>`));
stages.forEach(item => add("#stages-grid", `<article class="stage reveal"><span>${item.number}</span><h3>${item.title}</h3><p>${item.text}</p></article>`));
rubric.forEach(([title,text]) => add("#rubric-grid", `<article class="rubric-item reveal"><div><strong>${title}</strong></div><p>${text}</p><div class="score-bar"><i></i></div></article>`));
awards.forEach(([title,text],index) => add("#awards-grid", `<article class="award reveal"><span>0${index + 1}</span><h3>${title}</h3><p>${text}</p></article>`));
timeline.forEach(([title,date],index) => add("#timeline-grid", `<article class="timeline-item reveal"><span>${String(index + 1).padStart(2,"0")}</span><div><h3>${title}</h3><p>${date}</p></div></article>`));
faq.forEach(([question,answer],index) => add("#faq-list", `<article class="faq-item"><button type="button" aria-expanded="false" aria-controls="faq-${index}"><span>${question}</span><i>+</i></button><div id="faq-${index}" class="faq-answer" hidden><p>${answer}</p></div></article>`));

const confirmedJudges = judges.filter(judge => judge.confirmed !== false);
const confirmedReviewers = reviewers.filter(reviewer => reviewer.confirmed === true);
if (!confirmedJudges.length) add("#judges-grid", `<div class="panel-placeholder reveal"><img src="assets/logo-mark.svg" alt=""><div><span>Final judging panel</span><h3>Academic judging panel to be announced.</h3><p>Judge names, positions, institutions, fields, biographies, and professional links will appear only after participation is confirmed.</p></div></div>`);
confirmedJudges.forEach(judge => add("#judges-grid", `<article class="person-card"><h3>${judge.name}</h3><p>${judge.position}${judge.institution ? ` · ${judge.institution}` : ""}</p></article>`));
if (confirmedReviewers.length) {
  add("#reviewers-grid", `<h3 class="reviewer-title">Confirmed preliminary reviewers</h3><div class="reviewer-cards">${confirmedReviewers.map(reviewer => `<article><strong>${reviewer.name}</strong><span>${reviewer.credentials}</span></article>`).join("")}</div>`);
}

document.querySelectorAll(".submission-link").forEach(link => {
  link.href = competition.submissionUrl;
  link.textContent = competition.submissionsOpen ? "Submit Essay" : "Submissions Opening Soon";
  link.setAttribute("aria-disabled", String(!competition.submissionsOpen));
  if (!competition.submissionsOpen || competition.submissionUrl === "SUBMISSION_FORM_URL") link.addEventListener("click", event => { event.preventDefault(); alert("Submissions are not open yet. The official form will be published here when available."); });
});

function setupAccordion(containerSelector, itemSelector, contentSelector) {
  document.querySelector(containerSelector)?.addEventListener("click", event => {
    const button = event.target.closest("button"); if (!button) return;
    const item = button.closest(itemSelector); const content = item.querySelector(contentSelector); const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open)); button.querySelector("i").textContent = open ? "+" : "−"; content.hidden = open;
  });
}
setupAccordion("#rule-list", ".rule-item", ".rule-content"); setupAccordion("#faq-list", ".faq-item", ".faq-answer");

const menu = document.querySelector(".menu-toggle"); const nav = document.querySelector(".site-nav");
menu.addEventListener("click", () => { const open = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", String(open)); });
nav.addEventListener("click", event => { if (event.target.closest("a")) { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); } });

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); }), {threshold: 0.08});
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
const progress = document.querySelector(".scroll-progress span"); const backTop = document.querySelector(".back-top");
window.addEventListener("scroll", () => { const available = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${available ? scrollY / available * 100 : 0}%`; backTop.classList.toggle("show", scrollY > 700); }, {passive:true});
backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
