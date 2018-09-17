const alertClose = document.querySelectorAll('.alert__close');

const closeAlert = function closeAlert(el) {
  el.addEventListener('click', () => {
    const alert = el.parentNode.parentNode;
    alert.parentNode.removeChild(alert);
  });
};

[...alertClose].forEach(closeAlert);
