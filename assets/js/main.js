(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('#primary-navigation');

  const icons = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 10.5V21h13V10.5"/><path d="M9.5 21v-6h5v6"/></svg>',
    services: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"/><path d="M6 7v13h12V7"/><path d="M9 11h6"/><path d="M9 15h6"/><path d="M12 7V4"/></svg>',
    why: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-4.4 7-11V5l-7-3-7 3v5c0 6.6 7 11 7 11Z"/><path d="m9 12 2 2 4-5"/></svg>',
    faq: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8.5 8.5 0 0 1-8.5 8.5 8.9 8.9 0 0 1-3.9-.9L3 21l1.4-5.2A8.5 8.5 0 1 1 21 12Z"/><path d="M9.7 9.3a2.6 2.6 0 0 1 4.6 1.7c0 1.8-2.3 2-2.3 3.6"/><path d="M12 17h.01"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4A8.2 8.2 0 1 1 20.2 11.8Z"/><path d="M9.2 8.4c.2-.5.4-.6.7-.6h.5c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.4.5c.7 1.3 1.7 2.2 3 2.9l.5-.6c.2-.2.5-.3.8-.2l1.6.7c.3.1.4.3.4.6v.5c0 .4-.2.7-.5.9-.5.3-1.1.4-1.7.3-3.2-.4-6-2.8-6.8-5.9-.2-.7-.1-1.4.3-1.9Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z"/></svg>'
  };

  const ensureMobileEnhancements = () => {
    if (!document.querySelector('link[href="assets/css/mobile-navigation.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'assets/css/mobile-navigation.css';
      document.head.appendChild(link);
    }

    if (!document.querySelector('.mobile-bottom-nav')) {
      const bottomNav = document.createElement('nav');
      bottomNav.className = 'mobile-bottom-nav';
      bottomNav.setAttribute('aria-label', 'شريط التنقل السفلي');
      bottomNav.innerHTML = `
        <a href="#home" data-bottom-link>${icons.home}<span>الرئيسية</span></a>
        <a href="#services" data-bottom-link>${icons.services}<span>الخدمات</span></a>
        <a href="#why-us" data-bottom-link>${icons.why}<span>مميزاتنا</span></a>
        <a href="#faq" data-bottom-link>${icons.faq}<span>الأسئلة</span></a>
        <a class="nav-cta" href="https://wa.me/966541023197" target="_blank" rel="noopener">${icons.whatsapp}<span>واتساب</span></a>
      `;
      document.body.appendChild(bottomNav);
    }

    if (!document.querySelector('.pro-floating-actions')) {
      const floating = document.createElement('div');
      floating.className = 'pro-floating-actions';
      floating.setAttribute('aria-label', 'أزرار تواصل عائمة');
      floating.innerHTML = `
        <a class="pro-float-btn whatsapp" href="https://wa.me/966541023197" target="_blank" rel="noopener" aria-label="تواصل واتساب">${icons.whatsapp}</a>
        <a class="pro-float-btn call" href="tel:0541023197" aria-label="اتصل الآن">${icons.phone}</a>
      `;
      document.body.appendChild(floating);
    }
  };

  ensureMobileEnhancements();

  const topNavLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  const bottomNavLinks = Array.from(document.querySelectorAll('[data-bottom-link]'));
  const allAnchorLinks = [...topNavLinks, ...bottomNavLinks];

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const closeMenu = () => {
    body.classList.remove('nav-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'فتح القائمة');
  };

  const openMenu = () => {
    body.classList.add('nav-open');
    menuToggle?.setAttribute('aria-expanded', 'true');
    menuToggle?.setAttribute('aria-label', 'إغلاق القائمة');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = body.classList.contains('nav-open');
    isOpen ? closeMenu() : openMenu();
  });

  allAnchorLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!body.classList.contains('nav-open')) return;
    if (!nav || !menuToggle) return;
    const target = event.target;
    if (target instanceof Node && !nav.contains(target) && !menuToggle.contains(target)) {
      closeMenu();
    }
  });

  const sections = allAnchorLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter((section, index, arr) => section && arr.indexOf(section) === index);

  const setActiveLink = (id) => {
    allAnchorLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        setActiveLink(id);
      });
    }, {
      rootMargin: '-42% 0px -48% 0px',
      threshold: 0
    });

    sections.forEach((section) => activeObserver.observe(section));
  }

  const accordions = document.querySelectorAll('[data-accordion] .accordion-item');
  accordions.forEach((item) => {
    const button = item.querySelector('button');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      accordions.forEach((current) => {
        current.classList.remove('is-open');
        current.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08
    });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
