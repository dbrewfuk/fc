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

const sliders = document.querySelectorAll('.slider__items');

[...sliders].forEach((slider) => {
  const flkty = new Flickity(slider, {
    imagesLoaded: true,
    pageDots: false,
    cellAlign: 'right',
    rightToLeft: true,
    contain: true,
    arrowShape: {
      x0: 25,
      x1: 70,
      y1: 45,
      x2: 75,
      y2: 40,
      x3: 35,
    },
  });
  window.addEventListener('load', () => {
    flkty.resize();
  });
});
