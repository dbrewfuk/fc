/* global mapboxgl */
const svg = {
  marker: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 0C5.816 0 2.292 3.201 2.013 7.268a7.598 7.598 0 0 0 1.699 5.223l5.68 7.22c.143.182.369.29.608.29s.465-.108.609-.29l5.679-7.22a7.592 7.592 0 0 0 1.699-5.222C17.708 3.177 14.184 0 10 0zm.025 12a4 4 0 1 1-.05-7.998 4 4 0 0 1 .05 7.998z"/></svg>',
};

const campus = document.querySelectorAll('.campus');

[...campus].forEach((root, i) => {
  // setup vars
  const { mapFeatures } = window;
  const campusImage = root.querySelector('.campus__image__wrap');
  const detail = root.querySelector('.campus__detail');
  const viewAll = root.querySelector('.campus__all');
  const initialDetailCard = detail.innerHTML;
  const initialCampusImage = campusImage.querySelector('img').getAttribute('src');

  // setup mapbox bounds
  const bounds = new mapboxgl.LngLatBounds();
  mapFeatures.forEach((feature) => {
    bounds.extend(feature.geometry.coordinates);
  });

  // setup mapbox
  let lmapboxAccessToken = typeof mapboxAccessToken === "undefined" || !mapboxAccessToken ? '' : mapboxAccessToken;
  mapboxgl.accessToken = lmapboxAccessToken;
  const map = new mapboxgl.Map({
    container: `campus-map-${i}`,
    style: 'mapbox://styles/mapbox/light-v9',
  });

  // fit map to bounds
  map.fitBounds(bounds, { padding: 48 });

  // show view all if map moved
  map.on('load', () => {
    map.on('moveend', () => {
      viewAll.classList.add('campus__all--active');
    });
  });

  // add map layers
  map.on('load', () => {
    map.addLayer({
      id: 'places',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: mapFeatures,
        },
      },
    });
  });

  // update campus item
  const updateCampus = function updateCampus(j) {
    const data = `
      <div class="campus__detail__card">
        <h3 class="campus__detail__title">${mapFeatures[j].properties.title}</h3>
        <p>${mapFeatures[j].properties.description}</p>
        <div class="campus__detail__links">
          <p class="text-center"><a href="${mapFeatures[j].properties.schedule}" class="button button--auto">Schedule a Visit</a></p>
          <p class="text-center"><a href="${mapFeatures[j].properties.directions}">Get Directions</a></p>
        </div>
      </div>
    `;
    detail.innerHTML = data;
    campusImage.innerHTML = `<img src="${mapFeatures[j].properties.image}">`;
  };

  // toggle location nav container
  const navToggle = root.querySelectorAll('.campus__nav__toggle');

  const toggleNav = function toggleNav(el) {
    el.addEventListener('click', () => {
      el.classList.toggle('campus__nav__toggle--active');
      el.nextElementSibling.classList.toggle('campus__nav__list--active');
    });
  };

  [...navToggle].forEach(toggleNav);

  // toggle location nav items
  const navItems = root.querySelectorAll('.cta-list__link--map');

  const toggleNavItem = function toggleNavItem(el, j) {
    el.addEventListener('click', () => {
      const last = root.querySelector('.cta-list__link--active');
      if (last) {
        last.classList.remove('cta-list__link--active');
      }
      navItems[j].classList.add('cta-list__link--active');
      map.flyTo({ center: mapFeatures[j].geometry.coordinates });
      updateCampus(j);
    });
  };

  [...navItems].forEach(toggleNavItem);

  // add custom markers
  mapFeatures.forEach((marker, j) => {
    // create element
    const el = document.createElement('div');
    el.className = 'campus__map__marker';
    el.innerHTML = `
      <span class="svg svg--icon-marker">
        ${svg.marker}
      </span>
    `;

    // add to map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    // update on click
    el.addEventListener('click', () => {
      navItems[j].click();
    });
  });

  // view all
  viewAll.addEventListener('click', () => {
    // zoom to fit all markers
    map.fitBounds(bounds, { padding: 48 });
    // set initial detail card
    detail.innerHTML = initialDetailCard;
    // set initial campus image
    campusImage.innerHTML = `<img src="${initialCampusImage}">`;
    // reset nav items
    const last = root.querySelector('.cta-list__link--active');
    if (last) {
      last.classList.remove('cta-list__link--active');
    }
    // hide view all
    map.once('moveend', () => {
      viewAll.classList.remove('campus__all--active');
    });
  });
});
