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
    <div className="flex flex-col items-center space-y-3 sm:space-y-4 w-full px-2 sm:px-4">
      {/* Slide indicators */}
      <div className="flex justify-center space-x-1.5 sm:space-x-2 w-full overflow-x-auto py-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full transition-colors duration-200 ${
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
      <div className="flex justify-between w-full max-w-sm sm:max-w-md">
        <Button 
          onClick={onPrevious}
          variant="default"
          className={`${THEME.buttons.primary} h-8 sm:h-10 px-2 sm:px-4 min-w-16 sm:min-w-24 text-sm sm:text-base`}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
          Prev
        </Button>
        <Button 
          onClick={onNext}
          variant="default"
          className={`${THEME.buttons.primary} h-8 sm:h-10 px-2 sm:px-4 min-w-16 sm:min-w-24 text-sm sm:text-base`}
          disabled={currentSlide === totalSlides - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
        </Button>
      </div>
    </div>
  );
};