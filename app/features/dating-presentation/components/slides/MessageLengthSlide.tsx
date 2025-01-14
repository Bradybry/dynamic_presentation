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
        <div className="h-64 sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke={THEME.colors.madison}
                tick={{ fontSize: 12 }}
                width={30}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke={THEME.colors.bryce}
                tick={{ fontSize: 12 }}
                width={30}
              />
              <Tooltip 
                contentStyle={{ fontSize: '12px' }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
              />
              <Bar 
                yAxisId="left" 
                dataKey="words" 
                name="Words per Message" 
                fill={THEME.colors.madison} 
              />
              <Bar 
                yAxisId="right" 
                dataKey="characters" 
                name="Chars per Message" 
                fill={THEME.colors.bryce} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-sm sm:text-base italic">
          I write longer messages but she sends more
          <br />
          Quality over Quantity?
        </p>
      </div>
    </SlideWrapper>
  );
};