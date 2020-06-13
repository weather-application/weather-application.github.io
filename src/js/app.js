let appId = 'afb4765b403008cec2c721a6e50347a4';
let units = 'metric'; 
let searchMethod; // q means searching as a string.

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
    });
   
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperature = document.getElementById('temperature');
    let humidity = document.getElementById('humidity');
    let windSpeed = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let tempMin = document.getElementById('tempMin');
    let tempMax = document.getElementById('tempMax');
    let feelsLike = document.getElementById('feelsLike');
    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperature.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;';
    windSpeed.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.wind.speed) + ' meter/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidity.innerHTML = 'Humidity levels: ' + resultFromServer.main.humidity +  '%';
    tempMin.innerHTML = 'Temp Min:' + Math.floor(resultFromServer.main.temp_min) + '&#176;';
    tempMax.innerHTML = 'Temp Max:' + Math.floor(resultFromServer.main.temp_max) + '&#176;';
    feelsLike.innerHTML = 'Feels Like:' + Math.floor(resultFromServer.main.feels_like) + '&#176;' ;
    console.log(resultFromServer);

    
}



document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
});

navigator.serviceWorker.register('/sw.js', {scope: "/"})
    .then(
    function (reg) {
        var serviceWorker;
        if (reg.installing) {
            serviceWorker = reg.installing;
            // console.log('Service worker installing');
        } else if (reg.waiting) {
            serviceWorker = reg.waiting;
            // console.log('Service worker installed & waiting');
        } else if (reg.active) {
            serviceWorker = reg.active;
            // console.log('Service worker active');
        }

        if (serviceWorker) {
            console.log("sw current state", serviceWorker.state);
            if (serviceWorker.state == "activated") {
                //If push subscription wasnt done yet have to do here
                console.log("sw already activated - Do watever needed here");
            }
            serviceWorker.addEventListener("statechange", function(e) {
                console.log("sw statechange : ", e.target.state);
                if (e.target.state == "activated") {
                    // use pushManger for subscribing here.
                    console.log("Just now activated. now we can subscribe for push notification")
                    subscribeForPushNotification(reg);
                }
            });
        }
    },
    function (err) {
        console.error('unsuccessful registration with ', '/sw.js', err);
    }
);

