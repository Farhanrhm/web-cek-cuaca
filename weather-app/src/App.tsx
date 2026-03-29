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

  // --- 1. FITUR GEOLOCATION (Berjalan saat aplikasi pertama dibuka) ---
  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.warn("Akses lokasi ditolak atau gagal:", err);
          fetchWeather("bandung"); 
        }
      );
    } else {
      fetchWeather("bandung");
    }
  }, []); 

  // --- 2. FUNGSI MENCARI BERDASARKAN KOORDINAT ---
  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=id`;
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=id`;
    await executeFetch(WEATHER_URL, FORECAST_URL);
  };

  // --- 3. FUNGSI MENCARI BERDASARKAN NAMA KOTA ---
  const fetchWeather = async (city: string) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=id`;
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=id`;
    await executeFetch(WEATHER_URL, FORECAST_URL);
  };

  // --- 4. FUNGSI UTAMA PENGAMBIL DATA (Agar kode rapi) ---
  const executeFetch = async (WEATHER_URL: string, FORECAST_URL: string) => {
    try {
      setLoading(true);
      setError(null);

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(WEATHER_URL),
        fetch(FORECAST_URL)
      ]);

      const weatherJson = await weatherRes.json();
      const forecastJson = await forecastRes.json();
      
      if (weatherJson.cod === 200 && weatherJson.name) {
        setWeatherData(weatherJson);
        setForecastData(forecastJson);
        setError(null);
      } else {
        setWeatherData(null);
        setForecastData(null);
        setError("Oops! Kota tidak ditemukan. Coba cek ejaannya ya.");
      }
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      setWeatherData(null);
      setForecastData(null);
      setError("Gagal terhubung ke server. Periksa koneksi internetmu.");
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = () => {
    if (error || !weatherData) return "from-blue-300 via-blue-400 to-indigo-500";
    const condition = weatherData.weather[0].main; 
    const icon = weatherData.weather[0].icon;      
    const isNight = icon.includes('n');
    
    switch (condition) {
      case 'Clear': return isNight ? "from-gray-900 via-purple-900 to-indigo-900" : "from-blue-400 via-blue-300 to-yellow-200";
      case 'Clouds': return isNight ? "from-gray-800 via-gray-700 to-slate-800" : "from-gray-300 via-slate-400 to-blue-300";
      case 'Rain': case 'Drizzle': return "from-slate-700 via-gray-600 to-blue-900";
      case 'Thunderstorm': return "from-slate-900 via-purple-900 to-black";
      case 'Snow': return "from-blue-100 via-white to-blue-200";
      default: return "from-gray-400 via-gray-300 to-slate-400"; 
    }
  };

  const toggleUnit = () => {
    setUnit(prevUnit => prevUnit === 'C' ? 'F' : 'C');
  };

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${getBackgroundClass()} flex justify-center items-center p-4 font-sans transition-colors duration-1000 ease-in-out overflow-hidden`}>
      
      {!error && weatherData && (
        <WeatherBackground 
          condition={weatherData.weather[0].main} 
          isNight={weatherData.weather[0].icon.includes('n')} 
        />
      )}

      <div className="relative z-10 max-w-xl w-full bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/40">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm">
            Cek cuaca di kotamu! 
          </h1>
          
          <button 
            onClick={toggleUnit}
            className="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-full hover:bg-blue-200 transition-all shadow-sm"
            title="Ubah Satuan Suhu"
          >
            Ubah ke °{unit === 'C' ? 'F' : 'C'}
          </button>
        </div>
        
        <SearchBar onSearch={fetchWeather} />
        
        {loading && <SkeletonLoader />}

        {error && !loading && (
          <div className="mt-6 p-4 bg-red-100/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-2xl text-center animate-fadeInUp shadow-sm">
            <p className="text-2xl mb-2">🌩️</p>
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {!error && !loading && weatherData && (
          <div className="mt-6 animate-fadeInUp">
            <CurrentWeather data={weatherData} unit={unit} />
          </div>
        )}
        
        {!error && !loading && forecastData && (
          <div className="mt-6 animate-fadeInUp">
            <Forecast data={forecastData} unit={unit} />
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;