const body = document.querySelector('body');
let position = 0;

const checkDirection = function checkDirection() {
  const scroll = document.body.scrollTop || document.documentElement.scrollTop;
  if (scroll < position) {
    body.classList.remove('scrolling-down');
    body.classList.add('scrolling-up');
  } else if (scroll > position) {
    body.classList.remove('scrolling-up');
    body.classList.add('scrolling-down');
  }
  position = scroll;
  requestAnimationFrame(checkDirection);
};

checkDirection();
