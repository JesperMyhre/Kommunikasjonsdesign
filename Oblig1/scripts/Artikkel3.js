document.addEventListener("DOMContentLoaded", function() {
  function calculateResult() {
    const stipend = parseFloat(document.getElementById("stipend").value) || 0;
    const leie = parseFloat(document.getElementById("leie").value) || 0;
    const strøm = parseFloat(document.getElementById("strøm").value) || 0;
    const mat = parseFloat(document.getElementById("mat").value) || 0;
    const transport = parseFloat(document.getElementById("transport").value) || 0;
    const andreUtgifter = parseFloat(document.getElementById("andreUtgifter").value) || 0;

    const totalt = leie + mat + transport + andreUtgifter + strøm;
    const resultat = stipend - totalt;

    document.getElementById("totalt").innerText = totalt;
    const resultatElement = document.getElementById("resultat");
    resultatElement.innerText = resultat;

    if (resultat >= 0) {
      resultatElement.style.color = "green";
    } else {
      resultatElement.style.color = "red";
    }
  }

  document.querySelectorAll("#stipendTable input").forEach(input => {
    input.addEventListener("input", calculateResult);
  });

  calculateResult();

  //Chart//
  var ctx = document.getElementById('rentChart').getContext('2d');
  var rentChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2020', '2021', '2022', '2023'],
      datasets: [{
        label: 'Gjennomsnittlig Leiepris (NOK)',
        data: [8000, 8500, 9000, 9500],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});
