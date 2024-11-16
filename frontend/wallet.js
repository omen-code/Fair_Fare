// Wallet balance initialization
let balance = 0;

// Function to update the balance displayed
function updateBalance() {
  document.getElementById("balance").textContent = balance.toFixed(2);
}

// Open the payment modal
function openPaymentModal() {
  const amount = parseFloat(document.getElementById("amount").value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount!");
    return;
  }

  // Show the modal
  document.getElementById("paymentModal").style.display = "flex";
}

// Close the payment modal
function closeModal() {
  document.getElementById("paymentModal").style.display = "none";
}

// Select the payment method
function selectPaymentMethod(method) {
  const amount = parseFloat(document.getElementById("amount").value);

  balance += amount; // Update balance
  updateBalance(); // Refresh balance display

  // Add transaction to history
  const transactionHistory = document.getElementById("transaction-history");
  const newTransaction = document.createElement("li");
  newTransaction.textContent = `Added ₹${amount.toFixed(2)} via ${method}`;
  transactionHistory.appendChild(newTransaction);

  // Clear input field and close the modal
  document.getElementById("amount").value = "";
  closeModal();
}

// Initialize balance on page load
updateBalance();

function completePayment() {
  const amount = parseFloat(document.getElementById("amount").value);

  if (isNaN(amount) || amount <= 0) {
    alert("Invalid payment amount!");
    return;
  }

  // Simulate payment completion
  balance += amount;
  updateBalance();

  // Add the transaction to the history
  const transactionHistory = document.getElementById("transaction-history");
  const newTransaction = document.createElement("li");
  newTransaction.textContent = `Added ₹${amount.toFixed(2)} via QR Payment`;
  transactionHistory.appendChild(newTransaction);

  // Reset input and close modal
  document.getElementById("amount").value = "";
  closeModal();
}
