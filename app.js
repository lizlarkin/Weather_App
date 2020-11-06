$(document).ready(function () {

// Fetch Open Weather Map API
var requestWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=San Francisco&units=imperial&cnt=6&appid=f47cf665982ed682ac53eda751512847'

function getApi(requestWeatherUrl) {
    fetch(requestWeatherUrl)
      .then(function (response) {
          console.log(response.status);
          return response.json()
          
      })
      .then(function (data) {
        console.log(data);
        // Collect weather data from API that will be used in app
        var currentTemp = data.list[0].main.temp;
        var date = data.list[0].dt_txt.split(" ")[0];
        var currentHumid = data.list[0].main.humidity;        
        var weatherIconCode = data.list[0].weather[0].icon;
        var weatherIconUrl = "http://openweathermap.org/img/wn/" +  weatherIconCode + "@2x.png";
        var currentWind = data.list[0].wind.speed;
        var latitude = data.city.coord.lat;
        console.log(latitude); // add this to requestUVUrl and remove
        var longitude = data.city.coord.lon;
        console.log(longitude); // add this to requestUVUrl and remove
  
        // Input Data into current-weather div

        // City Name, Date, and Weather Icon
        cityInfoEl = document.createElement('h2');
        $("#current-weather").append(cityInfoEl);
        cityInfoEl.textContent = ("set city name somehow " + "(" + date + ")")

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

        // Use loop to extract weather data from API
        for (let i = 0; i < data.list.length; i++) {
          var temp = (data.list[i].main.temp);
          var humidity = data.list[i].main.humidity;
          // var code = data.list[i].weather[i].icon;
          var wind = data.list[i].wind.speed;
          console.log(`Temp: ${i} ${temp}`);
        }

        // UV Index
        var requestUVUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + latitude +'&lon=' + longitude + '&appid=f47cf665982ed682ac53eda751512847'
        console.log(requestUVUrl);
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

    // TO DO

    // Check that city searched can be found

    // Deal with API connection errors

    // Push 5-day forecast to forecast-weather div

    // UV Index location bug


});