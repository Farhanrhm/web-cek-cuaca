interface ForecastProps {
  data: {
    list: {
      dt: number;
      dt_txt: string;
      main: { temp: number };
      weather: { icon: string; description: string }[];
    }[];
  };
  // Tambahkan properti unit
  unit: 'C' | 'F';
}

const Forecast = ({ data, unit }: ForecastProps) => {
  const dailyForecast = data.list.filter((item) => 
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="mt-8 pt-6 border-t border-gray-200/60">
      <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-4 text-center">
        Ramalan Cuaca Untuk 5 Hari
      </h3>
      
      <div className="flex justify-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {dailyForecast.map((day) => {
          const date = new Date(day.dt * 1000);
          const dayName = new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(date);
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

          // Konversi suhu untuk setiap kartu ramalan
          const displayTemp = unit === 'C' 
            ? Math.round(day.main.temp) 
            : Math.round((day.main.temp * 9/5) + 32);

          return (
            <div 
              key={day.dt} 
              className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-indigo-600 text-white p-4 rounded-2xl shadow-md min-w-[80px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <p className="text-sm font-bold text-blue-100 mb-1">{dayName}</p>
              <img src={iconUrl} alt="icon" className="w-12 h-12 drop-shadow-md" />
              <p className="text-lg font-bold mt-1">
                {displayTemp}°{unit}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;