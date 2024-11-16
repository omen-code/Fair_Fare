const apiKey = 'e2166e5815c945c4a8d964b3e4d0c1b0';

// Sidebar menu functions
function openMenu() {
    document.getElementById("sideMenu").style.left = "0";
}

function closeMenu() {
    document.getElementById("sideMenu").style.left = "-100%";
}

// Get coordinates for a given location
async function getCoordinates(address) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        if (data.results.length === 0) {
            throw new Error('No results found for the given address');
        }
        const { lat, lng } = data.results[0].geometry;
        return { latitude: lat, longitude: lng };
    } catch (error) {
        console.error('Error fetching the coordinates:', error);
        return null;
    }
}

// Get Ride function
async function getRide() {
    const pickup = document.getElementById("pickup").value;
    const destination = document.getElementById("destination").value;

    if (pickup && destination) {
        try {
            const pickupCoordinates = await getCoordinates(pickup);
            const destinationCoordinates = await getCoordinates(destination);

            if (pickupCoordinates && destinationCoordinates) {
                const pick_lat = pickupCoordinates.latitude;
                const pick_long = pickupCoordinates.longitude;
                const dst_lat = destinationCoordinates.latitude;
                const dst_long = destinationCoordinates.longitude;

                // Show alert and redirect upon confirmation
                const message = `Ride from ${pickup} to ${destination} is being processed.\nPickup Coordinates: ${pick_lat}, ${pick_long}\nDestination Coordinates: ${dst_lat}, ${dst_long}`;
                alert(message);

                // Redirect to confirmation.html with parameters
                const url = `confirmation.html?pickup=${encodeURIComponent(pickup)}&pick_lat=${pick_lat}&pick_long=${pick_long}&destination=${encodeURIComponent(destination)}&dst_lat=${dst_lat}&dst_long=${dst_long}`;
                window.location.href = url;
            } else {
                alert("Could not retrieve coordinates for the given addresses.");
            }
        } catch (error) {
            console.error('Error during getRide:', error);
            alert("An error occurred while processing your ride request.");
        }
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
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

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
