const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMG_WIDTH_HEIGHT = '70';
const adForm = document.querySelector('.ad-form');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const avatarPreviewDefaultSrc = avatarPreview.src;
const avatarChooser = adForm.querySelector('#avatar');
const photoPreview = adForm.querySelector('.ad-form__photo');
const photoChooser = adForm.querySelector('#images');

const onAvatarUpdate = () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const isValidType = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (isValidType) {
    avatarPreview.src = URL.createObjectURL(file);
  }
};

const onPhotoUpdate = () => {
  const imgEl = document.createElement('img');

  if (imgEl) {
    const file = photoChooser.files[0];
    const fileName = file.name.toLowerCase();

    const isValidType = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (isValidType) {
      imgEl.width = IMG_WIDTH_HEIGHT;
      imgEl.height = IMG_WIDTH_HEIGHT;
      imgEl.src = URL.createObjectURL(file);
      imgEl.alt = 'Фотография жилья';

      photoPreview.innerHTML = '';
      photoPreview.append(imgEl);
    }
  }
};

const initMediaPreview = () => {
  avatarChooser.addEventListener('change', onAvatarUpdate);
  photoChooser.addEventListener('change', onPhotoUpdate);
};
const resetAllPreviews =() => {
  avatarPreview.src = avatarPreviewDefaultSrc;
  photoPreview.innerHTML = '';
};

export { initMediaPreview, resetAllPreviews };
