document.addEventListener("DOMContentLoaded", () => {
  const stories = [
    {
      videoSrc: "./media/0001-0359.webm",
      header: "Parkeringskrise",
      href: "./Artikkel1.html"
    },
    {
      videoSrc: "./media/0001-0359.webm",
      header: "Henlagte saker",
      href: "./Artikkel2.html"
    },
    {
      videoSrc: "./media/0001-0359.webm",
      header: "Økonomikrisen rammer studentene",
      href: "./Artikkel3.html"
    },
    {
      videoSrc: "./media/0001-0359.webm",
      header: "Rusproblematikk Blant Studenter",
      href: "./Artikkel4.html"
    }
  ];

  let currentIndex = 0;

  const storyScroll = document.getElementById("storyScroll");
  const storyHeader = document.getElementById("storyHeader");
  const dotsContainer = document.getElementById("dotsContainer");
  const selectButton = document.getElementById("selectBTN");

  function updateStory(index) {
    storyScroll.style.transform = `translateX(-${index * 600}px)`;
    storyHeader.textContent = stories[index].header;
    updateDots(index);
  }

  function updateDots(index) {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  stories.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateStory(currentIndex);
    });
    dotsContainer.appendChild(dot);
  });

  document.getElementById("prevButton").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + stories.length) % stories.length;
    updateStory(currentIndex);
  });

  document.getElementById("nextButton").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % stories.length;
    updateStory(currentIndex);
  });
  
  selectButton.addEventListener("click", () => {
    window.location.href = stories[currentIndex].href;
  });

  updateStory(currentIndex);
});