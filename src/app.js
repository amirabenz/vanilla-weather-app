let date = document.querySelector(".actual-date");

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let minutes = new Date().getMinutes();
let hours = new Date().getHours();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

date.innerHTML = `${days[new Date().getDay()]} ${hours}:${minutes}`;
function change(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#here").innerHTML = response.data.name;
  document.querySelector("#searched-city").value = response.data.name;
  console.log(response.data);
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
}

function showCurrentInfos(position) {
  let apiKey = "7a3a06bc53009599c7a0058ddd4c4727";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(change);
  document.querySelector("#celsius").innerHTML = "| <strong>°C </strong>";
  document.querySelector("#fahrenheit").innerHTML = " °F";
}

function searchCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentInfos);
}

let buttonCurrent = document.querySelector("#here-now");
buttonCurrent.addEventListener("click", searchCurrentWeather);

function toFahrenheit(event) {
  event.preventDefault();
  let apiKey = "7a3a06bc53009599c7a0058ddd4c4727";
  let city = document.querySelector("#searched-city").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(change);
  document.querySelector("#celsius").innerHTML = "°C ";
  document.querySelector("#fahrenheit").innerHTML = "| <strong> °F </strong>";
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

function toCelsius(event) {
  event.preventDefault();
  let apiKey = "7a3a06bc53009599c7a0058ddd4c4727";
  let city = document.querySelector("#searched-city").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(change);
  document.querySelector("#celsius").innerHTML = "| <strong>°C </strong>";
  document.querySelector("#fahrenheit").innerHTML = " °F";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", toCelsius);

let searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener("click", toCelsius);

let apiKey = "7a3a06bc53009599c7a0058ddd4c4727";
document.querySelector("#searched-city").value = "New York";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${
  document.querySelector("#searched-city").value
}&appid=${apiKey}&units=metric`;
axios.get(url).then(change);
