function getWeather() {
    const city = document.getElementById('cityInput').value;
    fetch(`http://localhost:5500/current?city=${city}`)
        .then(response => response.json())
        .then(data => {
        displayWeather(data);
        return fetch(`http://localhost:5500/forecast?city=${city}`);
        })
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.log('Error fetching data:', error));
}

function displayWeather(data) {
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
  
    let totalTemp = 0;
    for (let i = 0; i < data.list.length; i += 8) {
      const forecast = data.list[i];
      totalTemp += forecast.main.temp;
  
      const date = new Date(forecast.dt * 1000);
      const dateString = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
      const weatherDescription = forecast.weather[0].description;
      const icon = getWeatherIcon(weatherDescription);

      forecastContainer.innerHTML += `
            <div class="forecast-item">
                <p>${dateString}</p>
                <p>Temperature: ${forecast.main.temp}°C</p>
                <img src="${icon}" alt="Weather Icon">
            </div>
        `;
    }
  
    const averageTemp = totalTemp / (data.list.length / 8);
    forecastContainer.innerHTML += `<p>Average Temperature: ${averageTemp.toFixed(2)}°C</p>`;
}
  
function getWeatherIcon(description) {
    if (description.includes('clouds')) {
      return 'cloudy.png'; 
    } else if (description.includes('rain')) {
      return 'rainy.png'; 
    } else if (description.includes('clear')) {
      return 'sunny.png'; 
    } else {
      return 'default.png';
    }
}