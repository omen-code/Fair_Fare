// Sidebar menu functions
function openMenu() {
  document.getElementById("sideMenu").style.left = "0";
}

function closeMenu() {
  document.getElementById("sideMenu").style.left = "-100%";
}

// Get Ride function
function getRide() {
  const pickup = document.getElementById("pickup").value;
  const destination = document.getElementById("destination").value;
  if (pickup && destination) {
    alert(`Ride from ${pickup} to ${destination} is being processed.`);
  } else {
    alert("Please enter both pickup and destination locations.");
  }
}

// Initialize the map on page load
document.addEventListener("DOMContentLoaded", function () {
  // Create the map and center it on specific coordinates
  const map = L.map("map").setView([12.9716, 77.5946], 13); // Example coordinates for Bangalore

  // Add OpenStreetMap tiles as the base layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Check if GoogleMutant should be added, but skip for now
  // Uncomment below if you wish to re-enable GoogleMutant after verifying basic map display
  /*
  try {
    const googleLayer = L.gridLayer.googleMutant({
      maxZoom: 20,
      type: "roadmap",
    });
    googleLayer.addTo(map);
  } catch (error) {
    console.error("Google Maps layer failed to load:", error);
  }
  */

  // Add a custom marker
  const customIcon = L.icon({
    iconUrl: "map_icon.png", // Make sure this icon path is correct
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  // Example marker at the map center
  L.marker([12.9716, 77.5946], { icon: customIcon })
    .addTo(map)
    .bindPopup("Your Location")
    .openPopup();

  // Refresh the map size to handle any layout shifts
  map.whenReady(function () {
    map.invalidateSize();
  });

  // Event listener to resize the map if the window size changes
  window.addEventListener("resize", () => {
    map.invalidateSize();
  });
});
