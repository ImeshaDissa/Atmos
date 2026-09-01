# Fidenz - Assignment (Full Stack)

## Project: Atmos

Atmos is a weather analytics application that retrieves weather data for major cities, computes a custom comfort score, and presents the results in a responsive dashboard. It includes server-side caching, a backend API, and Auth0-based authentication with an MFA-aware configuration.

## Objective

Develop a secure weather analytics application that retrieves weather data, processes it using a custom metric, and presents meaningful insights.

The solution includes:
- Weather data retrieval
- Custom Comfort Index processing
- Responsive UI
- Server-side caching
- Authentication and authorization via Auth0

---

## Features

- Fetches weather data for cities listed in the dataset
- Computes a custom Comfort Index from 0 to 100
- Ranks cities from most comfortable to least comfortable
- Provides a dashboard UI for desktop and mobile layouts
- Uses in-memory caching to reduce repeated API calls
- Includes a debug route to inspect cache HIT/MISS behavior
- Secures dashboard access using Auth0 login flow
- Restricts access to whitelisted users

---

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- HTTP client: Axios
- Caching: node-cache
- Weather source: OpenWeatherMap API
- Authentication: Auth0
- Styling: Tailwind CSS

---

## Comfort Index Formula

The Comfort Index is computed on the backend and returns a value from 0 to 100.

### Why this formula

Comfort is not driven by a single variable. Temperature strongly affects perceived comfort, humidity makes conditions feel muggy or dry, and wind speed changes how fresh or uncomfortable the air feels. I used a weighted formula that reflects how people generally experience outdoor weather:

- Temperature matters most
- Humidity matters significantly
- Wind speed matters, but less than temperature and humidity

### Parameters used

- Temperature (°C)
- Humidity (%)
- Wind speed (m/s)

### Ideal ranges

| Parameter | Ideal range | Reason |
| --- | --- | --- |
| Temperature | 20–22°C | This is a commonly accepted comfortable thermal zone for most people. |
| Humidity | 40–50% | Balanced humidity feels neither sticky nor overly dry. |
| Wind speed | 1–2 m/s | A light breeze feels fresh without becoming uncomfortable. |

These ranges are treated as comfort bands rather than single exact values so cities near the ideal conditions score well without creating a brittle "only one perfect value" system.

### Scoring logic

For each metric, a score is computed based on how close the value is to the ideal band.

- If the value falls within the ideal band, that metric gets a near-maximum score.
- If it falls outside the band, the score drops proportionally based on distance from the nearest acceptable range edge.
- Different penalties are applied because each factor affects real comfort differently.

### Weighting

The final comfort score is:

Comfort Score = (Temperature Score × 0.50) + (Humidity Score × 0.30) + (Wind Score × 0.20)

This weighting reflects the fact that temperature is the dominant factor, humidity strongly affects perceived comfort, and wind has a smaller but still relevant effect.

### Final output

- Score is normalized to 0–100
- Results are sorted from most comfortable to least comfortable
- The dashboard displays city name, weather description, temperature, ranking, and comfort score

---

## Cache Design

The application uses server-side caching to avoid unnecessary repeated calls to the OpenWeatherMap API.

### Implementation details
- Raw API responses are cached for 5 minutes
- Cached entries are reused until expiry
- A debug endpoint exposes cache status (HIT / MISS) to verify the behavior

### Why caching matters

Weather data changes over time, but not every few seconds. Caching reduces API load, improves response time, and prevents redundant processing for the same city during the same refresh window.

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm
- OpenWeatherMap API key
- Auth0 application credentials

### 1. Clone the repository

```bash
git clone <repository-url>
cd atmos
```

### 2. Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend root using the following variables:

```env
PORT=4000
OPENWEATHER_API_KEY=your_openweather_api_key
AUTH0_DOMAIN=your_auth0_domain
AUTH0_AUDIENCE=your_auth0_audience
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

For the frontend, create a `.env` file in the frontend folder:

```env
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=your_auth0_audience
```

### 4. Start the project

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
```

---

## Authentication and Authorization

The dashboard is protected behind Auth0 authentication.

### Access control behavior
- Unauthenticated users are redirected to the login screen
- Only authorized users can view the dashboard
- Public signups are disabled
- Whitelisted users can access the application

### MFA note

The assignment says "Enable MFA via email verification." In practice, Auth0 does not allow email verification to act as the only MFA factor. For a compliant setup, email-based verification must be paired with another standard factor such as OTP or an authenticator app.

To meet the assignment intent while staying within Auth0's platform rules, this app is configured to support MFA as a multi-factor flow where email is used alongside OTP. This is a deliberate workaround for the platform limitation and ensures users can still complete the required second-factor flow.

---

## Known Limitations

- The application uses in-memory caching rather than Redis or a persistent external cache.
- The comfort formula is intentionally heuristic and designed for practical use rather than clinical thermal modeling.
- Auth0 MFA cannot be configured as email-only verification because the platform requires a second standard factor alongside email verification.
- Weather information is limited to the city dataset and OpenWeatherMap API availability.

---

## Project Structure

```text
atmos/
├── backend/
│   ├── src/
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── README.md
├── package.json
└── package-lock.json
```

---

## Future Enhancements

- Add filtering and sorting in the frontend
- Add graphs for temperature and comfort trends
- Add unit tests for the comfort index function
- Extend the formula with additional factors such as visibility or pressure
- Improve dark mode and accessibility

---

## Submission Notes

This application is designed to satisfy the assignment requirements for:
- responsive weather dashboard
- OpenWeatherMap integration
- custom comfort calculation
- caching
- Auth0 authentication and MFA-aware configuration
- documentation and reasoning in the project README

---

## Summary

Atmos demonstrates a full-stack weather analytics solution with a clear scoring model, protected access, and a responsive dashboard. The Comfort Index is intentionally designed to balance human comfort perceptions with real-world environmental conditions while keeping the backend logic transparent and explainable.

