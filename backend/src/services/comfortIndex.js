//formulae
//temp = 20 - 22 celcius,
//humidity = 50 - 40 %
// wind speed  between 1–2 m/s
//taking ranges rather than exact values to account for variations in weather conditions and personal comfort levels.
//visiblity 8000-10000

function calculateComfortIndex(weatherData) {
  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const visibility  = weatherData.visibility;

  //let comfortIndex = 0;

  function rangeScore(value, min, max, penalty) {
    if (value >= min && value <= max) return 100; //100 inside the range
    
    const distance = value < min ? min - value : value - max;
    
    return 100 - distance * penalty;//substract the further the away from range
  }

  //temp ranged 20-22 celcius
  const temparatureScore = rangeScore(temp, 20, 22, 3);

  //humidity ranged 40-50%
  const humidityScore = rangeScore(humidity, 40, 50, 1.5);

  //wind speed ranged 1-2 m/s
  const windSpeedScore = rangeScore(windSpeed, 1, 2, 6);

  //viisbility
  const visibilityScore = rangeScore(visibility, 8000, 10000, 0.01); 
  
  //weighting the scores based on their importance to comfort
  const rawScore =
      temparatureScore * 0.5 
    + humidityScore * 0.3 
    + windSpeedScore * 0.2
    + visibilityScore * 0.1;;

  //score to a scale of 0 to 100
  const comfortScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  return comfortScore;
}

module.exports = { calculateComfortIndex };

//if value is inside the range  score = 100
//if not ... score = 100 - (distance from range) * penalty
//penalty = 3 for temp, 1.5 for humidity, 6 for wind speed
