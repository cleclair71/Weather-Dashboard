const APIKey = "57deb76a90251740c9398ca04eb2710e";

const form = document.querySelector("#input");
const searchInput = document.querySelector("#search-input");
const btn = document.querySelector(".btn");

// Get current date and time
const currentDate = document.querySelector("#current-date");
currentDate.textContent = dayjs().format("MMM/DD, YYYY");

// Add event listener to button
btn.addEventListener("click", async (event) => {
  // Prevent default action of button
  event.preventDefault();
  // Get value of search input
  const city = searchInput.value;
  // Get current weather data from API
  const weatherData = await getWeatherData(city, APIKey);
  // Get forecast data from API
  const forecastData = await getForecastData(city, APIKey);
  // Display current weather data
  displayCurrentWeatherData(weatherData);
});

async function getWeatherData(city, APIKey) {
  // 1. Fetch the data from the API
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  );
  // 2. Return the data from the API as JSON
  return await response.json();
}

// Get the display-city element and store it in a variable
const displayCity = document.querySelector("#display-city");
// Check that the display-city element exists
if (displayCity) {
  // Update the text of the display-city element to the city name
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
// Creates a new list item
let li = document.createElement("li");
// Sets the text content of the new list item to the value in the array at the current index
li.textContent = recentSearches[i];
// Appends the new list item to the recent list
recentList.appendChild(li);
// Saves the recent searches array to local storage as a string
localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
// Displays the current weather data
displayCurrentWeatherData();
// Creates a variable for the forecast section
var forecast = document.querySelector(".forecast");
    // Fetch the geo coordinates for a city from the OpenWeather API
    async function cityGeo(city, APIKey) {
    
        // Construct the geo coordinates URL
        const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
        
        // Fetch the geo coordinates URL
        const response = await fetch(geoURL);
        
        // Convert the response to a JSON object
        const geoData = await response.json();
        
        // Extract the latitude and longitude from the JSON object
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;
        
        // Return the latitude and longitude
        return { lat, lon };
    }
    
    // Fetches the forecast data from the OpenWeatherMap API
    async function getForecastData(city, APIKey) {
    
      // Calls the cityGeo function to get the latitude and longitude of the city
      const coords = await cityGeo(city, APIKey);
      const lat = coords.lat;
      const lon = coords.lon;
    
      // Fetches the forecast data from the OpenWeatherMap API
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
      const response = await fetch(forecastURL);
      const data = await response.json();
    
      // Filters the forecast data to include only the 12:00:00 readings
      const forecastData = data.list.filter(
        (reading) => reading.dt_txt.includes("12:00:00")
      );
    }
    
    forecastData.forEach((reading, index) => {
    const date = new Date(reading.dt_txt);
    document.getElementById(`date${index + 1}`).innerHTML = date.toDateString();
    document.getElementById(`img${index + 1}`).src = `http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`;
    document.getElementById(`daytemp${index + 1}`).innerHTML = `Temperature: ${reading.main.temp}°F`;
    document.getElementById(`dayhum${index + 1}`).innerHTML = `Humidity: ${reading.main.humidity}%`;
    document.getElementById(`dayspeed${index + 1}`).innerHTML = `Wind-speed: ${reading.wind.speed}mph`;
    });
    
    
    getForecastData(city, APIKey);
    
    
    
    