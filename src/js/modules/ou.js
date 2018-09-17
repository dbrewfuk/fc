import Flickity from 'flickity';

const sliders = document.querySelectorAll('.flexslider .slides');

[...sliders].forEach((slider) => {
  const flkty = new Flickity(slider, {
    prevNextButtons: false,
    wrapAround: false,
  });
});