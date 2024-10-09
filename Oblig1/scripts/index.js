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

  function handleScroll(event) {
    // Oppdaterer currentIndex basert på scroll-retning
    currentIndex = (event.deltaY > 0)
      ? (currentIndex + 1) % landElements.length // Neste område hvis scroller ned
      : (currentIndex - 1 + landElements.length) % landElements.length; // Forrige område hvis scroller opp
    focusArea(currentIndex); // Fokuserer på det nye området
  }

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      if (!inThrottle) {
        func.apply(this, arguments); // Kaller funksjonen hvis ikke throttlet
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit); // Setter en timeout for throttling
      }
    };
  }

  // Legger til en wheel-event listener med throttling
  document.addEventListener("wheel", throttle(handleScroll, 300));

  overlay.style.display = "none"; // Skjuler overlay ved start
});
