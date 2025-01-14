import { Brain } from 'lucide-react';
import { SlideWrapper } from '../shared/SlideWrapper';
import { DatingStats } from '../../types/stats';
import InvestigationBoard from '../shared/InvestigationBoard';

interface IntroSlideProps {
  data: DatingStats;
}

export const IntroSlide = ({ data }: IntroSlideProps) => {
  return (
    <SlideWrapper
      title="Does Madison Like Me? A Data-Driven Investigation"
      subtitle="Because Why Experience Emotions When You Can Calculate Them?"
      Icon={Brain}
    >
      <div className="space-y-6">
        <InvestigationBoard data={data} />
        <div className="text-center space-y-4">
          <p className="text-lg">
            A completely normal analysis of {data.totalMessages.toLocaleString()} messages 
            over {data.totalDays} days
          </p>
          <p className="text-sm italic">
            (I'm not obsessed, I just really like data... and Madison)
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
};