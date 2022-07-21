import './form.js';
import './formvalid.js';
import {getFetchError} from './util.js';
import {createAdds} from './map.js';
import {getData} from './api.js';

const MAX_BOOKING_ADDS = 10;
getData(createAdds, getFetchError, MAX_BOOKING_ADDS);
