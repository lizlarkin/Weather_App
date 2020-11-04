$(document).ready(function () {

// Fetch Open Weather Map API
var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=f47cf665982ed682ac53eda751512847'

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
          return response.json()
          console.log(response.status);
      })
      .then(function (data) {
        console.log(data);
      });
  }
  
getApi(requestUrl);

// Set starting key number for local storage
var keynum = localStorage.length + 1;

// Search Button
$("#search-button").on("click", function() {
    var city = $("#city-input").val();
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

    // Retrieve weather data from city searched/clicked

});