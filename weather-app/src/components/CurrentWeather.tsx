interface WeatherDataProps {
  data: {
    name: string;
    timezone: number;
    main: { temp: number; humidity: number; feels_like: number; };
    weather: { description: string; icon: string; }[];
    wind: { speed: number; };
    sys: { sunset: number; };
  };
  unit: 'C' | 'F';
  isSnow?: boolean;
}

const CurrentWeather = ({ data, unit, isSnow = false }: WeatherDataProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  const toDisplay = (c: number) => unit === 'C' ? Math.round(c) : Math.round((c * 9 / 5) + 32);

  const getLocalTime = (offset: number) => {
    const local = new Date().getTime() + offset * 1000;
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'UTC'
    }).format(new Date(local));
  };

  const getSunset = (ts: number, offset: number) =>
    new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit', minute: '2-digit', timeZone: 'UTC'
    }).format(new Date((ts + offset) * 1000));

  const text  = isSnow ? 'text-slate-800'     : 'text-white';
  const muted = isSnow ? 'text-slate-500'      : 'text-white/45';
  const sub   = isSnow ? 'text-slate-600'      : 'text-white/70';
  const pillBg = isSnow
    ? 'bg-slate-100 border-slate-200'
    : 'bg-white/[0.07] border-white/[0.1]';

  const stats = [
    { icon: '💧', label: 'Kelembapan',        value: `${data.main.humidity}%` },
    { icon: '💨', label: 'Angin',             value: `${data.wind.speed} m/s` },
    { icon: '🌡️', label: 'Terasa Seperti',   value: `${toDisplay(data.main.feels_like)}°${unit}` },
    { icon: '🌇', label: 'Matahari Terbenam', value: getSunset(data.sys.sunset, data.timezone) },
  ];

  return (
    <div className="mb-2">
      {/* Hero section */}
      <div className="text-center mb-6">
        {/* City + time */}
        <div className="mb-3">
          <h2
            className={`text-2xl font-extrabold tracking-tight ${text}`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {data.name}
          </h2>
          <p className={`text-xs mt-1 ${muted}`}>{getLocalTime(data.timezone)}</p>
        </div>

        {/* Icon + temperature side by side on larger screens */}
        <div className="flex items-center justify-center gap-2">
          <img
            src={iconUrl}
            alt={data.weather[0].description}
            className="w-28 h-28 drop-shadow-2xl animate-float"
          />
          <div className="text-left">
            <p
              className={`font-semibold leading-none tracking-tighter ${text}`}
              style={{ fontSize: 'clamp(4rem, 15vw, 6rem)' }}
            >
              {toDisplay(data.main.temp)}
              <span className={`text-4xl font-light ml-1 relative -top-4 ${sub}`}>°{unit}</span>
            </p>
            <p className={`text-sm capitalize italic mt-1 ${sub}`}>
              {data.weather[0].description}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="mb-5"
        style={{
          height: '1px',
          background: isSnow
            ? 'rgba(0,0,0,0.08)'
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)'
        }}
      />

      {/* Stat pills grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200 ${pillBg}`}
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <span className="text-xl leading-none">{s.icon}</span>
            <div>
              <p className={`text-[10px] uppercase tracking-widest font-semibold ${muted}`}>{s.label}</p>
              <p className={`text-sm font-bold mt-0.5 ${text}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;
