const tabs = document.querySelectorAll('.tabs');

[...tabs].forEach((root) => {
  const buttons = root.querySelectorAll('.tabs__button');
  const items = root.querySelectorAll('.tabs__item');

  const updateTabs = function updateTabs(el, i) {
    el.addEventListener('click', () => {
      root.querySelector('.tabs__button--last-active').classList.remove('tabs__button--last-active');
      root.querySelector('.tabs__item--last-active').classList.remove('tabs__item--last-active');
      el.classList.add('tabs__button--last-active');
      items[i].classList.add('tabs__item--last-active');
    });
  };

  [...buttons].forEach(updateTabs);

  buttons[0].classList.add('tabs__button--last-active');
  items[0].classList.add('tabs__item--last-active');
});
