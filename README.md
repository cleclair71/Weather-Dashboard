
<a name="readme-top"></a>

<!-- PROJECT LOGO -->

  <h3 align="center">Work Day Schedule</h3>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

![screen1](https://user-images.githubusercontent.com/76407605/214712756-469e0aea-e7b2-469d-af5c-0c4242c202e2.JPG)

This application assists busy employees in organizing and managing their time by providing a convenient way to track important events. The project meets acceptance criteria and follows the design specifications outlined in the provided mock-up.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This planner features a calendar that displays the current day at the top, and uses a date library to handle date and time functionality. Scrolling down shows time blocks for standard business hours, which are color-coded to indicate past, present, and future events. Users can click on a time block to add an event, and the save button stores the event in local storage for persistence upon page refresh. Users can also edit entries and use the clear button to clear the contents and local storage.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
![screen1](https://user-images.githubusercontent.com/76407605/214712756-469e0aea-e7b2-469d-af5c-0c4242c202e2.JPG)
![screen2](https://user-images.githubusercontent.com/76407605/214712757-54441117-7c50-492d-8a4f-045cb9c4264e.JPG)
![screen3](https://user-images.githubusercontent.com/76407605/214712758-e2d516e5-0ad0-4013-8e66-09bced0a858b.JPG)
![screen4](https://user-images.githubusercontent.com/76407605/214712759-121fc383-5b2f-4e53-a509-13e4e0ecb29f.JPG)
![screen5](https://user-images.githubusercontent.com/76407605/214712761-c7b2ceea-8f9b-4cac-8537-5603ef8a72d3.JPG)
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Current day is displayed at the top of the calendar
- [x] Presented with timeblocks for standard business hours
- [x] Each timeblock is color coded to indicate whether it is in the past, present, or future
- [x] Can enter an event into the timeblock
- [x] Text for that event is saved in local storage
- [x] The saved event remains when the page is refreshed


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Cassie LeClair - cassieleclair71@gmail.com

* Deployed Website: [https://cleclair71.github.io/05-workday-calendar/](https://cleclair71.github.io/05-workday-calendar/)
* Repository Link: [https://github.com/cleclair71/05-workday-calendar](https://github.com/cleclair71/05-workday-calendar)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [README Template](https://github.com/othneildrew/Best-README-Template)
* [Spacing](https://getbootstrap.com/docs/4.0/utilities/spacing/)
* [Format](https://day.js.org/docs/en/display/format)
* [Bootstrap layout](https://getbootstrap.com/docs/5.0/layout/utilities/)
* [jQuery API](https://api.jquery.com/)
* [Document.getElementById()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
* [An Interactive Guide to Keyframe Animations](https://www.joshwcomeau.com/animation/keyframe-animations/)
* [return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)
* [HTML/CSS video as background for the header](https://stackoverflow.com/questions/54208390/html-css-video-as-background-for-the-header)
* [Animated Search Bar Using Only HTML and CSS](https://foolishdeveloper.com/animated-search-bar-using-only-html-and-css/)
* [Bootstrap 4 weather widget with time and date](https://bbbootstrap.com/snippets/weather-widget-time-and-date-51644824)

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the 5 Day Weather Forecast Links to an external site.to retrieve weather data for cities. The base URL should look like the following: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city