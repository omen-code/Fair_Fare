function openMenu() {
  document.getElementById("sideMenu").style.left = "0";
}

function closeMenu() {
  document.getElementById("sideMenu").style.left = "-100%";
}

function getRide() {
  const destination = document.getElementById("destination").value;
  if (destination) {
    alert(`Ride to ${destination} is being processed.`);
  } else {
    alert("Please enter a destination.");
  }
}

// Initialize the map
var map = L.map("map").setView([12.9716, 77.5946], 13); // Example coordinates (Bangalore)

// Add Google Maps tiles using the GoogleMutant plugin
var googleLayer = L.gridLayer.googleMutant({
  maxZoom: 20,
  type: "roadmap", // Use 'satellite', 'terrain', or 'hybrid' for other map types
});

// Add the Google layer to the map
googleLayer.addTo(map);

// Ensure the map resizes properly if the page layout changes
map.invalidateSize();

// Google Maps API integration
let map;
let pickupAutocomplete, destinationAutocomplete;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  // Autocomplete fields for Pickup and Destination
  const pickupInput = document.getElementById("pickup");
  const destinationInput = document.getElementById("destination");
      h 
  pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput);
  destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
}
