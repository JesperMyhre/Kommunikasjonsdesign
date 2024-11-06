


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
