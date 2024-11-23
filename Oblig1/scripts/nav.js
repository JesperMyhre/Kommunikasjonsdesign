const navElement = document.querySelector("nav");

window.addEventListener("scroll", () => {
  console.log("Scroll event detected"); // Debugging log
  if (window.scrollY > 50) {
    console.log("Adding navScroll class"); // Debugging log
    navElement.classList.add("navScroll");
  } else {
    console.log("Removing navScroll class"); // Debugging log
    navElement.classList.remove("navScroll");
  }
});
