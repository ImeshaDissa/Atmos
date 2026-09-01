import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full text-lg transition-colors ${
        isDark ? 'bg-slate-800 text-yellow-200' : 'bg-white text-orange-500 shadow-md'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}