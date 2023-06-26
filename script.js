const apikey = "c525b366a810974b9a34671bb381f8f7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#textBox");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const clockElement = document.getElementById("clock");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);

  if (response.status == 404) {
    // City not found
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/h";

    // Image Update
    var cond = data.weather[0].main;
    if (cond == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (cond == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (cond == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (cond == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (cond == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (cond == "Thunderstorm") {
      weatherIcon.src = "images/thunder.png";
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";

    function updateTime(timezoneOffset) {
      var now = new Date();
      var utc = now.getTime() + now.getTimezoneOffset() * 60000; // Get current UTC time.
      var newTime = new Date(utc + timezoneOffset * 1000); // Adjust time based on the offset

      var hours = newTime.getHours().toString().padStart(2, "0");
      var minutes = newTime.getMinutes().toString().padStart(2, "0");
      var seconds = newTime.getSeconds().toString().padStart(2, "0");

      var currentTime = hours + ":" + minutes + ":" + seconds;
      clockElement.textContent = currentTime;
    }

    const timezoneOffset = data.timezone; // Specify the timezone offset in seconds

    updateTime(timezoneOffset); // Set the initial time

    setInterval(() => {
      updateTime(timezoneOffset); // Update the clock every second
    }, 1000);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
