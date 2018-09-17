// collapsed header
const canvas = document.querySelector('.canvas');
const header = document.querySelector('.header');

const watch = function watch() {
  const headerOffset = parseInt(getComputedStyle(canvas).getPropertyValue('padding-top'), 10);
  const scroll = document.body.scrollTop || document.documentElement.scrollTop;
  const limit = canvas.getBoundingClientRect().top + scroll + headerOffset;
  if (scroll > limit) {
    header.classList.add('header--collapsed');
  } else {
    header.classList.remove('header--collapsed');
  }
  requestAnimationFrame(watch);
};

if (header) {
  watch();
}

// toggle header menu
const menu = document.querySelector('.header__menu');
const menuToggle = document.querySelector('.header__menu-toggle');

const toggleMenu = function toggleMenu() {
  menu.classList.toggle('header__menu--active');
};

if (menu && menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

// close header menu
const menuClose = document.querySelector('.header__menu__close');

const closeMenu = function closeMenu() {
  menu.classList.remove('header__menu--active');
};

if (menuClose) {
  menuClose.addEventListener('click', closeMenu);
}

// remove search focus if input is empty
const searchHeader = document.querySelector('.header__search');
const searchButton = document.querySelector('.header__search__button');
const searchInput = document.querySelector('.header__search__input');

searchButton.addEventListener('click', (e) => {
  if (searchInput && !searchInput.value) {
    e.preventDefault();
    searchHeader.classList.remove('focus-within');
  }
});
