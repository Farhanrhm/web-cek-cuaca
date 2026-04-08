import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherBackground from './components/WeatherBackground';
import SkeletonLoader from './components/SkeletonLoader';

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeatherByLocation(position.coords.latitude, position.coords.longitude),
        () => fetchWeather("bandung")
      );
    } else {
      fetchWeather("bandung");
    }
  }, []);

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    await executeFetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=id`,
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=id`
    );
  };

  const fetchWeather = async (city: string) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    await executeFetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=id`,
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=id`
    );
  };

  const executeFetch = async (WEATHER_URL: string, FORECAST_URL: string) => {
    try {
      setLoading(true);
      setError(null);
      const [weatherRes, forecastRes] = await Promise.all([fetch(WEATHER_URL), fetch(FORECAST_URL)]);
      const weatherJson = await weatherRes.json();
      const forecastJson = await forecastRes.json();
      if (weatherJson.cod === 200 && weatherJson.name) {
        setWeatherData(weatherJson);
        setForecastData(forecastJson);
        setError(null);
      } else {
        setWeatherData(null);
        setForecastData(null);
        setError("Kota tidak ditemukan. Coba cek ejaannya ya.");
      }
    } catch {
      setWeatherData(null);
      setForecastData(null);
      setError("Gagal terhubung ke server. Periksa koneksi internetmu.");
    } finally {
      setLoading(false);
    }
  };

  /** Returns a rich dark gradient per condition */
  const getBg = () => {
    if (error || !weatherData) return "from-[#0f172a] via-[#1e1b4b] to-[#0f172a]";
    const cond = weatherData.weather[0].main;
    const night = weatherData.weather[0].icon.includes('n');
    switch (cond) {
      case 'Clear':       return night
        ? "from-[#020617] via-[#1e1b4b] to-[#0c0a3e]"
        : "from-[#0c4a6e] via-[#075985] to-[#f59e0b]/30";
      case 'Clouds':      return night
        ? "from-[#111827] via-[#1f2937] to-[#0f172a]"
        : "from-[#1e293b] via-[#334155] to-[#1e293b]";
      case 'Rain':
      case 'Drizzle':     return "from-[#0f172a] via-[#1e3a5f] to-[#0f2744]";
      case 'Thunderstorm':return "from-[#020617] via-[#1e1b4b] to-[#000]";
      case 'Snow':        return "from-[#e0f2fe] via-[#bae6fd] to-[#f0f9ff]";
      default:            return "from-[#1e293b] via-[#334155] to-[#0f172a]";
    }
  };

  const isSnow = weatherData?.weather[0].main === 'Snow';

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br ${getBg()} flex justify-center items-start md:items-center p-4 sm:p-6 transition-colors duration-1000 ease-in-out overflow-hidden`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-orb absolute w-96 h-96 rounded-full blur-[120px] opacity-20 top-[-5%] left-[-10%] bg-blue-500" />
        <div className="animate-orb absolute w-80 h-80 rounded-full blur-[100px] opacity-15 bottom-[10%] right-[-5%] bg-violet-500" style={{ animationDelay: '3s' }} />
      </div>

      {!error && weatherData && (
        <WeatherBackground
          condition={weatherData.weather[0].main}
          isNight={weatherData.weather[0].icon.includes('n')}
        />
      )}

      {/* Main card */}
      <div
        className="relative z-10 w-full max-w-md my-6"
        style={{
          background: isSnow ? 'rgba(255,255,255,0.82)' : 'rgba(15,23,42,0.75)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: isSnow ? '1px solid rgba(255,255,255,0.7)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: '28px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-7 pt-7 pb-5">
          <div>
            <h1
              className={`text-2xl font-extrabold tracking-tight ${isSnow ? 'text-slate-800' : 'text-white'}`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Cuaca Hari Ini
            </h1>
            <p className={`text-xs mt-0.5 ${isSnow ? 'text-slate-500' : 'text-white/40'}`}>
              Real-time weather tracker
            </p>
          </div>

          <button
            onClick={() => setUnit(u => u === 'C' ? 'F' : 'C')}
            className={`text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 ${
              isSnow
                ? 'bg-slate-800 text-white hover:bg-slate-700'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
            }`}
          >
            °{unit === 'C' ? 'F' : 'C'}
          </button>
        </div>

        {/* Search */}
        <div className="px-7 pb-5">
          <SearchBar onSearch={fetchWeather} isSnow={isSnow} />
        </div>

        {/* Content area */}
        <div className="px-7 pb-7">
          {loading && <SkeletonLoader isSnow={isSnow} />}

          {error && !loading && (
            <div
              className="mt-2 p-5 rounded-2xl text-center animate-fadeInScale"
              style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              <p className="text-3xl mb-2">🌩️</p>
              <p className="text-red-300 font-semibold text-sm">{error}</p>
            </div>
          )}

          {!error && !loading && weatherData && (
            <div className="animate-fadeInUp">
              <CurrentWeather data={weatherData} unit={unit} isSnow={isSnow} />
            </div>
          )}

          {!error && !loading && forecastData && (
            <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <Forecast data={forecastData} unit={unit} isSnow={isSnow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
