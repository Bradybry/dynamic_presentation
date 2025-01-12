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
    className="w-48 h-10 rounded-full relative cursor-pointer transition-colors duration-200 ease-in-out"
    style={{ backgroundColor: isChecked ? THEME.colors.bryce : THEME.colors.madison }}
    onClick={onChange}
  >
    {/* Labels */}
    <div className="absolute inset-0 flex items-center justify-between text-white font-medium">
      <span className={`ml-12 transition-opacity ${!isChecked ? 'opacity-100' : 'opacity-0'}`}>
        Madison
      </span>
      <span className={`mr-12 transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`}>
        Bryce
      </span>
    </div>
    
    {/* Sliding circle */}
    <div 
      className={`absolute top-1 h-8 w-8 bg-white rounded-full shadow transition-transform duration-200 ease-in-out
        ${isChecked ? 'translate-x-[9.5rem]' : 'translate-x-1'}`}
    />
  </div>
);

export const TopEmojiSlide = ({ data }: TopEmojiSlideProps) => {
  const [selectedPerson, setSelectedPerson] = useState<'partner' | 'user'>('partner');
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    // Hide the hint after first switch
    if (showHint) {
      const timer = setTimeout(() => setShowHint(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [selectedPerson]);

  const EmojiDisplay = ({ emoji, count, total }: { emoji: string; count: number; total: number }) => (
    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
      <div className="text-3xl">{emoji}</div>
      <div className="flex flex-col items-end">
        <span className="font-mono font-bold">{count}</span>
        <span className="text-xs text-gray-500">{((count / total) * 100).toFixed(1)}%</span>
      </div>
    </div>
  );

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
      <div className="space-y-6">
        {/* Toggle switch centered with hint */}
        <div className="flex flex-col items-center gap-2">
          <Switch 
            isChecked={selectedPerson === 'user'}
            onChange={() => setSelectedPerson(selectedPerson === 'partner' ? 'user' : 'partner')}
          />
          {showHint && (
            <div className="flex items-center gap-2 text-sm text-gray-500 animate-pulse">
              <ArrowLeftRight size={14} />
              <span>Click to switch</span>
            </div>
          )}
        </div>

        {/* Stats summary */}
        <div className="text-center">
          <p className="text-xl font-bold mb-1">{activeData.name}'s Top Emojis</p>
          <p className="text-sm text-gray-600">
            Total Used: {activeData.total}
          </p>
        </div>

        {/* Emoji grid */}
        <div className="max-w-sm mx-auto space-y-3">
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
        <div className="text-center italic mt-6">
          {selectedPerson === 'partner' ? (
            <p>
              {data.messageContentStats.partner.mostUsedEmoji} {data.messageContentStats.partner.mostUsedEmojiCount} times?
              <br />
              Perhaps it's an iPhone thing that I don't understand.
            </p>
          ) : (
            <p>
              Clearly I need to step up my emoji game
            </p>
          )}
        </div>
      </div>
    </SlideWrapper>
  );
};