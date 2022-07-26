import {debounce} from './util.js';
const DEFAULT_SELECT_VALUE = 'any';
const PrisePoint = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const filters = document.querySelector('.map__filters');
let typeFilter, priceFilter, roomsFilter, guestsFilter, features;

const filterByType = (el) => typeFilter.value === DEFAULT_SELECT_VALUE
  || el.offer.type === typeFilter.value;

const filterByPrice = (el) => {
  switch(priceFilter.value) {
    case 'low':
      return el.offer.price < PrisePoint.MIDDLE;
    case 'middle':
      return el.offer.price >= PrisePoint.MIDDLE
        && el.offer.price < PrisePoint.HIGH;
    case 'high':
      return el.offer.price >= PrisePoint.HIGH;
    default:
      return true;
  }
};

const filterByRooms = (el) => roomsFilter.value === DEFAULT_SELECT_VALUE
  || el.offer.rooms.toString() === roomsFilter.value;

const filterByGuests = (el) => guestsFilter.value === DEFAULT_SELECT_VALUE
  || el.offer.guests.toString() === guestsFilter.value;

const filterByFeatures = (el) => {

  const selectedFeatures = features
    .filter((elem) => elem.checked);

  if (!selectedFeatures || !selectedFeatures.length) {
    return true;
  }

  for (const feature of selectedFeatures) {
    if (!el.offer.features || !el.offer.features.includes(feature.value)) {
      return false;
    }
  }

  return true;
};

const filterOffers = (el) =>
  filterByType(el)
  && filterByPrice(el)
  && filterByRooms(el)
  && filterByGuests(el)
  && filterByFeatures(el);

const initFilters = (offers, cb) => {
  if (!filters) {
    return;
  }
  typeFilter = filters.querySelector('#housing-type');
  priceFilter = filters.querySelector('#housing-price');
  roomsFilter = filters.querySelector('#housing-rooms');
  guestsFilter = filters.querySelector('#housing-guests');
  features = [...filters.querySelectorAll('#housing-features input')];

  const onFiltersChange = (data) => () => {
    const filteredOffers = data.filter(filterOffers);

    cb(filteredOffers);
  };

  filters.addEventListener(
    'change',
    debounce(onFiltersChange(offers))
  );
};

export {initFilters};
