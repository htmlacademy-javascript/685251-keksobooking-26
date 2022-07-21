const submitButton = document.querySelector('.ad-form__submit');
const ALERT_SHOW_TIME = 10000;

const setData = (element, valueToCheck, elementProperty = 'textContent', content) => {
  if (valueToCheck === undefined || valueToCheck.includes(undefined)) {
    element.classList.add('hidden');
  } else {
    element[elementProperty] = content ? content : valueToCheck;
  }
};

const changeState = (state) => {
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуется..';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const getFetchError = (message) => {
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
};
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const getErrorMessage = () => {
  document.body.appendChild(errorTemplate);
  document.addEventListener('keydown', errorEscPress);
  errorTemplate.addEventListener('click', errorClickPress);
};

function removeErrorMessage () {
  errorTemplate.remove();
  document.removeEventListener('keydown', errorEscPress);
  errorTemplate.removeEventListener('click', errorClickPress);
}
function errorEscPress (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeErrorMessage();
  }}

function errorClickPress () {
  removeErrorMessage();
}

function successEscPress (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeSuccessMessage();
  }
}

function removeSuccessMessage () {
  successTemplate.remove();
  document.removeEventListener('keydown', successEscPress);
  successTemplate.removeEventListener('click', successClickPress);
}

function successClickPress () {
  removeSuccessMessage();
}

const getSuccessMessage = () => {
  document.body.appendChild(successTemplate);
  document.addEventListener('keydown', successEscPress);
  successTemplate.addEventListener('click', successClickPress);
};

export {changeState, setData, blockSubmitButton,
  unblockSubmitButton, getFetchError, getErrorMessage, getSuccessMessage};
