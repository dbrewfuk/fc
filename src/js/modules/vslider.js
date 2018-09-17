const vsliders = document.querySelectorAll('.vslider');
let winWidth = window.innerWidth;

const vsliderSize = function vsliderSize(force) {
  const newWidth = window.innerWidth;
  if (newWidth !== winWidth || force === true) {
    [...vsliders].forEach((vslider) => {
      let height = 0;
      const root = vslider;
      const items = vslider.querySelectorAll('.vslider__items > *');

      const setHeight = function setHeight(el) {
        const itemHeight = el.offsetHeight;
        height = itemHeight > height ? itemHeight : height;
      };

      root.style.height = 0;
      root.style.minHeight = 0;

      [...items].forEach(setHeight);

      root.style.height = `${height}px`;
      root.style.minHeight = `${height}px`;
    });
  }
  winWidth = newWidth;
};

const vsliderBuild = function vsliderBuild() {
  [...vsliders].forEach((vslider) => {
    const nav = vslider.querySelector('.vslider__nav');
    const items = vslider.querySelectorAll('.vslider__items > *');

    const buildNav = function buildNav(el, i) {
      const button = `<button class="vslider__button"><span class="hide">${i}</span></button>`;
      nav.innerHTML += button;
    };

    [...items].forEach(buildNav);
  });
};

const vsliderNav = function vsliderNav(start) {
  [...vsliders].forEach((vslider) => {
    const container = vslider.querySelector('.vslider__items');
    const buttons = vslider.querySelectorAll('.vslider__button');
    const slideCount = buttons.length;

    const changeSlide = function changeSlide(el, i) {
      const value = (i / slideCount) * -100;
      el.addEventListener('click', () => {
        vslider.querySelector('.vslider__button--active').classList.remove('vslider__button--active');
        buttons[i].classList.add('vslider__button--active');
        container.style.transform = `translateY(${value}%)`;
      });
    };

    [...buttons].forEach(changeSlide);

    if (start !== undefined) {
      buttons[start].classList.add('vslider__button--active');
    }
  });
};

vsliderSize(true);
vsliderBuild();
vsliderNav(0);

window.addEventListener('load', () => {
  vsliderSize(true);
});
window.addEventListener('resize', vsliderSize);
