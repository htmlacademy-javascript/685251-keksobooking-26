const MIN_TITLE = 30, MAX_TITLE = 100, MAX_PRICE = 100000;
const formElement = document.querySelector('.ad-form');
const formResetElement = document.querySelector('.ad-form__reset');
const priceFieldElement = formElement.querySelector('#price');
const typeFieldElement = formElement.querySelector('#type');
const roomsFieldElement = formElement.querySelector('#room_number');
const capacityFieldElement = formElement.querySelector('#capacity');
const checktimeFieldElement = formElement.querySelector('.ad-form__element--time');
const timeSelectFieldsElement = checktimeFieldElement.querySelectorAll('select');
const MinPriceMap = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};
const RoomsCapacityMap = {
  1: ['1'],
  2: ['1','2'],
  3: ['1','2','3'],
  100: ['0']
};
import {resetForm} from './map.js';
import {sendData} from './api.js';
import {blockSubmitButton, unblockSubmitButton,getErrorMessage,getSuccessMessage} from './util.js';
import {resetAllPreviews} from './upload.js';

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error_text',
});
const validateTitle = (value) => value.length >= MIN_TITLE && value.length <= MAX_TITLE;
const validatePrice = (value) => value >= MinPriceMap[typeFieldElement.value.toUpperCase()] && value <= MAX_PRICE;
const getPriceFieldError = () => `укажите цену от ${  MinPriceMap[typeFieldElement.value.toUpperCase()]} до ${MAX_PRICE}`;
const validateGuestCapacity = () => {
  const check = RoomsCapacityMap[roomsFieldElement.value];
  return check.includes(capacityFieldElement.value);
};
const validateAddress = (value) => value.length > 0;

pristine.addValidator(formElement.querySelector('#title'), validateTitle, `Обязательное поле, от ${MIN_TITLE} до ${MAX_TITLE} символов`);
pristine.addValidator(priceFieldElement, validatePrice, getPriceFieldError);
pristine.addValidator(capacityFieldElement, validateGuestCapacity,
  'Гостей слишком много для такого количества комнат');
pristine.addValidator(formElement.querySelector('#address'), validateAddress, 'Координаты устанавливаются через карту');

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  const formData = new FormData(evt.target);
  blockSubmitButton();
  if (isValid) {
    sendData(getSuccessMessage,getErrorMessage,formData);
  } else {
    unblockSubmitButton();
  }
}
);

formResetElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetAllPreviews();
});

typeFieldElement.addEventListener('change', () => {
  priceFieldElement.placeholder = MinPriceMap[typeFieldElement.value.toUpperCase()];
} );

checktimeFieldElement.addEventListener('change', (evt) => {
  for (const input of timeSelectFieldsElement) {
    if (input !== evt.target) {
      input.value = evt.target.value;
    }}});
