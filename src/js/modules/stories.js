const buttons = document.querySelectorAll('.stories-play-button');
const videoModal = document.querySelector('.video__modal');
const videoModalCloseButton = document.querySelector('.video__modal--close-button');
const videoContainer = document.querySelector('.video__modal .video__modal--video-container');

buttons.forEach(button => {
  if (button.getAttribute('href') === "javascript:void(0);" || button.nodeName === "BUTTON") {
    button.addEventListener('click', event => {
      event.preventDefault();

      let videoUrl = event.currentTarget.getAttribute('data-url');
      if (videoUrl !== null) {
        videoContainer.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        videoModal.style.display = 'block';
      }
    })
  }
});

if (videoModalCloseButton !== null) {
  videoModalCloseButton.addEventListener('click', () => {
    videoModal.style.display = 'none';
  })
}
