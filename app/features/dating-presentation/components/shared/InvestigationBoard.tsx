import React, { useEffect, useState } from 'react';
import { Brain, MessageCircle, Clock, Search, Database } from 'lucide-react';
import { DatingStats } from '../../types/stats';
import { THEME } from '../../constants/theme';

interface InvestigationBoardProps {
  data: DatingStats;
}

const InvestigationBoard = ({ data }: InvestigationBoardProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="w-full h-64 relative bg-gray-50 rounded-lg shadow-inner overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: 'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Main content */}
      <div className={`transition-all duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
        {/* Center icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
            <Search 
              className="w-8 h-8" 
              style={{ color: THEME.colors.bryce }}
            />
          </div>
        </div>

        {/* Evidence cards */}
        <div className={`absolute top-4 left-4 transition-all duration-500 ${animate ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-md">
            <MessageCircle className="w-5 h-5" style={{ color: THEME.colors.madison }} />
            <span className="text-sm font-mono">{data.totalMessages.toLocaleString()} msgs</span>
          </div>
        </div>

        <div className={`absolute top-4 right-4 transition-all duration-500 ${animate ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-md">
            <Clock className="w-5 h-5" style={{ color: THEME.colors.madison }} />
            <span className="text-sm font-mono">{data.responseTimeStats.partnerMedianResponse}m response</span>
          </div>
        </div>

        <div className={`absolute bottom-4 left-4 transition-all duration-500 ${animate ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-md">
            <Database className="w-5 h-5" style={{ color: THEME.colors.madison }} />
            <span className="text-sm font-mono">{data.wordStats.totalWords.toLocaleString()} words</span>
          </div>
        </div>

        <div className={`absolute bottom-4 right-4 transition-all duration-500 ${animate ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-md">
            <Search className="w-5 h-5" style={{ color: THEME.colors.madison }} />
            <span className="text-sm font-mono">analyzing...</span>
          </div>
        </div>

        {/* Floating symbols */}
        {animate && ['∑', '∞', '≈', '∫', '?'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-gray-300 text-xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animation: 'float 3s ease-in-out infinite',
              animationDelay: `${i * 0.5}s`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default InvestigationBoard;