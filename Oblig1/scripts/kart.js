document.addEventListener("DOMContentLoaded", () => {
  // Initialize the map and set its view to a specific location and zoom level
  const map = L.map("map").setView([60.472, 8.4689], 5); // Coordinates for Norway

  // Add a tile layer to the map (OpenStreetMap tiles)
  L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}",
    {
      minZoom: 0,
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: "png",
    }
  ).addTo(map);

  // Define regions with coordinates and information
  const regions = [
    {
      name: "Oslo",
      coords: [59.9139, 10.7522],
      info: "Politiansatte - 3306, Politistudenter - 904, Politikapasitet - 3000-3400, Befolkning - 717 710",
    },
    {
      name: "Stavern",
      coords: [59.0, 10.0333],
      info: "Politiansatte - 1339, Politistudenter - 347, Politikapasitet - 350-430, Befolkning - 5902",
    },
    {
      name: "Bodø",
      coords: [67.2804, 14.4049],
      info: "Politiansatte - 746, Politistudenter - 483, Politikapasitet - 700-900, Befolkning - 55 759",
    },
  ];

  // Add markers for each region
  regions.forEach((region) => {
    L.marker(region.coords)
      .addTo(map)
      .bindPopup(`<b>${region.name}</b><br>${region.info}`)
      .openPopup();
  });
});
