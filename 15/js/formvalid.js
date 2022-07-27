import {resetForm} from './map.js';
import {sendData} from './api.js';
import {blockSubmitButton, unblockSubmitButton,getErrorMessage,getSuccessMessage} from './util.js';
import {resetAllPreviews} from './upload.js';
const MIN_TITLE = 30, MAX_TITLE = 100, MAX_PRICE = 100000;
const form = document.querySelector('.ad-form');
const formReset = document.querySelector('.ad-form__reset');
const priceField = form.querySelector('#price');
const typeField = form.querySelector('#type');
const roomsField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
const checktimeField = form.querySelector('.ad-form__element--time');
const timeSelectFields = checktimeField.querySelectorAll('select');
const MinPriceMap = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const RoomsCapacityMap = {
  1: ['1'],
  2: ['1','2'],
  3: ['1','2','3'],
  100: ['0']
};
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error_text',
});
const validateTitle = (value) => value.length >= MIN_TITLE && value.length <= MAX_TITLE;
const validatePrice = (value) => value >= MinPriceMap[typeField.value] && value <= MAX_PRICE;
const getPriceFieldError = () => `укажите цену от ${  MinPriceMap[typeField.value]} до ${MAX_PRICE}`;
const validateGuestCapacity = () => {
  const check = RoomsCapacityMap[roomsField.value];
  return check.includes(capacityField.value);
};
const validateAddress = (value) => value.length > 0;

pristine.addValidator(form.querySelector('#title'), validateTitle, `От ${MIN_TITLE} до ${MAX_TITLE} символов`);
pristine.addValidator(priceField, validatePrice, getPriceFieldError);
pristine.addValidator(capacityField, validateGuestCapacity,
  'Гостей слишком много для такого количества комнат');
pristine.addValidator(form.querySelector('#address'), validateAddress, 'Координаты устанавливаются через карту');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  const formData = new FormData(evt.target);
  blockSubmitButton();
  if (isValid) {
    sendData(getSuccessMessage,getErrorMessage,formData);
    unblockSubmitButton();
  } else {
    unblockSubmitButton();
  }
}
);

formReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetAllPreviews();
});

typeField.addEventListener('change', () => {
  priceField.placeholder = MinPriceMap[typeField.value];
} );

checktimeField.addEventListener('change', (evt) => {
  for (const input of timeSelectFields) {
    if (input !== evt.target) {
      input.value = evt.target.value;
    }}});
