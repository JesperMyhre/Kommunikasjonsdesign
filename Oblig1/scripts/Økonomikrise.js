document.addEventListener("DOMContentLoaded", function () {
  let activeButton = null;
  let currentOsloSum = 0;
  let currentHaldenSum = 0;
  let currentSlide = 0;

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

  function resetTable() {
    const defaultValues = {
      stipend: 10340,
      leieOslo: 8160,
      leieHalden: 6397,
      strøm: 400,
      mat: 3500,
      transport: 500,
      andreUtgifter: 1000,
    };

    document.querySelector("#stipendTableOslo #stipend").value =
      defaultValues.stipend;
    document.querySelector("#stipendTableOslo #leie").value =
      defaultValues.leieOslo;
    document.querySelector("#stipendTableOslo #strøm").value =
      defaultValues.strøm;
    document.querySelector("#stipendTableOslo #mat").value = defaultValues.mat;
    document.querySelector("#stipendTableOslo #transport").value =
      defaultValues.transport;
    document.querySelector("#stipendTableOslo #andreUtgifter").value =
      defaultValues.andreUtgifter;

    document.querySelector("#stipendTableHalden #stipend").value =
      defaultValues.stipend;
    document.querySelector("#stipendTableHalden #leie").value =
      defaultValues.leieHalden;
    document.querySelector("#stipendTableHalden #strøm").value =
      defaultValues.strøm;
    document.querySelector("#stipendTableHalden #mat").value =
      defaultValues.mat;
    document.querySelector("#stipendTableHalden #transport").value =
      defaultValues.transport;
    document.querySelector("#stipendTableHalden #andreUtgifter").value =
      defaultValues.andreUtgifter;

    calculateResult("stipendTableOslo");
    calculateResult("stipendTableHalden");
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
    const baseSize = 6; // Base size in rem
    const scaleFactor = 0.0001; // Adjust this factor to control the scaling
    const newSize = baseSize + value * scaleFactor;
    element.style.width = newSize + "rem";
    element.style.height = newSize + "rem";
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

  document.querySelector(".resetButton").addEventListener("click", resetTable);

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
      labels: ["2020", "2021", "2022", "2023", "2024"],
      datasets: [
        {
          label: "Prisutvikling (NOK/m²)",
          data: [42000, 44000, 48000, 50000, 52694],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false, // Adjusting to show realistic prices
          title: {
            display: true,
            text: "Pris (NOK/m²)",
          },
        },
        x: {
          title: {
            display: true,
            text: "År",
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    },
  });

  function showSlide(index) {
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach((carousel) => {
      const slides = carousel.querySelectorAll(".carousel-item");
      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }
      const offset = -currentSlide * 100;
      carousel.querySelector(
        ".carousel-inner"
      ).style.transform = `translateX(${offset}%)`;
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Initial call to show the first slide
  showSlide(currentSlide);

  // Attach event listeners to the controls
  document.querySelectorAll(".carousel-control-next").forEach((control) => {
    control.addEventListener("click", nextSlide);
  });
  document.querySelectorAll(".carousel-control-prev").forEach((control) => {
    control.addEventListener("click", prevSlide);
  });
});
