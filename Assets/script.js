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
    getWeatherData();
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
//   let recentSearches = localStorage.getItem("recentSearches");
//   if (!recentSearches) {
//     recentSearches = [];
//   } else {
//     recentSearches = JSON.parse(recentSearches);
//   }
//   recentSearches.push(city);
//   localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

  // Display recent searches
//   recentDiv.innerHTML = "";
//   for (let i = recentSearches.length - 1; i >= 0; i--) {
//     recentDiv.innerHTML += `<p>${recentSearches[i]}</p>`;
//   }

var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

if (recentList) {
    recentList.innerHTML = "";
} else {
    console.error("recentList is null");
    recentSearches.push(city);

      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

    var recentList = document.querySelector("#recent");
    var li = document.createElement("li");
    li.textContent = city; 
    recentList.appendChild(li);
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

async function cityGeo (city, APIKey) {
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
    const response = await fetch(geoURL);
    const geoData = await response.json();
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    getWeatherData(lat, lon);
}
async function getWeatherData(lat, lon) {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`; 
    const response = await fetch(forecastURL);
    const data = await response.json();
    const list = data.list;


    // forecast.innerHTML = "";
        
        for (let i = 0; i < list.length; i += 8) {
          let day = list[i];
          let date = new Date(day.dt * 1000).toLocaleDateString();
          let iconURL = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
          let temperature = Math.round(day.main.temp - 273.15);
          let humidity = day.main.humidity;
          let windSpeed = day.wind.speed;

          date.textContent = date;
          temperature.textContent = `Temperature: ${temperature}°F`;
            humidity.textContent = `Humidity: ${humidity}%`;
            windSpeed.textContent = `Wind Speed: ${windSpeed} mph`;
            iconURL.src = iconURL;
            date.a
    
            forecast.appendChild(date);
            forecast.appendChild(temperature);
            forecast.appendChild(humidity);
            forecast.appendChild(windSpeed);
            forecast.appendChild(iconURL);
        }
    getWeatherData();
    
    }
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}