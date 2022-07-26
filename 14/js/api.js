const BASE_URL = 'https://26.javascript.pages.academy/keksobooking';
const Error = {
  GET_DATA: 'ОШИБКА! Не удалось загрузить данные',
  SEND_DATA: 'ОШИБКА! Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = (onSuccess, onError) => {
  fetch(`${BASE_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onError(Error.GET_DATA);
    })
    .then((data) => {
      onSuccess(data);
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
      } else {
        onError(Error.SEND_DATA);
      }
    })
    .catch(() => {
      onError(Error.SEND_DATA);
    });
};

export {getData, sendData};
