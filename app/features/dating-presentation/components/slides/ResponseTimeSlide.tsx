import { Clock } from 'lucide-react';
import { SlideWrapper } from '../shared/SlideWrapper';
import { DatingStats } from '../../types/stats';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { THEME } from '../../constants/theme';

interface ResponseTimeSlideProps {
  data: DatingStats;
}

export const ResponseTimeSlide = ({ data }: ResponseTimeSlideProps) => {
  return (
    <SlideWrapper
      title="Response Time Analysis"
      subtitle="Time is a Social Construct (Right?)"
      Icon={Clock}
    >
      <div className="space-y-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart 
            data={data.responseTimeData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMadison" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={THEME.colors.madison} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={THEME.colors.madison} stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="colorBryce" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={THEME.colors.bryce} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={THEME.colors.bryce} stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey={data.partnerName} 
              stroke={THEME.colors.madison} 
              fillOpacity={1} 
              fill="url(#colorMadison)" 
            />
            <Area 
              type="monotone" 
              dataKey={data.userName} 
              stroke={THEME.colors.bryce} 
              fillOpacity={1} 
              fill="url(#colorBryce)" 
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="text-center space-y-2">
          <p className="font-bold">
            {data.partnerName}'s median response: {data.responseTimeStats.partnerMedianResponse} minutes
          </p>
          <p className="font-bold">
            My median response: {data.responseTimeStats.userMedianResponse} minutes
          </p>
          <p className="italic mt-4">
            Are my resulting responses {(data.responseTimeStats.userMedianResponse / data.responseTimeStats.partnerMedianResponse).toFixed(1)}x better than her's? Yes. 
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
};