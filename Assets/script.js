var APIKey = "57deb76a90251740c9398ca04eb2710e";
var city = cityList[8];
var searchInput = document.getElementById("search-input");
var sBtn = document.getElementById("searchbtn");
var searchHistory = document.getElementById("history");
var recentSrch = JSON.parse(localStorage.getItem("recent")) || [];

sBtn.addEventListener("click", () => {
    var cityInput = searchInput.value.trim();
    city = cityTitle(cityInput);
    
    citySearch(city, APIKey);
    cityGeo(city, APIKey);
    saveSearch(city);
    console.log(recentSrch);

});

function citySearch(city, APIKey) { 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
      .then(function (response) {
            return response.json();
        })
}
function weatherDisplayCurrent(){ }
function cityGeo(city, APIKey) { }
function forecastDisplayCurrent(){ }
function saveSearch(city){ }
function cityTitle(city) { }
function btnBuild() { }
function displayTime() { }




// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}