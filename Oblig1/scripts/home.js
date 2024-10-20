document.addEventListener("DOMContentLoaded", () => {
  const characters = [
    {
      videoSrc: "./media/0001-0359.webm",
      header: "Character 1"
    },
    {
      videoSrc: "./media/0001-0359.webm",
      header: "Character 2"
    },
    {
      videoSrc: "./media/0001-0359.webm",
      header: "Character 3"
    }
  ];

  let currentIndex = 0;

  const characterVideo = document.getElementById("characterVideo");
  const characterHeader = document.getElementById("characterHeader");
  const dotsContainer = document.getElementById("dotsContainer");

  function updateCharacter(index) {
    characterVideo.src = characters[index].videoSrc;
    characterHeader.textContent = characters[index].header;
    updateDots(index);
  }

  function updateDots(index) {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  characters.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCharacter(currentIndex);
    });
    dotsContainer.appendChild(dot);
  });

  document.getElementById("prevButton").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + characters.length) % characters.length;
    updateCharacter(currentIndex);
  });

  document.getElementById("nextButton").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % characters.length;
    updateCharacter(currentIndex);
  });

  updateCharacter(currentIndex);
});