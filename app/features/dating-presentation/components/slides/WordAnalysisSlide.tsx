import { ScrollText } from 'lucide-react';
import { SlideWrapper } from '../shared/SlideWrapper';
import { DatingStats } from '../../types/stats';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { THEME } from '../../constants/theme';

interface WordAnalysisSlideProps {
  data: DatingStats;
}

export const WordAnalysisSlide = ({ data }: WordAnalysisSlideProps) => {
  const chartData = [
    { 
      name: 'Our Texts', 
      value: data.wordStats.totalWords, 
      fill: THEME.colors.madison 
    },
    { 
      name: data.wordStats.comparisonBook.name, 
      value: data.wordStats.comparisonBook.wordCount, 
      fill: THEME.colors.bryce
    }
  ];

  return (
    <SlideWrapper
      title="Total Words: A Literary Perspective"
      subtitle={`Or: How We Wrote '${data.wordStats.comparisonBook.name}' Without Realizing It`}
      Icon={ScrollText}
    >
      <div className="space-y-4">
        <div className="text-center mb-4">
          <p className="font-bold">
            Total Words Exchanged: {data.wordStats.totalWords.toLocaleString()}
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="value" fill={(d) => d.fill} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-center italic">
          In {data.totalDays} days, we've written more words than '{data.wordStats.comparisonBook.name}'
          <br />
          Impressive or concerning? More data is required.
        </p>
      </div>
    </SlideWrapper>
  );
};