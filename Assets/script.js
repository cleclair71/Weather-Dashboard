// const APIKey = "57deb76a90251740c9398ca04eb2710e";

// const form = document.querySelector("#input");
// const searchInput = document.querySelector("#search-input");
// const btn = document.querySelector(".btn");

// // Get current date and time
// const currentDate = document.querySelector("#current-date");
// currentDate.textContent = dayjs().format("MMM/DD, YYYY");

// // Add event listener to button
// btn.addEventListener("click", async (event) => {
//   // Prevent default action of button
//   event.preventDefault();
//   // Get value of search input
//   const city = searchInput.value;
//   // Get current weather data from API
//   const weatherData = await getWeatherData(city, APIKey);
//   // Get forecast data from API
//   const forecastData = await getForecastData(city, APIKey);
//   // Display current weather data
//   displayCurrentWeatherData(weatherData);
// });

// async function getWeatherData(city, APIKey) {
//   // 1. Fetch the data from the API
//   const response = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
//   );
//   // 2. Return the data from the API as JSON
//   return await response.json();
// }

// // Get the display-city element and store it in a variable
// const displayCity = document.querySelector("#display-city");
// // Check that the display-city element exists
// if (displayCity) {
//   // Update the text of the display-city element to the city name
//   displayCity.textContent = data.name;
// }
//   const currentTime = document.querySelector("#current-time");
//   currentTime.textContent = dayjs().format("h:mm:ss a");
//   const temp = document.querySelector("#temp");
//   temp.textContent = `Temperature: ${data.main.temp} °F`;
//   const humidity = document.querySelector("#humidity");
//   humidity.textContent = `Humidity: ${data.main.humidity}%`;
//   const windSpeed = document.querySelector("#wind-speed");
//   windSpeed.textContent = `Wind Speed: ${data.wind.speed} mph`;
//   const main = document.querySelector("#main");
//     main.textContent = data.weather[0].main;
//     const description = document.querySelector("#description");
//     description.textContent = data.weather[0].description;
//     const image = document.querySelector("#image");
//     image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


// // Display recent searches
// let recentSearches = [];
// try {
//   recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
// } catch (e) {
//   console.error("Error parsing recentSearches from local storage", e);
// }
// const recentList = document.querySelector("#recent");

// // Add city to recent searches and limit to 5
// const city = searchInput.value;
// if (!recentSearches.includes(city)) {
//   recentSearches.unshift(city);
//   if (recentSearches.length > 5) {
//     recentSearches.pop();
//   }
// }

// // Clear recent list
// recentList.innerHTML = "";


// // Render recent searches
// // Creates a new list item
// let li = document.createElement("li");
// // Sets the text content of the new list item to the value in the array at the current index
// li.textContent = recentSearches[i];
// // Appends the new list item to the recent list
// recentList.appendChild(li);
// // Saves the recent searches array to local storage as a string
// localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
// // Displays the current weather data
// displayCurrentWeatherData();
// // Creates a variable for the forecast section
// var forecast = document.querySelector(".forecast");
//     // Fetch the geo coordinates for a city from the OpenWeather API
//     async function cityGeo(city, APIKey) {

//         // Construct the geo coordinates URL
//         const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;

//         // Fetch the geo coordinates URL
//         const response = await fetch(geoURL);

//         // Convert the response to a JSON object
//         const geoData = await response.json();

//         // Extract the latitude and longitude from the JSON object
//         const lat = geoData[0].lat;
//         const lon = geoData[0].lon;

//         // Return the latitude and longitude
//         return { lat, lon };
//     }

//     // Fetches the forecast data from the OpenWeatherMap API
//     async function getForecastData(city, APIKey) {

//       // Calls the cityGeo function to get the latitude and longitude of the city
//       const coords = await cityGeo(city, APIKey);
//       const lat = coords.lat;
//       const lon = coords.lon;

//       // Fetches the forecast data from the OpenWeatherMap API
//       const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
//       const response = await fetch(forecastURL);
//       const data = await response.json();

//       // Filters the forecast data to include only the 12:00:00 readings
//       const forecastData = data.list.filter(
//         (reading) => reading.dt_txt.includes("12:00:00")
//       );
//     }

//     forecastData.forEach((reading, index) => {
//     const date = new Date(reading.dt_txt);
//     document.getElementById(`date${index + 1}`).innerHTML = date.toDateString();
//     document.getElementById(`img${index + 1}`).src = `http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`;
//     document.getElementById(`daytemp${index + 1}`).innerHTML = `Temperature: ${reading.main.temp}°F`;
//     document.getElementById(`dayhum${index + 1}`).innerHTML = `Humidity: ${reading.main.humidity}%`;
//     document.getElementById(`dayspeed${index + 1}`).innerHTML = `Wind-speed: ${reading.wind.speed}mph`;
//     });


//     getForecastData(city, APIKey);

var owmAPI = "57deb76a90251740c9398ca04eb2710e";
var currentCity = "";
var lastCity = "";

var handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
var getCurrentConditions = (event) => {
  // Obtain city name from the search box
  let city = $('#search-city').val();
  currentCity= $('#search-city').val();
  // Set the queryURL to fetch from API using weather search - added units=imperial to fix
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
  fetch(queryURL)
  .then(handleErrors)
  .then((response) => {
      return response.json();
  })

  .then((response) => {
        // Save city to local storage
        saveCity(city);
        $('#search-error').text("");
        // Create icon for the current weather using Open Weather Maps
        let currentWeatherIcon="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        // Offset UTC timezone - using moment.js
        let currentTimeUTC = response.dt;
        let currentTimeZoneOffset = response.timezone;
        let currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
        let currentMoment = moment.unix(currentTimeUTC).utc().utcOffset(currentTimeZoneOffsetHours);

  renderCities();

  getFiveDayForecast(event);

  $('#header-text').text(response.name);

  let currentWeatherHTML = `
            <h3>${response.name} ${currentMoment.format("(MM/DD/YY)")}<img src="${currentWeatherIcon}"></h3>
            <ul class="list-unstyled">
                <li>Temperature: ${response.main.temp}&#8457;</li>
                <li>Humidity: ${response.main.humidity}%</li>
                <li>Wind Speed: ${response.wind.speed} mph</li>
                <li id="uvIndex">UV Index:</li>
            </ul>`;

  $('#current-weather').html(currentWeatherHTML);

  let latitude = response.coord.lat;
  let longitude = response.coord.lon;
  let uvQueryURL = "api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&APPID=" + owmAPI;

  uvQueryURL = "https://cors-anywhere.herokuapp.com/" + uvQueryURL;

 fetch(uvQueryURL)
        .then(handleErrors)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let uvIndex = response.value;
            $('#uvIndex').html(`UV Index: <span id="uvVal"> ${uvIndex}</span>`);
            if (uvIndex>=0 && uvIndex<3){
                $('#uvVal').attr("class", "uv-favorable");
            } else if (uvIndex>=3 && uvIndex<8){
                $('#uvVal').attr("class", "uv-moderate");
            } else if (uvIndex>=8){
                $('#uvVal').attr("class", "uv-severe");
            }
        });
    })
}

var getFiveDayForecast = (event) => {
  let city = $('#search-city').val();
  // Set up URL for API search using forecast search
  let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
  // Fetch from API
  fetch(queryURL)
      .then (handleErrors)
      .then((response) => {
          return response.json();
      })
    .then((response) => {

      let fiveDayForecastHTML = `
        <h2>5-Day Forecast:</h2>
        <div id="fiveDayForecastUl" class="d-inline-flex flex-wrap ">`;
        // Loop over the 5 day forecast and build the template HTML using UTC offset and Open Weather Map icon
        for (let i = 0; i < response.list.length; i++) {
            let dayData = response.list[i];
            let dayTimeUTC = dayData.dt;
            let timeZoneOffset = response.city.timezone;
            let timeZoneOffsetHours = timeZoneOffset / 60 / 60;
            let thisMoment = moment.unix(dayTimeUTC).utc().utcOffset(timeZoneOffsetHours);
            let iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
            // Only displaying mid-day forecasts
            if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
                fiveDayForecastHTML += `
                <div class="weather-card card m-2 p0">
                    <ul class="list-unstyled p-3">
                        <li>${thisMoment.format("MM/DD/YY")}</li>
                        <li class="weather-icon"><img src="${iconURL}"></li>
                        <li>Temp: ${dayData.main.temp}&#8457;</li>
                        <br>
                        <li>Humidity: ${dayData.main.humidity}%</li>
                    </ul>
                </div>`;
            }
        }
        // Build the HTML template
        fiveDayForecastHTML += `</div>`;
        // Append the five-day forecast to the DOM
        $('#five-day-forecast').html(fiveDayForecastHTML);
    })
}


// Function to save the city to localStorage
var saveCity = (newCity) => {
  let cityExists = false;
  // Check if City exists in local storage
  for (let i = 0; i < localStorage.length; i++) {
      if (localStorage["cities" + i] === newCity) {
          cityExists = true;
          break;
      }
  }
  // Save to localStorage if city is new
  if (cityExists === false) {
      localStorage.setItem('cities' + localStorage.length, newCity);
  }
}

var renderCities = () => {
  $('#city-results').empty();
  // If localStorage is empty
  if (localStorage.length===0){
      if (lastCity){
          $('#search-city').attr("value", lastCity);
      } else {
          $('#search-city').attr("value", "Austin");
      }
    } else {
      // Build key of last city written to localStorage
      let lastCityKey="cities"+(localStorage.length-1);
      lastCity=localStorage.getItem(lastCityKey);
      // Set search input to last city searched
      $('#search-city').attr("value", lastCity);
      // Append stored cities to page
      for (let i = 0; i < localStorage.length; i++) {
          let city = localStorage.getItem("cities" + i);
          let cityEl;
          // Set to lastCity if currentCity not set
          if (currentCity===""){
              currentCity=lastCity;

            }
            // Set button class to active for currentCity
            if (city === currentCity) {
                cityEl = `<button type="button" class="list-group-item list-group-item-action active">${city}</button></li>`;
            } else {
                cityEl = `<button type="button" class="list-group-item list-group-item-action">${city}</button></li>`;
            } 
            // Append city to page
            $('#city-results').prepend(cityEl);
        }
        // Add a "clear" button to page if there is a cities list
        if (localStorage.length>0){
            $('#clear-storage').html($('<a id="clear-storage" href="#">clear</a>'));
        } else {
            $('#clear-storage').html('');
        }
    }
    
}
// New city search button event listener
$('#search-button').on("click", (event) => {
  event.preventDefault();
  currentCity = $('#search-city').val();
  getCurrentConditions(event);
  });

  // Old searched cities buttons event listener
$('#city-results').on("click", (event) => {
  event.preventDefault();
  $('#search-city').val(event.target.textContent);
  currentCity=$('#search-city').val();
  getCurrentConditions(event);
});

$("#clear-storage").on("click", (event) => {
  localStorage.clear();
  renderCities();
});

// Render the searched cities
renderCities();

// Get the current conditions (which also calls the five day forecast)
getCurrentConditions();


 