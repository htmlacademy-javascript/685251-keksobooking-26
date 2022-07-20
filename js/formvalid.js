import { resetForm } from './map.js';

const [MIN_TITLE, MAX_TITLE, MAX_PRICE] = [30, 100, 100000];
const form = document.querySelector('.ad-form');
const priceField = form.querySelector('#price');
const typeField = form.querySelector('#type');
const roomsField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
const checktimeField = form.querySelector('.ad-form__element--time');
const timeSelectFields = checktimeField.querySelectorAll('select');
const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const roomsCapacityMap = {
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
const validatePrice = (value) => value >= MIN_PRICE[typeField.value] && value <= MAX_PRICE;
const getPriceFieldError = () => `укажите цену от ${  MIN_PRICE[typeField.value]} до ${MAX_PRICE}`;
const validateGuestCapacity = () => {
  const check = roomsCapacityMap[roomsField.value];
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
  if (isValid) {
    fetch('https://26.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    ).then(resetForm()).then();
  }
}
);

typeField.addEventListener('change', () => {
  priceField.placeholder = MIN_PRICE[typeField.value];
} );
checktimeField.addEventListener('change', (evt) => {
  for (const input of timeSelectFields) {
    if (input !== evt.target) {
      input.value = evt.target.value;
    }}});
