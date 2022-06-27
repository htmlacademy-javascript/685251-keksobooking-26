import {createBookingAd} from './data.js';

const similarCards = Array.from({length: 2}, createBookingAd);
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const spawnCard = function (data) {
  const cardElement = cardTemplate.cloneNode(true);

  const popupTitle = cardElement.querySelector('.popup__title');
  const popupTextAdress = cardElement.querySelector('.popup__text--address');
  const popupTextPrice = cardElement.querySelector('.popup__text--price');
  const popupType = cardElement.querySelector('.popup__type');
  const popupText = cardElement.querySelector('.popup__text--capacity');
  const popupTextTime = cardElement.querySelector('.popup__text--time');
  const popupFeatures = cardElement.querySelector('.popup__features');
  const popupDescription = cardElement.querySelector('.popup__description');
  const popupPhoto = cardElement.querySelector('.popup__photo');
  const popupAvatar = cardElement.querySelector('.popup__avatar');

  const setData = function (dom, dataKey, dataKey1) {
    if (dataKey === undefined) {
      dom.classList.add('hidden');
    } else if (dom === popupTextPrice) {
      dom.textContent = `${dataKey  }₽/ночь`;
    } else if (dom === popupText) {
      dom.textContent = `${dataKey} комнаты для ${dataKey1} гостей`;
    } else if (dom === popupTextTime) {
      dom.textContent = `Заезд после ${dataKey}, выезд до ${dataKey1}`;
    } else {
      dom.textContent = dataKey;
      dom.src = dataKey;
    }};

  setData(popupTitle, data.offer.title);
  setData(popupTextAdress, data.offer.address);
  setData(popupType, data.offer.type);
  setData(popupFeatures, data.offer.features);
  setData(popupDescription, data.offer.description);
  setData(popupTextAdress, data.offer.adress);
  setData(popupAvatar, data.author.avatar);
  setData(popupPhoto, data.offer.photos[0]);
  setData(popupTextPrice, data.offer.price);
  setData(popupText,data.offer.rooms, data.offer.guests);
  setData(popupTextTime,data.offer.checkin, data.offer.checkout);

  mapCanvas.appendChild(cardElement);
};

similarCards.forEach((element) =>
  spawnCard(element));

const changeState = function (state) {
  const adForm = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');
  if (state === 0) {
    adForm.classList.add('ad-form--disabled');
    adForm.setAttribute('disabled', 'disabled');
    mapFilters.classList.add('map__filters--disabled');
    mapFilters.setAttribute('disabled', 'disabled');
  }  else if (state === 1) {
    adForm.classList.remove('ad-form--disabled');
    adForm.removeAttribute('disabled');
    mapFilters.classList.remove('map__filters--disabled');
    mapFilters.removeAttribute('disabled');

  }};

changeState(1);
