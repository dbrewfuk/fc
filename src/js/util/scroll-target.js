require('smoothscroll-polyfill').polyfill();

const targets = document.querySelectorAll('[data-scroll-target]');

const scrollTo = function scrollTo(el) {
  el.addEventListener('click', () => {
    const target = document.querySelector(el.getAttribute('data-scroll-target'));
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
};

[...targets].forEach(scrollTo);
