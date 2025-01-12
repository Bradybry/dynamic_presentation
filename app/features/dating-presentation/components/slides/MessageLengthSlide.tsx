import { MessageCircle } from 'lucide-react';
import { SlideWrapper } from '../shared/SlideWrapper';
import { DatingStats } from '../../types/stats';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { THEME } from '../../constants/theme';

interface MessageLengthSlideProps {
  data: DatingStats;
}

export const MessageLengthSlide = ({ data }: MessageLengthSlideProps) => {
  const chartData = [
    { 
      name: data.partnerName, 
      words: data.messageLengthStats.partner.wordsPerMessage, 
      characters: data.messageLengthStats.partner.charactersPerMessage 
    },
    { 
      name: data.userName, 
      words: data.messageLengthStats.user.wordsPerMessage, 
      characters: data.messageLengthStats.user.charactersPerMessage 
    }
  ];

  return (
    <SlideWrapper
      title="Message Length Analysis"
      subtitle="Size Matters... in Communication"
      Icon={MessageCircle}
    >
      <div className="space-y-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke={THEME.colors.madison} />
            <YAxis yAxisId="right" orientation="right" stroke={THEME.colors.bryce} />
            <Tooltip />
            <Legend />
            <Bar 
              yAxisId="left" 
              dataKey="words" 
              name="Words per Message" 
              fill={THEME.colors.madison} 
            />
            <Bar 
              yAxisId="right" 
              dataKey="characters" 
              name="Characters per Message" 
              fill={THEME.colors.bryce} 
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-center italic">
          I write longer messages but she sends more
          <br />
          Quality over Quantity?
        </p>
      </div>
    </SlideWrapper>
  );
};