const DEFAULT_SELECT_VALUE = 'any';
const PricePoint = {
  MIDDLE: 10000,
  HIGH: 50000,
};
const filtersElement = document.querySelector('.map__filters');
const typeFilterElement = filtersElement.querySelector('#housing-type');
const priceFilterElement = filtersElement.querySelector('#housing-price');
const roomsFilterElement = filtersElement.querySelector('#housing-rooms');
const guestsFilterElement = filtersElement.querySelector('#housing-guests');
const featuresElement = [...filtersElement.querySelectorAll('#housing-features input')];
import {debounce} from './util.js';

const filterByType = (el) => typeFilterElement.value === DEFAULT_SELECT_VALUE
  || el.offer.type === typeFilterElement.value;

const filterByPrice = (el) => {
  switch(priceFilterElement.value) {
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

const filterByRooms = (el) => roomsFilterElement.value === DEFAULT_SELECT_VALUE
  || el.offer.rooms.toString() === roomsFilterElement.value;

const filterByGuests = (el) => guestsFilterElement.value === DEFAULT_SELECT_VALUE
  || el.offer.guests.toString() === guestsFilterElement.value;

const filterByFeatures = (el) => {

  const selectedFeatures = featuresElement
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
  if (!filtersElement) {
    return;
  }

  const onFiltersChange = (data) => () => {
    const filteredOffers = data.filter(filterOffers);

    cb(filteredOffers);
  };

  filtersElement.addEventListener('change',
    debounce(onFiltersChange(offers))
  );
  filtersElement.addEventListener(
    'reset',
    debounce(onFiltersChange(offers))
  );
};

export {initFilters};
