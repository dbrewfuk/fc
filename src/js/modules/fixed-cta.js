// conditionally show fixed cta
const canvas = document.querySelector('.canvas');
const cta = document.querySelector('.fixed-cta');
const footer = document.querySelector('.footer');

const watch = function watch() {
  const headerOffset = parseInt(getComputedStyle(canvas).getPropertyValue('padding-top'), 10);
  const footerOffset = footer.offsetHeight;
  const scroll = document.body.scrollTop || document.documentElement.scrollTop;
  const totalHeight = document.body.clientHeight || document.documentElement.clientHeight;
  const winHeight = window.innerHeight;
  const limit = canvas.getBoundingClientRect().top + scroll + headerOffset;
  const stop = totalHeight - winHeight - footerOffset;
  if (scroll > limit && scroll < stop) {
    cta.classList.add('fixed-cta--active');
  } else {
    cta.classList.remove('fixed-cta--active');
  }
  requestAnimationFrame(watch);
};

if (cta) {
  watch();
}
