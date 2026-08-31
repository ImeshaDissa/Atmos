import CityCard from './CityCard';
import { useTheme } from '../context/ThemeContext';

export default function CityList({ cities }) {
  const { isDark } = useTheme();
  const topCities = cities.slice(0, 4);
  const remainingCities = cities.slice(4);

  if (cities.length === 0) {
    return <p className={`text-center mt-16 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>No cities match your search.</p>;
  }

  return (
    <div className="max-w-full mx-auto px-10 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {topCities.map(city => <CityCard key={city.city} city={city} />)}
      </div>

      {remainingCities.length > 0 && (
        <div className="mt-8 px-3">
          <h2 className={`mb-3 text-sm font-medium uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            More Cities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {remainingCities.map(city => (
              <div
                key={city.city}
                className={`flex items-center justify-between rounded-xl border px-6 py-3 text-sm ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/60 text-slate-200'
                    : 'border-slate-200 bg-white/60 text-slate-700'
                }`}
              >
                <span className="font-medium">#{city.rank}</span>
                <span className="flex-1 px-3 text-left">{city.city}</span>
                <span className={`font-semibold ${city.comfortIndex >= 80 ? 'text-emerald-400' : city.comfortIndex >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {city.comfortIndex}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}