document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("edit-btn");
  const editPicButton = document.getElementById("edit-pic-btn");
  const nameSpan = document.getElementById("name");
  const emailSpan = document.getElementById("email");
  const mobileSpan = document.getElementById("mobile");
  const profilePic = document.getElementById("profile-pic");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("close");
  const confirmButton = document.getElementById("confirm-btn");
  const changeButton = document.getElementById("change-btn");
  const preview = document.getElementById("preview");
  const messageDiv = document.getElementById("message");

  let selectedFile;

  editButton.addEventListener("click", () => {
    if (editButton.textContent === "Edit") {
      nameSpan.outerHTML = `<input type="text" id="name" value="${nameSpan.textContent}">`;
      emailSpan.outerHTML = `<input type="email" id="email" value="${emailSpan.textContent}">`;
      mobileSpan.outerHTML = `<input type="text" id="mobile" value="${mobileSpan.textContent}">`;
      
      editButton.textContent = "Save";
      editPicButton.style.display = "inline"; // Show the edit pic button
    } else {
      const newName = document.getElementById("name").value;
      const newEmail = document.getElementById("email").value;
      const newMobile = document.getElementById("mobile").value;

      nameSpan.textContent = newName;
      emailSpan.textContent = newEmail;
      mobileSpan.textContent = newMobile;

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

  changeButton.onclick = () => {
    modal.style.display = "none"; // Close the modal to select a new image
  };
});
