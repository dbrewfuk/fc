const accordionToggles = document.querySelectorAll('.accordion__toggle');

const toggleAccordion = function toggleAccordion(toggle) {
  toggle.addEventListener('click', () => {
    const label = toggle;
    toggle.classList.toggle('accordion__toggle--active');
    if (toggle.classList.contains('accordion__toggle--more')) {
      toggle.previousElementSibling.classList.toggle('accordion__content--active');
      if (toggle.classList.contains('accordion__toggle--active')) {
        label.innerText = 'View less';
      } else {
        label.innerText = 'View more';
      }
    } else if (toggle.classList.contains('accordion__toggle--tabs')) {
      toggle.nextElementSibling.classList.toggle('tabs__item--active');
    } else {
      toggle.nextElementSibling.classList.toggle('accordion__content--active');
    }
  });
};

[...accordionToggles].forEach(toggleAccordion);
