function generateDetails() {
    const modes = [
        { 
            name: "Auto", 
            image: "C:\\Users\\malli\\Desktop\\Fair_Fare\\auto.jpeg" 
        },
        { 
            name: "Bike", 
            image: "https://via.placeholder.com/300x200?text=Bike" 
        },
        { 
            name: "Cab Mini", 
            image: "https://via.placeholder.com/300x200?text=Cab+Mini" 
        },
        { 
            name: "Cab XL", 
            image: "https://via.placeholder.com/300x200?text=Cab+XL" 
        }
    ];

    const services = ["Uber", "Ola", "Rapido"];
    const logos = {
        "Uber": "C:\\Users\\malli\\Desktop\\Fair_Fare\\uber.png",
        "Ola": "C:\\Users\\malli\\Desktop\\TT\\ola.png",
        "Rapido": "C:\\Users\\malli\\Desktop\\Fair_Fare\\rapido.png"
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
