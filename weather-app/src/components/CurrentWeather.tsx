interface WeatherDataProps {
  data: {
    name: string;
    timezone: number;
    main: { 
      temp: number; 
      humidity: number; 
      feels_like: number; 
    };
    weather: { description: string; icon: string; }[];
    wind: { speed: number; };
    sys: { sunset: number; }; 
  };
  unit: 'C' | 'F';
}

const CurrentWeather = ({ data, unit }: WeatherDataProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  const displayTemp = unit === 'C' 
    ? Math.round(data.main.temp) 
    : Math.round((data.main.temp * 9/5) + 32);

  const feelsLikeTemp = unit === 'C'
    ? Math.round(data.main.feels_like)
    : Math.round((data.main.feels_like * 9/5) + 32);

  const getLocalTime = (timezoneOffset: number) => {
    const currentUtc = new Date().getTime();
    const localTimeAtCity = currentUtc + (timezoneOffset * 1000);
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC' 
    }).format(new Date(localTimeAtCity));
  };

  // --- LOGIKA MENGHITUNG JAM SUNSET LOKAL KOTA TERSEBUT ---
  const getSunsetTime = (timestamp: number, timezoneOffset: number) => {
    const sunsetLocalTime = (timestamp + timezoneOffset) * 1000;
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC' 
    }).format(new Date(sunsetLocalTime));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg mb-6 text-center relative overflow-hidden">
      
      <h2 className="text-3xl font-bold">{data.name}</h2>
      
      <p className="text-blue-100 font-medium mt-1 mb-2 tracking-wide">
        {getLocalTime(data.timezone)}
      </p>
      
      <div className="flex justify-center">
        <img src={iconUrl} alt={data.weather[0].description} className="w-32 h-32 drop-shadow-lg" />
      </div>

      <p className="text-6xl font-extrabold mb-2">{displayTemp}°{unit}</p>
      
      <p className="text-xl capitalize italic opacity-90 mb-4">
        {data.weather[0].description}
      </p>

      {/* --- GRID 4 KOTAK YANG BARU --- */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 mt-6 pt-6 border-t border-white/20 relative z-10">
        
        {/* Kotak 1: Kelembapan */}
        <div>
          <p className="text-sm opacity-75 text-blue-100 mb-1">Kelembapan</p>
          <p className="font-semibold text-lg flex justify-center items-center gap-1">
            💧 {data.main.humidity}%
          </p>
        </div>
        
        {/* Kotak 2: Angin */}
        <div>
          <p className="text-sm opacity-75 text-blue-100 mb-1">Angin</p>
          <p className="font-semibold text-lg flex justify-center items-center gap-1">
            💨 {data.wind.speed} m/s
          </p>
        </div>

        {/* Kotak 3: Terasa Seperti */}
        <div>
          <p className="text-sm opacity-75 text-blue-100 mb-1">Terasa Seperti</p>
          <p className="font-semibold text-lg flex justify-center items-center gap-1">
            🌡️ {feelsLikeTemp}°{unit}
          </p>
        </div>

        {/* Kotak 4: Matahari Terbenam */}
        <div>
          <p className="text-sm opacity-75 text-blue-100 mb-1">Matahari Terbenam</p>
          <p className="font-semibold text-lg flex justify-center items-center gap-1">
            🌇 {getSunsetTime(data.sys.sunset, data.timezone)}
          </p>
        </div>

      </div>
    </div>
  );
};

export default CurrentWeather;