document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const landElements = Array.from(document.querySelectorAll(".land"));
  const sections = document.querySelectorAll(".infoContainerSmall");
  const scrollButton = document.getElementById("scrollButton");
  const progressBar = document.getElementById("progressBar");

  let currentIndex = 0;
  let isAreaSelected = false;
  let currentSectionIndex = -1;

  function focusArea(index) {
    landElements.forEach((el, i) => {
      el.style.fill = i === index ? "#f5f5f5" : "hsl(0, 0%, 14%)";
    });
  }

  landElements.forEach((el, index) => {
    el.addEventListener("click", () => {
      currentIndex = index;
      isAreaSelected = true;
      focusArea(currentIndex);
      overlay.style.display = "block";
      const infoArray = JSON.parse(el.getAttribute("data-info"));
      overlay.innerHTML = `<h3>${el.getAttribute("title")}</h3>
                           <p>${infoArray.join("<br>")}</p>`;
    });

    el.addEventListener("mouseover", () => {
      if (!isAreaSelected) {
        el.style.fill = "#f5f5f5";
        overlay.style.display = "block";
        const infoArray = JSON.parse(el.getAttribute("data-info"));
        overlay.innerHTML = `<h3>${el.getAttribute("title")}</h3>
                             <p>${infoArray.join("<br>")}</p>`;
      }
    });

    el.addEventListener("mouseout", () => {
      if (!isAreaSelected) {
        el.style.fill = index === currentIndex ? "#f5f5f5" : "hsl(0, 0%, 14%)";
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("land")) {
      isAreaSelected = false;
      overlay.style.display = "none";
      focusArea(currentIndex);
    }
  });

  overlay.style.display = "none";

  // Create progress dots starting from the second section (index 1)
  sections.forEach((section, index) => {
    if (index > -1) {
      const dot = document.createElement("div");
      dot.classList.add("progressDot");
      progressBar.appendChild(dot);
    }
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

  scrollButton.addEventListener("click", () => {
    // Show the progress bar when the button is clicked
    progressBar.style.display = "flex";

    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
    } else {
      currentSectionIndex = 0;
    }
    sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
    updateProgressBar();
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
