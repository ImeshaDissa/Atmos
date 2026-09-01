const {getCityCodes} = require('../src/services/cityLoader');
const {getWeatherForAllCities} = require('../src/services/weatherService');

console.log(getCityCodes()); //city codes from cities.json

//----------------------------------------------------

async function testWeatherService() {
    const cityCodes = getCityCodes();
    const weatherData = await getWeatherForAllCities(cityCodes);
    console.log(weatherData); //weather data for all cities
}

testWeatherService();