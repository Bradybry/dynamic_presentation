import { Brain } from 'lucide-react';
import { SlideWrapper } from '../shared/SlideWrapper';
import { DatingStats } from '../../types/stats';

interface ConclusionSlideProps {
  data: DatingStats;
}

export const ConclusionSlide = ({ data }: ConclusionSlideProps) => {
  return (
    <SlideWrapper
      title="Final Analysis"
      subtitle="Does Madison like me?"
      Icon={Brain}
    >
      <div className="space-y-4 text-center">
        <p className="font-bold">Key Findings:</p>
        <ul className="list-disc text-left pl-8 space-y-2">
          <li>
            She starts {data.conversationStats.partnerInitiated}% of conversations 
            (clearly just being friendly)
          </li>
          <li>
            Responds in {data.responseTimeStats.partnerMedianResponse} minutes 
            (probably just has better phone service)
          </li>
          <li>
            Uses lots of emojis
            (maybe her keyboard is stuck?)
          </li>
          <li>
            Writes more than me 
            (must really like texting)
          </li>
        </ul>
        <p className="italic mt-4">
          Conclusion: More data needed
          <br />
          (Maybe in another {data.wordStats.totalWords.toLocaleString()} words 
          I'll figure it out)
        </p>
      </div>
    </SlideWrapper>
  );
};