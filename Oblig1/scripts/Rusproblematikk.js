document.addEventListener("mousemove", function (e) {
  createSmoke(e.pageX, e.pageY);
});

function createSmoke(x, y) {
  const smoke = document.createElement("div");
  smoke.classList.add("smoke-particle");
  document.body.appendChild(smoke);

  // Get the dimensions of the smoke particle
  const smokeWidth = smoke.offsetWidth;
  const smokeHeight = smoke.offsetHeight;

  // Adjust the position to center the smoke particle on the mouse pointer
  smoke.style.left = x - smokeWidth + "px";
  smoke.style.top = y - smokeHeight + "px";

  // Remove the particle after 2 seconds
  setTimeout(() => {
    smoke.remove();
  }, 2000);
}
