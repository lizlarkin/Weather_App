$(document).ready(function () {

  // Set starting key number for local storage
var keynum = localStorage.length + 1;

var city;

// Search Button
$("#search-button").on("click", function() {
    city = $("#city-input").val();
    localStorage.setItem(keynum, city);
    $("#city-input").val("")
    // increment key number each time button is clicked
    keynum = keynum + 1;

    // Save search to page 
    var cityDiv = document.createElement('div');
    var cityName = document.createElement('button');
    cityName.textContent = city;
    $("#data-searched-cities").append(cityDiv);
    cityDiv.append(cityName); 
    cityName.setAttribute("class", "save-searched-city");

// Fetch Open Weather Map API
var requestWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=f47cf665982ed682ac53eda751512847'

function getApi(requestWeatherUrl) {
    fetch(requestWeatherUrl)
      .then(function (response) {
          console.log(response.status);
          if (response.ok) {
          return response.json();
        } else {
            alert("Please try search again.")
          return;
        }
      })

      .then(function (data) {

        $("#current-weather").empty();
        $("#forecast-weather").empty();
        console.log(data);
        // Collect weather data from API that will be used in app
        var currentTemp = data.list[0].main.temp;
        var today = new Date().toLocaleDateString();
        var currentHumid = data.list[0].main.humidity;        
        var weatherIconCode = data.list[0].weather[0].icon;
        var weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherIconCode + "@2x.png";
        var currentWind = data.list[0].wind.speed;
        var latitude = data.city.coord.lat;
        var longitude = data.city.coord.lon;
  
        // Input Data into current-weather divs
        // City Name, Date, and Weather Icon
        cityInfoEl = document.createElement('h2');
        $("#current-weather").append(cityInfoEl);
        cityInfoEl.textContent = (city + " (" + today + ")")

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

        // Use loop to extract 50day forecast data from API
        for (let i = 0; i < data.list.length; i++) {
           if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) { //find index of 15, if it's not there then end for loop and go to next
          var date = data.list[i].dt_txt.split(" ")[0];
          var code = data.list[i].weather[0].icon; 
          var codeUrl = "http://openweathermap.org/img/wn/" + code + "@2x.png";
          var temp = (data.list[i].main.temp);
          var humidity = data.list[i].main.humidity;

        // Append forecasts to forecast-weather div
        forecastWeatherEl = document.createElement('div');
        forecastWeatherEl.setAttribute("class", "forecast-card")
        $("#forecast-weather").append(forecastWeatherEl);
        
        forecastDateEl = document.createElement('h4');
        forecastWeatherEl.append(forecastDateEl);
        forecastDateEl.textContent = date;
        forecastImg = document.createElement('img');
        forecastImg.setAttribute("src", codeUrl);
        forecastDateEl.append(forecastImg);
        
        forecastTempEl = document.createElement('p');
        forecastWeatherEl.append(forecastTempEl);
        forecastTempEl.textContent = "Temp: " + temp + "\u00B0F";
        
        forecastHumidityEl = document.createElement('p');
        forecastWeatherEl.append(forecastHumidityEl);
        forecastHumidityEl.textContent = "Humidity: " + humidity +"%";

        }
      }
        // UV Index
        var requestUVUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + latitude +'&lon=' + longitude + '&appid=f47cf665982ed682ac53eda751512847'
        function getUVApi(requestUVUrl) {
          fetch(requestUVUrl)
            .then(function (response) {
                console.log(response.status);
                return response.json()
                
            })
            .then(function (data) {
              console.log(data);
              // Display UV Index
              var currentUV = data.value;
              currentUVEl = document.createElement('div');
              $("#current-weather").append(currentUVEl);
              currentUVEl.textContent = ("UV Index: ");
      
              currentUVSpanEl = document.createElement('span');
              currentUVEl.append(currentUVSpanEl);
              currentUVSpanEl.textContent = currentUV;
              currentUVSpanEl.setAttribute("id", "uv-span");
      
              // Change color of UV Index number to visually indicate UV level
               if (currentUV <= 2) {
                currentUVSpanEl.setAttribute("class", "low");
               } else if (currentUV <= 7) {
                currentUVSpanEl.setAttribute("class", "moderate");
               } else {
               currentUVSpanEl.setAttribute("class", "high");
              }
            })
          } getUVApi(requestUVUrl);
      });
  }
  
getApi(requestWeatherUrl);

// Click saved city function
$(document).on("click", '.save-searched-city', function() {
  var getButtonCity = $(this).text();
  var requestWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + getButtonCity + '&units=imperial&appid=f47cf665982ed682ac53eda751512847'
  city = getButtonCity;
  $("#current-weather").empty();
  $("#forecast-weather").empty();
  $("#uv-span").empty();

  getApi(requestWeatherUrl);  
})

})

});