function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}: ${minutes}`;
}
function weatherTemp(response) {
  console.log(response);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemperature);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
function showFahrenheittemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}
function showCelsiustemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}
function search(city) {
  let apiKey = "559d8dfd4e0451eaa6c405eb9092a204";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherTemp);
}
function SearchForm(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}
let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", SearchForm);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheittemp);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiustemp);
search("Nigeria");
