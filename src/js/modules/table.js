const tableToggles = document.querySelectorAll('.table__toggle');

const toggleTable = function toggleTable(toggle) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('table__toggle--active');
    toggle.parentNode.parentNode.nextElementSibling.classList.toggle('table__collapse--active');
  });
};

[...tableToggles].forEach(toggleTable);
