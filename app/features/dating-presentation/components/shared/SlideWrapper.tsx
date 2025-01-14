import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { THEME } from '../../constants/theme';

interface SlideWrapperProps {
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  children: React.ReactNode;
}

export const SlideWrapper = ({ title, subtitle, Icon, children }: SlideWrapperProps) => {
  return (
    <Card className="bg-white shadow-lg h-full">
      <CardHeader className="text-center pb-2 px-2 sm:px-6">
        <div className="flex justify-center mb-2 sm:mb-4">
          <Icon className="w-8 h-8 sm:w-12 sm:h-12" style={{ color: THEME.colors.madison }} />
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
          {title}
        </CardTitle>
        <p className="text-sm sm:text-base text-gray-600 italic">
          {subtitle}
        </p>
      </CardHeader>
      <CardContent>
        <div className="min-h-[24rem] p-2 sm:p-6 overflow-x-hidden">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};