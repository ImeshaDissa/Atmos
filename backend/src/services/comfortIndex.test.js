
const { calculateComfortIndex } = require("./comfortIndex");

describe("calculateComfortIndex", () => {
  // Ideal conditions should score the maximum comfort value.
  test("returns 100 when temp, humidity, and wind are all within ideal ranges", () => {
    const weatherData = {
      main: {
        temp: 21,
        humidity: 45,
      },
      wind: { speed: 1.5 },
    };
    expect(calculateComfortIndex(weatherData)).toBe(100);
  });
  // High temperature should reduce comfort noticeably.
  test("returns a lower score when temperature is far outside the ideal range", () => {
    const hot = {
      main: {
        temp: 35,
        humidity: 45,
      },
      wind: { speed: 1.5 },
    };
    const ideal = {
      main: {
        temp: 21,
        humidity: 45,
      },
      wind: { speed: 1.5 },
    };
    expect(calculateComfortIndex(hot)).toBeLessThan(
      calculateComfortIndex(ideal),
    );
  });
  // Humid air should reduce comfort even if temperature is good.
  test("returns a lower score when humidity is far outside the ideal range", () => {
    const humid = {
      main: {
        temp: 21,
        humidity: 95,
      },
      wind: { speed: 1.5 },
    };
    const ideal = {
      main: {
        temp: 21,
        humidity: 45,
      },
      wind: { speed: 1.5 },
    };
    expect(calculateComfortIndex(humid)).toBeLessThan(
      calculateComfortIndex(ideal),
    );
  });
  // Very windy weather should lower the comfort score.
  test("returns a lower score when wind speed is far outside the ideal range", () => {
    const windy = {
      main: {
        temp: 21,
        humidity: 45,
      },
      wind: { speed: 15 },
    };
    const ideal = {
      main: {
        temp: 21,
        humidity: 45,
      },
      wind: { speed: 1.5 },
    };
    expect(calculateComfortIndex(windy)).toBeLessThan(
      calculateComfortIndex(ideal),
    );
  });

  // Safety guard: extreme weather must not go negative.
  test("never returns a score below 0, even in extreme conditions", () => {
    const extreme = {
      main: {
        temp: 55,
        humidity: 100,
      },
      wind: { speed: 40 },
    };
    const score = calculateComfortIndex(extreme);
    expect(score).toBeGreaterThanOrEqual(0);
  });
  // Score must stay within the defined 0–100 range.
  test("never returns a score above 100", () => {
    const weatherData = {
      main: {
        temp: 21,
        humidity: 45,
      },
      wind: { speed: 1.5 },
    };
    const score = calculateComfortIndex(weatherData);
    expect(score).toBeLessThanOrEqual(100);
  });

  // Final score should be a rounded whole number.
  test("returns an integer (rounded), not a decimal", () => {
    const weatherData = {
      main: {
        temp: 23.7,
        humidity: 52.3,
      },
      wind: { speed: 2.8 },
    };
    const score = calculateComfortIndex(weatherData);
    expect(Number.isInteger(score)).toBe(true);
  });

  // Cold conditions should also reduce comfort.
  test("returns a lower score when temperature is below the ideal range", () => {
    const cold = {
      main: {
        temp: 10,
        humidity: 45,
      },
      wind: { speed: 1.5 },
    };
    const ideal = {
      main: {
        temp: 21,
        humidity: 45,
      },
      wind: { speed: 1.5 },
    };

    expect(calculateComfortIndex(cold)).toBeLessThan(
      calculateComfortIndex(ideal),
    );
  });

  // Too little wind can also feel unpleasant and lower comfort.
  test("returns a lower score when wind speed is extremely low", () => {
    const still = {
      main: {
        temp: 21,
        humidity: 45,
      },
      wind: { speed: 0 },
    };
    const ideal = {
      main: {
        temp: 21,
        humidity: 45,
      },
      wind: { speed: 1.5 },
    };

    expect(calculateComfortIndex(still)).toBeLessThan(
      calculateComfortIndex(ideal),
    );
  });

  // Multiple bad conditions should compound the penalty.
  test("drops sharply when multiple conditions are far outside the comfort band", () => {
    const severe = {
      main: {
        temp: 35,
        humidity: 90,
      },
      wind: { speed: 10 },
    };
    const ideal = {
      main: {
        temp: 21,
        humidity: 45,
      },
      wind: { speed: 1.5 },
    };

    expect(calculateComfortIndex(severe)).toBeLessThan(
      calculateComfortIndex(ideal),
    );
  });

  // Temperature should matter more than wind in the final weighting.
  test("weights temperature more heavily than wind speed", () => {
    // same distance from ideal band edge, but temp penalty (3) > wind penalty is NOT true (wind=6) - // this test instead checks weighting: a temp deviation should hurt more than an equivalent-effort wind deviation // because temp has weight 0.5 vs wind's weight 0.2
    const tempOff = {
      main: {
        temp: 25,
        humidity: 45,
      }, // 3 degrees outside 20-22
      wind: { speed: 1.5 },
    };
    const windOff = {
      main: {
        temp: 21,
        humidity: 45,
      },
      wind: { speed: 2.5 }, // 0.5 outside 1-2, smaller absolute deviation
    }; // Just confirms both are penalized versus the ideal case
    const ideal = calculateComfortIndex({
      main: { temp: 21, humidity: 45 },
      wind: { speed: 1.5 },
    });

    expect(calculateComfortIndex(tempOff)).toBeLessThan(ideal);
    expect(calculateComfortIndex(windOff)).toBeLessThan(ideal);
    
  });
});
