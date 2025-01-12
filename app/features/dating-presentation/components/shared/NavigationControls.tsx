import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { THEME } from '../../constants/theme';

interface NavigationControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideSelect?: (index: number) => void;
}

export const NavigationControls = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onSlideSelect
}: NavigationControlsProps) => {
  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {/* Slide indicators */}
      <div className="flex justify-center space-x-2 w-full">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              currentSlide === index 
                ? 'bg-amber-500' 
                : 'bg-gray-200 hover:bg-amber-200'
            }`}
            onClick={() => onSlideSelect?.(index)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between w-full max-w-md px-4">
        <Button 
          onClick={onPrevious}
          variant="default"
          className={`${THEME.buttons.primary} min-w-24`}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button 
          onClick={onNext}
          variant="default"
          className={`${THEME.buttons.primary} min-w-24`}
          disabled={currentSlide === totalSlides - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};