"strict mode";
import { API_KEY } from "./apikeys.js"; // importera apinyckel från annan jsfil

document.addEventListener("DOMContentLoaded", function () {
  // // Dagens Väder
  // 1. Hämta användarens location => (getCurrentPosition())
  // 2. Hämta väderdata baserat på användarens geolocation
  // 3. Hämta väderikon baserat på väderId => (getWeatherIcon())
  // 4. Visa väderdata

  // Väder forecast
  // 1. Hämta användarens location => (getCurrentPosition())
  // 2. Hämta väderdata baserat på användarens geolocation => (getWeatherForeCast())
  // 3. Hämta väderikon baserat på väderId => (getForecastIcon())
  // 4. Visa vädeforecast i DOM

  // --------------------------------------------------------------------//

  // 1. Hämta användarens geolocation (används både till dagens väder och forecast)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Anropa function för att hämta väderdata
      getCurrentWeatherData(latitude, longitude);
      getWeatherForeCast(latitude, longitude);
    },
    function (error) {
      console.error("Fel vid hämtning av geolocation:", error);
    }
  );

  // -------------------------- DAGENS VÄDER ----------------------------//

  // 2. DAGENS VÄDER - Hämta väderdata baserat på användarens geolocation
  async function getCurrentWeatherData(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("API request failed with status" + response.status);
      }
      const data = await response.json();

      const filteredData = filterWeatherData(data); // filtrera ut relevant data
      createCurrentWeatherCard(filteredData); // Skapa dagensväder kort i DOM
    } catch (error) {
      console.error("Väderdata gick ej att hämta ", error);
      const weather_data = document.querySelector(".weather-data");
      weather_data.innerHTML = `<p>Väderdata gick ej att hämta</p>`;
    }
  }

  // --------------------------------------------------------------------//

  // Funktion för att filtrera ut väderdata
  function filterWeatherData(data) {
    const filteredData = {
      weatherId: data.weather[0].id,
      weatherDesc: data.weather[0].description,
      temp: data.main.temp,
      FLtemp: data.main.feels_like,
      wind: data.wind.speed,
      gust: data.wind.gust,
      location: data.name,
    };

    return filteredData;
  }

  // --------------------------------------------------------------------//

  // Funktion för att skapa dagens väderkort i DOM
  function createCurrentWeatherCard(filteredData) {
    // 3. DAGENS VÄDER - Hämta väderIcon
    const weatherIcon = getWeatherIcon(filteredData.weatherId);

    // Hämta dagens väder loader från DOM
    const currentWeatherLoader = document.querySelector(
      ".currentWeatherLoader"
    );

    // 4.  DAGENS VÄDER - Lägg till väderdata i DOM
    const weather_data = document.querySelector(".weather-data");
    weather_data.innerHTML = `
        <div class="weather-icon">${weatherIcon}</div>
        <div class="description"> 
            <p id="weather-description">${filteredData.weatherDesc}</p>
        </div>
        <div class="temp-wind">
            <div class="temp"> 
                <p>temp:<br> ${filteredData.temp}°C</p>
                <p>Feels like: <br> ${filteredData.FLtemp}°C</p>
            </div>
            <div class="wind"> 
                <p>wind:<br> ${filteredData.wind} m/s</p>
                <p>Gust:<br> ${filteredData.gust} m/s</p> 
            </div>
        </div>
        <!-- <div class="location"> 
            <p>${filteredData.location}</p>
        </div> -->
        `;

    // Göm loader
    currentWeatherLoader.classList.add("hidden");
  }

  // --------------------------------------------------------------------//

  // 3. DAGENS VÄDER - Funktion för att hämta rätt vädericon baserat på väder ID
  function getWeatherIcon(weatherId) {
    let weatherIcon = ``;
    switch (true) {
      case weatherId >= 200 && weatherId < 300:
        weatherIcon = `<img src="/img/thunderstorm.png" width="100">`;
        break;
      case weatherId >= 300 && weatherId < 400:
        weatherIcon = `<img src="/img/drizzle(1).png" width="100">`;
        break;
      case weatherId >= 500 && weatherId < 600:
        weatherIcon = `<img src="/img/heavy-rain.png" width="100">`;
        break;
      case weatherId >= 600 && weatherId < 700:
        weatherIcon = `<img src="/img/snow.png" width="100">`;
        break;
      case weatherId >= 700 && weatherId < 800:
        weatherIcon = `<img src="/img/foggy.png" width="100">`;
        break;
      case weatherId === 800:
        weatherIcon = `<img src="/img/sunny.png" width="100">`;
        break;
      case weatherId > 800 && weatherId < 803:
        weatherIcon = `<img src="/img/partlycloudy.png" width="100">`;
        break;
      case weatherId > 802:
        weatherIcon = `<img src="/img/clouds.png" width="100">`;
        break;

      default:
        "?";
        break;
    }

    return weatherIcon;
  }

  // ----------------------------- FORECAST -----------------------------//

  // 2. FORECAST - Hämta väderdata baserat på användarens geolocation
  async function getWeatherForeCast(latitude, longitude) {
    const open_meteoAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,wind_speed_10m_max,temperature_2m_max,temperature_2m_min&timezone=auto&wind_speed_unit=ms`;

    try {
      const response = await fetch(open_meteoAPI);
      if (!response.ok) {
        throw new Error(
          "API request failed with status :( :) " + response.status
        );
      }

      const data = await response.json();

      const cleanedDaily = filterData(data); // Filtrera ut data
      createForecastCard(cleanedDaily); // Skapa forecast kort med data och visa i DOM
    } catch (error) {
      console.error("det gick inte att hämta api", error);
      // Skapa error meddelande som syns i widget
      const forecast_container = document.querySelector(".forecast-container");
      forecast_container.innerHTML = `<p>Väderdata gick ej att hämta</p>`;
    }
  }

  // --------------------------------------------------------------------//
  // Funktion för att filtrera ut data
  function filterData(data) {
    const daily = data.daily;

    // Plocka bort första dagen och samla datan som behövs i nytt objekt
    const cleanedDaily = {
      date: daily.time.slice(1),
      weatherCode: daily.weather_code.slice(1),
      wind_speed: daily.wind_speed_10m_max.slice(1),
      max_temp: daily.temperature_2m_max.slice(1),
      min_temp: daily.temperature_2m_min.slice(1),
    };

    return cleanedDaily;
  }

  // --------------------------------------------------------------------//
  // Funktion för att skapa forecast kort med data
  function createForecastCard(cleanedDaily) {
    // Hämta forecastloader från DOM
    const forecastLoader = document.querySelector(".forecastLoader");

    // Hämta forecast container från DOM
    const forecast_container = document.querySelector(".forecast-container");

    for (let i = 0; i < cleanedDaily.date.length; i++) {
      let date = cleanedDaily.date[i];
      if (i === 0) {
        date = "Imorgon";
      }

      const max_temp = cleanedDaily.max_temp[i];
      const min_temp = cleanedDaily.min_temp[i];
      const wind = cleanedDaily.wind_speed[i];
      const weatherCode = cleanedDaily.weatherCode[i];

      // Hämta väderIcon
      const forecastIcon = getForecastIcon(weatherCode);

      // Skapa forecast rubrik
      const forecast_day = document.createElement("p");
      forecast_day.innerText = `${date}`;

      // Skapa forecast kort
      const forecast_card = document.createElement("div");
      forecast_card.classList.add("forecast");

      forecast_card.innerHTML = `
              <!-- weather icon -->
              <div class="forecastWeather-icon">
                  ${forecastIcon}
              </div>
      
              <!-- weather data -->
              <div class="data">
                  <div class="avg-temp">
                      <p>max<br />${max_temp}°C</p>
                  </div>
                  <div class="avg-temp">
                      <p>min<br />${min_temp}°C</p>
                  </div>
                  <div class="forecast-wind">
                      <p>wind<br />${wind}m/s</p>
                  </div>
              </div>
          `;
      forecast_container.appendChild(forecast_day);
      forecast_container.appendChild(forecast_card);
    }

    // Göm loader
    forecastLoader.classList.add("hidden");
  }

  // --------------------------------------------------------------------//

  // 3. FORECAST - Funktion för att hitta rätt väder icon baserat på väderkod
  function getForecastIcon(weatherCode) {
    let forecastIcon = ``;
    switch (true) {
      case weatherCode > 94:
        forecastIcon = `<img src="/img/thunderstorm.png" width="100">`;
        break;
      case weatherCode > 50 && weatherCode < 58:
        forecastIcon = `<img src="/img/drizzle(1).png" width="100">`;
        break;
      case (weatherCode > 60 && weatherCode < 68) ||
        (weatherCode > 79 && weatherCode < 83):
        forecastIcon = `<img src="/img/heavy-rain.png" width="100">`;
        break;
      case (weatherCode > 70 && weatherCode < 78) ||
        (weatherCode > 84 && weatherCode < 87):
        forecastIcon = `<img src="/img/snow.png" width="100">`;
        break;
      case weatherCode > 44 && weatherCode < 49:
        forecastIcon = `<img src="/img/foggy.png" width="100">`;
        break;
      case weatherCode === 0:
        forecastIcon = `<img src="/img/sunny.png" width="100">`;
        break;
      case weatherCode === 1 || weatherCode === 2:
        forecastIcon = `<img src="/img/partlycloudy.png" width="100">`;
        break;
      case weatherCode === 3:
        forecastIcon = `<img src="/img/clouds.png" width="100">`;
        break;

      default:
        forecastIcon = "?";
        break;
    }
    return forecastIcon;
  }
});
