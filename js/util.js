const submitButtonElement = document.querySelector('.ad-form__submit');
const ALERT_SHOW_TIME = 10000;
const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;
const DELAY = 500;
const successTemplateElement = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplateElement = document.querySelector('#error')
  .content
  .querySelector('.error');
import { resetForm } from './map.js';
import { resetAllPreviews } from './upload.js';
const setData = (element, valueToCheck, elementProperty = 'textContent', content) => {
  if (valueToCheck === undefined || valueToCheck.includes(undefined)) {
    element.classList.add('hidden');
  } else {
    element[elementProperty] = content ? content : valueToCheck;
  }
};

function togglePageState(isDisabled) {
  const adFormElement = document.querySelector('.ad-form');
  const mapFiltersElement = document.querySelector('.map__filters');
  adFormElement.classList.toggle('ad-form--disabled', isDisabled);
  adFormElement.toggleAttribute('disabled', isDisabled);
  mapFiltersElement.classList.toggle('ad-form--disabled', isDisabled);
  mapFiltersElement.toggleAttribute('disabled', isDisabled);
}

function toggleFilterFields(isDisabled) {
  const mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.classList.toggle('ad-form--disabled', isDisabled);
  mapFiltersElement.toggleAttribute('disabled', isDisabled);
}

function getFetchError (message) {
  toggleFilterFields(true);
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикуется..';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};


const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onSuccessEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeSuccessMessage();
  }
};

const onSuccessClickPress = () => {
  removeSuccessMessage();
};

function removeSuccessMessage ()  {
  successTemplateElement.remove();
  document.removeEventListener('keydown', onSuccessEscPress);
  successTemplateElement.removeEventListener('click', onSuccessClickPress);
}
const onErrorEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeErrorMessage();
  }
};

const onErrorClickPress = () => {
  removeErrorMessage();
};

function removeErrorMessage () {
  errorTemplateElement.remove();
  document.removeEventListener('keydown', onErrorEscPress);
  errorTemplateElement.removeEventListener('click', onErrorClickPress);
}

const getErrorMessage = () => {
  document.body.appendChild(errorTemplateElement);
  unblockSubmitButton();
  document.addEventListener('keydown', onErrorEscPress);
  errorTemplateElement.addEventListener('click', onErrorClickPress);
};

const getSuccessMessage = () => {
  document.body.appendChild(successTemplateElement);
  resetForm();
  resetAllPreviews();
  unblockSubmitButton();
  document.addEventListener('keydown', onSuccessEscPress);
  successTemplateElement.addEventListener('click', onSuccessClickPress);
};

const updatePhotos = (el, arr) => {
  if (arr && arr.length) {
    el.innerHTML = '';
    arr.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.width = PHOTO_HEIGHT;
      photoElement.height = PHOTO_WIDTH;
      photoElement.alt = 'Фотография жилья';
      photoElement.src = photo;
      el.append(photoElement);
    });
  } else {
    el.remove();
  }
};

const sortFeatures = (features, data) => {
  features.forEach((featureListItem) => {
    if (data.offer.features !== undefined) {
      const modifiers = data.offer.features.map((feature) => `popup__feature--${  feature}`);
      const modifier = featureListItem.classList[1];
      if (!modifiers.includes(modifier) || modifiers === undefined) {
        featureListItem.remove();
      }
    }});
};

const debounce = (cb, timeoutDelay = DELAY) => {
  let timeoutID;
  return (...rest) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export {togglePageState,
  setData, blockSubmitButton,
  unblockSubmitButton, getFetchError,
  getErrorMessage, getSuccessMessage,
  updatePhotos, sortFeatures, debounce};
