import { MessageCircle } from 'lucide-react';
import { SlideWrapper } from '../shared/SlideWrapper';
import { DatingStats } from '../../types/stats';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { THEME } from '../../constants/theme';

interface MessageVolumeSlideProps {
  data: DatingStats;
}

const ANIMATION_DURATION = 800;

export const MessageVolumeSlide = ({ data }: MessageVolumeSlideProps) => {
  const chartData = [
    { 
      name: data.partnerName, 
      value: data.messageStats.partnerPercentage, 
      color: THEME.colors.madison 
    },
    { 
      name: data.userName, 
      value: data.messageStats.userPercentage, 
      color: THEME.colors.bryce 
    }
  ];

  return (
    <SlideWrapper
      title="Message Volume Analysis"
      subtitle="The Numbers Don't Lie But What Do They Mean?"
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
          {data.partnerName}: {data.messageStats.partnerMessages.toLocaleString()} messages ({data.messageStats.partnerPercentage}%)
          <br />
          {data.userName}: {data.messageStats.userMessages.toLocaleString()} messages ({data.messageStats.userPercentage}%)
          <br />
          Quantity could mean anything. Inconclusive.
        </p>
      </div>
    </SlideWrapper>
  );
};