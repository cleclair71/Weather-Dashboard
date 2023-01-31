// const APIKey = "57deb76a90251740c9398ca04eb2710e";
// const searchInput = document.getElementById("search-input");
// const sBtn = document.getElementById("searchbtn");
// const searchHistory = document.getElementById("history");
// const recentSrch = JSON.parse(localStorage.getItem("recent")) || [];
const APIKey = "57deb76a90251740c9398ca04eb2710e";

const form = document.querySelector("#input");
const searchInput = document.querySelector("#search-input");
const recentDiv = document.querySelector("#recent");
const btn = document.querySelector(".btn");
// Get current date and time
const currentDate = document.querySelector("#current-date");
currentDate.textContent = dayjs().format("MMM/DD, YYYY");



btn.addEventListener("click", async (event) => {
    event.preventDefault();
    const city = searchInput.value;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    );
    const data = await response.json();

// Display current weather data
  const displayCity = document.querySelector("#display-city");
  if (displayCity) {
  displayCity.textContent = data.name;
}
  const currentTime = document.querySelector("#current-time");
  currentTime.textContent = dayjs().format("h:mm:ss a");
  const temp = document.querySelector("#temp");
  temp.textContent = `Temperature: ${data.main.temp} °F`;
  const humidity = document.querySelector("#humidity");
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  const windSpeed = document.querySelector("#wind-speed");
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} mph`;
  const main = document.querySelector("#main");
  main.textContent = data.weather[0].main;
  const description = document.querySelector("#description");
  description.textContent = data.weather[0].description;
  const image = document.querySelector("#image");
  image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // Store recent search in local storage
  let recentSearches = localStorage.getItem("recentSearches");
  if (!recentSearches) {
    recentSearches = [];
  } else {
    recentSearches = JSON.parse(recentSearches);
  }
  recentSearches.push(city);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

  // Display recent searches
  recentDiv.innerHTML = "";
  for (let i = recentSearches.length - 1; i >= 0; i--) {
    recentDiv.innerHTML += `<p>${recentSearches[i]}</p>`;
  }
});

// Display recent searches on page load
let recentSearches = localStorage.getItem("recentSearches");
if (recentSearches) {
recentSearches = JSON.parse(recentSearches);
recentDiv.innerHTML = "";
for (let i = recentSearches.length - 1; i >= 0; i--) {
recentDiv.innerHTML += `<p>${recentSearches[i]}</p>`;
}
}
var forecast = document.querySelector(".forecast");

async function getWeatherData() {
  if (forecast) {
    const APIKey = "57deb76a90251740c9398ca04eb2710e";
    const city = searchInput.value;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`
    );
    const data = await response.json();
    const list = data.list;

    for (let i = 0; i < list.length; i += 8) {
      let day = list[i];
      let date = new Date(day.dt * 1000).toLocaleDateString();
      let iconURL = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
      let temperature = Math.round(day.main.temp);
      let humidity = day.main.humidity;
      let windSpeed = day.wind.speed;

      // Create a card for each day
      let card = document.createElement("div");
      card.classList.add("card", "text-white", "bg-primary", "mb-3");
      card.style.maxWidth = "18rem";

      // Create the card header with the date
      let header = document.createElement("div");
      header.classList.add("card-header");
      header.textContent = date;

      let body = document.createElement("div");
      body.classList.add("card-body");

      let temperatureElement = document.createElement("p");
      temperatureElement.classList.add("card-text");
      temperatureElement.textContent = `Temperature: ${temperature}°C`;

      let humidityElement = document.createElement("p");
      humidityElement.classList.add("card-text");
      humidityElement.textContent = `Humidity: ${humidity}%`;

      let windSpeedElement = document.createElement("p");
      windSpeedElement.classList.add("card-text");
      windSpeedElement.textContent = `Wind Speed: ${windSpeed} mph`;

      body.appendChild(temperatureElement);
      body.appendChild(humidityElement);
      body.appendChild(windSpeedElement);

      card.appendChild(header);
      card.appendChild(body);

      forecast.appendChild(card);
    }
  }
}

getWeatherData();
// function displayTime() {
//     // Set the text of the current-date element to the current date
//     $("#current-date").text(dayjs().format("MMM D, YYYY"));
//     // Set the text of the current-time element to the current time
//     $("#current-time").text(dayjs().format("h:mm:ss A"));
// }
// // Call the displayTime function once every second
// setInterval(displayTime, 1000);
// Get current weather data and display it// async function citySearch(city, APIKey) {
//   const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
//   const response = await fetch(cityURL);
//   const data = await response.json();

//   const cityName = data.name;
//   const cityTemp = Math.round(data.main.temp);
//   const cityHumidity = data.main.humidity;
//   const cityWind = data.wind.speed;
//   const cityIcon = data.weather[0].icon;

//   function weatherDisplayCurrent() {
//     document.getElementById("weather-icon").innerHTML = "";
//     document.getElementById("weather-icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${cityIcon}.png" alt="weather icon" id="iconweather">`;

//     document.getElementById("display-city").textContent = city;
//     document.getElementById("temperature").textContent = cityTemp;
//     document.getElementById("humidity").textContent = cityHumidity;
//     document.getElementById("wind").textContent = cityWind;
//   }

//   weatherDisplayCurrent();
//   displayTime();
// }

// async function cityGeo(city, APIKey) {
//   const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
//   const response = await fetch(geoURL);
//   const data = await response.json();
  
//   const lat = data.lat;
//   const lon = data.lon;
  
//   forecastDisplayCurrent(lat, lon);
// }

// async function forecastDisplayCurrent(lat, lon) {
//   const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
//   const response = await fetch(forecastURL);
//   const data = await response.json();
  
//   document.getElementById("forecast").innerHTML = "";
//   for (let i = 0; i < data.list.length; i += 1) {
//     const date = new Date(data.list[i].dt * 1000);
//     const humidity = data.list[i].main.humidity;
//     const temperature = data.list[i].main.temp;
//     const weather = data.list[i].weather[0].description;
    
//     document.getElementById("forecast").innerHTML += `
//       <div class="col-sm-2">
//         <div class="card bg-light">
//           <div class="card-body">
//             <h5 class="card-title">${date.toLocaleDateString()}</h5>
//             <p class="card-text">Humidity: ${humidity}%</p>
//             <p class="card-text">Temperature: ${temperature}°C</p>
//             <p class="card-text">Weather: ${weather}</p>
//           </div>
//         </div>
//       </div>
//     `;
//   }}
//   function cityTitle(city) {
//     var cityTitle = city.toLowerCase().split(" ");
//     for (var i = 0; i < cityTitle.length; i++) {
//       cityTitle[i] = cityTitle[i].charAt(0).toUpperCase() + cityTitle[i].slice(1);
//     }
//     return cityTitle.join(" ");
//   }
  
//   function saveSearch(city) {
//     if (city === "") {
//       alert("Please enter a city");
//       return;
//     }
//     var cityTitle = cityTitle(city);
//     if (!cityList.includes(cityTitle)) {
//       cityList.push(cityTitle);
//       if (cityList.length > 10) {
//         cityList.shift();
//       }
//     }
//     localStorage.setItem("cities", JSON.stringify(cityList));
//   }

// var APIKey = "57deb76a90251740c9398ca04eb2710e";

// var searchInput = document.getElementById("search-input");
// var sBtn = document.getElementById("searchbtn");
// var searchHistory = document.getElementById("history");
// var recentSrch = JSON.parse(localStorage.getItem("recent")) || [];
// var cityList = JSON.parse(localStorage.getItem("cities")) || [];
// var city = cityList[7];
// sBtn.addEventListener("click", () => {
//     var cityInput = searchInput.value.trim();
//     city = cityTitle(cityInput);

//     citySearch(cityList[8], APIKey);
//     cityGeo(city, APIKey);
//     saveSearch(city);
//     console.log(recentSrch);

//     citySearch(city, APIKey);
// cityGeo(city, APIKey);
// });

// function citySearch(city, APIKey) {
//     var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
//     fetch(cityURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {

//             var cityName = data.name;
//             var cityTemp = Math.round(data.main.temp);
//             var cityHumidity = data.main.humidity;
//             var cityWind = data.wind.speed;
//             var cityIcon = data.weather[0].icon;

//             function weatherDisplayCurrent() {
//                 var iconTemplate = ``;
//                 document.getElementById("weather-icon").innerHTML = "";
//                 iconTemplate = `<img src="http://openweathermap.org/img/wn/${currentWeatherIcon}.png" alt="weather icon" id="iconweather">`;
//                 document.getElementById("weather-icon").innerHTML += iconTemplate;
            
//                 $("#display-city").text(city);
//                 $("#temperature").text(cityTemp);
//                 $("#humidity").text(cityHumidity);
//                 $("#wind").text(cityWind);
//             }
//             weatherDisplayCurrent();
//             displayTime();

//         });
// }

// function cityGeo(city, APIKey) {
//     var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;
//     fetch(geoURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             var lat = data.lat;
//             var lon = data.lon;
//             forecastDisplayCurrent(lat, lon);
//         });
// }

// function forecastDisplayCurrent(lat, lon) {
//     var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
//     fetch(forecastURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             document.getElementById("forecast").innerHTML = "";
//             for (var i = 0; i < data.list.length; i += 1) {
//                 var date = new Date(data.list[i].dt * 1000);
//                 var humidity = data.list[i].main.humidity;
//                 var cityWind = data.list[i].wind.speed;
//                 var cityTemp = Math.round(data.list[i].main.temp);
//                 layout = `
//                 <ul class="forecast"> 
//                 <li><span class="fs-5 text">${cityTemp}&#176F</span></li>
//                 <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png" alt="weather icon" id="iconweather"> </img>
//                 <li> Temp: <span class="fs-5 text">${cityTemp}&#176F</span></li>
//                 <li> Wind: <span class="fs-5 text">${cityWind}MPH</span></li>
//                 <li> Humidity: <span class="fs-5 text">${humidity}%</span></li>
//                 </ul>
//             `;
//                 document.getElementById("forecast").innerHTML += layout;
//             }
//         });
// }

// function saveSearch(city) {
//     // var cityTitle = cityTitle(city);
//     if (city === "") {
//         alert("Please enter a city");
//         return;
//     }
//     if (!cityList.includes(cityTitle(city))) {
//         cityList.push(cityTitle(city));
//         if (cityList.length > 10) {
//             cityList.shift();
//         }
//     }
//     btnBuild();
//     localStorage.setItem("cities", JSON.stringify(cityList));
// }
// function cityTitle(city) {
//     var cityTitle = city.toLowerCase().split(" ");
//     for (var i = 0; i < cityTitle.length; i++) {
//         cityTitle[i] = cityTitle[i].charAt(0).toUpperCase() + cityTitle[i].slice(1);
//     }
//     return cityTitle.join(" ");
//     console.log(save);
// }

 
// function btnBuild() {
//     var recentSrch = document.getElementById("recent-search");
//     recentSrch.innerHTML = " ";
//     for (var i = 0; i < cityList.length; i++) {
//         var btn1 = document.createElement("button");
//         btn1.textContent = cityList[i];
//         btn1.setAttribute("class", "searchbtn btn btn-primary my-1");
//         recentSrch.appendChild(btn1);
//         btn1.addEventListener("click", function (e) {
//             e.stopPropagation(); // fix here - missing parenthesis
//             var btnTxt = e.target.textContent;
//             citySearch(btnTxt, APIKey);
//             cityGeo(btnTxt, APIKey);
//             saveSearch(btnTxt);
//             console.log(btn);
            
//         });
//     }
// }

// todo: add event listener to search input
// todo: make js speak to html2 -temparature, humidity, wind speed,
// todo: display recent searches
// todo: not loading resources for some reason
// todo: takes a long time to load

// var APIKey = "57deb76a90251740c9398ca04eb2710e";

// var searchInput = document.getElementById("search-input");
// var sBtn = document.getElementById("searchbtn");
// var searchHistory = document.getElementById("history");
// var recentSrch = JSON.parse(localStorage.getItem("recent")) || [];
// var cityList = JSON.parse(localStorage.getItem("cities")) || [];
// var city = cityList[7];
// sBtn.addEventListener("click", () => {
//     var cityInput = searchInput.value.trim();
//     city = cityTitle(cityInput);

//     citySearch(cityList[8], APIKey);
//     cityGeo(city, APIKey);
//     saveSearch(city);
//     console.log(recentSrch);
// var APIKey = "57deb76a90251740c9398ca04eb2710e";
// const input = document.querySelector("#input");
// const city = document.querySelector("#search-input");
// const cityName = document.querySelector("#display-city");
// const temp = document.querySelector("#temp");
// const humidity = document.querySelector("#humidity");
// const wind = document.querySelector("#wind-speed");
// const main = document.querySelector("#main");
// const image = document.querySelector("#image");
// const description = document.querySelector("#description");
// var searchHistory = document.getElementById("history");
// var recentSrch = JSON.parse(localStorage.getItem("recent")) || [];
// cityGeo(city, APIKey);
// saveSearch(city);

// addEventListener("click", (submit) => {
//     var cityInput = searchInput.value.trim();
//     city = cityTitle(cityInput);

//     citySearch(cityList[8], APIKey);
//     cityGeo(city, APIKey);
//     saveSearch(city);
//     console.log(recentSrch);

//     citySearch(city, APIKey);
// cityGeo(city, APIKey);
// });

// This function displays the current time
// function displayTime() {
//     // Set the text of the current-date element to the current date
//     $("#current-date").text(dayjs().format("MMM D, YYYY"));
//     // Set the text of the current-time element to the current time
//     $("#current-time").text(dayjs().format("h:mm:ss A"));
// }
// Call the displayTime function once every second
// setInterval(displayTime, 1000);

// input.onsubmit = (e) => {
//     e.preventDefault();
//     weatherUpdate(city.value);
//     city.value = "";
// };

// weatherUpdate = (city) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open();
//     "GET",
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2f8b5f5b5b5b5b5b5b5b5b5b5b5b5b5b&units=imperial`;

//     xhr.send();
//     xhr.onload = () => {
//         if (xhr.status === 404) {
//             alert("City not found");
//         } else {
//             var data = JSON.parse(xhr.response);
//             cityName.innerHTML = data.name;
//             temp.innerHTML = data.main.temp;
//             humidity.innerHTML = data.main.humidity;
//             wind.innerHTML = data.wind.speed;
//             main.innerHTML = data.weather[0].main;
//             description.innerHTML = data.weather[0].description;
//             image.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
//         }
//     };
// };
// weatherUpdate("City");

// fetchForecast = function () {
//     var endPoint = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=2f8b5f5b5b5b5b5b5b5b5b5b5b5b5b5b&units=imperial`;
//     var forecast = document.getElementById("forecast");
//     fetch(endPoint)
//         .then(function (response) {
//             if (200 !== response.status) {
//                 console.log("Error");
//                 return;
//             }
//             forecast[0].classList.add('loaded');
//             response.json().then(function (data) {
//                 var forecastDay = "";
//                 data.daily.forEach((value, index) => {
//                     if (index > 0) {
//                         var nameDay = new Date(value.dt * 1000).toLocaleDateString("en", {
//                             weekday: "long",
//                         });
//                         var icon = value.weather[0].icon;
//                         var temp = value.temp.day.toFixed(0);
//                         var humidity = value.humidity;
//                         var wind = value.wind_speed;
//                         forecastDay = `<div class="forecast-day">
// 						<p>${dayname}</p>
// 						<p><span class="ico-${icon}" title="${icon}"></span></p>
// 						<div class="forecast-day--temp">${temp}<sup>°C</sup></div>
				
//                     <div class="forecast-day--humidity"> ${humidity}</div>
//                     <div class="forecast-day--wind-speed"> ${wind.speed}</div> 
//                     `;
//                     forecastE1.insertAdjacentHTML('beforeend', forecastDay);
//                     }
//                 });
//                 });
//             });
//         };
//         document.addEventListener( 'DOMContentLoaded', function() {
//             var weather;
        
//             if ( 'IntersectionObserver' in window ) {
//                 weather = document.querySelectorAll('.weather');
        
//                 var weatherObserver = new IntersectionObserver( function( entries, observer ) {
//                     entries.forEach( function( entry ) {
//                         if ( entry.isIntersecting ) {
//                             if (entry.target.classList.contains('weather')) {
//                                 fetchForecast();
//                             }
//                         }
//                     });
//                 }, {
//                     rootMargin: '0px 0px -120px 0px'
//                 });
        
//                 weather.forEach(function (s) {
//                     weatherObserver.observe(s);
//                 });
//             }
//         });




// const newName = document.getElementById("search-input");
// // This function gets the info from the input
// function getInfo(event) {
//     if (!newName.value) {
//         return;
//     }
//     event.preventDefault();
//     // Get the value of the search-input element
//    var citySearch = newName.value.trim();
//    console.long ("citySearch");
//     // Get the value of the display-city element
//     console.log ("newName");
//     const cityName = document.getElementById("display-city");
//     // Set the text of the display-city element to the value of the search-input element
//     // cityName.innerHTML ="--"+newName.value+"--";
//     // getCoordinates (newName) 
//     // Call the getWeather function and pass in the search-input value
//     // getWeather(newName.value);
// }

// // This function gets the weather
// function getWeather(city) {
//     // Call the fetch function passing the url of the API as a parameter
//     fetch("https://api.openweathermap.org/data/2.5/weather?q='+newName.value+'&appid=57deb76a90251740c9398ca04eb2710e")
//     // Convert the response to JSON
//     .then(response => response.json())
//     // Call the displayWeather function passing the API data as a parameter
//     .then(data => displayWeather(data))
//     // Catch any errors and log them to the console
//     .catch(err => console.log(err))
// }

// // This function displays the weather
// function displayWeather(data) {
//     // Get the current temperature
//     const temp = data.main.temp;
//     // Get the current humidity
//     const humidity = data.main.humidity;
//     // Get the current wind speed
//     const windSpeed = data.wind.speed;
//     // Get the current weather icon
//     const icon = data.weather[0].icon;

//     // Set the text of the current-temp element to the temperature
//     document.getElementById("current-temp").innerHTML = "Temperature: " + temp + "°F";
//     // Set the text of the current-humidity element to the humidity
//     document.getElementById("current-humidity").innerHTML = "Humidity: " + humidity + "%";
//     // Set the text of the current-wind-speed element to the wind speed
//     document.getElementById("current-wind-speed").innerHTML = "Wind Speed: " + windSpeed + "mph";
//     // Set the src of the current-weather-icon element to the weather icon
//     document.getElementById("current-weather-icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
// }
// // Create a new date object
// const d = new Date();

// // Create an array of days of the week
// const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// // Create a function to get the day of the week
// function getDay(date) {
//     // Check if the day is beyond the end of the week
//     if((date + d.getDay()) > 6){
//         // Return the day minus 7
//         return date + d.getDay() - 7;
//     }
//     // If the day is not beyond the end of the week
//     else{
//         // Return the day plus the current day
//         return d.getDay() + date;
        
//     }
// }

// Create a for loop to cycle through the days
// for(i=0; i<5;i++){
//     // Set the HTML of the element with id date to the day of the week
//     document.getElementById("date" +(i+1)).innerHTML = weekday[getDay(i)];
// }
//todo: add event
//todo: 2 fetch - weather fetch and pass through city  
//todo: apply lat and lon to get weather
//todo: first fetch is GO to get city
// document.getElementById("searchBtn").onkeyup=getInfo; 
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// function getInfo() {
//     const newName = document.getElementById("search-input");
//     const cityName = document.getElementById("display-city");
//     cityName.innerHTML ="--"+newName.value+"--";

    

// }
// fetch("https://api.openweathermap.org/data/2.5/weather?q='+newName.value+'&appid=57deb76a90251740c9398ca04eb2710e")
// .then(response => response.json())
// .then(data => {
// for(i=0; i<5;i++){
// document.getElementById("date" +(i+1)+ "temperature").innerHTML = "Temperature:" +Number(data.list[i].main.temp -271.51).toFixed(1)+"°"
// }
// for(i=0; i<5;i++){
//     document.getElementById("date" +(i+1)+ "Humidity").innerHTML = "Humidity:" +Number(data.list[i].main.humidity -80).toFixed(1)+"%"
//     }
//     for(i=0; i<5;i++){
//         document.getElementById("date" +(i+1)+ "wind-speed").innerHTML = "Wind-speed:" +Number(data.list[i].wind.speed -9.77).toFixed(1)+"mph"
//         }
// for (i=0; i<5;i++){
// document.getElementById("img" +(i+1)).src ="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";

// }
// })
// .catch(err => alert("Oops, something went wrong!"))

// const d = new Date();
// const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// function getDay(date) {
//     if((date + d.getDay()) > 6){
//         return day +d.getDay()-7;
//     }
//     else{
//         return d.getDay() + date;
        
//     }
// }
// for(i=0; i<5;i++){
//     document.getElementById("date" +(i+1)).innerHTML = weekday[getDay(i)];
// }

// // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey




// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}