const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMG_WIDTH_HEIGHT = '70';
const adFormElement = document.querySelector('.ad-form');
const avatarPreviewElement = adFormElement.querySelector('.ad-form-header__preview img');
const avatarPreviewDefaultSrc = avatarPreviewElement.src;
const avatarChooserElement = adFormElement.querySelector('#avatar');
const photoPreviewElement = adFormElement.querySelector('.ad-form__photo');
const photoChooserElement = adFormElement.querySelector('#images');

const onAvatarUpdate = () => {
  const file = avatarChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const isValidType = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (isValidType) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
};

const onPhotoUpdate = () => {
  const imgEl = document.createElement('img');

  if (imgEl) {
    const file = photoChooserElement.files[0];
    const fileName = file.name.toLowerCase();

    const isValidType = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (isValidType) {
      imgEl.width = IMG_WIDTH_HEIGHT;
      imgEl.height = IMG_WIDTH_HEIGHT;
      imgEl.src = URL.createObjectURL(file);
      imgEl.alt = 'Фотография жилья';

      photoPreviewElement.innerHTML = '';
      photoPreviewElement.append(imgEl);
    }
  }
};

const initMediaPreview = () => {
  avatarChooserElement.addEventListener('change', onAvatarUpdate);
  photoChooserElement.addEventListener('change', onPhotoUpdate);
};
const resetAllPreviews = () => {
  avatarPreviewElement.src = avatarPreviewDefaultSrc;
  photoPreviewElement.innerHTML = '';
};

export {initMediaPreview,resetAllPreviews};
