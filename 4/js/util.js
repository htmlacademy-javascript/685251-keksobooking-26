// eslint-disable-next-line no-console
console.log('location module active!');


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
export {getRandomArrayElement,
  getRandomPositiveInteger, getRandomPositiveFloat,
  getRandomElements, getShuffledRandomArray
};
