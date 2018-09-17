const log = require('debug')('kctcs:finder');
const $ = require('jquery');
const convert = require('xml-js');

function findElementsByName(elements, name) {
  return elements.filter(e => e.name === name);
}

function buildItemCard(program) {
  const programElements = program[1].elements;

  const content = $('<div />');
  content.addClass('card__content');
  content.addClass('card__content--alt');

  const icon = $('<span />');
  icon.addClass('svg');
  icon.addClass('svg--icon-' + findElementsByName(programElements, 'icon')[0].elements[0].text);
  icon.addClass('card__icon');

  const svg = $('<svg><use xlink:href="//webdevassets.kctcs.edu/_resources/images/svgstore.svg#' +
  findElementsByName(programElements, 'icon')[0].elements[0].text + '"></use></svg>');

  const cardTitle = $('<h4 />');
  cardTitle.addClass('card__title');
  cardTitle.text(findElementsByName(programElements, 'name')[0].elements[0].text);

  const description = $('<p />');
  description.text(findElementsByName(programElements, 'intro')[0].elements[0].text);

  const empty = $('<p><span class="card__more card__more--empty"></span></p>');

  const card = $('<a />');
  card.addClass('card');
  card.addClass('card--animate');
  card.addClass('card--show');

  card.attr('href', findElementsByName(programElements, 'url')[0].elements[0].text);

  const actions = findElementsByName(programElements, 'action');
  const actionItems = actions.map(item => {
    if (typeof item.elements !== 'undefined') {
      return item.elements[0].text;
    }
    else {
      return '';
    }
  }).join(' ');

  card.attr('data-type-t', actionItems);


  const types = findElementsByName(programElements, 'type');
  const typeItems = types.map(item => {
    if (typeof item.elements !== 'undefined') {
      return item.elements[0].text;
    }
    else {
      return '';
    }
  }).join(' ');

  card.attr('data-type-pt', typeItems);

  const creds = findElementsByName(programElements, 'credential');
  const credItems = creds.map(item => {
    if (typeof item.elements !== 'undefined') {
      return item.elements[0].text;
    }
    else {
      return '';
    }
  }).join(' ');
  card.attr('data-type-c', credItems);


  card.text(program.name)

  content.appendTo(card);
  icon.appendTo(content);
  svg.appendTo(icon);
  cardTitle.appendTo(content);
  description.appendTo(content);
  empty.appendTo(content);
  return card;
}

function buildProgramList(data) {
  // log(data);

  $('.program-global-list').empty();
  Object.entries(data.elements[0].elements).forEach((program) => {
    // log(program);
    const listItem = buildItemCard(program);
    listItem.appendTo('.program-global-list');
  });

}


function fetchFeed() {
  const fetchButtons = document.querySelectorAll('.program-finder__option--fetch');

  fetchButtons.forEach((item, idx, url) => {
    item.addEventListener('click', () => {
      url = item.getAttribute('data-type-college');
      if (url == '*') {
        $('.program-global-list').empty();
      }
      else {
        fetch(url)
        .then(response => response.text())
        .then(xmlString => convert.xml2js(xmlString, {compact: false, spaces: 4}))
        .then(data => buildProgramList(data))
        .catch((error) => {
          log(error);
          $('.program-global-list').empty();
          $('.program-global-list').text('No College Content Available');
        });
      }

    });
  });

}

fetchFeed();
