// ── Mobile menu ──────────────────────────────────────────────────────────────

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  // Close when tapping anchor links inside the menu
  mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });
}

// ── FAQ accordion with smooth animation ──────────────────────────────────────

const accordion = document.querySelector('[data-accordion]');

if (accordion) {
  accordion.querySelectorAll('.faq-question').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;

      trigger.setAttribute('aria-expanded', String(!expanded));
      if (panel) {
        panel.classList.toggle('open', !expanded);
      }
    });
  });
}

// ── Carousel dots ─────────────────────────────────────────────────────────────

const track = document.querySelector('.screens-track');
const dotsContainer = document.getElementById('screen-dots');

if (track && dotsContainer) {
  const cards = Array.from(track.querySelectorAll('.screen-card'));

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Screenshot ${i + 1}`);
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));

  // Highlight dot matching the most-visible card
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = cards.indexOf(entry.target);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    });
  }, { root: track, threshold: 0.55 });

  cards.forEach(card => observer.observe(card));
}
