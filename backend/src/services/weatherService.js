//get api weather

require('dotenv').config();
const axios = require('axios');
const weatherCache = require('../cache/cache');

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeatherByCityCode(cityCode) {//get weather for one city code
    const cacheKey = `weather_${cityCode}`;//

    const cached = weatherCache.get(cacheKey);//check for cache
    if (cached) {
        console.log(`cached for ${cityCode}`);
        return cached;
    }
  
    console.log(`not cached for ${cityCode}`);//not chached -fetch from api

    const url = `${BASE_URL}?id=${cityCode}&appid=${API_KEY}&units=metric`;//units=metric to get celcius
    const response = await axios.get(url);
    
    weatherCache.set(cacheKey, response.data);//save in cache
    
    return response.data;
}

async function getWeatherForAllCities(cityCodes) {//get weather for many cities
  const promises = cityCodes.map(code => getWeatherByCityCode(code));
  const results = await Promise.all(promises);//all once, wait for all
  return results;
}

module.exports = { getWeatherByCityCode, getWeatherForAllCities };