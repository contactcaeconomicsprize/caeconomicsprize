const competition = {
  name: "Central Asia Economics Prize",
  abbreviation: "CAEP",
  year: 2026,
  email: "contact@caeconomicsprize.org",
  domain: "https://caeconomicsprize.org",
  submissionUrl: "SUBMISSION_FORM_URL",
  deadline: null
};

const facts = [["3","Economics Categories"],["1,200","Word Maximum"],["Free","Entry"],["14–19","Eligible Ages"],["Worldwide","Eligibility"],["Central Asia","Essay Focus"]];
const principles = [["01","Economic Reasoning","Apply economics rather than simply describing an issue."],["02","Evidence","Use research, statistics, and credible sources to support important claims."],["03","Independent Thinking","Develop an argument rather than searching for a predetermined “correct” answer."]];
const requirements = [["Maximum Length","1,200 words"],["Language","English"],["Entry","Free"],["Format","PDF"],["Entries","Individual only"],["Number of Entries","One per participant"],["Central Asian Focus","Required"],["University Students","Not eligible after beginning full-time undergraduate study"]];

// Category 2 and Category 3 wording remains editable before launch.
const questions = [
  {category:"Development Economics",status:"Confirmed question",question:"Does labor migration help or hinder Central Asia's long-term economic development?",description:"Participants may consider remittances, human capital, labor markets, household investment, brain drain, productivity, migration incentives, and long-term structural development. Discussion of every factor is not required."},
  {category:"Behavioral Economics",status:"Working question — wording may change",question:"Why do beneficial government programs often have low uptake in Central Asia, and can behavioral nudges help?",description:"Participants may examine public initiatives, information frictions, present bias, trust, defaults, complexity, administrative burden, social norms, and behavioral nudges. Strong essays should distinguish behavioral explanations from structural or administrative barriers."},
  {category:"Labor / Public Economics",status:"Working question — wording may change",question:"Should Central Asian governments subsidize childcare to increase female labor-force participation?",description:"Participants may examine female labor supply, childcare costs and quality, public expenditure, household incentives, distributional effects, fiscal trade-offs, human capital, and long-term growth."}
];

const rules = [
  {title:"Eligibility",content:"Open to high-school students aged 14–19. Students worldwide may participate as long as the essay directly addresses Central Asia. Participants may focus on one or multiple Central Asian countries."},
  {title:"Word Limit",content:"Maximum 1,200 words. The bibliography or reference list is excluded. Appendices are not permitted. Tables and graphs may be included where relevant, but substantive text cannot be hidden in figures to bypass the limit."},
  {title:"Language",content:"Essays must be written in English. Non-native speakers will not be penalized simply for their language background."},
  {title:"Submission",content:"PDF only. The student's name must not appear inside the essay. Personal information will be collected separately through the submission form."},
  {title:"Citations",content:"Any recognized academic citation style may be used consistently, including APA, Chicago, Harvard, or MLA. A bibliography or reference list is required."},
  {title:"Research",content:"Participants may use academic papers, books, government statistics, central banks, the World Bank, IMF, Asian Development Bank, UN organizations, national statistical agencies, reputable research organizations, and credible journalism where relevant. Original econometric analysis is not required."},
  {title:"Originality",content:"Every submission must represent the participant's own intellectual and written work. Plagiarism, contract cheating, fabricated data, fabricated sources, and third-party authorship are prohibited."},
  {title:"Artificial Intelligence",content:"Generative AI may not generate the thesis, arguments, counterarguments, substantive outline, paragraphs, economic analysis, or conclusion. Spellcheck, basic grammar correction, dictionaries, citation management, ordinary search, and academic database discovery are permitted."},
  {title:"Authorship Verification",content:"Where credible concerns regarding authorship arise, participants may be asked to discuss their argument, evidence, and research process. An AI detector alone does not determine a violation."},
  {title:"Deadline",content:"TO BE CONFIRMED. Late entries will normally not be accepted."},
  {title:"Changes Before Deadline",content:"Participants may replace their submission before the deadline. Revisions will normally not be accepted afterward."}
];

const stages = [
  {number:"01",title:"Administrative Screening",text:"Eligibility, category, word limit, citations, file format, academic integrity, and AI-policy compliance are checked."},
  {number:"02",title:"Anonymous Preliminary Review",text:"Eligible essays are anonymized and assigned an ID such as DEV-014. Where practical, two economics reviewers assess each essay independently."},
  {number:"03",title:"Shortlisting",text:"Approximately 3–5 finalists per category may advance. Exact numbers depend on submission quality."},
  {number:"04",title:"Academic Judging",text:"Qualified specialists evaluate finalist essays. One Category Winner will normally be selected from each category, with a possible Overall Winner."}
];
const rubric = [["Economic Reasoning",30,"Understanding and appropriate use of economic concepts."],["Evidence & Research",25,"Credibility, relevance, and interpretation of evidence."],["Quality of Argument",20,"Logical structure, persuasiveness, and counterarguments."],["Originality",15,"Independent and interesting economic thinking."],["Structure & Clarity",10,"Organization, precision, and readability."]];

const judges = [];
const reviewers = [{name:"",credentials:"",confirmed:false}];
const awards = [["Category Winners","One winner per category may receive an official certificate, publication through CAEP, website recognition, and invitations to relevant online academic activities."],["Overall Winner","One Category Winner may additionally receive the title “Overall Winner — Central Asia Economics Prize.”"],["Finalists","Approximately 3–5 finalists per category may receive an official certificate, website recognition, and invitations to finalist events."]];
const timeline = [["Competition Launch","TBC"],["Submissions Open","TBC"],["Submission Deadline","TBC"],["Preliminary Review","TBC"],["Finalists Announced","TBC"],["Academic Judging","TBC"],["Winners Announced","TBC"],["Online Finalists & Economists Session","TBC"]];
const faq = [["Who can enter?","High-school students aged 14–19."],["Can students outside Central Asia participate?","Yes. Their essay must address the Central Asian context."],["Do I need to discuss every Central Asian country?","No. Participants may focus on one or more countries."],["Is entry free?","Yes."],["What is the word limit?","1,200 words."],["Does the bibliography count?","No."],["Can I submit more than one essay?","No."],["Can teams submit?","No. Entries are individual only."],["Do I need advanced economics knowledge?","No. Strong reasoning and evidence matter more than advanced mathematics."],["Is econometric analysis required?","No."],["Can I use AI?","Generative AI cannot be used to create substantive ideas, arguments, analysis, or writing for the essay."],["Which citation style should I use?","Any recognized academic citation style used consistently."],["Will every participant receive feedback?","No. Individual feedback cannot be guaranteed."],["How will essays be judged?","Anonymous preliminary review followed by final academic judging."],["Will winning essays be published?","CAEP intends to publish selected outstanding essays. External publication opportunities may also be offered where confirmed."]];

const add = (selector, html) => document.querySelector(selector)?.insertAdjacentHTML("beforeend", html);
facts.forEach(([value,label]) => add("#facts-grid", `<div class="fact"><strong>${value}</strong><span>${label}</span></div>`));
principles.forEach(([number,title,text]) => add("#principles-grid", `<article class="principle reveal"><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`));
requirements.forEach(([label,value]) => add("#requirements-grid", `<article class="requirement reveal"><span>${label}</span><strong>${value}</strong></article>`));
questions.forEach((item,index) => add("#question-grid", `<article class="question-card reveal"><div class="question-top"><span>Category ${index + 1}</span><small>${item.status}</small></div><h3>${item.category}</h3><blockquote>${item.question}</blockquote><p>${item.description}</p></article>`));
rules.forEach((item,index) => add("#rule-list", `<article class="rule-item"><button type="button" aria-expanded="false" aria-controls="rule-${index}"><span>${String(index + 1).padStart(2,"0")} — ${item.title}</span><i>+</i></button><div id="rule-${index}" class="rule-content" hidden><p>${item.content}</p></div></article>`));
stages.forEach(item => add("#stages-grid", `<article class="stage reveal"><span>${item.number}</span><h3>${item.title}</h3><p>${item.text}</p></article>`));
rubric.forEach(([title,score,text]) => add("#rubric-grid", `<article class="rubric-item reveal"><div><strong>${title}</strong><span>${score}%</span></div><p>${text}</p><div class="score-bar"><i style="--score:${score}%"></i></div></article>`));
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
  if (competition.submissionUrl === "SUBMISSION_FORM_URL") link.addEventListener("click", event => { event.preventDefault(); alert("The submission form will be published here when submissions open."); });
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
