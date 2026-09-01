Atmos | Weather Comfort Index App

A weather analytics app that fetches live weather data for 15 cities, computes a custom Comfort Index Score for each, and ranks them from most to least comfortable.

----------------------------------------------------------

Tech Stack
Backend: Node.js + Express
HTTP client: Axios
Caching: node-cache (in-memory, 5-minute TTL)
Weather data: OpenWeatherMap API
Frontend: React
Auth: Auth0
---------------------------------------------------------

Comfort Index Formula

The Comfort Index scores each city from 0 (least comfortable) to 100 (most comfortable) based on three parameters: temperature, humidity, and wind speed.

Ideal ranges chosen>
Parameter	|  Ideal Range	|Reasoning
            |               |
Temperature	|   20–22°C	    |The commonly cited "room temperature" comfort zone — neither jacket nor sweat needed.
            |               |         
Humidity	|   40–50%	    |The range most indoor-comfort/HVAC guidelines cite as ideal — avoids "sticky" or overly dry air.
            |               |         
Wind Speed	|   1–2 m/s	    |A barely-noticeable breeze — enough for fresh air without being disruptive.

Ranges were used instead of single ideal values because comfort is naturally a band, not a single point — this also lets multiple cities score close to 100 rather than forcing one "perfect" answer.

How scoring works

For each parameter, a rangeScore function is used:

If the value falls inside the ideal range → score = 100
If the value falls outside the range → score = 100 - (distance from nearest range edge) × penalty

Different penalties are applied per parameter, since each has a different sensitivity:

Parameter	| Penalty | Reasoning
            |         |
Temperature |	 3	  | Moderate sensitivity- a few degrees off is noticeable but tolerable.
            |         |
Humidity	|   1.5   | Least sensitive- comfort tolerates a wider humidity swing before feeling unpleasant.
            |         |
Wind Speed	|    6	  | Most sensitive- small absolute changes in wind shows a large relative change in how windy it actually feels.

Penalty values were tuned by testing against the 15 sample cities and adjusting until the resulting ranking matched intuitive comfort expectations (e.g. very windy or very hot/humid cities landing near the bottom).

Weighting

The three scores are combined into a weighted average:
       |--------------------------------------------------------------------------------------|
       | comfortScore = (temperatureScore × 0.5) + (humidityScore × 0.3) + (windScore × 0.2)  |
       |--------------------------------------------------------------------------------------|
       
Parameter	|  Weight	| Reasoning
Temperature |	50%	    |The dominant factor of comfortable weather feels overall, it's what people notice and complain about first.
Humidity	|   30%	    |Strongly affects how temperature feels (mugginess vs. dryness), but secondary to raw temperature.
Wind Speed	|   20%	    |Matters, but has the smallest overall influence on general comfort compared to temperature and humidity.

The final score is rounded and clamped to the 0–100 range.

