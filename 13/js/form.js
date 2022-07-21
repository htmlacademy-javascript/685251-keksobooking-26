import {setData} from './util.js';
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const sliderElement = document.querySelector('#slider');
const priceElement = document.querySelector('#price');

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

  popupFeatures.forEach((featureListItem) => {
    if (data.offer.features !== undefined) {
      const modifiers = data.offer.features.map((feature) => `popup__feature--${  feature}`);
      const modifier = featureListItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featureListItem.remove();
      } else if (modifiers === undefined) {
        featureListItem.remove();
      }
    }});

  const updatePhotos = (el, arr) => {
    if (arr && arr.length) {
      el.innerHTML = '';
      arr.forEach((photo) => {
        const photoElement = document.createElement('img');
        photoElement.classList.add('popup__photo');
        photoElement.width = '45';
        photoElement.height = '40';
        photoElement.alt = 'Фотография жилья';
        photoElement.src = photo;
        el.append(photoElement);
      });
    } else {
      el.remove();
    }
  };

  updatePhotos(popupPhotos, data.offer.photos);
  setData(popupTitle, data.offer.title, 'textContent');
  setData(popupTextAdress, data.offer.address, 'textContent');
  setData(popupType, data.offer.type, 'textContent');
  setData(popupTextPrice, `${data.offer.price  }₽/ночь`, 'textContent');
  setData(popupDescription, data.offer.description, 'textContent');
  setData(popupAvatar, data.author.avatar, 'src');
  setData(popupText, [data.offer.rooms, data.offer.guests], 'textContent', `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`);
  setData(popupTextTime,[data.offer.checkin, data.offer.checkout], 'textContent', `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`);
  return cardElement;
};

// noUiSlider
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseInt(value, 10),
  },
});
sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});


export {cardTemplate, spawnCard};
