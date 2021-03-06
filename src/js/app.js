let appId = 'afb4765b403008cec2c721a6e50347a4';
let units = 'metric'; 
let searchMethod; // q means searching as a string.
let errorMessage = document.getElementById('errorMessage');
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
        // }).catch(() => {
        //         errorMessage.innerHTML="Please search for a valid city "
            
    });
   
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

function init(resultFromServer) {
    if (resultFromServer.weather[0].main == "Clear" ) 
    {
        document.body.style.backgroundImage = "url('img/clearPicture.jpg')";
         //document.getElementById("temperature").style.color  = "red";
    }
    else if(resultFromServer.weather[0].main == "Clouds")
    {
         document.body.style.backgroundImage = "url('img/cloudyPicture.jpg')";
         
    }
    else if(resultFromServer.weather[0].main == "Rain")
    {
         document.body.style.backgroundImage = "url('img/rainPicture.jpg')";
    }
    else if(resultFromServer.weather[0].main == "Drizzle")
    {
        document.body.style.backgroundImage = "url('img/drizzle.jpg')";
    }      
    else if(resultFromServer.weather[0].main == "Mist")
    {
        document.body.style.backgroundImage = "url('img/mistPicture.jpg')";
    }
    else if(resultFromServer.weather[0].main == "Thunderstorm")
    {
        document.body.style.backgroundImage = "url('img/stormPicture.jpg')";
    }
    else if(resultFromServer.weather[0].main == "Snow")
    {
        document.body.style.backgroundImage = "url('img/snowPicture.jpg')";
    }


    
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperature.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;' + 'C';
    windSpeed.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.wind.speed) + ' meter/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidity.innerHTML = 'Humidity levels: ' + resultFromServer.main.humidity +  '%';
    tempMin.innerHTML = 'Temp Min:' + Math.floor(resultFromServer.main.temp_min) + '&#176;' + 'C';
    tempMax.innerHTML = 'Temp Max:' + Math.floor(resultFromServer.main.temp_max) + '&#176;'+ 'C';
    feelsLike.innerHTML = 'Feels Like:' + Math.floor(resultFromServer.main.feels_like) + '&#176;' ;
    console.log(resultFromServer);
    
 

    
}
document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
    
});


navigator.serviceWorker.register('/sw.js');
var deferredPrompt;
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});
var deferredPrompt;
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

