function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'afbcd2cd51e16aa3ebfbf4d74121be2b'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayCurrentWeather(data);
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      })
      .then(response => response.json())
      .then(data => displayForecast(data))
      .catch(error => console.log('Error fetching data:', error));
  }
  
  function displayCurrentWeather(data) {
    const currentWeatherContainer = document.getElementById('currentWeather');
    currentWeatherContainer.innerHTML = `
      <h2>Current Weather in ${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Weather: ${data.weather[0].description}</p>
    `;
  }
  
  function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '<h2>5-Day Weather Forecast</h2>';
  
    for (let i = 0; i < data.list.length; i += 8) {
      const forecast = data.list[i];
      const date = new Date(forecast.dt * 1000);
      const dateString = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  
      forecastContainer.innerHTML += `
        <div>
          <p>${dateString}</p>
          <p>Temperature: ${forecast.main.temp}°C</p>
          <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather Icon">
        </div>
      `;
    }
  }
  