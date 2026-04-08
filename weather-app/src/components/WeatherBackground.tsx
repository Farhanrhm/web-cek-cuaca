import { useMemo } from 'react';

interface WeatherBackgroundProps {
  condition: string;
  isNight: boolean;
}

const WeatherBackground = ({ condition, isNight }: WeatherBackgroundProps) => {
  const particles = useMemo(() =>
    Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      delay: `${(Math.random() * 3).toFixed(2)}s`,
      duration: `${(Math.random() * 0.8 + 0.5).toFixed(2)}s`,
    })), [condition]);

  const snowflakes = useMemo(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      delay: `${(Math.random() * 5).toFixed(2)}s`,
      duration: `${(Math.random() * 3 + 4).toFixed(2)}s`,
      size: `${Math.floor(Math.random() * 5 + 4)}px`,
    })), [condition]);

  const clouds = useMemo(() =>
    Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 50}vh`,
      delay: `${(Math.random() * 8).toFixed(2)}s`,
      duration: `${(Math.random() * 15 + 22).toFixed(2)}s`,
      width: `${Math.floor(Math.random() * 130 + 120)}px`,
      opacity: (Math.random() * 0.3 + 0.25).toFixed(2),
    })), [condition]);

  if (!condition) return null;

  const isRainy = ['Rain', 'Drizzle', 'Thunderstorm'].includes(condition);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

      {/* Rain drops */}
      {isRainy && particles.map(p => (
        <div
          key={p.id}
          className="absolute top-[-10vh] animate-rainfall"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: '1.5px',
            height: condition === 'Thunderstorm' ? '28px' : '20px',
            background: condition === 'Thunderstorm'
              ? 'linear-gradient(to bottom, transparent, rgba(147,197,253,0.5))'
              : 'linear-gradient(to bottom, transparent, rgba(186,230,253,0.45))',
            borderRadius: '2px',
          }}
        />
      ))}

      {/* Snow */}
      {condition === 'Snow' && snowflakes.map(p => (
        <div
          key={p.id}
          className="absolute top-[-10vh] rounded-full animate-rainfall"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 0 4px rgba(255,255,255,0.6)',
          }}
        />
      ))}

      {/* Clouds */}
      {condition === 'Clouds' && clouds.map(c => (
        <div
          key={c.id}
          className="absolute animate-clouddrift blur-3xl rounded-full"
          style={{
            top: c.top,
            width: c.width,
            height: '56px',
            animationDelay: c.delay,
            animationDuration: c.duration,
            background: isNight ? 'rgba(148,163,184,0.22)' : 'rgba(255,255,255,0.30)',
            opacity: c.opacity,
          }}
        />
      ))}

      {/* Clear — sun or moon glow */}
      {condition === 'Clear' && (
        <>
          <div
            className="absolute animate-sunpulse rounded-full blur-3xl"
            style={{
              top: '8%', right: '8%',
              width: '180px', height: '180px',
              background: isNight
                ? 'radial-gradient(circle, rgba(129,140,248,0.35), transparent)'
                : 'radial-gradient(circle, rgba(253,224,71,0.5), rgba(251,191,36,0.25), transparent)',
            }}
          />
          {!isNight && (
            <div
              className="absolute animate-sunpulse rounded-full blur-2xl"
              style={{
                top: '6%', right: '6%',
                width: '80px', height: '80px',
                background: 'rgba(253,224,71,0.7)',
                animationDelay: '1s',
              }}
            />
          )}
        </>
      )}

      {/* Thunderstorm flash */}
      {condition === 'Thunderstorm' && (
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(167,139,250,0.04)',
            animation: 'sunpulse 4s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
};

export default WeatherBackground;
