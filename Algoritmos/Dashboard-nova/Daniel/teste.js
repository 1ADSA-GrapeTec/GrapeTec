const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00', '13:00', '14:00', '15:00', '16:00', '17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
        datasets: [{
            label: 'Limite max Temp',
            borderColor: '#f00',
            backgroundColor: '#f00',
            data: [16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
            borderWidth: 1,
            pointStyle: 'dash'
        },
        {
          label: 'Temperatura 1',
          borderColor:'rgb(79, 0, 128)',
          backgroundColor:'rgb(79, 0, 128)',
          data: [13.2,13.4,13.7,14.3,14,13.5,12.7,12.8,12.8,12.9,13.2,13.5,13.7,14.3,15.1,15.4,15.3,14.8,14.5,14.2,14.2,13.8,13.9,14],
          borderWidth: 1
        },
        {
          label: 'Temperatura 2',
          borderColor:'rgb(255, 57, 162)',
          backgroundColor:'rgb(255, 57, 162)',
          data: [12,12.2,12.5,12.7,13.1,13.6,14.1,14.5,14.7,15.2,14.9,14.9,15.1,14.7,13.9,13.7,13.4,12.8,12.7,12.8,13.3,14.1,14.7,15],
          borderWidth: 1
        },
        {
          label: 'Temperatura 3',
          borderColor:'rgb(119, 7, 48)',
          backgroundColor:'rgb(119, 7, 48)',
          data: [14,14.3,14.1,13.8,13.9,14.5,15,15.2,15.5,15.3,14.9,13.9,13.6,12.9,12.8,11.8,11.5,10.8,10.5,10.3,0,0,0,0],
          borderWidth: 1
        },
        {
            label: 'Limite min Temp',
            borderColor: '#00f',
            backgroundColor: '#00f',
            data: [11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
            borderWidth: 1,
            pointStyle: 'dash'
        }]
      },
        options: {
        scales: {
            y: {
                min:0,
                ticks: {
                    stepSize: 1
                }
            }
        }
      }
    });
const ctx2 = document.getElementById('myChart2');
new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00', '13:00', '14:00', '15:00', '16:00', '17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
        datasets: [{
            label: 'Limite max Temp',
            borderColor: '#f00',
            backgroundColor: '#f00',
            data: [12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
            borderWidth: 1,
            pointStyle: 'dash'
        },
        {
          label: 'Temperatura 1',
          borderColor:'rgb(25, 224, 25)',
          backgroundColor:'rgb(25, 224, 25)',
          data: [8.7,9.2,8.9,9.3,9.5,9.7,10.2,10.6,10.8,11.3,11.2,10.8,10.5,10.2,9.8,9.6,9.5,9.7,9.9,10.3,10.1,9.7,9.4,9.2],
          borderWidth: 1
        },
        {
          label: 'Temperatura 2',
          borderColor:'rgb(128, 0, 128)',
          backgroundColor:'rgb(128, 0, 128)',
          data: [9.2,9.5,9.8,10.2,10.5,10.6,10.8,11.3,11.5,11.2,10.8,10.6,10.2,9.7,9.5,9.6,9.3,9.2,9.2,8.8,8.6,8.9,9.2,9.4],
          borderWidth: 1
        },
        {
          label: 'Temperatura 3',
          borderColor:'rgb(240, 140, 10)',
          backgroundColor:'rgb(240, 140, 10)',
          data: [10,10.3,10.1,9.8,9.6,9.7,9.9,10.2,10.4,10.7,10.9,11.2,11.5,11.3,11.5,11.2,10.9,10.7,10.4,9.9,9.7,9.4,8.9,8.6],
          borderWidth: 1
        },
        {
          label: 'Temperatura 4',
          borderColor:'rgb(179, 109, 238)',
          backgroundColor:'rgb(179, 109, 238)',
          data: [9.5,9.3,9.1,8.8,8.5,8.6,8.7,8.9,9.3,9.5,9.8,10.1,10.3,10.5,10.2,9.9,9.7,9.8,10.1,10.3,10.6,11.1,11.3,11.3],
          borderWidth: 1
        },
        {
            label: 'Limite min Temp',
            borderColor: '#00f',
            backgroundColor: '#00f',
            data: [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
            borderWidth: 1,
            pointStyle: 'dash'
        }]
    },
    options: {
        scales: {
          y: {
            max: 16,
            min: 0,
            ticks: {
                stepSize: 1
            }
          }
        }
    }
});
const ctx3 = document.getElementById('myChart3');
new Chart(ctx3, {
    type: 'bar',
    data: {
    labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00', '13:00', '14:00', '15:00', '16:00', '17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
    datasets: [{
            label: '',
            borderColor: '#ff0',
            backgroundColor: '#ff0',
            data: [16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                max: 20,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});
const ctx4 = document.getElementById('myChart4');
new Chart(ctx4, {
    type: 'bar',
    data: {
    labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00', '13:00', '14:00', '15:00', '16:00', '17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
    datasets: [{
            label: '',
            borderColor: '#f0f',
            backgroundColor: '#f0f',
            data: [16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                max: 20,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});

var graficoTinto = document.querySelector(".graficoTinto")
var graficoRose = document.querySelector(".graficoRose")

function mostrarGrafico() {
    var armazem = armazens.value

    if(armazem == 'tinto') {
        graficoRose.classList.remove("active")
        graficoTinto.classList.toggle("active")
    }else if(armazem == 'rose') {
        graficoTinto.classList.remove("active")
        graficoRose.classList.toggle("active")
    }
}