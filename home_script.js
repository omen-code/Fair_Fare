function openMenu() {
  document.getElementById("sideMenu").style.left = "0";
}

function closeMenu() {
  document.getElementById("sideMenu").style.left = "-100%";
}

function getRide() {
  const pickup = document.getElementById("pickup").value;
  const destination = document.getElementById("destination").value;
  if (pickup && destination) {
    alert(`Ride from ${pickup} to ${destination} is being processed.`);
  } else {
    alert("Please enter both pickup and destination locations.");
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

// Google Maps API integration for autocomplete
let pickupAutocomplete, destinationAutocomplete;

function initAutocomplete() {
  const pickupInput = document.getElementById("pickup");
  const destinationInput = document.getElementById("destination");

  // Initialize autocomplete for both pickup and destination fields
  pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput);
  destinationAutocomplete = new google.maps.places.Autocomplete(
    destinationInput
  );

  // Bias the autocomplete results to the map's viewport
  pickupAutocomplete.bindTo("bounds", map);
  destinationAutocomplete.bindTo("bounds", map);
}

document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([12.9716, 77.5946], 13);

  // Load and display OpenStreetMap tiles as a backup if GoogleMutant fails
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  try {
    // Google Maps tiles using GoogleMutant plugin
    var googleLayer = L.gridLayer.googleMutant({
      maxZoom: 20,
      type: "roadmap",
    });
    googleLayer.addTo(map); // Add the Google layer to the map
  } catch (error) {
    console.error("Google Maps layer failed to load:", error);
  }

  // Adjust map display when page layout changes
  map.invalidateSize();
});
