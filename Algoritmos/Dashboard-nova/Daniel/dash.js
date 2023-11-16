var h1_tempMedia = document.getElementById("h1_tempMedia")
var temp = [];
var temp2 = [];
var temp3 = [];
var temp4 = [];
var temp5 = [];

for (; temp.length < 24;) {
    var temperatura = (Math.random() * 9) + 9;
    temp.push(temperatura);
}
//criando as temperaturas dos outros sensores
for (var index = 0; index <= temp.length - 1; index += 1) {
    temp2.push(temp[index] * 1.25);
    temp3.push(temp[index] * 0.90);
    temp4.push(temp[index] * 1.10);
    temp5.push(temp[index] * 0.60);
}

var tempMedia = (temp[temp.length - 1] + temp2[temp.length - 1] + temp3[temp.length - 1] + temp4[temp.length - 1] + temp5[temp.length - 1]) / 5;

    if (tempMedia <= 13.9) {

        var elemento = document.getElementById('critFrio');
        elemento.classList.remove('alerta');
        elemento.classList.add('alertaVermelho');
        var mediaExibida = `<b style="color: red;">${tempMedia.toFixed(1)}ºC</b>`;

    } else if (tempMedia <= 15.4) {

        var elemento = document.getElementById('alertaFrio');
        elemento.classList.remove('alerta');
        elemento.classList.add('alertaAmarelo');
        var mediaExibida = `<b style="color: yellow;">${tempMedia.toFixed(1)}ºC</b>`;

    } else if (tempMedia <= 15.6) {

        var mediaExibida = `<b style="color: green;">${tempMedia.toFixed(1)}ºC</b>`;

    } else if (tempMedia <= 15.8) {

        var elemento = document.getElementById('alertaQuente');
        elemento.classList.remove('alerta');
        elemento.classList.add('alertaAmarelo');
        var mediaExibida = `<b style="color: yellow;">${tempMedia.toFixed(1)}ºC</b>`;

    } else {
        var elemento = document.getElementById('critQuente');
        elemento.classList.remove('alerta');
        elemento.classList.add('alertaVermelho');
        var mediaExibida = `<b style="color: red;">${tempMedia.toFixed(1)}ºC</b>`;
    };

    // h1_tempMedia.innerHTML = mediaExibida;

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            datasets: [{
                label: 'Sensor 1',
                borderColor: 'rgb(79, 0, 128)',
                backgroundColor: 'rgb(79, 0, 128)',
                data: temp,
                borderWidth: 1
            },
            {
                label: 'Sensor 2',
                borderColor: 'rgb(255, 57, 162)',
                backgroundColor: 'rgb(255, 57, 162)',
                data: temp2,
                borderWidth: 1
            },
            {
                label: 'Sensor 3',
                borderColor: 'rgb(119, 7, 48)',
                backgroundColor: 'rgb(119, 7, 48)',
                data: temp3,
                borderWidth: 1
            },
            {
                label: 'Sensor 4',
                borderColor: 'rgb(77, 207, 80)',
                backgroundColor: 'rgb(77, 207, 80)',
                data: temp4,
                borderWidth: 1
            },
            {
                label: 'Sensor 5',
                borderColor: 'rgb(255, 7, 208)',
                backgroundColor: 'rgb(255, 7, 208)',
                data: temp5,
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