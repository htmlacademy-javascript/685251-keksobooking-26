import {createBookingAd} from './data.js';

const similarCards = Array.from({length: 2}, createBookingAd);

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const mapCanvas = document.querySelector('#map-canvas');

const spawnCard = function (data) {
  const cardElement = cardTemplate.cloneNode(true);

  const popupTitle = cardElement.querySelector('.popup__title');
  popupTitle.textContent = data.offer.title;
  if (popupTitle.textContent === undefined) {popupTitle.classList.add('hidden');}
  const popupTextAdress = cardElement.querySelector('.popup__text--address');
  popupTextAdress.textContent = data.offer.address;
  if (popupTextAdress.textContent === undefined) {popupTextAdress.classList.add('hidden');}
  const popupTextPrice = cardElement.querySelector('.popup__text--price');
  popupTextPrice.textContent = `${data.offer.price  }₽/ночь`;
  if (popupTextPrice.textContent === undefined) {popupTextPrice.classList.add('hidden');}
  const popupType = cardElement.querySelector('.popup__type');
  popupType.textContent = data.offer.type;
  if (popupType.textContent === undefined) {popupType.classList.add('hidden');}
  const popupText = cardElement.querySelector('.popup__text--capacity');
  popupText.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  if (popupText.textContent === undefined) {popupText.classList.add('hidden');}
  const popupTextTime = cardElement.querySelector('.popup__text--time');
  popupTextTime.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  if (popupTextTime.textContent === undefined) {popupTextTime.classList.add('hidden');}
  const popupFeatures = cardElement.querySelector('.popup__features');
  popupFeatures.textContent = data.offer.features;
  if (popupFeatures.textContent === undefined) {popupFeatures.classList.add('hidden');}
  const popupDescription = cardElement.querySelector('.popup__description');
  popupDescription.textContent = data.offer.description;
  if (popupDescription.textContent === undefined) {popupDescription.classList.add('hidden');}
  const popupPhoto = cardElement.querySelector('.popup__photo');
  popupPhoto.src = data.offer.photos[0];
  if (popupPhoto.textContent === undefined) {popupPhoto.classList.add('hidden');}
  const popupAvatar = cardElement.querySelector('.popup__avatar');
  popupAvatar.src = data.author.avatar;
  if (popupAvatar.textContent === undefined) {popupAvatar.classList.add('hidden');}
  mapCanvas.appendChild(cardElement);
};

similarCards.forEach((element) => spawnCard(element));


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
