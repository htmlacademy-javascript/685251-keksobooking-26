const titles = ['Аппартаменты','Квартира', 'Комната', 'Вилла'];
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkTimes = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptions = ['Описание1', 'Описание2', 'Описание3'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const locationLL = {
  lat: getRandomPositiveFloat(35.65000,35.70000,5),
  lng: getRandomPositiveFloat(139.70000,139.80000,5),
};

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

const createBookingAd = (item, index) => ({
  author: { // +объект — описывает автора
    avatar: index < 9 ? `img/avatars/user0${index+1}.png` : `img/avatars/user${index+1}.png`, // +строка — адрес изображения
  },
  offer: { // +объект — содержит информацию об объявлении
    title: getRandomArrayElement(titles), // +строка — заголовок предложения
    address: `${locationLL.lat}, ${locationLL.lng}` , // +строка — адрес предложения
    price: getRandomPositiveInteger(100,10000), // +число стоимость. Случайное целое положительное число.
    type: getRandomArrayElement(types), // +строка — одно из пяти фиксированных значений
    rooms: getRandomPositiveInteger(1,10), // +число — количество комнат. Случайное целое положительное число.
    guests: getRandomPositiveInteger(1,10), // +число — количество гостей, которое можно разместить. Случайное целое положительное число.
    checkin: getRandomArrayElement(checkTimes), //+ строка — одно из трёх фиксированных значений
    checkout: getRandomArrayElement(checkTimes), //+ строка — одно из трёх фиксированных значений
    features: getShuffledRandomArray(features), // ++массив строк — массив случайной длины из значений, Значения не должны повторяться.
    description: getRandomArrayElement(descriptions), //+строка — описание помещения
    photos: getRandomElements(photos, photos.length - 1), // ++массив строк — массив случайной длины из значений
  },
  location: {
    lat: parseFloat(getRandomPositiveFloat(35.65000,35.70000,5)), //+число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
    lng: parseFloat(getRandomPositiveFloat(139.70000,139.80000,5)), //+число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
  }
});

const bookingAds = Array.from({length: 10}, createBookingAd);
// eslint-disable-next-line no-console
console.log(bookingAds);
