import { Smile, ArrowLeftRight } from 'lucide-react';
import { SlideWrapper } from '../shared/SlideWrapper';
import { DatingStats } from '../../types/stats';
import { THEME } from '../../constants/theme';
import React, { useState, useEffect } from 'react';

interface TopEmojiSlideProps {
  data: DatingStats;
}

const Switch = ({ isChecked, onChange }: { isChecked: boolean; onChange: () => void }) => (
  <div 
    className="w-36 sm:w-48 h-8 sm:h-10 rounded-full relative cursor-pointer transition-colors duration-200 ease-in-out"
    style={{ backgroundColor: isChecked ? THEME.colors.bryce : THEME.colors.madison }}
    onClick={onChange}
  >
    {/* Labels */}
    <div className="absolute inset-0 flex items-center justify-between text-white text-sm sm:text-base font-medium">
      <span className={`ml-8 sm:ml-12 transition-opacity ${!isChecked ? 'opacity-100' : 'opacity-0'}`}>
        Madison
      </span>
      <span className={`mr-8 sm:mr-12 transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`}>
        Bryce
      </span>
    </div>
    
    {/* Sliding circle */}
    <div 
      className={`absolute top-1 h-6 sm:h-8 w-6 sm:w-8 bg-white rounded-full shadow transition-transform duration-200 ease-in-out
        ${isChecked ? 'translate-x-[8rem] sm:translate-x-[9.5rem]' : 'translate-x-1'}`}
    />
  </div>
);

const EmojiDisplay = ({ emoji, count, total }: { emoji: string; count: number; total: number }) => (
  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
    <div className="text-2xl sm:text-3xl">{emoji}</div>
    <div className="flex flex-col items-end">
      <span className="font-mono font-bold text-sm sm:text-base">{count}</span>
      <span className="text-xs text-gray-500">
        {((count / total) * 100).toFixed(1)}%
      </span>
    </div>
  </div>
);

export const TopEmojiSlide = ({ data }: TopEmojiSlideProps) => {
  const [selectedPerson, setSelectedPerson] = useState<'partner' | 'user'>('partner');
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => setShowHint(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [selectedPerson]);

  const personData = {
    partner: {
      name: data.partnerName,
      emojis: data.messageContentStats.partner.topEmojis.slice(0, 3),
      total: data.messageContentStats.partner.totalEmojiCount,
      color: THEME.colors.madison
    },
    user: {
      name: "Bryce",
      emojis: data.messageContentStats.user.topEmojis.slice(0, 3),
      total: data.messageContentStats.user.totalEmojiCount,
      color: THEME.colors.bryce
    }
  };

  const activeData = personData[selectedPerson];

  return (
    <SlideWrapper
      title="The Emoji Factor"
      subtitle="Modern Hieroglyphics"
      Icon={Smile}
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Toggle switch centered with hint */}
        <div className="flex flex-col items-center gap-2">
          <Switch 
            isChecked={selectedPerson === 'user'}
            onChange={() => setSelectedPerson(selectedPerson === 'partner' ? 'user' : 'partner')}
          />
          {showHint && (
            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 animate-pulse">
              <ArrowLeftRight size={12} />
              <span>Click to switch</span>
            </div>
          )}
        </div>

        {/* Stats summary */}
        <div className="text-center">
          <p className="text-lg sm:text-xl font-bold mb-1">
            {activeData.name}'s Top Emojis
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            Total Used: {activeData.total.toLocaleString()}
          </p>
        </div>

        {/* Emoji grid */}
        <div className="max-w-xs sm:max-w-sm mx-auto space-y-2 sm:space-y-3">
          {activeData.emojis.map((emojiData, index) => (
            <EmojiDisplay
              key={index}
              emoji={emojiData.emoji}
              count={emojiData.count}
              total={activeData.total}
            />
          ))}
        </div>

        {/* Commentary */}
        <div className="text-center italic text-sm sm:text-base mt-4 sm:mt-6">
          {selectedPerson === 'partner' ? (
            <p>
              {data.messageContentStats.partner.mostUsedEmoji} {data.messageContentStats.partner.mostUsedEmojiCount} times?
              <br />
              Perhaps it's an iPhone thing that I don't understand.
            </p>
          ) : (
            <p>Clearly I need to step up my emoji game</p>
          )}
        </div>
      </div>
    </SlideWrapper>
  );
};