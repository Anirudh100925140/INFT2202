document.addEventListener("DOMContentLoaded", () => {
  const packagesContainer = document.getElementById("packages");

  const defaultServices = {
    silver: {
      title: "Silver Package (Starting $150)",
      items: [
        "Complete Vacuum (Carpet etc.)",
        "Shampoo Floor Mats",
        "Complete Interior Detail",
        "Hand Wash Exterior",
        "Door Jams Cleaned",
        "Windows Cleaned",
        "Tire Shine"
      ]
    },
    gold: {
      title: "Gold Package (Starting $250)",
      items: [
        "Complete Vacuum (Carpet etc.)",
        "Shampoo Floor Mats",
        "Complete Interior Detail",
        "Hand Wash Exterior",
        "Door Jams Cleaned",
        "Windows Cleaned",
        "Tire Shine",
        "Salt Removal",
        "Pet Hair Removal (Depends on the condition)",
        "Vinyl Conditioner/Leather Conditioner",
        "Ceramic Wash",
        "Quick Polish"
      ]
    },
    addons: {
      title: "Add-Ons",
      items: [
        "Graphene Spray-on Wax",
        "Engine Bay Wash",
        "Headlight Restoration",
        "Ceramic Coating",
        "Paint Correction"
      ]
    }
  };

  const savedServices = JSON.parse(localStorage.getItem("gline_services")) || defaultServices;

  Object.values(savedServices).forEach(service => {
    const div = document.createElement("div");
    div.className = "package";
    div.innerHTML = `
      <h2>${service.title}</h2>
      <ul>${service.items.map(item => `<li>${item}</li>`).join("")}</ul>
    `;
    packagesContainer.appendChild(div);
  });
});
