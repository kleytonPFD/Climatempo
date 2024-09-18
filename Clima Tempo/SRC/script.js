

document.querySelector('#pesquisa').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#buscar-cidade').value;

    if (!cityName) {
        document.querySelector("#clima").classList.remove('mostrar');
        showAlert('Precisa digitar uma cidade ');
        return;
    }
    const apiKey = '5249799fd35fdfd625e03fc815a1599f'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windspeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#clima").classList.remove('mostrar');
        showAlert(`
            Não foi possível localizar...

            <img src="https://raw.githubusercontent.com/Larissakich/weather-forecast/61012edfed76edb244cea9a308f214c5d3b3257d/src/images/404.svg"/>
        `)
    }

    console.log(json);
});

function showInfo(json) {
    showAlert('');

    document.querySelector('#clima').classList.add('mostrar');
    document.querySelector('#titulo').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp-valor').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    document.querySelector('#temp-descricao').innerHTML = `${json.description}`;
    document.querySelector('#temp-img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp-max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;
    document.querySelector('#humidade').innerHTML = `${json.humidity}%`;
    document.querySelector('#vento').innerHTML = `${json.windspeed.toFixed(1)} km/h`;
}

function showAlert(msg) {
    document.querySelector('#alerta').innerHTML = msg;

}



