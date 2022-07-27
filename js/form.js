import {setData, sortFeatures, updatePhotos} from './util.js';
const cardTemplate = document.querySelector('#card')
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
const spawnCard = function (data) {
  const cardElement = cardTemplate.cloneNode(true);
  const popupTitle = cardElement.querySelector('.popup__title');
  const popupTextAdress = cardElement.querySelector('.popup__text--address');
  const popupTextPrice = cardElement.querySelector('.popup__text--price');
  const popupType = cardElement.querySelector('.popup__type');
  const popupText = cardElement.querySelector('.popup__text--capacity');
  const popupTextTime = cardElement.querySelector('.popup__text--time');
  const popupDescription = cardElement.querySelector('.popup__description');
  const popupPhotos = cardElement.querySelector('.popup__photos');
  const popupAvatar = cardElement.querySelector('.popup__avatar');
  const popupFeatures = cardElement.querySelector('.popup__features')
    .querySelectorAll('.popup__feature');

  sortFeatures(popupFeatures, data);
  updatePhotos(popupPhotos, data.offer.photos);
  setData(popupTitle, data.offer.title, 'textContent');
  setData(popupTextAdress, data.offer.address, 'textContent');
  setData(popupType, encodedTypes[data.offer.type], 'textContent');
  setData(popupTextPrice, `${data.offer.price  }₽/ночь`, 'textContent');
  setData(popupDescription, data.offer.description, 'textContent');
  setData(popupAvatar, data.author.avatar, 'src');
  setData(popupText, [data.offer.rooms, data.offer.guests], 'textContent', `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`);
  setData(popupTextTime,[data.offer.checkin, data.offer.checkout], 'textContent', `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`);
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


export {sliderReset,cardTemplate, spawnCard};
