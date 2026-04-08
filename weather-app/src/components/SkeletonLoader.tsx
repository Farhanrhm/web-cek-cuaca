interface SkeletonLoaderProps {
  isSnow?: boolean;
}

const SkeletonLoader = ({ isSnow = false }: SkeletonLoaderProps) => {
  const base = isSnow ? 'bg-slate-200' : 'bg-white/[0.08]';
  const shimmerStyle: React.CSSProperties = {
    background: isSnow
      ? 'linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.06) 75%)'
      : 'linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.06) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.6s ease-in-out infinite',
    borderRadius: '12px',
  };

  const S = ({ w, h, className = '' }: { w: string; h: string; className?: string }) => (
    <div className={`${className}`} style={{ ...shimmerStyle, width: w, height: h }} />
  );

  return (
    <div className="w-full mt-2">
      {/* Hero */}
      <div className="text-center mb-6">
        <S w="45%" h="28px" className="mx-auto mb-2" />
        <S w="32%" h="14px" className="mx-auto mb-5" />
        <div className="flex items-center justify-center gap-3 mb-4">
          <div style={{ ...shimmerStyle, width: '112px', height: '112px', borderRadius: '50%' }} />
          <div>
            <S w="100px" h="72px" className="mb-2" />
            <S w="80px"  h="16px" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={`h-px w-full mb-5 ${base} opacity-50`} />

      {/* Stat pills */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[1,2,3,4].map(i => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: isSnow ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)',
              border: isSnow ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ ...shimmerStyle, width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0 }} />
            <div className="flex flex-col gap-1.5 flex-1">
              <S w="50%" h="10px" />
              <S w="70%" h="14px" />
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className={`h-px w-full mb-4 ${base} opacity-50`} />

      {/* Forecast title */}
      <S w="30%" h="10px" className="mb-4" />

      {/* Forecast cards */}
      <div className="flex gap-2.5">
        {[1,2,3,4,5].map(i => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 px-4 py-3.5 rounded-2xl shrink-0"
            style={{
              minWidth: '76px',
              background: isSnow ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)',
              border: isSnow ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <S w="32px" h="10px" />
            <div style={{ ...shimmerStyle, width: '44px', height: '44px', borderRadius: '50%' }} />
            <S w="36px" h="18px" />
            <S w="52px" h="9px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
