
import { useTheme } from '../context/ThemeContext';

export default function CityCard({ city }) {
    const { isDark } = useTheme();
    const { rank, city: name, description, temp, humidity, windSpeed, comfortIndex } = city;

    return (
        <div className={`relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-300 ${
        isDark
            ? 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
            : 'bg-white/70 border border-slate-200 hover:shadow-lg backdrop-blur-sm'
        }`}>
            <div className="flex items-baseline justify-between gap-2">
                <p className={`text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {Math.round(temp)}°C
                </p>
                <span className={`text-xl font-normal ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    {name}
                </span>
            </div>

            <p className={`text-md mt-3 capitalize ${isDark ? 'text-slate400' : 'text-slate-600'}`}>
                #{rank}
            </p>

            <p className={`text-md mt-3 capitalize ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {description}
            </p>

            <div className={`flex items-center justify-between mt-4 pt-3 border-t text-sm ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
            }`}>
                <span>💧 {humidity}%</span>
                <span>💨 {windSpeed} m/s</span>
                <span className={`font-semibold ${
                comfortIndex >= 80 ? 'text-emerald-400' : comfortIndex >= 60 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                {comfortIndex}/100
                </span>
            </div>
        </div>
    );
}