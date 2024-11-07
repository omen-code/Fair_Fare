document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("edit-btn");
  const editPicButton = document.getElementById("edit-pic-btn");
  const nameSpan = document.getElementById("name");
  const emailSpan = document.getElementById("email");
  const mobileSpan = document.getElementById("mobile");
  const genderSpan = document.getElementById("gender");
  const emergencySpan = document.getElementById("emergency");
  const profilePic = document.getElementById("profile-pic");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("close");
  const confirmButton = document.getElementById("confirm-btn");
  const cancelButton = document.getElementById("cancel-btn");
  const preview = document.getElementById("preview");
  const messageDiv = document.getElementById("message");

  let selectedFile;

  editButton.addEventListener("click", () => {
    if (editButton.textContent === "Edit") {
      nameSpan.outerHTML = `<input type="text" id="name" value="${nameSpan.textContent}">`;
      emailSpan.outerHTML = `<input type="email" id="email" value="${emailSpan.textContent}">`;
      mobileSpan.outerHTML = `<input type="tel" id="mobile" value="${mobileSpan.textContent}">`;
      emergencySpan.outerHTML = `<input type="tel" id="emergency" value="${emergencySpan.textContent}">`;

      const genderValue = genderSpan.textContent.trim();
      genderSpan.outerHTML = `
      <div id="gender">
        <label><input type="radio" name="gender" value="Male" ${
          genderValue === "Male" ? "checked" : ""
        }> Male</label>
        <label><input type="radio" name="gender" value="Female" ${
          genderValue === "Female" ? "checked" : ""
        }> Female</label>
        <label><input type="radio" name="gender" value="Other" ${
          genderValue === "Other" ? "checked" : ""
        }> Other</label>
      </div>
    `;

      editButton.textContent = "Save";
      editPicButton.style.display = "inline"; // Show the edit pic button
    } else {
      const newName = document.getElementById("name").value;
      const newEmail = document.getElementById("email").value;
      const newMobile = document.getElementById("mobile").value;
      const newemergency = document.getElementById("emergency").value;
      const newGender = document.querySelector(
        'input[name="gender"]:checked'
      ).value;

      nameSpan.textContent = newName;
      emailSpan.textContent = newEmail;
      mobileSpan.textContent = newMobile;
      emergencySpan.textContent = newemergency;
      genderSpan.outerHTML = `<span id="gender">${newGender}</span>`; // Restore span with new value

      editButton.textContent = "Edit";
      editPicButton.style.display = "none"; // Hide the edit pic button
      messageDiv.textContent = "Profile updated successfully!";
    }
  });

  editPicButton.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.src = e.target.result; // Show preview
          modal.style.display = "block"; // Open modal
          selectedFile = file; // Save selected file
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click(); // Trigger file input click
  });

  closeModal.onclick = () => {
    modal.style.display = "none"; // Close the modal
  };

  confirmButton.onclick = () => {
    if (selectedFile) {
      const newProfilePicURL = URL.createObjectURL(selectedFile);
      profilePic.src = newProfilePicURL; // Update the profile picture
      modal.style.display = "none"; // Close the modal
      messageDiv.textContent = "Profile picture updated successfully!";
    }
  };

  cancelButton.onclick = () => {
    modal.style.display = "none"; // Close the modal to select a new image
  };
});
