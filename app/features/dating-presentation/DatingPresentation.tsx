'use client';
import { useState } from 'react';
import { DatingStats } from './types/stats';
import { NavigationControls } from './components/shared/NavigationControls';
import { SlideTransition } from './components/shared/SlideTransition';
import { IntroSlide } from './components/slides/IntroSlide';
import { MessageVolumeSlide } from './components/slides/MessageVolumeSlide';
import { ConversationInitiationSlide } from './components/slides/ConversationInitiationSlide';
import { WordAnalysisSlide } from './components/slides/WordAnalysisSlide';
import { MessageLengthSlide } from './components/slides/MessageLengthSlide';
import { ResponseTimeSlide } from './components/slides/ResponseTimeSlide';
import { EmojiAnalysisSlide } from './components/slides/EmojiAnalysisSlide';
import { TopEmojiSlide } from './components/slides/TopEmojiSlide';
import { ConclusionSlide } from './components/slides/ConclusionSlide';
import initialData from '@/stats/dating_stats.json';

const DatingDataPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data] = useState<DatingStats>(initialData);

  const slides = [
    { Component: IntroSlide, props: { data } },
    { Component: MessageVolumeSlide, props: { data } },
    { Component: WordAnalysisSlide, props: { data } },
    { Component: ResponseTimeSlide, props: { data } },
    { Component: ConversationInitiationSlide, props: { data } },
    { Component: MessageLengthSlide, props: { data } },
    { Component: EmojiAnalysisSlide, props: { data } },
    { Component: TopEmojiSlide, props: { data } },
    { Component: ConclusionSlide, props: { data } }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  const selectSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  if (!data) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <p className="text-center">Loading data...</p>
        </div>
      </div>
    );
  }

  const CurrentSlide = slides[currentSlide].Component;

  return (
    // Main container with height constraints and overflow hidden
    <div className="w-full max-w-4xl mx-auto px-4 h-[calc(100vh-2rem)] max-h-[800px] min-h-[500px] flex flex-col overflow-hidden">
      {/* Content wrapper */}
      <div className="w-full h-full flex flex-col">
        {/* Slide container with overflow hidden to prevent horizontal scrollbar during transitions */}
        <div className="flex-1 overflow-hidden">
          <SlideTransition direction={direction} slideKey={currentSlide}>
            <div className="h-full overflow-y-auto">
              <CurrentSlide {...slides[currentSlide].props} />
            </div>
          </SlideTransition>
        </div>
        
        {/* Fixed-height navigation container with improved centering */}
        <div className="h-16 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <NavigationControls
              currentSlide={currentSlide}
              totalSlides={slides.length}
              onPrevious={prevSlide}
              onNext={nextSlide}
              onSlideSelect={selectSlide}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatingDataPresentation;