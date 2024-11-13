document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay"); // Henter overlay-elementet
  const landElements = Array.from(document.querySelectorAll(".land")); // Henter alle land-elementer

  let currentIndex = 0; // Indeksen til det nåværende området
  let isAreaSelected = false; // Flagg for å spore om et område er valgt

  function focusArea(index) {
    // Oppdaterer fargene på områdene
    landElements.forEach((el, i) => {
      el.style.fill = i === index ? "#f5f5f5" : "hsl(0, 0%, 14%)"; // Setter valgt område til hvit, resten til mørk grå
    });
/*     // Viser overlay med informasjon om det valgte området
    overlay.style.display = "block";
    overlay.innerHTML = `<p>Du ser på: ${landElements[index].getAttribute("title")}</p>`; */
  }

  // Legger til klikk-event listeners på hvert land-element
  landElements.forEach((el, index) => {
    el.addEventListener('click', () => {
      currentIndex = index; // Oppdaterer currentIndex til det klikkede området
      isAreaSelected = true; // Setter flagget til true
      focusArea(currentIndex); // Fokuserer på det klikkede området

      // Viser overlay med informasjon om det valgte området
      overlay.style.display = "block";
      const infoArray = JSON.parse(el.getAttribute("data-info")); // Parser JSON-streng til array
      overlay.innerHTML = `<h3>${el.getAttribute("title")}</h3>
                           <p>${infoArray.join("<br>")}</p>`; // Viser array-elementer i overlay
    });

    // Legger til hover-effekt
    el.addEventListener('mouseover', () => {
      if (!isAreaSelected) { // Oppdaterer bare hvis ingen områder er valgt
        el.style.fill = "#f5f5f5"; // Endrer farge ved hover
        overlay.style.display = "block";
        const infoArray = JSON.parse(el.getAttribute("data-info")); // Parser JSON-streng til array
        overlay.innerHTML = `<h3>${el.getAttribute("title")}</h3>
                             <p>${infoArray.join("<br>")}</p>`; // Viser array-elementer i overlay
      }
    });

    el.addEventListener('mouseout', () => {
      if (!isAreaSelected) { // Oppdaterer bare hvis ingen områder er valgt
        el.style.fill = index === currentIndex ? "#f5f5f5" : "hsl(0, 0%, 14%)"; // Tilbakestiller farge ved mouseout
      }
    });
  });

  // Skjuler overlay når man klikker utenfor et område
  document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('land')) {
      isAreaSelected = false; // Tilbakestiller flagget
      overlay.style.display = "none"; // Skjuler overlay
      focusArea(currentIndex); // Tilbakestiller 
    }
  });

  overlay.style.display = "none"; // Skjuler overlay ved start
});
