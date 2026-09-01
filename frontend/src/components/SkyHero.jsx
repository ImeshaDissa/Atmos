import { useTheme } from '../context/ThemeContext';

export default function SkyHero({ topCity }) {
  const { isDark } = useTheme();

  return (
    <div className={`relative overflow-hidden rounded-3xl mx-4 mt-4 p-8 transition-colors duration-700 ${
      isDark
        ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-br from-sky-300 via-sky-200 to-blue-100'
    }`}>
      
      
      {/* Decorative sky layer */}
      <div className="absolute inset-0 overflow-hidden">
        {isDark ? (
          <>
            {/* Stars */}
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white animate-twinkle"
                style={{
                  top: `${Math.random() * 70}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
            {/* Moon */}
            <div className="absolute top-8 right-16 h-16 w-16 rounded-full bg-slate-200 shadow-[0_0_60px_20px_rgba(226,232,240,0.25)]" />
          </>
        ) : (
          <>
            {/* Sun */}
            <div className="absolute -top-6 right-12 h-32 w-32 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 blur-[2px] shadow-[0_0_80px_30px_rgba(253,224,71,0.35)]" />
            {/* Drifting clouds */}
            <div className="absolute top-16 left-10 h-8 w-24 rounded-full bg-white/60 animate-drift" />
            <div className="absolute top-24 left-32 h-6 w-16 rounded-full bg-white/50 animate-drift" style={{ animationDelay: '2s' }} />
          </>
        )}

      </div>

      

      {/* Content */}
      <div className="relative">
        

        <div className="relative flex items-end justify-between">
          <div>
            <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-sky-900/70'}`}>
              Most Comfortable Right Now
            </p>
            <h1 className={`text-5xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {topCity ? `${Math.round(topCity.temp)}°` : '--'}
            </h1>
            <p className={`mt-1 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              {topCity ? `${topCity.city} · ${topCity.description}` : 'Loading...'}
            </p>
          </div>
          {topCity && (
            <div className={`rounded-2xl px-4 py-2.5 flex items-center gap-2 ${isDark ? 'bg-white/10' : 'bg-white/40'}`}>
              <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Comfort Score</span>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{topCity.comfortIndex}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}