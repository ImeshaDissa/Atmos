const { getCityCodes } = require('../src/services/cityLoader');
const { getWeatherForAllCities } = require('../src/services/weatherService');

// Smoke test: city codes should load and be usable.
describe('weather data setup', () => {
  test('loads city codes from cities.json', () => {
    const cityCodes = getCityCodes();
    expect(Array.isArray(cityCodes)).toBe(true);
    expect(cityCodes.length).toBeGreaterThan(0);
  });
});

async function testWeatherService() {
  const cityCodes = getCityCodes();
  const weatherData = await getWeatherForAllCities(cityCodes);
  console.log(weatherData); // weather data for all cities
}

if (require.main === module) {
  testWeatherService();
}