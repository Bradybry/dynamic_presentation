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
    <Card className="bg-white shadow-lg">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <Icon className="w-12 h-12" style={{ color: THEME.colors.madison }} />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">
          {title}
        </CardTitle>
        <p className="text-gray-600 italic">
          {subtitle}
        </p>
      </CardHeader>
      <CardContent>
        <div className="min-h-96 p-6">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};