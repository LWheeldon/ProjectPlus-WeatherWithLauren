function search(city) {
  let apiKey = "fa9b816a515682f32f167026fbfa01b8";
  let units = "units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "fa9b816a515682f32f167026fbfa01b8";
  let units = "units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayWeatherCondition(response) {
  cTemp = response.data.main.temp;
  document.querySelector(
    "#cityLive"
  ).innerHTML = `Weather for ${response.data.name}`;
  document.querySelector("#temperature").innerHTML = Math.round(cTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#currentCondition").innerHTML = ` 
    ${response.data.weather[0].description}`;
  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch").value;
  search(city);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "91e4be9d3f0ce62462b88df7804804ae";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col days" ><div class="card" style="width: 20rem;">
      <div class="card-body">
          <h6 class="card-title">${formatDay(forecastDay.dt)}</h6>
          <p class="card-text"><img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"></img><div><span class="weather-forecast-temp-min"> Min ${Math.round(
          forecastDay.temp.min
        )}°c </span>|<span class="weather-forecast-temp-max"> Max ${Math.round(
          forecastDay.temp.max
        )}°c </span> </div> </p>
        </div>
      </div></div>`;
    }
  });

  weatherForecast = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let geoLocator = document.querySelector("#geoLocator");
geoLocator.addEventListener("click", getCurrentPosition);

let cityInput = document.querySelector(`#cityInput`);

cityInput.addEventListener("submit", handleSubmit);

let now = new Date();
let clockHour = [
  `00`,
  `01`,
  `02`,
  `03`,
  `04`,
  `05`,
  `06`,
  `07`,
  `08`,
  `09`,
  `10`,
  `11`,
  `12`,
  `13`,
  `14`,
  `15`,
  `16`,
  `17`,
  `18`,
  `19`,
  `20`,
  `21`,
  `22`,
  `23`,
];

let currentTime = clockHour[now.getHours()];
let clockMinute = [
  `00`,
  `01`,
  `02`,
  `03`,
  `04`,
  `05`,
  `06`,
  `07`,
  `08`,
  `09`,
  `10`,
  `11`,
  `12`,
  `13`,
  `14`,
  `15`,
  `16`,
  `17`,
  `18`,
  `19`,
  `20`,
  `21`,
  `22`,
  `23`,
  `24`,
  `25`,
  `26`,
  `27`,
  `28`,
  `29`,
  `30`,
  `31`,
  `32`,
  `33`,
  `34`,
  `35`,
  `36`,
  `37`,
  `38`,
  `39`,
  `40`,
  `41`,
  `42`,
  `43`,
  `44`,
  `45`,
  `46`,
  `47`,
  `48`,
  `49`,
  `50`,
  `51`,
  `52`,
  `53`,
  `54`,
  `55`,
  `56`,
  `57`,
  `58`,
  `59`,
];
let currentMinute = clockMinute[now.getMinutes()];
let weekDayName = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = weekDayName[now.getDay()];

let dayMonth = document.querySelector("#dayMonth");
dayMonth.innerHTML = `${day}  |  ${currentTime}:${currentMinute}`;

search("Long Eaton");
