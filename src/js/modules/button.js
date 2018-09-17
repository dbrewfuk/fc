const submitButton = document.querySelector('.button-animate');

const animateButton = function animateButton() {
  if (!submitButton.classList.contains('button-animating')) {
    submitButton.classList.add('button-animating');
    submitButton.setAttribute('aria-label', 'Loading...')
  }
}

if (submitButton) {
  submitButton.addEventListener('click', animateButton)  
}
