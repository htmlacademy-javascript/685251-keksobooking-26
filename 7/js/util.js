function getRandomPositiveInteger (a, b) { // Рандом
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
function getRandomPositiveFloat (a, b, digits = 1) { // Рандом с точкой
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}
function getRandomArrayElement(elements) { // случайный элемент массива
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}
function getRandomElements(array, length) { // получаем новый массив из массива с параметром длины
  return array.slice(getRandomPositiveInteger(0, length));
}
function getShuffledRandomArray(array) { // получаем шафлленый массив случайной длины из массива
  let newArray = [];
  const x = Math.floor(Math.random() * (array.length));
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  newArray = array.slice(x);
  return newArray;
}

const setData = function (element, valueToCheck, elementProperty = 'textContent', content) {
  if (valueToCheck.includes(undefined) || valueToCheck === undefined) {
    element.classList.add('hidden');
  } else {
    element[elementProperty] = content ? content : valueToCheck;
  }
};

const changeState = function (state) {
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
changeState(1);

export {setData, getRandomArrayElement,
  getRandomPositiveInteger, getRandomPositiveFloat,
  getRandomElements, getShuffledRandomArray
};
