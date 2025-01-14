import { MessageCircle } from 'lucide-react';
import { SlideWrapper } from '../shared/SlideWrapper';
import { DatingStats } from '../../types/stats';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { THEME } from '../../constants/theme';

interface EmojiAnalysisSlideProps {
  data: DatingStats;
}

export const EmojiAnalysisSlide = ({ data }: EmojiAnalysisSlideProps) => {
  const chartData = [
    {
      category: "Emojis",
      icon: "🎨",
      you: data.messageContentStats.user.emojiPercentage * 100,
      them: data.messageContentStats.partner.emojiPercentage * 100,
    },
    {
      category: "Questions",
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
      <div className="space-y-4">
        {/* Chart Container */}
        <div className="h-64 sm:h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 40, bottom: 10 }}
            >
              <XAxis 
                type="number" 
                unit="%" 
                tick={{ fontSize: 12 }}
                domain={[0, 30]}
              />
              <YAxis 
                type="category" 
                dataKey="category" 
                tickFormatter={(value, index) => `${value} ${chartData[index].icon}`}
                width={80}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value.toFixed(1)}%`]} 
                labelFormatter={(label) => label.split(' ')[0]}
              />
              <Legend />
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
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: THEME.colors.bryce }} />
            <span>You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: THEME.colors.madison }} />
            <span>{data.partnerName}</span>
          </div>
        </div>
        
        <p className="text-center text-sm italic mt-2">
          One of Us Really Loves Emojis 😅
          <br/>
          This requires further investigation 🤔
        </p>
      </div>
    </SlideWrapper>
  );
};