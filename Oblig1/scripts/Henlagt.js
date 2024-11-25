document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".scrollSection, .bannerSection");
  const scrollButton = document.getElementById("scrollDown");
  const scrollUpButton = document.getElementById("scrollUp");
  const scrollToTopButton = document.getElementById("topArrow");
  const countUpElement = document.getElementById("countUp");
  const progressBar = document.getElementById("progressBar");
  const instructions = document.createElement("div");
  instructions.classList.add("instructions");
  instructions.innerText = "Click on any section to zoom in.";
  document.body.appendChild(instructions);

  let currentSectionIndex = 0;
  let isZoomedOut = false;

  sections.forEach((section, index) => {
    if (index > 0) {
      const dot = document.createElement("div");
      dot.classList.add("progressDot");
      progressBar.appendChild(dot);
    }
  });

  const updateProgressBar = () => {
    const dots = document.querySelectorAll(".progressDot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSectionIndex - 1);
    });
    progressBar.style.display = currentSectionIndex === 0 ? "none" : "flex";
  };

  const handleScroll = (direction) => {
    if (isZoomedOut) return;

    if (direction === "down" && currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
    } else if (direction === "up" && currentSectionIndex > 0) {
      currentSectionIndex--;
    }
    sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
    updateProgressBar();

    if (currentSectionIndex === sections.length) {
      setTimeout(() => {
        zoomOut();
      }, 1000);
    }
  };

  const zoomOut = () => {
    isZoomedOut = true;
    document.getElementById("canvas").style.transform = "scale(0.3)";
    document.getElementById("canvas").style.transformOrigin = "top left";
    instructions.style.display = "block";
  };

  const zoomIn = (index) => {
    isZoomedOut = false;
    currentSectionIndex = index;
    document.getElementById("canvas").style.transform = "scale(1)";
    sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
    instructions.style.display = "none";
    updateProgressBar();
  };

  sections.forEach((section, index) => {
    section.addEventListener("click", () => {
      if (isZoomedOut) {
        zoomIn(index);
      }
    });
  });

  scrollButton.addEventListener("click", () => handleScroll("down"));
  scrollUpButton.addEventListener("click", () => handleScroll("up"));
  scrollToTopButton.addEventListener("click", () => {
    currentSectionIndex = 0;
    sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
    updateProgressBar();
  });

  window.scrollTo(0, 0);

  const countUp = (element, start, end, duration) => {
    const step = (timestamp, startTime) => {
      const progress = timestamp - startTime;
      const current = Math.min(
        Math.floor((progress / duration) * (end - start) + start),
        end
      );
      element.textContent = current.toLocaleString();
      if (current < end) {
        window.requestAnimationFrame((timestamp) => step(timestamp, startTime));
      }
    };
    window.requestAnimationFrame((timestamp) => step(timestamp, timestamp));
  };

  new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(countUpElement, 0, 100000, 2000);
        observer.unobserve(entry.target);
      }
    });
  }).observe(countUpElement);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentSectionIndex = Array.from(sections).indexOf(entry.target);
          updateProgressBar();
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Draw the red string connecting the sections
  const drawRedString = () => {
    const svg = document.getElementById("connectionPath");
    svg.innerHTML = ""; // Clear existing paths

    let path = "";
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      if (index === 0) {
        path += `M ${x} ${y} `;
      } else {
        path += `L ${x} ${y} `;
      }
    });

    const newPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    newPath.setAttribute("d", path);
    newPath.setAttribute("stroke", "red");
    newPath.setAttribute("stroke-width", "2");
    newPath.setAttribute("fill", "none");
    svg.appendChild(newPath);
  };

  drawRedString();
  window.addEventListener("resize", drawRedString);
});
