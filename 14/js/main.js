import './form.js';
import './formvalid.js';
import {getFetchError} from './util.js';
import {onSuccessGetOffers} from './map.js';
import {getData} from './api.js';
import {initMediaPreview} from './upload.js';

getData(onSuccessGetOffers, getFetchError);

window.addEventListener('DOMContentLoaded', () => {
  initMediaPreview();
});
