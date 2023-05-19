
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
  <span style="font-size: 2em;color: #2713347b;">${currentMoment.format("MM/DD/YY")}</span>
  <h3 style="font-family: 'Montserrat', sans-serif; text-transform: uppercase; font-size: 3em; color: #2713347b; font-weight: 600;">${response.name}
  
  
</h3>

<ul class="list-unstyled" style="font-family: 'Montserrat', sans-serif; text-transform: uppercase; font-size: 1.5em; color: #271334;">
<li class="weather-icon" style="font-size: 300%;"><img src="${currentWeatherIcon}" style="width: 2em;"></li>
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
                <div class="weather-card card m-2 p0" style="background-color: #ffffffb7; font-family: Montserrat, sans-serif; color: #271334fb;">
        <ul class="list-unstyled p-3">
            <li>${thisMoment.format("MM/DD/YY")}</li>
            <li class="weather-icon" style="font-size: 200%;"><img src="${iconURL}" style="width: 2em;"></li>
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
let $cityEl = $(cityEl);
$cityEl.css({
  "background-color": "#ffffff68", 
  "color": "#2713347b",
  "border-color": "#2713347b",
  "font-family": "Montserrat, sans-serif",
  "text-transform": "uppercase",
  "font-weight": "bold",
});
$cityEl.hover(
  function() { // function to run when mouse enters
    $(this).css("background-color", "#ffffff");
  }, 
  function() { // function to run when mouse leaves
    $(this).css("background-color", "#ffffff68");
  }
);

$('#city-results').prepend($cityEl);
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


 