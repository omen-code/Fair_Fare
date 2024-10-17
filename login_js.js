let generatedOTP; // Variable to store generated OTP

// Toggle between login, signup, and forgot password sections
document.getElementById("sign-up-link").addEventListener("click", function () {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("signup-section").style.display = "block";
});

document
  .getElementById("forgot-password-link")
  .addEventListener("click", function () {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("forgot-password-section").style.display = "block";
  });

document.getElementById("back-to-login").addEventListener("click", function () {
  document.getElementById("signup-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
});

document
  .getElementById("back-to-login-from-forgot")
  .addEventListener("click", function () {
    document.getElementById("forgot-password-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
  });

// Login form validation
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("login-input").value;
    const password = document.getElementById("login-password").value;

    let isValid = true;

    // Check if the input is a valid email or mobile number
    if (!validateEmail(input) && !validateMobile(input)) {
      showErrorMessage(
        "login-error-message",
        "Please enter a valid email or mobile number."
      );
      isValid = false;
    }

    if (password.length < 6) {
      showErrorMessage(
        "login-error-message",
        "Password must be at least 6 characters long."
      );
      isValid = false;
    }

    if (isValid) {
      // Perform login logic
      clearErrorMessage("login-error-message");
      console.log("Login successful");
      // Here you would typically redirect the user or perform an AJAX call to log them in
    }
  });

// Signup form validation
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const mobile = document.getElementById("signup-mobile").value;
    const password = document.getElementById("signup-password").value;

    if (name.length < 3) {
      showErrorMessage(
        "signup-error-message",
        "Name must be at least 3 characters long."
      );
      return;
    }

    if (!validateEmail(email)) {
      showErrorMessage(
        "signup-error-message",
        "Please enter a valid email address."
      );
      return;
    }

    if (!validateMobile(mobile)) {
      showErrorMessage(
        "signup-error-message",
        "Please enter a valid mobile number."
      );
      return;
    }

    if (password.length < 6) {
      showErrorMessage(
        "signup-error-message",
        "Password must be at least 6 characters long."
      );
      return;
    }

    // Perform signup logic
    clearErrorMessage("signup-error-message");
    console.log("Signup successful");
    // Here you would typically redirect the user or perform an AJAX call to create their account
  });

// Forgot password form submission
document
  .getElementById("forgot-password-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("forgot-email").value;
    const mobile = document.getElementById("forgot-mobile").value;

    if (!validateEmail(email)) {
      showErrorMessage(
        "forgot-error-message",
        "Please enter a valid email address."
      );
      return;
    }

    if (!validateMobile(mobile)) {
      showErrorMessage(
        "forgot-error-message",
        "Please enter a valid mobile number."
      );
      return;
    }

    // Simulate sending OTP
    generatedOTP = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
    console.log(`OTP sent to ${email} and ${mobile}: ${generatedOTP}`); // Replace with actual sending logic

    // Show OTP input section
    document.getElementById("forgot-password-section").style.display = "none";
    document.getElementById("otp-section").style.display = "block";
    clearErrorMessage("forgot-error-message");
  });

// OTP verification
document
  .getElementById("verify-otp-btn")
  .addEventListener("click", function () {
    const otpInput = document.getElementById("otp-input").value;

    if (otpInput === generatedOTP.toString()) {
      clearErrorMessage("otp-error-message");
      alert("OTP verified successfully! You can now reset your password."); // Add reset password logic here
      // Optionally redirect or show reset password form
    } else {
      showErrorMessage("otp-error-message", "Invalid OTP. Please try again.");
    }
  });

// Utility functions
function showErrorMessage(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearErrorMessage(elementId) {
  document.getElementById(elementId).textContent = "";
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateMobile(mobile) {
  const re = /^[0-9]{10}$/; // Adjust for your mobile number format
  return re.test(mobile);
}
