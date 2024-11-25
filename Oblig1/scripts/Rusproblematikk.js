document.addEventListener("mousemove", function (e) {
  createSmoke(e.pageX, e.pageY);
});

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("rusbrukChart").getContext("2d");
  const rusbrukChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Total Rusbrukslidelse", "Alkohollidelser", "Stofflidelser"],
      datasets: [
        {
          label: "Prosentandel av studenter",
          data: [12.3, 8.8, 4.4],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
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
