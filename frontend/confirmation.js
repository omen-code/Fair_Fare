function generateDetails() {
  const modes = [
    {
      name: "Auto",
      image: "taxiauto.png",
    },
    {
      name: "Bike",
      image: "taxibike.webp",
    },
    {
      name: "Cab Mini",
      image: "minicar.jpg",
    },
    {
      name: "Cab",
      image: "car picture.png",
    },
  ];

  const services = ["Uber", "Ola", "Rapido"];
  const logos = {
    Uber: "uber_icon.jpg",
    Ola: "ola_icon.jpg",
    Rapido: "rapido_icon.jpg",
  };

  const comparisonSection = document.querySelector(".comparison-section");

  // Populate transport options
  modes.forEach((mode, index) => {
    document.getElementById(`mode${index}`).innerHTML = `
            <img src="${mode.image}" alt="${mode.name}" class="ride-image">
            <h3>${mode.name}</h3>
        `;

    // Populate comparison section for this mode
    services.forEach((service) => {
      const comparisonPrice = Math.floor(Math.random() * 200) + 50;
      const comparisonETA = Math.floor(Math.random() * 15) + 1;

      const card = document.createElement("div");
      card.classList.add("comparison-card");
      card.innerHTML = `
                <img src="${logos[service]}" alt="${service} Logo" class="service-logo">
                <p>Price: ₹${comparisonPrice}</p>
                <p>ETA: ${comparisonETA} min</p>
            `;
      comparisonSection.appendChild(card);
    });
  });
}
