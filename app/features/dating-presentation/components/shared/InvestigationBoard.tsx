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

  const StatCard = ({ Icon, text, position }: { 
    Icon: any; 
    text: string; 
    position: string;
  }) => (
    <div className={`absolute ${position} transition-all duration-500 
      ${animate ? 'translate-x-0 opacity-100' : 
        position.includes('left') ? '-translate-x-8 opacity-0' : 'translate-x-8 opacity-0'}`}
    >
      <div className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 bg-white rounded-lg shadow-md">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: THEME.colors.madison }} />
        <span className="text-xs sm:text-sm font-mono">{text}</span>
      </div>
    </div>
  );

  return (
    <div className="w-full h-48 sm:h-64 relative bg-gray-50 rounded-lg shadow-inner overflow-hidden">
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
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
            <Search 
              className="w-6 h-6 sm:w-8 sm:h-8" 
              style={{ color: THEME.colors.bryce }}
            />
          </div>
        </div>

        {/* Stats cards */}
        <StatCard 
          Icon={MessageCircle} 
          text={`${data.totalMessages.toLocaleString()} msgs`}
          position="top-2 sm:top-4 left-2 sm:left-4"
        />
        <StatCard 
          Icon={Clock} 
          text={`${data.responseTimeStats.partnerMedianResponse}m response`}
          position="top-2 sm:top-4 right-2 sm:right-4"
        />
        <StatCard 
          Icon={Database} 
          text={`${data.wordStats.totalWords.toLocaleString()} words`}
          position="bottom-2 sm:bottom-4 left-2 sm:left-4"
        />
        <StatCard 
          Icon={Search} 
          text="analyzing..."
          position="bottom-2 sm:bottom-4 right-2 sm:right-4"
        />

        {/* Floating symbols */}
        {animate && ['∑', '∞', '≈', '∫', '?'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-gray-300 text-base sm:text-xl hidden sm:block"
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