const APIKey = "57deb76a90251740c9398ca04eb2710e";

const form = document.querySelector("#input");
const searchInput = document.querySelector("#search-input");
const btn = document.querySelector(".btn");
// Get current date and time
const currentDate = document.querySelector("#current-date");
currentDate.textContent = dayjs().format("MMM/DD, YYYY");

// Forecast
const date1 = document.querySelector("#date1");
const date2 = document.querySelector("#date2");
const date3 = document.querySelector("#date3");
const date4 = document.querySelector("#date4");
const date5 = document.querySelector("#date5");
const icon1 = document.querySelector("#img1");
const icon2 = document.querySelector("#img2");
const icon3 = document.querySelector("#img3");
const icon4 = document.querySelector("#img4");
const icon5 = document.querySelector("#img5");
const weather1 = document.querySelector("#day1 .weather");
const weather2 = document.querySelector("#day2 .weather");
const weather3 = document.querySelector("#day3 .weather");
const weather4 = document.querySelector("#day4 .weather");
const weather5 = document.querySelector("#day5 .weather");
const temp1 = document.querySelector("#day1temp");
const temp2 = document.querySelector("#day2temp");
const temp3 = document.querySelector("#day3temp");
const temp4 = document.querySelector("#day4temp");
const temp5 = document.querySelector("#day5temp");
const hum1 = document.querySelector("#day1hum");
const hum2 = document.querySelector("#day2hum");
const hum3 = document.querySelector("#day3hum");
const hum4 = document.querySelector("#day4hum");
const hum5 = document.querySelector("#day5hum");
const speed1 = document.querySelector("#day1speed");
const speed2 = document.querySelector("#day2speed");
const speed3 = document.querySelector("#day3speed");
const speed4 = document.querySelector("#day4speed");
const speed5 = document.querySelector("#day5speed");

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
  
  function displayCurrentWeatherData(data) {
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
 let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
 const recentList = document.querySelector("#recent");

 // Add city to recent searches and limit to 4
 const city = searchInput.value;
 if (!recentSearches.includes(city)) {
   recentSearches.unshift(city);
   if (recentSearches.length > 4) {
     recentSearches.pop();
   }
 }

 localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

 // Clear recent list
 recentList.innerHTML = "";

 // Render recent searches
 for (let i = 0; i < recentSearches.length; i++) {
   let li = document.createElement("li");
   li.textContent = recentSearches[i];
   recentList.appendChild(li);
 }

 var forecast = document.querySelector(".forecast");

 async function cityGeo (city, APIKey) {
     const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
     const response = await fetch(geoURL);
     const geoData = await response.json();
     const lat = geoData[0].lat;
     const lon = geoData[0].lon;
     return {lat, lon};
 }
 
 
 async function getForecastData(city, APIKey) {
     const coords = await cityGeo(city, APIKey);
     const lat = coords.lat;
     const lon = coords.lon;
 
     const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`; 
     const response = await fetch(forecastURL);
     const data = await response.json();
 

let forecastData = data.list.filter((item, index) => {
         return index % 8 === 0;
     });
     
for (let i = 1; i <= 5; i++) {
    let forecastDate = dayjs.unix(forecastData[i - 1].dt).format('MMMM D, YYYY');
    const dateEl = document.querySelector(`#date${i}`);
    if (!dateEl) {
        console.error(`Element with id date not found.`);
        continue;
    }
    dateEl.textContent = forecastDate;
  
    const iconUrl = `http://openweathermap.org/img/wn/${forecastData[i - 1].weather[0].icon}@2x.png`;
    document.querySelector(`#img${i}`).setAttribute("src", iconUrl);
  
    document.querySelector(`#day${i}`).textContent = forecastData[i - 1].weather[0].description;
    
    const dayTemp = (forecastData[i - 1].main.temp - 273.15).toFixed(0);
    document.querySelector(`#day${i}temp`).textContent = `Temperature: ${dayTemp}°C`;
    document.querySelector(`#day${i}hum`).textContent = `Humidity: ${forecastData[i - 1].main.humidity}%`;
    document.querySelector(`#day${i}speed`).textContent = `Wind Speed: ${forecastData[i - 1].wind.speed} mph`;
}
 }
