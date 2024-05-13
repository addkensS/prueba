let map;
let routeCoordinates = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0}, // Centro inicial en el océano
    zoom: 8
  });

  // Mostrar ubicación actual al cargar la página
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: '¡Estás aquí!'
      });
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // El navegador no admite la geolocalización
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function startRoute() {
  // Start tracking user's location
  navigator.geolocation.watchPosition(updateRoute);
}

function updateRoute(position) {
  // Add new coordinate to route
  routeCoordinates.push({
    lat: position.coords.latitude,
    lng: position.coords.longitude
  });

  // Draw route on map
  drawRoute();
}

function drawRoute() {
  const routePath = new google.maps.Polyline({
    path: routeCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  routePath.setMap(map);
}

function endRoute() {
  // Stop tracking user's location
  navigator.geolocation.clearWatch();
  // Clear route
  routeCoordinates = [];
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  // Manejar errores de geolocalización
  // Puedes agregar aquí un mensaje o manejarlos según tus necesidades
}