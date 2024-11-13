document.addEventListener("DOMContentLoaded", () => {
  // Initialize the map and set its view to a specific location and zoom level
  const map = L.map("map").setView([60.472, 8.4689], 5); // Coordinates for Norway

  // Add a tile layer to the map (OpenStreetMap tiles)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Define regions with coordinates and information
  const regions = [
    {
      name: "Oslo",
      coords: [59.9139, 10.7522],
      info: "Politiansatte - 746, Politistudenter - 483, Politikapasitet - 700-900, Befolkning - 55 759",
    },
    {
      name: "Stavern",
      coords: [59.0, 10.0333],
      info: "Politiansatte - 500, Politistudenter - 300, Politikapasitet - 600-800, Befolkning - 30 000",
    },
    {
      name: "Bodø",
      coords: [67.2804, 14.4049],
      info: "Politiansatte - 400, Politistudenter - 200, Politikapasitet - 500-700, Befolkning - 50 000",
    },
  ];

  // Add markers for each region
  regions.forEach((region) => {
    const marker = L.marker(region.coords).addTo(map);
    marker.bindPopup(`<b>${region.name}</b><br>${region.info}`).openPopup();
  });

  // Add zoom and pan functionality
  const zoomToRegion = (coords) => {
    map.setView(coords, 10); // Zoom level 10 for a closer view
  };

  // Example of zooming to a specific region
  document.getElementById("scrollButton").addEventListener("click", () => {
    zoomToRegion(regions[0].coords); // Zoom to Oslo
  });

  document.getElementById("scrollUpButton").addEventListener("click", () => {
    zoomToRegion(regions[1].coords); // Zoom to Stavern
  });
});
