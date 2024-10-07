// Velg alle SVG-elementer med klassen "land" og legg til klikkhåndtering
document.querySelectorAll('.land').forEach(path => {
  path.addEventListener('click', function () {
    const map = document.getElementById('map');
    const overlay = document.getElementById('overlay'); // Velg overlay-elementet
    const rect = path.getBoundingClientRect();
    const mapRect = map.getBoundingClientRect();

    const zoomLevel = 5; // Hvor mye som zoomes inn
    const offsetX = (rect.left + rect.width / 2) - (mapRect.left + mapRect.width / 2);
    const offsetY = (rect.top + rect.height / 2) - (mapRect.top + mapRect.height / 2);

    // Sett transformering av kartet for å zoome inn
    map.style.transform = `scale(${zoomLevel}) translate(${-offsetX}px, ${-offsetY}px)`;

    // Vis overlay og posisjoner det over det klikkede området
    overlay.style.display = 'block';
    overlay.style.left = `${rect.left + window.scrollX}px`;
    overlay.style.top = `${rect.top + window.scrollY}px`;
    overlay.innerHTML = `<p>Du klikket på: ${path.getAttribute('title')}</p>`;
  });
});

// Legg til funksjonalitet for å tilbakestille zoom og skjule overlay
document.getElementById('zoom-out').addEventListener('click', function () {
  const map = document.getElementById('map');
  const overlay = document.getElementById('overlay');
  
  // Tilbakestill zoom og plassering
  map.style.transform = 'scale(1) translate(0, 0)';
  
  // Skjul overlay
  overlay.style.display = 'none';
});
