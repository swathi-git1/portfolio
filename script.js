/* ============================================
   GOMATHI S — PORTFOLIO SCRIPT
============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------
     1. LOADING SCREEN
  -------------------------------- */
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderPercent = document.getElementById('loaderPercent');

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 18 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        revealOnLoad();
      }, 300);
    }
    loaderBar.style.width = progress + '%';
    loaderPercent.textContent = Math.floor(progress) + '%';
  }, 180);

  document.body.style.overflow = 'hidden';

  /* -------------------------------
     2. CURSOR GLOW (mouse-follow)
  -------------------------------- */
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  /* -------------------------------
     3. NAVBAR SCROLL STATE
  -------------------------------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
    updateBackToTop();
  });

  /* -------------------------------
     4. MOBILE NAV TOGGLE
  -------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* -------------------------------
     5. SCROLL-TRIGGERED REVEALS
  -------------------------------- */
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedEls.forEach(el => observer.observe(el));

  function revealOnLoad() {
    // Reveal hero immediately on load
    document.querySelectorAll('.hero [data-animate]').forEach(el => {
      el.classList.add('in-view');
    });
  }

  /* -------------------------------
     6. ANIMATED COUNTERS
  -------------------------------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(update);
  }

  /* -------------------------------
     7. SKILL BARS + CIRCULAR CHARTS
  -------------------------------- */
  const skillSection = document.getElementById('skills');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        document.querySelectorAll('.circle-fill').forEach(circle => {
          const percent = parseInt(circle.dataset.percent, 10);
          const offset = 100 - percent;
          circle.style.strokeDashoffset = offset;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  if (skillSection) skillObserver.observe(skillSection);

  /* -------------------------------
     8. HERO ROLE TEXT ROTATION (typewriter)
  -------------------------------- */
  const roles = [
    'Full Stack Developer',
    'Frontend Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Software Engineer'
  ];
  const roleText = document.getElementById('roleText');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      roleText.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      roleText.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* -------------------------------
     9. MAGNETIC BUTTONS
  -------------------------------- */
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  /* -------------------------------
     10. PROJECT CARD 3D TILT
  -------------------------------- */
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
    });
  });

  /* -------------------------------
     11. PAGE TRANSITION SYSTEM
  -------------------------------- */
  const transitionMap = {
    'home-about': 'wave',
    'about-skills': 'liquid',
    'skills-projects': 'glow',
    'projects-articles': 'panels',
    'articles-coding': 'morph',
    'coding-contact': 'particles',
    'about-home': 'wave',
    'skills-about': 'liquid',
    'projects-skills': 'glow',
    'articles-projects': 'panels',
    'coding-articles': 'morph',
    'contact-coding': 'particles'
  };

  const overlay = document.getElementById('transitionOverlay');
  const shape = document.getElementById('transitionShape');
  let currentSection = 'home';

  function getSectionKey(target) {
    return target;
  }

  document.querySelectorAll('[data-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.dataset.target;
      if (!target || target === currentSection) return;
      const el = document.getElementById(target);
      if (!el) return;

      e.preventDefault();
      const key = `${currentSection}-${target}`;
      const style = transitionMap[key] || 'glow';

      shape.className = 'transition-shape ' + style;
      // force reflow
      void shape.offsetWidth;
      shape.classList.add('active');

      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 350);

      setTimeout(() => {
        shape.classList.remove('active');
      }, 750);

      currentSection = target;
    });
  });

  /* -------------------------------
     12. ACTIVE NAV ON SCROLL
  -------------------------------- */
  const sections = document.querySelectorAll('.section');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = 'home';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
        current = section.dataset.section;
      }
    });
    currentSection = current;
    navLinkEls.forEach(link => {
      link.classList.toggle('active', link.dataset.target === current);
    });
  }

  /* -------------------------------
     13. BACK TO TOP
  -------------------------------- */
  const backToTop = document.getElementById('backToTop');
  function updateBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------------------------------
     14. CONTACT FORM VALIDATION
  -------------------------------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name', errorId: 'nameError', validate: v => v.trim().length >= 2, msg: 'Please enter your name' },
      { id: 'email', errorId: 'emailError', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Enter a valid email address' },
      { id: 'subject', errorId: 'subjectError', validate: v => v.trim().length >= 3, msg: 'Subject is too short' },
      { id: 'message', errorId: 'messageError', validate: v => v.trim().length >= 10, msg: 'Message should be at least 10 characters' }
    ];

    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const errorEl = document.getElementById(field.errorId);
      const group = input.closest('.form-group');
      if (!field.validate(input.value)) {
        errorEl.textContent = field.msg;
        group.classList.add('invalid');
        valid = false;
      } else {
        errorEl.textContent = '';
        group.classList.remove('invalid');
      }
    });

    if (valid) {
      formSuccess.classList.add('show');
      form.reset();
      document.querySelectorAll('.form-group').forEach(g => g.classList.remove('invalid'));
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }
  });

  /* -------------------------------
     15. PLACEHOLDER FIX (for floating labels)
  -------------------------------- */
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
    el.setAttribute('placeholder', ' ');
  });

  /* -------------------------------
     16. CERTIFICATE LIGHTBOX
  -------------------------------- */
  const certLightbox = document.getElementById('certLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightbox = document.getElementById('closeLightbox');

  document.querySelectorAll('.cert-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      lightboxImg.src = thumb.dataset.full;
      lightboxCaption.textContent = thumb.dataset.title || '';
      certLightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function hideLightbox() {
    certLightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  closeLightbox.addEventListener('click', hideLightbox);
  certLightbox.addEventListener('click', (e) => {
    if (e.target === certLightbox) hideLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideLightbox();
    }
  });

});
