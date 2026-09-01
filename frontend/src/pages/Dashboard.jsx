import { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import SkyHero from '../components/SkyHero';
import CityList from '../components/CityList';
import { useTheme } from '../context/ThemeContext';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const { isDark } = useTheme();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await api.get('/weather', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCities(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load weather data. Is the backend running?');
        setLoading(false);
      } finally {
        setLoading(false);
      }

    };
    fetchWeatherData();
  }, [getAccessTokenSilently]);

  const filtered = cities.filter(c =>
    c.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`min-h-screen pb-16 transition-colors duration-700 ${isDark ? 'bg-slate-950' : 'bg-sky-50'}`}>
      <Header query={query} onQueryChange={setQuery} />
      {loading && <p className="text-center pt-20 text-slate-400">Loading weather data...</p>}
      {error && <p className="text-center pt-20 text-rose-400">{error}</p>}
      {!loading && !error && (
        <>
          <SkyHero topCity={cities[0]} />
          <CityList cities={filtered} />
        </>
      )}
    </div>
  );
}

export default Dashboard;