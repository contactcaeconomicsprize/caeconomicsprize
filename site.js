(() => {
  function setupAccordion(containerSelector,itemSelector,contentSelector) {
    document.querySelector(containerSelector)?.addEventListener('click',event => {
      const button = event.target.closest('button');
      if (!button) return;
      const item = button.closest(itemSelector);
      const content = item?.querySelector(contentSelector);
      if (!content) return;
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded',String(!open));
      button.querySelector('i').textContent = open ? '+' : '−';
      content.hidden = open;
    });
  }
  setupAccordion('#rule-list','.rule-item','.rule-content');
  setupAccordion('#faq-list','.faq-item','.faq-answer');

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menu && nav) {
    menu.addEventListener('click',() => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded',String(open));
    });
    nav.addEventListener('click',event => {
      if (event.target.closest('a')) {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded','false');
      }
    });
  }

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }),{threshold:0.08});
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
  }
  const progress = document.querySelector('.scroll-progress span');
  const backTop = document.querySelector('.back-top');
  window.addEventListener('scroll',() => {
    const available = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${available ? scrollY / available * 100 : 0}%`;
    backTop?.classList.toggle('show',scrollY > 700);
  },{passive:true});
  backTop?.addEventListener('click',() => window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}));
})();
