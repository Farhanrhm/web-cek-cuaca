interface ForecastProps {
  data: {
    list: {
      dt: number;
      dt_txt: string;
      main: { temp: number; temp_min?: number; temp_max?: number; };
      weather: { icon: string; description: string }[];
    }[];
  };
  unit: 'C' | 'F';
  isSnow?: boolean;
}

const Forecast = ({ data, unit, isSnow = false }: ForecastProps) => {
  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  const toDisplay = (c: number) =>
    unit === 'C' ? Math.round(c) : Math.round((c * 9 / 5) + 32);

  const text  = isSnow ? 'text-slate-800' : 'text-white';
  const muted = isSnow ? 'text-slate-400' : 'text-white/40';
  const sub   = isSnow ? 'text-slate-600' : 'text-white/65';

  return (
    <div className="mt-5 pt-5" style={{
      borderTop: isSnow ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)'
    }}>
      <p
        className={`text-[10px] uppercase tracking-[0.18em] font-bold mb-4 ${muted}`}
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Ramalan 5 Hari
      </p>

      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
        {daily.map((day, idx) => {
          const date    = new Date(day.dt * 1000);
          const dayName = new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(date);
          const dateNum = date.getDate();
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
          const temp    = toDisplay(day.main.temp);

          return (
            <div
              key={day.dt}
              className={`flex flex-col items-center gap-1.5 px-4 py-3.5 rounded-2xl border cursor-pointer shrink-0 transition-all duration-250`}
              style={{
                animationDelay: `${idx * 0.07}s`,
                background: isSnow ? 'rgba(15,23,42,0.07)' : 'rgba(255,255,255,0.07)',
                border: isSnow ? '1px solid rgba(0,0,0,0.09)' : '1px solid rgba(255,255,255,0.1)',
                minWidth: '76px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = isSnow
                  ? 'rgba(15,23,42,0.13)' : 'rgba(255,255,255,0.15)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px) scale(1.04)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 28px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = isSnow
                  ? 'rgba(15,23,42,0.07)' : 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              {/* Day name */}
              <p className={`text-[11px] font-bold uppercase tracking-wide ${muted}`}
                style={{ fontFamily: "'Syne', sans-serif" }}>
                {dayName}
              </p>

              {/* Date number */}
              <p className={`text-[10px] ${muted} opacity-60`}>{dateNum}</p>

              {/* Icon */}
              <img src={iconUrl} alt={day.weather[0].description} className="w-11 h-11 drop-shadow-lg" />

              {/* Temperature */}
              <p className={`text-base font-bold ${text}`}>
                {temp}°
              </p>

              {/* Condition short */}
              <p className={`text-[9px] text-center capitalize leading-tight max-w-[60px] ${sub}`}>
                {day.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
