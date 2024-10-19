document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay"); // Henter overlay-elementet
  const landElements = Array.from(document.querySelectorAll(".land")); // Henter alle land-elementer

  let currentIndex = 0; // Indeksen til det nåværende området

  function focusArea(index) {
    // Oppdaterer fargene på områdene
    landElements.forEach((el, i) => {
      el.style.fill = i === index ? "#f5f5f5" : "hsl(0, 0%, 14%)"; // Setter valgt område til blå, resten til rød
    });
/*     // Viser overlay med informasjon om det valgte området
    overlay.style.display = "block";
    overlay.innerHTML = `<p>Du ser på: ${landElements[index].getAttribute("title")}</p>`; */
  }

  // Legger til klikk-event listeners på hvert land-element
  landElements.forEach((el, index) => {
    el.addEventListener('click', () => {
      currentIndex = index; // Oppdaterer currentIndex til det klikkede området
      focusArea(currentIndex); // Fokuserer på det klikkede området
    });

    // Legger til hover-effekt
    el.addEventListener('mouseover', () => {
      el.style.fill = "#f5f5f5"; // Endrer farge ved hover
      overlay.style.display = "block";
      const infoArray = JSON.parse(el.getAttribute("data-info")); // Parse JSON string to array
      overlay.innerHTML = ` <h3>${el.getAttribute("title")}</h3>
                            <p>${infoArray.join("<br>")}</p>`; // Display array items in overlay
    });

    el.addEventListener('mouseout', () => {
      el.style.fill = index === currentIndex ? "#f5f5f5" : "hsl(0, 0%, 14%)"; // Tilbakestiller farge ved mouseout
    });
  });

  overlay.style.display = "none"; // Skjuler overlay ved start
});
