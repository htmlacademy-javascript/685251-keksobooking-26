import {debounce} from './util.js';
const DEFAULT_SELECT_VALUE = 'any';
const PricePoint = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');
const features = [...filters.querySelectorAll('#housing-features input')];

const filterByType = (el) => typeFilter.value === DEFAULT_SELECT_VALUE
  || el.offer.type === typeFilter.value;

const filterByPrice = (el) => {
  switch(priceFilter.value) {
    case 'low':
      return el.offer.price < PricePoint.MIDDLE;
    case 'middle':
      return el.offer.price >= PricePoint.MIDDLE
        && el.offer.price < PricePoint.HIGH;
    case 'high':
      return el.offer.price >= PricePoint.HIGH;
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
  return selectedFeatures.every((feature) => el.offer.features && el.offer.features.includes(feature.value));
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
