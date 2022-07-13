import {changeState} from './util.js';
import {similarCards, spawnCard} from './form.js';
const addressField = document.querySelector('#address');
const [TOKYO_LAT, TOKYO_LNG] = [35.652832, 139.839478];
const [ICON_SIZE, BOOKING_ICON_SIZE] = [52, 40];
addressField.placeholder = `${TOKYO_LAT} ${TOKYO_LNG}`;
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
    .addTo(map)
    .bindPopup(spawnCard(element));
};

similarCards.forEach((element) => {
  createAdds(element);
});
