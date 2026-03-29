import { useMemo } from 'react';

interface WeatherBackgroundProps {
  condition: string;
  isNight: boolean;
}

const WeatherBackground = ({ condition, isNight }: WeatherBackgroundProps) => {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`, 
      animationDelay: `${Math.random() * 2}s`, 
      animationDuration: `${Math.random() * 1 + 0.6}s`, 
    }));
  }, [condition]);

  const clouds = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 40}vh`, 
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 15 + 20}s`,
      size: `${Math.random() * 100 + 150}px`, 
    }));
  }, [condition]);

  if (!condition) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 1. EFEK HUJAN */}
      {(condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') && (
        particles.map((p) => (
          <div
            key={p.id}
            className="absolute top-[-10vh] w-[2px] h-[25px] bg-blue-100/60 animate-rainfall"
            style={{ left: p.left, animationDelay: p.animationDelay, animationDuration: p.animationDuration }}
          />
        ))
      )}

      {/* 2. EFEK SALJU */}
      {condition === 'Snow' && (
        particles.map((p) => (
          <div
            key={p.id}
            className="absolute top-[-10vh] w-[6px] h-[6px] rounded-full bg-white/80 animate-rainfall"
            style={{ left: p.left, animationDelay: p.animationDelay, animationDuration: `${parseFloat(p.animationDuration) + 2}s` }} 
          />
        ))
      )}

      {/* 3. EFEK AWAN BERGERAK */}
      {condition === 'Clouds' && (
        clouds.map((c) => (
          <div
            key={c.id}
            className="absolute h-16 bg-white/30 blur-2xl rounded-full animate-clouddrift"
            style={{ top: c.top, width: c.size, animationDelay: c.animationDelay, animationDuration: c.animationDuration }}
          />
        ))
      )}

      {/* 4. EFEK CERAH (MATAHARI / BULAN) */}
      {condition === 'Clear' && (
        <div 
          className={`absolute top-20 right-20 w-40 h-40 rounded-full blur-2xl animate-sunpulse ${isNight ? 'bg-indigo-300/30' : 'bg-yellow-200/50'}`}
        />
      )}
      
    </div>
  );
};

export default WeatherBackground;