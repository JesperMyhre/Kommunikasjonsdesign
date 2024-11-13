document.addEventListener("DOMContentLoaded", function () {
  let activeButton = null;
  let currentOsloSum = 0;
  let currentHaldenSum = 0;

  function animateNumber(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    const endTime = startTime + duration;

    function run(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const value = Math.round(start + progress * range);
      element.innerText = value.toLocaleString() + " kr";
      if (progress < 1) {
        requestAnimationFrame(run);
      }
    }

    requestAnimationFrame(run);
  }

  function calculateResult(tableId) {
    const table = document.getElementById(tableId);
    const stipend = parseFloat(table.querySelector("#stipend").value) || 0;
    const leie = parseFloat(table.querySelector("#leie").value) || 0;
    const strøm = parseFloat(table.querySelector("#strøm").value) || 0;
    const mat = parseFloat(table.querySelector("#mat").value) || 0;
    const transport = parseFloat(table.querySelector("#transport").value) || 0;
    const andreUtgifter =
      parseFloat(table.querySelector("#andreUtgifter").value) || 0;

    const totalt = leie + mat + transport + andreUtgifter + strøm;
    const resultat = stipend - totalt;

    const totaltElement = table.querySelector("#totalt");
    const resultatElement = table.querySelector("#resultat");

    totaltElement.innerText = totalt + " kr";
    resultatElement.innerText = resultat + " kr";

    if (resultat >= 0) {
      resultatElement.style.color = "green";
    } else {
      resultatElement.style.color = "red";
    }

    if (activeButton) {
      calculateSumByYear(activeButton.dataset.years);
    }
  }

  function addEventListeners(tableId) {
    const table = document.getElementById(tableId);
    table.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => calculateResult(tableId));
    });
  }

  function calculateSumByYear(years) {
    const osloTotal =
      parseFloat(
        document.querySelector("#stipendTableOslo #totalt").innerText
      ) || 0;
    const haldenTotal =
      parseFloat(
        document.querySelector("#stipendTableHalden #totalt").innerText
      ) || 0;

    const osloSum = osloTotal * years;
    const haldenSum = haldenTotal * years;

    const sumElements = document.querySelectorAll("#sumContainer .sum");
    animateNumber(sumElements[0], currentOsloSum, osloSum, 1000);
    animateNumber(sumElements[1], currentHaldenSum, haldenSum, 1000);

    adjustDivSize(sumElements[0], osloSum);
    adjustDivSize(sumElements[1], haldenSum);

    currentOsloSum = osloSum;
    currentHaldenSum = haldenSum;
  }

  function adjustDivSize(element, value) {
    const baseSize = 10; // Base size in vw
    const scaleFactor = 0.0001; // Adjust this factor to control the scaling
    const newSize = baseSize + value * scaleFactor;
    element.style.width = newSize + "vw";
    element.style.height = newSize + "vw";
  }

  function handleButtonClick(event) {
    const button = event.target;
    const years = parseInt(button.dataset.years, 10);

    if (activeButton) {
      activeButton.classList.remove("active");
    }

    button.classList.add("active");
    activeButton = button;

    calculateSumByYear(years);
  }

  document
    .querySelectorAll("#stipendButtonContainer .stipendButton")
    .forEach((button) => {
      button.addEventListener("click", handleButtonClick);
    });

  addEventListeners("stipendTableOslo");
  addEventListeners("stipendTableHalden");

  calculateResult("stipendTableOslo");
  calculateResult("stipendTableHalden");

  // Chart for rent prices
  var ctxRent = document.getElementById("rentChart").getContext("2d");
  var rentChart = new Chart(ctxRent, {
    type: "bar",
    data: {
      labels: ["2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Gjennomsnittlig Leiepris (NOK)",
          data: [8000, 8500, 9000, 9500],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
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

  // Chart for price development
  var ctxPrice = document.getElementById("priceChart").getContext("2d");
  var priceChart = new Chart(ctxPrice, {
    type: "line",
    data: {
      labels: ["2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Prisutvikling (NOK)",
          data: [7500, 8000, 8500, 9000, 9500],
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
          fill: true,
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
