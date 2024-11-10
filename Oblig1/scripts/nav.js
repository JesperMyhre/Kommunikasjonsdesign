document.addEventListener("DOMContentLoaded", () => {
  const navElement = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navElement.classList.add("navScroll");
    } else {
      navElement.classList.remove("navScroll");
    }
  });
});

window.addEventListener("scroll", () => {
  console.log(window.scrollY + "yes we are scrolling");
});
