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


// This function displays the current time
function displayTime() {
    // Set the text of the current-date element to the current date
    $("#current-date").text(dayjs().format("MMM D, YYYY"));
    // Set the text of the current-time element to the current time
    $("#current-time").text(dayjs().format("h:mm:ss A"));
}
// Call the displayTime function once every second
setInterval(displayTime, 1000);

// This function gets the info from the input
function getInfo() {
    // Get the value of the search-input element
    const newName = document.getElementById("search-input");
    // Get the value of the display-city element
    const cityName = document.getElementById("display-city");
    // Set the text of the display-city element to the value of the search-input element
    cityName.innerHTML ="--"+newName.value+"--";

    // Call the getWeather function and pass in the search-input value
    getWeather(newName.value);
}

// This function gets the weather
function getWeather(city) {
    // Call the fetch function passing the url of the API as a parameter
    fetch("https://api.openweathermap.org/data/2.5/weather?q='+newName.value+'&appid=57deb76a90251740c9398ca04eb2710e")
    // Convert the response to JSON
    .then(response => response.json())
    // Call the displayWeather function passing the API data as a parameter
    .then(data => displayWeather(data))
    // Catch any errors and log them to the console
    .catch(err => console.log(err))
}

// This function displays the weather
function displayWeather(data) {
    // Get the current temperature
    const temp = data.main.temp;
    // Get the current humidity
    const humidity = data.main.humidity;
    // Get the current wind speed
    const windSpeed = data.wind.speed;
    // Get the current weather icon
    const icon = data.weather[0].icon;

    // Set the text of the current-temp element to the temperature
    document.getElementById("current-temp").innerHTML = "Temperature: " + temp + "°F";
    // Set the text of the current-humidity element to the humidity
    document.getElementById("current-humidity").innerHTML = "Humidity: " + humidity + "%";
    // Set the text of the current-wind-speed element to the wind speed
    document.getElementById("current-wind-speed").innerHTML = "Wind Speed: " + windSpeed + "mph";
    // Set the src of the current-weather-icon element to the weather icon
    document.getElementById("current-weather-icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
}
// Create a new date object
const d = new Date();

// Create an array of days of the week
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Create a function to get the day of the week
function getDay(date) {
    // Check if the day is beyond the end of the week
    if((date + d.getDay()) > 6){
        // Return the day minus 7
        return date + d.getDay() - 7;
    }
    // If the day is not beyond the end of the week
    else{
        // Return the day plus the current day
        return d.getDay() + date;
        
    }
}

// Create a for loop to cycle through the days
for(i=0; i<5;i++){
    // Set the HTML of the element with id date to the day of the week
    document.getElementById("date" +(i+1)).innerHTML = weekday[getDay(i)];
}

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