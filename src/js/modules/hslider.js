import Flickity from 'flickity';
import 'flickity-imagesloaded';

const fpresize = Flickity.prototype.resize;

Flickity.prototype.createResizeClass = function createResizeClass() {
  this.element.classList.add('flickity-resize');
};

Flickity.createMethods.push('createResizeClass');

Flickity.prototype.resize = function resize() {
  this.element.classList.remove('flickity-resize');
  fpresize.call(this);
  this.element.classList.add('flickity-resize');
};

const sliders = document.querySelectorAll('.hslider__items');

[...sliders].forEach((slider) => {
  const flkty = new Flickity(slider, {
    imagesLoaded: true,
    prevNextButtons: false,
    wrapAround: false,
  });
  window.addEventListener('load', () => {
    flkty.resize();
  });
});
