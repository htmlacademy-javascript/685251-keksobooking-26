import {getRandomArrayElement,
  getRandomPositiveInteger, getRandomPositiveFloat,
  getRandomElements, getShuffledRandomArray
} from './util.js';

const titles = ['Аппартаменты','Квартира', 'Комната', 'Вилла'];
const types = ['Дворец ', 'Квартира ', 'Дом ', 'Бунгало ', 'Отель'];
const checkTimes = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptions = ['Описание1', 'Описание2', 'Описание3'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const createBookingAd = (item, index) => {
  const location = [getRandomPositiveFloat(35.65000,35.70000,5), getRandomPositiveFloat(139.70000,139.80000,5)];
  return {
    location: {
      lat: location[0], //+число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
      lng: location[1], //+число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
    },
    author: { // +объект — описывает автора
      avatar: index < 9 ? `img/avatars/user0${index+1}.png` : `img/avatars/user${index+1}.png`, // +строка — адрес изображения
    },
    offer: { // +объект — содержит информацию об объявлении
      title: getRandomArrayElement(titles), // +строка — заголовок предложения
      address: `${location[0]}, ${location[1]}` , // +строка — адрес предложения
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
  };
};

export {createBookingAd};
