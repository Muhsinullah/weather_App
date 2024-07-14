const apiKey = "bca22babcda14684fdffc7a6042ba8de";

var weatherDetaileEle = document.querySelector(".weather-data")
var cityNameEle = document.querySelector("#city-name")
var formEle = document.querySelector("form")
var imgIcon = document.querySelector(".icon")
formEle.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityNameEle.value.trim();
    if (cityValue) {
      getWeatherData(cityValue);
    } else {
      alert.error("Please enter a city name");
    }
  });
  
  async function getWeatherData(cityValue) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error("Network response is not ok!");
      }
      const data = await response.json();
      if (data.weather && data.weather.length > 0 && data.main && data.wind) {
        const temperature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const detals = [
          `Feels Like: ${Math.floor(data.main.feels_like)}`,
          `Humidity: ${data.main.humidity}%`,
          `Wind Speed: ${data.wind.speed} m/s`
        ];
        weatherDetaileEle.querySelector(".temp").textContent = `${temperature}°C`;
        weatherDetaileEle.querySelector(".desc").textContent = `${description}`;
        imgIcon.innerHTML = `  <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather">`;
        weatherDetaileEle.querySelector(".details").innerHTML = detals.map((detail) => {
          return `<div>${detail}</div>`;
        }).join("");
      } else {
        alert.error("Invalid API response");
      }
    } catch (error) {
        weatherDetaileEle.querySelector(".temp").textContent = "";
        imgIcon.innerHTML = "";
        weatherDetaileEle.querySelector(".desc").textContent = "An error occurred!";
      }
  }