import './form.js';
import './formvalid.js';
import {initMediaPreview} from './upload.js';

window.addEventListener('input', () => {
  initMediaPreview();
});
