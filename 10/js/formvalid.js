const form = document.querySelector('.ad-form');
const priceField = form.querySelector('#price');
const typeField = form.querySelector('#type');
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const roomsField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
const roomsCapacityMap = {
  1: ['1'],
  2: ['1','2'],
  3: ['1','2','3'],
  100: ['0']
};
const checktimeField = form.querySelector('.ad-form__element--time');
const timeSelectFields = checktimeField.querySelectorAll('select');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error_text',
});
const validateTitle = (value) => value.length >= 30 && value.length <= 100;
const validatePrice = (value) => value >= minPrice[typeField.value] && value <= 100000;
const getPriceFieldError = () => `укажите цену от ${  minPrice[typeField.value]} до 100000`;
const validateCapacity = () => {
  const check = roomsCapacityMap[roomsField.value];
  return check.includes(capacityField.value);
};
form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {evt.preventDefault();}
});
typeField.addEventListener('change', () => {
  priceField.placeholder = minPrice[typeField.value];
} );
checktimeField.addEventListener('change', (evt) => {
  for (const input of timeSelectFields) {
    if (input !== evt.target) {
      input.value = evt.target.value;
    }}});
pristine.addValidator(form.querySelector('#title'), validateTitle, 'От 30 до 100 символов');
pristine.addValidator(priceField, validatePrice, getPriceFieldError);
pristine.addValidator(capacityField, validateCapacity,
  'Гостей слишком много для такого количества комнат');
