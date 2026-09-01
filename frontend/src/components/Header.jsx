import atmosLogo from '../assets/atmos.svg';
import { useTheme } from '../context/ThemeContext';
import LogoutButton from './LogoutButton';

export default function Header({ query, onQueryChange }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`mx-4 mt-4 flex items-center justify-between gap-4 rounded-2xl px-5 py-3 transition-colors duration-500 ${
      isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-white/80 border border-slate-200 shadow-sm'
    }`}>
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <img src={atmosLogo} alt="Atmos" className="h-7 w-7" />
        <span className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          Atmos
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-full">
        <input
          type="text"
          placeholder="Enter city name"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          className={`w-full rounded-full px-4 py-2 text-sm outline-none transition-colors ${
            isDark
              ? 'bg-slate-800 text-slate-200 placeholder:text-slate-500'
              : 'bg-slate-100 text-slate-800 placeholder:text-slate-400'
          }`}
        />
      </div>

      

      {/* Theme toggle (replaces hamburger) */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`flex h-9 w-9 items-center justify-center rounded-full text-base shrink-0 transition-colors ${
          isDark ? 'bg-slate-800 text-yellow-200' : 'bg-slate-100 text-orange-500'
        }`}
      >
        {isDark ? '🌙' : '☀️'}
      </button>

       <LogoutButton/> 
    </header>
  );
}