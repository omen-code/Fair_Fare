const addressSection = document.getElementById("address-section");
const locationsList = document.getElementById("locations-list");
let addressFields = 0;

// Function to add a new address input field
function addAddressField() {
  addressFields++;
  const group = document.createElement("div");
  group.className = "address-input-group";
  group.id = `group-${addressFields}`;
  group.innerHTML = `
        <input type="text" placeholder="Address Type (e.g., Cafe, Gym)" id="type-${addressFields}" />
        <input type="text" placeholder="Enter Address" id="address-${addressFields}" />
        <button onclick="saveAddress(${addressFields})">&#10003;</button>
    `;
  addressSection.appendChild(group);
}

// Function to save an address
function saveAddress(id) {
  const type = document.getElementById(`type-${id}`).value.trim();
  const address = document.getElementById(`address-${id}`).value.trim();

  if (!type || !address) {
    alert("Both address type and address are required!");
    return;
  }

  const listItem = document.createElement("li");
  listItem.innerHTML = `
        <span>${type}: ${address}</span>
        <button class="delete-button" onclick="deleteAddress(this)">&#x2716;</button>
    `;

  locationsList.appendChild(listItem);

  // Remove the input fields after saving
  document.getElementById(`group-${id}`).remove();
}

// Function to delete an address
function deleteAddress(button) {
  button.parentElement.remove();
}

function saveAddress(id) {
  const type = document.getElementById(`type-${id}`).value.trim();
  const address = document.getElementById(`address-${id}`).value.trim();

  if (!type || !address) {
    alert("Both address type and address are required!");
    return;
  }

  const addressContainer = document.getElementById("address-container");

  const item = document.createElement("div");
  item.className = "address-item";
  item.innerHTML = `
        <span>${type}: ${address}</span>
        <button class="arrow" onclick="selectAddress('${type}: ${address}')">></button>
        <button class="delete-button" onclick="deleteAddress(this)">&#x2716;</button>
    `;

  addressContainer.appendChild(item);

  // Remove the input fields after saving
  document.getElementById(`group-${id}`).remove();
}

// Function to handle arrow click
function selectAddress(selectedAddress) {
  // Store the address in local storage
  localStorage.setItem("selectedAddress", selectedAddress);

  // Redirect to home.html
  window.location.href = "home.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // Add click event listener to the arrow buttons
  const selectAddressButtons = document.querySelectorAll(".select-address");

  selectAddressButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Prevent the default behavior of the button (e.g., redirecting)
      event.preventDefault();

      // Get the address associated with the clicked button
      const address = button.previousElementSibling.textContent; // Assuming the address is in a <span> element

      // Store the address in localStorage
      localStorage.setItem("selectedAddress", address);

      // Optional: If you want to navigate to a different page after saving the address, do it after the storage
      // window.location.href = 'destinationPage.html';  // Uncomment if you want to navigate after setting the address
    });
  });

  // If an address was stored, auto-fill it in the destination input field
  const selectedAddress = localStorage.getItem("selectedAddress");
  if (selectedAddress) {
    const destinationInput = document.getElementById("destination-input");
    destinationInput.value = selectedAddress;

    // Clear localStorage after using the address (optional)
    localStorage.removeItem("selectedAddress");
  }
});
