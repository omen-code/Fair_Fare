// Toggle slide-out menu
function toggleMenu() {
  const menu = document.getElementById("slide-menu");
  menu.classList.toggle("open");
}

// Close slide-out menu when 'X' is clicked
document.getElementById("close-icon").addEventListener("click", function () {
  document.getElementById("slide-menu").classList.remove("open");
});

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

  pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput);
  destinationAutocomplete = new google.maps.places.Autocomplete(
    destinationInput
  );
}

// Mock fare calculation function
document
  .getElementById("ride-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get pickup and destination values
    const pickup = document.getElementById("pickup").value;
    const destination = document.getElementById("destination").value;

    // Simple mock fare calculation
    if (pickup && destination) {
      // Mock: fare is based on a fixed rate per km (just an example logic)
      const distance = Math.random() * 20 + 5; // Mock distance between 5 to 25 km
      const fare = (distance * 2).toFixed(2); // Mock fare calculation

      // Update the fare estimate
      document.getElementById("fare").textContent = `$${fare}`;
    } else {
      alert("Please enter both pickup and destination locations.");
    }
  });

// Google Maps API callback
window.initMap = initMap;
