import {resetForm} from './map.js';
const BASE_URL = 'https://26.javascript.pages.academy/keksobooking';
const Error = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = (onSuccess, onError, maxAdds) => {
  fetch(`${BASE_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onError(Error.GET_DATA);
    })
    .then((data) => {
      data.slice(0, maxAdds).forEach((element) => onSuccess(element));
    })
    .catch(() => {
      onError(Error.GET_DATA);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    BASE_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        resetForm();
      } else {
        onError(Error.GET_DATA);
      }
    })
    .catch(() => {
      onError(Error.GET_DATA);
    });
};

export {getData, sendData};
