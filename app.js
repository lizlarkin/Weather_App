$(document).ready(function () {

// Fetch Open Weather Map API
var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Flin Flon&units=imperial&appid=f47cf665982ed682ac53eda751512847'

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
          return response.json()
          console.log(response.status);
      })
      .then(function (data) {
        console.log(data);
        // Collect weather data that will be used in app
        var currentTemp = data.main.temp;
        // add date
        var currentHumid = data.main.humidity;        
        var weatherIconCode = data.weather[0].icon;
        var weatherIconUrl = "http://openweathermap.org/img/wn/" +  weatherIconCode + "@2x.png";
        var currentWind = data.wind.speed;
  
        // Input Data into current-weather div

        // City Name, Date, and Weather Icon
        cityInfoEl = document.createElement('h2');
        $("#current-weather").append(cityInfoEl);
        cityInfoEl.textContent = "set city name somehow" + " date " 

        weatherIconEl = document.createElement('img');
        weatherIconEl.setAttribute('src', weatherIconUrl);
        cityInfoEl.append(weatherIconEl);
        
        // Display city temperature
        currentTempEl = document.createElement('div');
        $("#current-weather").append(currentTempEl);
        currentTempEl.textContent = (`Temperature:  ${currentTemp} \u00B0F`);

        // Display city humidity
        currentHumidEl = document.createElement('div');
        $("#current-weather").append(currentHumidEl);
        currentHumidEl.textContent = (`Humidity: ${currentHumid}%`);

        // Display city wind speed
        currentWindEl = document.createElement('div');
        $("#current-weather").append(currentWindEl);
        currentWindEl.textContent = (`Wind Speed: ${currentWind} MPH`);

        // Display UV Index
        currentUVEl = document.createElement('div');
        $("#current-weather").append(currentUVEl);
        currentUVEl.textContent = (`UV Index: `);

        console.log(weatherIconCode);
      });
      
  }
  
  
 
getApi(requestUrl);

// Set starting key number for local storage
var keynum = localStorage.length + 1;

// Search Button
$("#search-button").on("click", function() {
    var city = $("#city-input").val();
    console.log(city);
    localStorage.setItem(keynum, city);
    // increment key number each time button is clicked
    keynum = keynum + 1;

    // Save search to page (why does this work when I'm not retrieving from LS???)
    // Change this to get from local storage so it's there when pg refreshed
    var cityDiv = document.createElement('div');
    var cityName = document.createElement('button');
    cityName.textContent = city;
    $("#data-searched-cities").append(cityDiv);
    cityDiv.append(cityName); 
    cityName.setAttribute("class", "save-searched-city");

  })

    // Check that city searched can be found

    // Push weather data to current-weather div


    // Push 5-day forecast to forecast-weather div

  // icons come from open weather API

  // UV index color (green if favorable, etc.)

});