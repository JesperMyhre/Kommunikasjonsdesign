document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".articleSection, .bannerSection");
  const scrollButton = document.getElementById("scrollDown");
  const scrollUpButton = document.getElementById("scrollUp");
  const scrollToTopButton = document.getElementById("topArrow");
  const countUpElement = document.getElementById("countUp");
  const progressBar = document.getElementById("progressBar");

  let currentSectionIndex = 0;

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
    if (direction === "down" && currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
    } else if (direction === "up" && currentSectionIndex > 0) {
      currentSectionIndex--;
    }
    sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
    updateProgressBar();
  };

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
});
