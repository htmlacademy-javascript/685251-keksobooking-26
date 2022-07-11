import {createBookingAd} from './data.js';
import {setData} from './util.js';
const similarCards = Array.from({length: 10}, createBookingAd);
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const priceElement = document.querySelector('#slider');
const valueElement = document.querySelector('#price');
const spawnCard = function (data) {
  const cardElement = cardTemplate.cloneNode(true);
  const popupTitle = cardElement.querySelector('.popup__title');
  const popupTextAdress = cardElement.querySelector('.popup__text--address');
  const popupTextPrice = cardElement.querySelector('.popup__text--price');
  const popupType = cardElement.querySelector('.popup__type');
  const popupText = cardElement.querySelector('.popup__text--capacity');
  const popupTextTime = cardElement.querySelector('.popup__text--time');
  const popupDescription = cardElement.querySelector('.popup__description');
  const popupPhoto = cardElement.querySelector('.popup__photo');
  const popupAvatar = cardElement.querySelector('.popup__avatar');
  const popupFeatures = cardElement.querySelector('.popup__features')
    .querySelectorAll('.popup__feature');
  const modifiers = data.offer.features.map((feature) => `popup__feature--${  feature}`);
  popupFeatures.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });
  setData(popupTitle, data.offer.title, 'textContent');
  setData(popupTextAdress, data.offer.address, 'textContent');
  setData(popupType, data.offer.type, 'textContent');
  setData(popupTextPrice, `${data.offer.price  }₽/ночь`, 'textContent');
  setData(popupDescription, data.offer.description, 'textContent');
  setData(popupAvatar, data.author.avatar, 'src');
  setData(popupPhoto, data.offer.photos[0], 'src');
  setData(popupText, [data.offer.rooms, data.offer.guests], 'textContent', `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`);
  setData(popupTextTime,[data.offer.checkin, data.offer.checkout], 'textContent', `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`);
  return cardElement;
};
// noUiSlider
noUiSlider.create(priceElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 100,
  connect: 'lower',
});
priceElement.noUiSlider.on('update', () => {
  valueElement.value = priceElement.noUiSlider.get();
});

export {similarCards, spawnCard};
