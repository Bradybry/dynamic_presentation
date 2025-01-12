import { MessageCircle } from 'lucide-react';
import { SlideWrapper } from '../shared/SlideWrapper';
import { DatingStats } from '../../types/stats';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { THEME } from '../../constants/theme';

interface ConversationInitiationSlideProps {
  data: DatingStats;
}

const ANIMATION_DURATION = 800;

export const ConversationInitiationSlide = ({ data }: ConversationInitiationSlideProps) => {
  const chartData = [
    { 
      name: data.partnerName, 
      value: data.conversationStats.partnerInitiated, 
      color: THEME.colors.madison 
    },
    { 
      name: data.userName, 
      value: data.conversationStats.userInitiated, 
      color: THEME.colors.bryce 
    }
  ];

  return (
    <SlideWrapper
      title="Conversation Initiation Analysis"
      subtitle="Who's Making the First Move?"
      Icon={MessageCircle}
    >
      <div className="space-y-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              startAngle={90}
              endAngle={450}
              animationBegin={0}
              animationDuration={ANIMATION_DURATION}
              animationEasing="ease-in-out"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-center italic">
          {data.partnerName} starts {data.conversationStats.partnerInitiated}% of our conversations
          <br />
          The data suggests I might need to step up my game
        </p>
      </div>
    </SlideWrapper>
  );
};