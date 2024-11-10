document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const sections = document.querySelectorAll(".infoContainerSmall");
  const scrollButton = document.getElementById("scrollDown");
  const scrollUpButton = document.getElementById("scrollUp");
  const progressBar = document.getElementById("progressBar");
  const map = document.getElementById("map");
  const pulseContainer = document.createElement("div");
  pulseContainer.id = "pulseContainer";
  map.appendChild(pulseContainer);

  const regions = [
    {
      id: "NO-03",
      title: "Oslo",
      origin: "-5% 85%",
      pulseCoords: { x: "9.9%", y: "78.3%" },
    },
    {
      id: "NO-07",
      title: "Stavern",
      origin: "-5% 95%",
      pulseCoords: { x: "8.8%", y: "83%" },
    },
    {
      id: "NO-18",
      title: "Bodø",
      origin: "12% 35%",
      pulseCoords: { x: "16.4%", y: "35.3%" },
    },
  ];

  let currentSectionIndex = -1;
  let currentRegionIndex = 0;
  let mapScrollCount = 0;

  // Create progress dots starting from the first section (index 0)
  sections.forEach((section, index) => {
    const dot = document.createElement("div");
    dot.classList.add("progressDot");
    progressBar.appendChild(dot);
  });

  const progressDots = document.querySelectorAll(".progressDot");

  function updateProgressBar() {
    progressDots.forEach((dot, index) => {
      if (index === currentSectionIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function updateOverlay(region) {
    const regionElement = document.getElementById(region.id);
    if (regionElement) {
      const infoArray = JSON.parse(regionElement.getAttribute("data-info"));
      overlay.innerHTML = `<h3>${region.title}</h3><p>${infoArray.join(
        "<br>"
      )}</p>`;
      overlay.classList.add("visible");
    }
  }

  function highlightRegion(region) {
    map
      .querySelectorAll(".land")
      .forEach((el) => el.classList.remove("highlighted"));
    const regionElement = document.getElementById(region.id);
    if (regionElement) {
      regionElement.classList.add("highlighted");
    }
  }

  function zoomToRegion(region) {
    map.style.transformOrigin = region.origin;
    map.style.transform = "scale(3)"; // Adjust the scale as needed
    highlightRegion(region);
  }

  function createPulseEffect(coords) {
    pulseContainer.innerHTML = ""; // Clear any existing pulse effects
    const pulse = document.createElement("div");
    pulse.classList.add("pulse");
    pulse.style.left = coords.x;
    pulse.style.top = coords.y;
    pulseContainer.appendChild(pulse);
  }

  scrollButton.addEventListener("click", () => {
    // Show the progress bar when the button is clicked
    progressBar.style.display = "flex";

    // Check if the map is currently in view
    const mapInView = sections[currentSectionIndex]?.id === "map-container";

    if (mapInView && mapScrollCount < 3) {
      // Update the overlay with the next region's information
      updateOverlay(regions[currentRegionIndex]);
      zoomToRegion(regions[currentRegionIndex]);
      createPulseEffect(regions[currentRegionIndex].pulseCoords);
      currentRegionIndex = (currentRegionIndex + 1) % regions.length;
      mapScrollCount++;
    } else {
      // Reset mapScrollCount after three presses
      if (mapScrollCount >= 3) {
        mapScrollCount = 0;
        map.style.transform = ""; // Reset zoom effect after three presses
        map
          .querySelectorAll(".land")
          .forEach((el) => el.classList.remove("highlighted")); // Remove highlight
        pulseContainer.innerHTML = ""; // Remove pulse effect
      }

      // Scroll to the next section
      if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
      } else {
        currentSectionIndex = 0;
      }
      sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
      updateProgressBar();
    }
  });

  scrollUpButton.addEventListener("click", () => {
    // Show the progress bar when the button is clicked
    progressBar.style.display = "flex";

    // Check if the map is currently in view
    const mapInView = sections[currentSectionIndex]?.id === "map-container";

    if (mapInView && mapScrollCount < 3) {
      // Update the overlay with the previous region's information
      currentRegionIndex =
        (currentRegionIndex - 1 + regions.length) % regions.length;
      updateOverlay(regions[currentRegionIndex]);
      zoomToRegion(regions[currentRegionIndex]);
      createPulseEffect(regions[currentRegionIndex].pulseCoords);
      mapScrollCount++;
    } else {
      // Reset mapScrollCount after three presses
      if (mapScrollCount >= 3) {
        mapScrollCount = 0;
        map.style.transform = ""; // Reset zoom effect after three presses
        map
          .querySelectorAll(".land")
          .forEach((el) => el.classList.remove("highlighted")); // Remove highlight
        pulseContainer.innerHTML = ""; // Remove pulse effect
      }

      // Scroll to the previous section
      if (currentSectionIndex > 0) {
        currentSectionIndex--;
      } else {
        currentSectionIndex = sections.length - 1;
      }
      sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
      updateProgressBar();
    }
  });

  const counter = document.getElementById("counter");
  let hasAnimated = false;

  function animateCounter() {
    const end = 100000;
    const duration = 2500;
    const startTime = new Date().getTime();
    const endTime = startTime + duration;

    function updateCounter() {
      const now = new Date().getTime();
      const remaining = Math.max((endTime - now) / duration, 0);
      const value = Math.round(end - remaining * end);
      counter.textContent = value.toLocaleString();
      if (value < end) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  function checkScroll() {
    const header = document.getElementById("animatedHeader");
    const rect = header.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight && !hasAnimated) {
      hasAnimated = true;
      animateCounter();
    }
  }

  window.addEventListener("scroll", checkScroll);
});
