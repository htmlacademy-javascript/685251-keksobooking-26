import { resetForm } from './map.js';
import { resetAllPreviews } from './upload.js';
const submitButton = document.querySelector('.ad-form__submit');
const ALERT_SHOW_TIME = 10000;

const setData = (element, valueToCheck, elementProperty = 'textContent', content) => {
  if (valueToCheck === undefined || valueToCheck.includes(undefined)) {
    element.classList.add('hidden');
  } else {
    element[elementProperty] = content ? content : valueToCheck;
  }
};

function togglePageState(isDisabled) {
  const adForm = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');
  adForm.classList.toggle('ad-form--disabled', isDisabled);
  adForm.toggleAttribute('disabled', isDisabled);
  mapFilters.classList.toggle('ad-form--disabled', isDisabled);
  mapFilters.toggleAttribute('disabled', isDisabled);
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуется..';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

function getFetchError (message) {
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
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const getErrorMessage = () => {
  document.body.appendChild(errorTemplate);
  unblockSubmitButton();
  document.addEventListener('keydown', onErrorEscPress);
  errorTemplate.addEventListener('click', onErrorClickPress);
};

function removeErrorMessage () {
  errorTemplate.remove();
  document.removeEventListener('keydown', onErrorEscPress);
  errorTemplate.removeEventListener('click', onErrorClickPress);
}
function onErrorEscPress (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeErrorMessage();
  }}

function onErrorClickPress () {
  removeErrorMessage();
}

function onSuccessEscPress (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeSuccessMessage();
  }
}

function removeSuccessMessage () {
  successTemplate.remove();
  document.removeEventListener('keydown', onSuccessEscPress);
  successTemplate.removeEventListener('click', onSuccessClickPress);
}

function onSuccessClickPress () {
  removeSuccessMessage();
}

const getSuccessMessage = () => {
  document.body.appendChild(successTemplate);
  resetForm();
  resetAllPreviews();
  unblockSubmitButton();
  document.addEventListener('keydown', onSuccessEscPress);
  successTemplate.addEventListener('click', onSuccessClickPress);
};


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

const sortFeatures = (features, data) => {
  features.forEach((featureListItem) => {
    if (data.offer.features !== undefined) {
      const modifiers = data.offer.features.map((feature) => `popup__feature--${  feature}`);
      const modifier = featureListItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featureListItem.remove();
      } else if (modifiers === undefined) {
        featureListItem.remove();
      }
    }});
};

const debounce = (cb, timeoutDelay = 500) => {
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
