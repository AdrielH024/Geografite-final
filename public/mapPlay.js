
var map = L.map("map").setView([-10.2, -53.12], 4);

function greet() {
  L.popup()
    .setLatLng(map.getCenter())
    .setContent(
      `Olá! Este é o GeoGrafite!
      <!--br>
      <img id ='logo' src='/public/logo.svg-->`
    )
    .openOn(map);
}

// Tenta buscar a localização do usuário (ver documentação)
// https://developer.mozilla.org/pt-BR/docs/Web/API/Geolocation/getCurrentPosition

navigator.geolocation.getCurrentPosition(
  (p) => {
    map.setView([p.coords.latitude, p.coords.longitude], 13);
    greet();
  },
  () => {
    map.setView([-14.24067, -54.38802], 4);
    greet();
  },
  { enableHighAccuracy: true }
);

// Adiciona os "ladrilhos" do OpenStreetMap

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 3,
  maxZoom: 19,
  zoomDelta: 0.5,
  attribution:
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

map.attributionControl.setPrefix(
  '<a href="https://leafletjs.com/">Leaflet</a>'
);

L.control.scale({ imperial: false, metric: true }).addTo(map);

function mark_map(artworks) {
  let bounds = map.getBounds();

  for (coordinates of artworks) {
    if (map.getBounds().contains(coordinates)) {
      L.marker(coordinates).bindPopup("Geografite").addTo(map);
    }
  }
}

function invoke() {
  let markings = [
    // TODO: Carregar coordenadas de um banco, junto com outros atributos
    [-21.791954, -48.175959], // Araraquara
    [-23.716984, -47.414229], // Piedade
    [-23.512667, -47.497606], // Sorocaba
  ];

  map.on("load", mark_map(markings));
}
