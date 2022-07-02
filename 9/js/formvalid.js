const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error_text',
});

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {evt.preventDefault();}
});

// Валидация заголовка
function validateTitle(value) {
  return value.length >= 30 && value.length <= 100;
}
pristine.addValidator(form.querySelector('#title'), validateTitle, 'От 30 до 100 символов');

// Валидация цены и смена плейсхолдера
const priceField = form.querySelector('#price');
const typeField = form.querySelector('#type');
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
function validatePrice (value) {
  return value >= minPrice[typeField.value] && value <= 100000;
}
function getPriceFieldError () {
  return `укажите цену от ${  minPrice[typeField.value]} до 100000`;
}
pristine.addValidator(priceField, validatePrice, getPriceFieldError);

typeField.addEventListener('change', () => {
  priceField.placeholder = minPrice[typeField.value];
} );

// Валидация кол-во гостей относительно комнат
const roomsField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
const roomsCapacityMap = {
  1: ['1'],
  2: ['1','2'],
  3: ['1','2','3'],
  100: ['0']
};

function validateCapacity () {
  const check = roomsCapacityMap[roomsField.value];
  return check.includes(capacityField.value);
}
pristine.addValidator(capacityField, validateCapacity,
  'Гостей слишком много для такого количества комнат');
