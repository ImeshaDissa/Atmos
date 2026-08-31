const express = require('express');
const router = express.Router();

const { getCityCodes } = require('../services/cityLoader');
const { getWeatherForAllCities } = require('../services/weatherService');
const { calculateComfortIndex } = require('../services/comfortIndex');

router.get('/weather', async (req, res) => {
  try {
    const codes = getCityCodes();
    const weatherData = await getWeatherForAllCities(codes);

    const withScores = weatherData.map(city => ({
      city: city.name,
      temp: city.main.temp,
      humidity: city.main.humidity,
      windSpeed: city.wind.speed,
      description: city.weather[0].description,
      comfortIndex: calculateComfortIndex(city)
    }));

    const sorted = withScores.sort((a, b) => b.comfortIndex - a.comfortIndex);

    const ranked = sorted.map((city, index) => ({
      rank: index + 1,
      ...city
    }));

    res.json(ranked);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;