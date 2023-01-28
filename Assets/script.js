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


// function displayTime() {
//     $("#current-date").text(dayjs().format("MMM D, YYYY"));
//     $("#current-time").text(dayjs().format("h:mm:ss A"));
// }
// setInterval(displayTime, 1000);

// btnBuild();


function getInfo() {
    const newName = document.getElementById("search-input");
    const cityName = document.getElementById("display-city");
    cityName.innerHTML ="--"+newName.value+"--";

    

}
fetch("https://api.openweathermap.org/data/2.5/weather?q='+newName.value+'&appid=57deb76a90251740c9398ca04eb2710e")
.then(response => response.json())
.then(data => {
for(i=0; i<5;i++){
document.getElementById("date" +(i+1)+ "temperature").innerHTML = "Temperature:" +Number(data.list[i].main.temp -271.51).toFixed(1)+"°"
}
for(i=0; i<5;i++){
    document.getElementById("date" +(i+1)+ "Humidity").innerHTML = "Humidity:" +Number(data.list[i].main.humidity -80).toFixed(1)+"%"
    }
    for(i=0; i<5;i++){
        document.getElementById("date" +(i+1)+ "wind-speed").innerHTML = "Wind-speed:" +Number(data.list[i].wind.speed -9.77).toFixed(1)+"mph"
        }
for (i=0; i<5;i++){
document.getElementById("img" +(i+1)).src ="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";

}
})
.catch(err => alert("Oops, something went wrong!"))

const d = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getDay(date) {
    if(date +d.getDay() > 6){
        return day +d.getDay()-7;
    }
    else{
        return day +d.getDay();
        
    }
}
for(i=0; i<5;i++){
    document.getElementById("date" +(i+1)).innerHTML = weekday[getDay(i)];
}





// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}