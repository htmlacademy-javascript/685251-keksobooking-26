import {changeState} from './util.js';
import {spawnCard} from './form.js';
import {initFilters} from './filter.js';

const MAX_BOOKING_ADDS = 10;
const TOKYO_LAT = 35.652832, TOKYO_LNG = 139.839478;
const ICON_SIZE = 52, BOOKING_ICON_SIZE = 40;
const addressField = document.querySelector('#address');
addressField.value = `${TOKYO_LAT} ${TOKYO_LNG}`;
// LEAFLET
const map = L.map('map-canvas').setView(
  {
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 10);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
map.on('load', changeState(1));
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_SIZE/2, ICON_SIZE],
});
const bookingPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [BOOKING_ICON_SIZE, BOOKING_ICON_SIZE],
  iconAnchor: [BOOKING_ICON_SIZE/2, BOOKING_ICON_SIZE],
});
const marker = L.marker(
  {
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
marker.on('drag', (evt) => {
  const latLng = evt.target.getLatLng();
  addressField.value = `${latLng.lat.toFixed(5)} ${latLng.lng.toFixed(5)}`;
});

marker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const createAdds = (element) => {
  const addMarker = L.marker(
    {
      lat: element.location.lat,
      lng: element.location.lng
    },
    {
      icon:bookingPinIcon,
    }
  );
  addMarker
    .addTo(markerGroup)
    .bindPopup(spawnCard(element));
};

const clearMarkers = () => {
  markerGroup.clearLayers();
};


const renderAdds = (data) => {
  clearMarkers();
  data.slice(0, MAX_BOOKING_ADDS).forEach((element) => createAdds(element));
};

function resetForm () {
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();
  map.closePopup();
  marker.setLatLng({lat:TOKYO_LAT, lng:TOKYO_LNG});
  addressField.value = `${TOKYO_LAT.toFixed(5)} ${TOKYO_LNG.toFixed(5)}`;
}

const onSuccessGetOffers = (offers) => {
  renderAdds(offers);
  initFilters(offers, renderAdds);
};

export {onSuccessGetOffers,renderAdds,resetForm, clearMarkers};
