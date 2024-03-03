const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to retrieve current weather data for a given city
app.get('/current', async (req, res) => {
  try {
    const city = req.query.city;
    const apiKey = 'afbcd2cd51e16aa3ebfbf4d74121be2b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching current weather:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Endpoint to retrieve a 5-day weather forecast for a given city
app.get('/forecast', async (req, res) => {
  try {
    const city = req.query.city;
    const apiKey = 'afbcd2cd51e16aa3ebfbf4d74121be2b';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching forecast:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
