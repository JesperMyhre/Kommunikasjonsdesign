document.addEventListener("DOMContentLoaded", () => {
  const map = document.getElementById("map");
  const overlay = document.getElementById("overlay");
  const landElements = Array.from(document.querySelectorAll(".land"));

  let currentIndex = 0; // Startindeks for områdene
  let isThrottled = false; // Variabel for å håndtere throttling
  let currentZoom = 1; // Start zoomnivå
  let translateY = 0; // Start vertikal forskyvning
  let mapCenterX = 0; // Kartets midtpunkt for horisontal forskyvning

  // Juster `mapCenterX` for å sikre at kartet holder seg midtstilt i horisontal retning
  function updateMapCenter() {
    const mapRect = map.getBoundingClientRect();
    const windowCenterX = window.innerWidth / 2;
    mapCenterX = windowCenterX - mapRect.width / 2;
  }

  // Funksjon som oppdaterer visning basert på gitt indeks
  function focusArea(index) {
    if (index < 0 || index >= landElements.length) return;

    const targetElement = landElements[index];

    // Øk vertikal forskyvning og zoomnivå for å flytte kartet nedover
    translateY -= 50; // Flytt nedover ved hvert område
    currentZoom += 0.3; // Øk zoomnivået gradvis

    // Oppdater transformering av kartet for å zoome og flytte nedover
    map.style.transition = "transform 0.5s ease";
    map.style.transform = `translate(${mapCenterX}px, ${translateY}px) scale(${currentZoom})`;

    // Oppdater overlay for det valgte området, plasser øverst på skjermen
    overlay.style.display = "block";
    overlay.style.left = `10px`;
    overlay.style.top = `10px`;
    overlay.innerHTML = `<p>Du ser på: ${targetElement.getAttribute("title")}</p>`;
  }

  // Funksjon som håndterer rulle-hendelsen (musehjulet) med throttling
  function handleScroll(event) {
    if (isThrottled) return; // Hvis throttled, returner tidlig

    // Angi en grense på hvor ofte vi kan kjøre rulle-funksjonen
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false; // Fjern throttling etter 300 ms
    }, 300);

    if (event.deltaY > 0) {
      // Hvis man blar nedover, vis overlay og gå til neste område
      currentIndex = (currentIndex + 1) % landElements.length; // Neste område
      overlay.style.display = "block"; // Vis overlay
      focusArea(currentIndex); // Oppdater visningen når man blar nedover
    } else if (event.deltaY < 0 && currentIndex > 0) {
      // Hvis man blar oppover, tilbakestill zoom og posisjon sakte (men ikke før første område)
      currentIndex = (currentIndex - 1 + landElements.length) % landElements.length; // Forrige område
      currentZoom = Math.max(1, currentZoom - 0.3); // Reduser zoomnivået, men ikke lavere enn 1
      translateY += 50; // Flytt oppover

      map.style.transition = "transform 0.5s ease";
      map.style.transform = `translate(${mapCenterX}px, ${translateY}px) scale(${currentZoom})`;
      overlay.style.display = "none"; // Skjul overlay ved oppover scrolling
    }
  }

  // Oppdater midtpunktet for kartet ved lasting av siden
  updateMapCenter();

  // Legg til en `wheel`-event listener på `document`
  document.addEventListener("wheel", handleScroll);

  // Oppdater midtpunktet når vinduet endrer størrelse
  window.addEventListener("resize", updateMapCenter);

  // Startvisning på første område uten overlay
  overlay.style.display = "none"; // Skjul overlay ved start

  // Legg til funksjonalitet for å tilbakestille zoom og skjule overlay når man trykker på "zoom-out"
  document.getElementById("zoom-out").addEventListener("click", () => {
    // Tilbakestill scroll og visning
    currentZoom = 1; // Tilbakestill zoomnivå
    translateY = 0; // Tilbakestill vertikal forskyvning
    updateMapCenter(); // Oppdater horisontal forskyvning for midtstilt kart
    map.style.transition = "transform 0.5s ease"; // Legg til jevn overgang for tilbakestilling
    map.style.transform = `scale(1) translate(${mapCenterX}px, 0px)`;
    overlay.style.display = "none"; // Skjul overlay
    currentIndex = 0; // Tilbakestill indeks til startposisjon
  });
});
