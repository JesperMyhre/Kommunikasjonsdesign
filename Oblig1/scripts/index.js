document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay"); // Henter overlay-elementet
  const landElements = Array.from(document.querySelectorAll(".land")); // Henter alle land-elementer

  let currentIndex = 0; // Indeksen til det nåværende området

  function focusArea(index) {
    // Oppdaterer fargene på områdene
    landElements.forEach((el, i) => {
      el.style.fill = i === index ? "blue" : "red"; // Setter valgt område til blå, resten til rød
    });
    // Viser overlay med informasjon om det valgte området
    overlay.style.display = "block";
    overlay.style.left = "10px";
    overlay.style.top = "10px";
    overlay.innerHTML = `<p>Du ser på: ${landElements[index].getAttribute("title")}</p>`;
  }

  // Legger til klikk-event listeners på hvert land-element
  landElements.forEach((el, index) => {
    el.addEventListener('click', () => {
      currentIndex = index; // Oppdaterer currentIndex til det klikkede området
      focusArea(currentIndex); // Fokuserer på det klikkede området
    });
  });

  overlay.style.display = "none"; // Skjuler overlay ved start
});
