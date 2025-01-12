import { MessageCircle } from 'lucide-react';
import { SlideWrapper } from '../shared/SlideWrapper';
import { DatingStats } from '../../types/stats';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { THEME } from '../../constants/theme';

interface EmojiAnalysisSlideProps {
  data: DatingStats;
}

export const EmojiAnalysisSlide = ({ data }: EmojiAnalysisSlideProps) => {
  const chartData = [
    {
      category: "Messages with Emojis",
      icon: "🎨",
      you: data.messageContentStats.user.emojiPercentage * 100,
      them: data.messageContentStats.partner.emojiPercentage * 100,
    },
    {
      category: "Questions Asked",
      icon: "❓",
      you: data.messageContentStats.user.questionPercentage * 100,
      them: data.messageContentStats.partner.questionPercentage * 100,
    },
    {
      category: "Exclamations",
      icon: "❗",
      you: data.messageContentStats.user.exclamationPercentage * 100,
      them: data.messageContentStats.partner.exclamationPercentage * 100,
    },
  ];

  return (
    <SlideWrapper
      title="Message Style Analysis"
      subtitle="Perhaps the answer lies in the content instead"
      Icon={MessageCircle}
    >
      <div className="space-y-6">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 50, bottom: 10 }}
          >
            <XAxis type="number" unit="%" />
            <YAxis 
              type="category" 
              dataKey="category" 
              tickFormatter={(value, index) => `${value} ${chartData[index].icon}`}
              width={120}
            />
            <Tooltip 
              formatter={(value) => [`${value.toFixed(1)}%`]} 
              labelFormatter={(label) => label.split(' ')[0]}
            />
            <Bar 
              dataKey="you" 
              fill={THEME.colors.bryce} 
              name="You"
              stackId="a"
              radius={[0, 4, 4, 0]}
            />
            <Bar 
              dataKey="them" 
              fill={THEME.colors.madison} 
              name={data.partnerName}
              stackId="b"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        
        <p className="text-center text-sm italic">
          One of Us Really Loves Emojis 😅
          <br/>
          This requires further investigation 🤔
        </p>
      </div>
    </SlideWrapper>
  );
};