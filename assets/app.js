/* ════════════════════════════════════════════════════════════════════
   iGym X — interactions
   - Mobile menu
   - FAQ accordion
   - Screenshots carousel dots
   - Scroll-reveal (staggered)
   - Live rest timer (hero floating card)
   - Stats count-up (numbers animate when in view)
   ════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const reduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─ Mobile menu ───────────────────────────────────────────────────── */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.hidden = isOpen;
    });

    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });
  }

  /* ─ FAQ accordion ─────────────────────────────────────────────────── */
  const accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    accordion.querySelectorAll('.faq-question').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        const panelId = trigger.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;

        trigger.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.classList.toggle('open', !expanded);
      });
    });
  }

  /* ─ Screenshots carousel dots ─────────────────────────────────────── */
  const track = document.querySelector('.screens-track');
  const dotsContainer = document.getElementById('screen-dots');

  if (track && dotsContainer) {
    const cards = Array.from(track.querySelectorAll('.screen-card'));
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Screenshot ${i + 1}`);
      dot.addEventListener('click', () => {
        cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = cards.indexOf(entry.target);
          if (idx >= 0) dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        }
      });
    }, { root: track, threshold: 0.55 });
    cards.forEach(card => observer.observe(card));
  }

  /* ─ Scroll reveal (staggered) ─────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduced) {
      reveals.forEach(el => el.classList.add('in'));
    } else {
      // Hero block reveals immediately
      requestAnimationFrame(() => {
        document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('in'));
      });

      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

      document.querySelectorAll('.section .reveal').forEach(el => io.observe(el));
    }
  }

  /* ─ Live rest timer (hero floating card) ──────────────────────────── */
  const liveTimer = document.getElementById('live-timer');
  if (liveTimer && !reduced) {
    let seconds = 92;
    const tick = () => {
      const m = String(Math.floor(seconds / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      liveTimer.textContent = `${m}:${s}`;
      seconds = seconds <= 0 ? 180 : seconds - 1;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ─ Stats count-up ────────────────────────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length && !reduced) {
    const animateNumber = (el) => {
      const finalText = el.textContent.trim();
      // Find numeric portion, preserve prefix/suffix (e.g. "$0", "100%", "0 ₽")
      const match = finalText.match(/^([^\d]*)(\d+(?::\d+)?)([^\d]*)$/);
      if (!match) return;

      const prefix = match[1];
      const valueStr = match[2];
      const suffix = match[3];

      // Time format like "01:32" — animate by total seconds, render as mm:ss
      if (valueStr.includes(':')) {
        const [m, s] = valueStr.split(':').map(Number);
        const total = m * 60 + s;
        let start = null;
        const dur = 900;
        const step = (t) => {
          if (start === null) start = t;
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const cur = Math.floor(total * eased);
          const mm = String(Math.floor(cur / 60)).padStart(2, '0');
          const ss = String(cur % 60).padStart(2, '0');
          el.textContent = `${prefix}${mm}:${ss}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = finalText;
        };
        requestAnimationFrame(step);
        return;
      }

      // Plain number
      const target = parseInt(valueStr, 10);
      let start = null;
      const dur = 900;
      const step = (t) => {
        if (start === null) start = t;
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = Math.floor(target * eased);
        el.textContent = `${prefix}${cur}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = finalText;
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => io.observe(el));
  }
})();
