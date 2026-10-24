const competition = {
  name: "Central Asia Economics Prize",
  abbreviation: "CAEP",
  year: 2026,
  email: "contact@caeconomicsprize.org",
  domain: "https://caeconomicsprize.org",
  status: "completed",
  announcementDate: "2026-10-24",
  submissionsOpen: false,
  deadline: "2026-09-24T23:59:00+05:00"
};

const facts = [["183","Submissions"],["34","Countries & Territories"],["12","Finalists"],["4","Economics Categories"]];
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
  {title:"Deadline",content:"The 2026 submission deadline was 24 September 2026 at 23:59 Uzbekistan Time (UTC+5). Late entries are not accepted."},
  {title:"Changes Before Deadline",content:"Participants were permitted to replace their submission before the deadline. Revisions are not accepted afterward."}
];

const stages = [
  {number:"01",title:"Submission",text:"The 2026 submission period closed on September 24, 2026.",status:"completed"},
  {number:"02",title:"Initial Screening",text:"Entries were checked against the competition's eligibility and submission requirements.",status:"completed"},
  {number:"03",title:"Preliminary Review",text:"The preliminary review stage has concluded.",status:"completed"},
  {number:"04",title:"Final Evaluation",text:"The 12 shortlisted essays were evaluated by the final judging panel.",status:"completed"},
  {number:"05",title:"Results",text:"The winners were announced on October 24, 2026.",status:"completed"}
];
const rubric = [["Economic Reasoning & Understanding","Appropriate and accurate use of economic concepts."],["Evidence","Relevant, credible, and appropriately interpreted evidence."],["Argument","A strong, coherent, and well-supported line of reasoning."],["Originality","Independent and interesting economic thinking."],["Counterarguments","Serious engagement with competing explanations and objections."],["Central Asian Relevance","Meaningful application to the economic context of Central Asia."],["Structure & Clarity","Organization, precision, and readable academic writing."]];

const finalJudges = ["Dr. Nargiza Alimukhamedova","Dr. Temur Makhkamov","Mrs. Khilola Ruziboeva"];

const partners = [
  {name:"Economic Fundamentals Initiative (EFI) Uzbekistan",label:"Official Partner",logo:"assets/efi-uzbekistan.jpg",description:"EFI is part of an international nonprofit initiative working to strengthen economic understanding across Central Asia, Eastern Europe, and the South Caucasus. Through this partnership, EFI Uzbekistan supports CAEP in expanding access to economics education and reaching students across the region.",url:"https://www.econfun.org/where-we-work/uzbekistan/",linkLabel:"Learn more about EFI",confirmed:true},
  {name:"The Confluence",label:"Publication Partner",logo:"assets/confluence-wordmark-navy.png",description:"The Confluence is an international student journal of social sciences and current affairs, publishing student analysis across politics, economics, business, philosophy, history, and related fields.",url:"https://www.instagram.com/the_confluence_journal?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",linkLabel:"Learn more about The Confluence",confirmed:true}
];
const awards = [["Publication","Outstanding participants may be considered for publication opportunities where arrangements are confirmed."],["Academic Recognition","Outstanding work may receive academic recognition from the Central Asia Economics Prize."],["Further Engagement","Outstanding participants may receive opportunities for further engagement with economists and researchers."]];
const timeline = [
  {date:"September 24, 2026",title:"Submissions Closed",status:"completed"},
  {date:"September 26 – October 1, 2026",title:"Preliminary Review",status:"completed"},
  {date:"Completed",title:"Final Evaluation",status:"completed"},
  {date:"October 24, 2026",title:"Winners Announcement Ceremony",status:"completed"}
];
const faq = [["Is CAEP 2026 complete?","Yes. The inaugural edition concluded with the Winners Announcement Ceremony on October 24, 2026. Official results are available on the 2026 Results page."],["Who was eligible for CAEP 2026?","High-school students aged 14–19 at the submission deadline."],["Was residence in Central Asia required?","No. The 2026 competition was open worldwide, but every essay had to directly address the Central Asian context."],["When did submissions close?","Submissions closed on 24 September 2026 at 23:59 Uzbekistan Time (UTC+5)."],["How much did entry cost?","Entry was free."],["What was the essay word limit?","Maximum 1,200 words. The bibliography or reference list was excluded."],["What language was required?","English."],["How many essays could a participant submit?","One essay per participant, answering one of the four official questions."],["Could names appear on essays?","No. Essays were anonymized for review."],["Was discussing every Central Asian country required?","No. Participants could focus on one or more countries, with a Central Asian focus required."],["Could teams submit?","No. Entries were individual only."],["Was advanced economics knowledge required?","No. Strong reasoning and evidence mattered more than advanced mathematics."],["Was econometric analysis required?","No."],["What was the AI policy?","Generative AI could not produce substantive ideas, arguments, analysis, essay text, or conclusions on the participant's behalf."],["Which citation styles were accepted?","Any recognized academic citation style used consistently."],["How were essays judged?","Essays were anonymized before review. Following initial screening and preliminary review, twelve shortlisted essays advanced to the Final Round for independent evaluation by the final judging panel."],["Did every participant receive feedback?","Individual feedback was not guaranteed."],["Are full winning essays available?","Not yet. Full essays will be published only with explicit permission from their authors."]];

const add = (selector, html) => document.querySelector(selector)?.insertAdjacentHTML("beforeend", html);
facts.forEach(([value,label]) => add("#facts-grid", `<div class="fact"><strong>${value}</strong><span>${label}</span></div>`));
principles.forEach(([number,title,text]) => add("#principles-grid", `<article class="principle reveal"><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`));
requirements.forEach(([label,value]) => add("#requirements-grid", `<article class="requirement reveal"><span>${label}</span><strong>${value}</strong></article>`));
questions.forEach((item,index) => add("#question-grid", `<article class="question-card reveal"><div class="question-top"><span>Category ${index + 1}</span><small>${item.status}</small></div><h3>${item.category}</h3><p class="question-description">${item.description}</p><blockquote>${item.question}</blockquote></article>`));
rules.forEach((item,index) => add("#rule-list", `<article class="rule-item"><button type="button" aria-expanded="false" aria-controls="rule-${index}"><span>${String(index + 1).padStart(2,"0")} — ${item.title}</span><i>+</i></button><div id="rule-${index}" class="rule-content" hidden><p>${item.content}</p></div></article>`));
stages.forEach(item => add("#stages-grid", `<article class="stage ${item.status} reveal"><div class="stage-meta"><span>${item.number}</span><small>${item.status}</small></div><h3>${item.title}</h3><p>${item.text}</p></article>`));
rubric.forEach(([title,text]) => add("#rubric-grid", `<article class="rubric-item reveal"><div><strong>${title}</strong></div><p>${text}</p><div class="score-bar"><i></i></div></article>`));
finalJudges.forEach(name => add("#final-judges", `<li class="reviewer reveal"><span>Final Judge</span><strong>${name}</strong></li>`));
awards.forEach(([title,text],index) => add("#awards-grid", `<article class="award reveal"><span>0${index + 1}</span><h3>${title}</h3><p>${text}</p></article>`));
partners.filter(partner => partner.confirmed === true).forEach(partner => add("#partners-grid", `<article class="partner-card reveal"><div class="partner-logo"><img src="${partner.logo}" alt="${partner.name} logo"></div><div class="partner-copy"><span>${partner.label}</span><h3>${partner.name}</h3><p>${partner.description}</p><a href="${partner.url}" target="_blank" rel="noopener noreferrer">${partner.linkLabel} <i aria-hidden="true">→</i></a></div></article>`));
timeline.forEach((item,index) => add("#timeline-grid", `<article class="timeline-item ${item.status} reveal"><div class="timeline-meta"><span>${String(index + 1).padStart(2,"0")}</span><small>${item.status}</small></div><div><p>${item.date}</p><h3>${item.title}</h3></div></article>`));
faq.forEach(([question,answer],index) => add("#faq-list", `<article class="faq-item"><button type="button" aria-expanded="false" aria-controls="faq-${index}"><span>${question}</span><i>+</i></button><div id="faq-${index}" class="faq-answer" hidden><p>${answer}</p></div></article>`));
