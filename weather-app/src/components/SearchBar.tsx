import { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isSnow?: boolean;
}

const SearchBar = ({ onSearch, isSnow = false }: SearchBarProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) { onSearch(input); setInput(''); }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      {/* Search icon */}
      <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={isSnow ? '#1e293b' : '#fff'} strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Cari kota..."
        className="w-full py-3 pl-10 pr-14 text-sm rounded-2xl outline-none transition-all duration-250 placeholder-opacity-40 font-medium"
        style={{
          background: isSnow ? 'rgba(15,23,42,0.07)' : 'rgba(255,255,255,0.08)',
          border: isSnow ? '1px solid rgba(15,23,42,0.1)' : '1px solid rgba(255,255,255,0.1)',
          color: isSnow ? '#1e293b' : '#fff',
          backdropFilter: 'blur(8px)',
        }}
        onFocus={e => {
          e.target.style.background = isSnow ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.14)';
          e.target.style.borderColor = isSnow ? 'rgba(15,23,42,0.25)' : 'rgba(255,255,255,0.3)';
          e.target.style.boxShadow = isSnow
            ? '0 0 0 3px rgba(15,23,42,0.08)'
            : '0 0 0 3px rgba(255,255,255,0.08)';
        }}
        onBlur={e => {
          e.target.style.background = isSnow ? 'rgba(15,23,42,0.07)' : 'rgba(255,255,255,0.08)';
          e.target.style.borderColor = isSnow ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.1)';
          e.target.style.boxShadow = '';
        }}
      />

      <button
        type="submit"
        aria-label="Cari"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
          boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
        }}
      >
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
