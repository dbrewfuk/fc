const $ = require('jquery');

// vars
let lastFocus;
let optionButtons;
const status = {
  t: [],
  pt: '*',
  c: '*',
};

const fetches = document.querySelectorAll('.program-finder__filters__button--fetch');
const buttons = document.querySelectorAll('.program-finder__filters__button');
const buttonsAlt = document.querySelectorAll('.program-finder__filters__button--alt');
const selectOverlays = document.querySelectorAll('.program-finder__select__overlay');
const options = document.querySelectorAll('.program-finder__option');
const optionFetches = document.querySelectorAll('.program-finder__option--fetch');
const optionLists = document.querySelectorAll('.program-finder__filters__item');
const checkboxes = document.querySelectorAll('.program-finder__checkbox');

const clearButton = document.querySelector('.program-finder__clear');
const applyCheck = document.querySelector('.button--finder');

// reflow
const reflow = function reflow() {
  const x = document.clientWidth;
  return x;
};

// filter cards
const filterCards = () => {
  const cards = document.querySelectorAll('.card');

  // checkbox accumulator
  const checkboxValues = [];
  // counter
  let delay = 0;
  // reset cards
  [...cards].forEach((card) => {
    card.classList.add('card--inactive');
    card.classList.remove('card--show');
  });
  // force reflow
  reflow();
  // handle each card
  [...cards].forEach((card) => {
    // vars
    const t = card.getAttribute('data-type-t').split(' ') || '';
    const pt = card.getAttribute('data-type-pt').split(' ') || '';
    const c = card.getAttribute('data-type-c').split(' ') || '';

    let tMatch = status.t.length === 0;
    status.t.forEach(filterT => {
      if (t.includes(filterT)) tMatch = true;
    });

    // check filters
    if (
      tMatch
      &&
      (pt.includes(status.pt) || status.pt === '*')
      &&
      (c.includes(status.c) || status.c === '*')
    ) {
      t.forEach(item => {
        if (!checkboxValues.includes(item)) checkboxValues.push(item);
      });
      delay += 100;
      card.classList.remove('card--inactive');
      setTimeout(() => {
        card.classList.add('card--show');
      }, delay);
    }
  });

  [...checkboxes].forEach(checkbox => {
    if (checkboxValues.includes(checkbox.getAttribute('data-type-t'))) {
      checkbox.classList.remove('program-finder__checkbox--disabled');
      checkbox.querySelector('input').disabled = false;
    } else {
      checkbox.classList.add('program-finder__checkbox--disabled');
      checkbox.querySelector('input').disabled = true;
    }
  });
};

// focus trap listener
const focusTrap = function focusTrap(e) {
  const firstEl = optionButtons[0];
  const lastEl = optionButtons[optionButtons.length - 1];
  if (e.shiftKey && firstEl === document.activeElement) {
    e.preventDefault();
    lastEl.focus();
  } else if (!e.shiftKey && lastEl === document.activeElement) {
    e.preventDefault();
    firstEl.focus();
  }
};

// keydown listener
const keydown = function keydown(e) {
  if (e.keyCode === 9) {
    focusTrap(e);
  } else if (e.keyCode === 27) {
    document.querySelector('.program-finder__select--active').classList.remove('program-finder__select--active');
    document.removeEventListener('keydown', keydown);
    setTimeout(() => {
      lastFocus.focus();
    }, 300);
  }
};

// Reset filters
const clearFilters = () => {
  status.t = [];
  status.pt = '*';
  status.c = '*';

  [...checkboxes].forEach(checkbox => {
    checkbox.querySelector('input').checked = false;
  });

  [...options].forEach(option => {
    if (
      option.getAttribute('data-type-t') === '*' ||
      option.getAttribute('data-type-pt') === '*' ||
      option.getAttribute('data-type-c') === '*'
    ) {
      option.classList.add('program-finder__option--active');
      option.parentElement.parentElement.parentElement.querySelector('.program-finder__filters__button').innerText = option.innerHTML;
    } else {
      option.classList.remove('program-finder__option--active');
    }
  });

  setTimeout(() => {

    clearButton.style.display = 'none';
  }, 300);
}

// button modal toggle college fetch
[...fetches].forEach((fetch, idx) => {
  fetch.addEventListener('click', () => {
    lastFocus = fetch;
    optionButtons = fetch.nextElementSibling.querySelectorAll('.program-finder__option--fetch');
    fetch.nextElementSibling.classList.add('program-finder__select--active');
    document.addEventListener('keydown', keydown);
    setTimeout(() => {
      optionButtons[0].focus();
    }, 300);
  });
});

// button modal toggles
[...buttons].forEach((button, idx) => {
  button.addEventListener('click', () => {
    lastFocus = button;
    optionButtons = button.nextElementSibling.querySelectorAll('.program-finder__option');
    button.nextElementSibling.classList.add('program-finder__select--active');
    document.addEventListener('keydown', keydown);
    setTimeout(() => {
      optionButtons[0].focus();
    }, 300);
  });
});

// Alternative button toggles
[...buttonsAlt].forEach((buttonAlt) => {
  buttonAlt.addEventListener('click', () => {
    lastFocus = buttonAlt;
    const filterButton = document.querySelector('.button--finder');
    optionButtons = buttonAlt.nextElementSibling.querySelectorAll('.program-finder__checkbox input');
    optionButtons = Array.from(optionButtons).concat(filterButton);
    buttonAlt.nextElementSibling.classList.add('program-finder__select--active');
    document.addEventListener('keydown', keydown);
    setTimeout(() => {
      optionButtons[0].focus();
    }, 300);
  })
});

// close modals on overlay click
[...selectOverlays].forEach((overlay) => {
  overlay.addEventListener('click', () => {
    overlay.parentNode.classList.remove('program-finder__select--active');
    document.removeEventListener('keydown', keydown);
    setTimeout(() => {
      lastFocus.focus();
    }, 300);
  });
});


// handle opening overlay
[...optionFetches].forEach((optionFetch) => {
  const label = optionFetch.innerHTML;
  const select = optionFetch.parentNode.parentNode;
  const button = select.previousElementSibling;
  optionFetch.addEventListener('click', () => {
    select.querySelector('.program-finder__option--active').classList.remove('program-finder__option--active');
    optionFetch.classList.add('program-finder__option--active');
    document.removeEventListener('keydown', keydown);
    if (label == 'College') {
      $('.program-finder__filters__button').attr('disabled', 'disabled');
      $('.program-finder__filters__button--alt').attr('disabled', 'disabled');
    }
    else {
      $('.program-finder__filters__button').removeAttr('disabled');
      $('.program-finder__filters__button--alt').removeAttr('disabled');
    }
    setTimeout(() => {
      button.innerText = label;
      select.classList.remove('program-finder__select--active');
      lastFocus.focus();
      clearFilters();
    }, 300);
  });
});

// filter options
[...options].forEach((option) => {
  // vars
  const label = option.innerHTML;
  const select = option.parentNode.parentNode;
  const button = select.previousElementSibling;
  const pt = option.getAttribute('data-type-pt');
  const c = option.getAttribute('data-type-c');

  // update on click
  option.addEventListener('click', () => {
    select.querySelector('.program-finder__option--active').classList.remove('program-finder__option--active');
    option.classList.add('program-finder__option--active');
    status.pt = pt || status.pt;
    status.c = c || status.c;
    document.removeEventListener('keydown', keydown);
    setTimeout(() => {
      button.innerText = label;
      select.classList.remove('program-finder__select--active');
      clearButton.style.display = 'block';
      filterCards();
      lastFocus.focus();
    }, 300);
  });
});

// checkbox filter options
[...checkboxes].forEach((checkbox) => {
  const t = checkbox.getAttribute('data-type-t');
  const select = checkbox.parentNode.parentNode;

  // update on change
  const input = checkbox.querySelector('input');
  input.addEventListener('change', () => {
    const selected = [...checkboxes].filter((checkbox) => checkbox.querySelector('input').checked);
    const selectedList = selected.map((checkbox) => checkbox.getAttribute('data-type-t'));
    status.t = selectedList;
  });

  // apply filter
  applyCheck.addEventListener('click', () => {

    document.removeEventListener('keydown', keydown);
    setTimeout(() => {
      select.classList.remove('program-finder__select--active');
      clearButton.style.display = 'block';
      filterCards();
    }, 300);
  })
});


if (clearButton != null) {
  clearButton.addEventListener('click', () => {
    clearFilters();
    filterCards();
  });
}

// Program finder search input
const input = document.getElementById('searchInput');

const searchInput = () => {
  let content, titles, filter, searchItem1, searchItem2, cards, clearID;

    //Grab all of the needed HTML elements
    filter = input.value.toUpperCase();
    titles = document.getElementsByClassName("card__title");
    content = document.getElementsByClassName("card_desc");
    cards = document.getElementsByClassName("card");
    clearID = document.getElementById("searchClear");

    // Transitions clear search button
    if (filter.length >= 1) {
      clearID.classList.add("opacity-100", "cursor-pointer");
    }
    else if (filter.length === 0) {
      clearID.classList.remove("opacity-100", "cursor-pointer");
    }

    // Searching the elements (titles and descriptions/content)
    for (let i = 0; i < titles.length; i++) {

        searchItem1 =  content[i].innerHTML.replace(/\s+/g, ' ').toUpperCase();
        searchItem2 = titles[i].innerHTML.toUpperCase();

        if (searchItem1.indexOf(filter) > -1) {
            cards[i].style.display = "";
        }

        else if (searchItem2.indexOf(filter) > -1) {
            cards[i].style.display = "";
        }

        else {
            cards[i].style.display = "none";
        }

    }
};

if (input) {
  input.addEventListener("keyup", () => {
    searchInput();
  });
}

const clearSearchButton = document.getElementById("searchClear");
if (clearSearchButton) {
  clearSearchButton.addEventListener("click", () => {
    input.value = "";
    searchInput();
  });
}
