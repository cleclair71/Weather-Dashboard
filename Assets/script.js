const APIKey = "57deb76a90251740c9398ca04eb2710e";

const form = document.querySelector("#input");
const searchInput = document.querySelector("#search-input");
const btn = document.querySelector(".btn");

// Get current date and time
const currentDate = document.querySelector("#current-date");
currentDate.textContent = dayjs().format("MMM/DD, YYYY");

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  const city = searchInput.value;
  const weatherData = await getWeatherData(city, APIKey);
  const forecastData = await getForecastData(city, APIKey);
  displayCurrentWeatherData(weatherData);
});

async function getWeatherData(city, APIKey) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  );
  return await response.json();
}

function displayCurrentWeatherData(currentWeatherData) {
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
  }

// Display recent searches
let recentSearches = [];
try {
  recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
} catch (e) {
  console.error("Error parsing recentSearches from local storage", e);
}
const recentList = document.querySelector("#recent");

// Add city to recent searches and limit to 5
const city = searchInput.value;
if (!recentSearches.includes(city)) {
  recentSearches.unshift(city);
  if (recentSearches.length > 5) {
    recentSearches.pop();
  }
}

// Clear recent list
recentList.innerHTML = "";


// Render recent searches
for (let i = 0; i < recentSearches.length; i++) {
    let li = document.createElement("li");
    li.textContent = recentSearches[i];
    recentList.appendChild(li);
    }
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    displayCurrentWeatherData();
    
    var forecast = document.querySelector(".forecast");
    
    async function cityGeo(city, APIKey) {
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
    const response = await fetch(geoURL);
    const geoData = await response.json();
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;
    return { lat, lon };
    }
    
    async function getForecastData(city, APIKey) {
    const coords = await cityGeo(city, APIKey);
    const lat = coords.lat;
    const lon = coords.lon;
    
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    const response = await fetch(forecastURL);
    const data = await response.json();
    const forecastData = data.list.filter(
    (reading) => reading.dt_txt.includes("12:00:00")
    );
    
    forecastData.forEach((reading, index) => {
    const date = new Date(reading.dt_txt);
    document.getElementById(`date${index + 1}`).innerHTML = date.toDateString();
    document.getElementById(`img${index + 1}`).src = `http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`;
    document.getElementById(`daytemp${index + 1}`).innerHTML = `Temperature: ${reading.main.temp}°F`;
    document.getElementById(`dayhum${index + 1}`).innerHTML = `Humidity: ${reading.main.humidity}%`;
    document.getElementById(`dayspeed${index + 1}`).innerHTML = `Wind-speed: ${reading.wind.speed}mph`;
    });
    }
    
    getForecastData(city, APIKey);
    
    
    
    