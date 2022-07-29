const cardTemplateElement = document.querySelector('#card')
  .content
  .querySelector('.popup');
const sliderElement = document.querySelector('#slider');
const priceElement = document.querySelector('#price');
const encodedTypes = {
  palace: 'Дворец' ,
  flat:'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};
const SLIDER_MIN = 0;
const SLIDER_MAX = 100000;
const SLIDER_STEP = 100;
import {setData, sortFeatures, updatePhotos} from './util.js';

const spawnCard = (data) => {
  const cardElement = cardTemplateElement.cloneNode(true);
  const popupTitleElement = cardElement.querySelector('.popup__title');
  const popupTextAdressElement = cardElement.querySelector('.popup__text--address');
  const popupTextPriceElement = cardElement.querySelector('.popup__text--price');
  const popupTypeElement = cardElement.querySelector('.popup__type');
  const popupTextElement = cardElement.querySelector('.popup__text--capacity');
  const popupTextTimeElement = cardElement.querySelector('.popup__text--time');
  const popupDescriptionElement = cardElement.querySelector('.popup__description');
  const popupPhotosElement = cardElement.querySelector('.popup__photos');
  const popupAvatarElement = cardElement.querySelector('.popup__avatar');
  const popupFeaturesElement = cardElement.querySelector('.popup__features')
    .querySelectorAll('.popup__feature');

  sortFeatures(popupFeaturesElement, data);
  updatePhotos(popupPhotosElement, data.offer.photos);
  setData(popupTitleElement, data.offer.title, 'textContent');
  setData(popupTextAdressElement, data.offer.address, 'textContent');
  setData(popupTypeElement, encodedTypes[data.offer.type], 'textContent');
  setData(popupTextPriceElement, `${data.offer.price  }₽/ночь`, 'textContent');
  setData(popupDescriptionElement, data.offer.description, 'textContent');
  setData(popupAvatarElement, data.author.avatar, 'src');
  setData(popupTextElement, [data.offer.rooms, data.offer.guests], 'textContent', `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`);
  setData(popupTextTimeElement,[data.offer.checkin, data.offer.checkout], 'textContent', `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`);
  return cardElement;
};

noUiSlider.create(sliderElement, {
  range: {
    min: SLIDER_MIN,
    max: SLIDER_MAX,
  },
  start: SLIDER_MIN,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseInt(value, 10),
  },
});
sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});
const sliderReset = () => {
  sliderElement.noUiSlider.reset();
};


export {sliderReset,cardTemplateElement, spawnCard};
