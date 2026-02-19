const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.classList.toggle('is-open', !isOpen);
  });
}

const accordionRoot = document.querySelector('[data-accordion]');

if (accordionRoot) {
  const items = Array.from(accordionRoot.querySelectorAll('.faq-item'));

  items.forEach((item) => {
    const trigger = item.querySelector('.faq-question');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const shouldOpen = trigger.getAttribute('aria-expanded') !== 'true';

      items.forEach((entry) => {
        const button = entry.querySelector('.faq-question');
        if (!button) return;
        entry.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      });

      if (shouldOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
