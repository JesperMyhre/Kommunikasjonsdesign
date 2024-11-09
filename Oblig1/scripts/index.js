document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const sections = document.querySelectorAll(".infoContainerSmall");
  const scrollButton = document.getElementById("scrollButton");
  const progressBar = document.getElementById("progressBar");
  const map = document.getElementById("map");
  const regions = [
    { id: "NO-03", title: "Oslo", origin: "-5% 85%" },
    { id: "NO-07", title: "Stavern", origin: "-5% 95%" },
    { id: "NO-18", title: "Bodø", origin: "13% 30%" },
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
      overlay.innerHTML += `<h2>${
        region.title
      }</h2><p style="text-align: left">${infoArray.join("<br>")}</p>`;
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

  scrollButton.addEventListener("click", () => {
    // Show the progress bar when the button is clicked
    progressBar.style.display = "flex";

    // Check if the map is currently in view
    const mapInView = sections[currentSectionIndex]?.id === "map-container";

    if (mapInView && mapScrollCount < 3) {
      // Update the overlay with the next region's information
      updateOverlay(regions[currentRegionIndex]);
      zoomToRegion(regions[currentRegionIndex]);
      currentRegionIndex = (currentRegionIndex + 1) % regions.length;
      mapScrollCount++;
    } else {
      // Reset mapScrollCount after three presses
      if (mapScrollCount >= 3) {
        mapScrollCount = 0;
        map.style.transform = ""; // Reset zoom effect after three presses
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
