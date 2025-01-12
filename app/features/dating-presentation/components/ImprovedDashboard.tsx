import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, MessageCircle, Clock } from 'lucide-react';

const DashboardCard = ({ title, icon: Icon, children }) => (
  <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-pink-500" />
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const ImprovedDashboard = ({ data, className = "" }) => {
  // Calculate message frequency per day
  const messagesPerDay = data.totalMessages / data.totalDays;
  const maxResponseTime = Math.max(
    data.responseTimeStats.partnerMedianResponse,
    data.responseTimeStats.userMedianResponse
  );

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      <DashboardCard title="Daily Connection" icon={Heart}>
        <div className="space-y-2">
          <p className="text-2xl font-bold">{messagesPerDay.toFixed(1)}</p>
          <p className="text-sm text-gray-500">Messages per day</p>
          <Progress value={Math.min((messagesPerDay / 100) * 100, 100)} />
        </div>
      </DashboardCard>

      <DashboardCard title="Conversation Balance" icon={MessageCircle}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>{data.partnerName}</span>
            <span>{data.messageStats.partnerPercentage}%</span>
          </div>
          <Progress value={data.messageStats.partnerPercentage} />
        </div>
      </DashboardCard>

      <DashboardCard title="Response Time" icon={Clock}>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{data.partnerName}</span>
            <span>{data.responseTimeStats.partnerMedianResponse}m</span>
          </div>
          <Progress 
            value={(data.responseTimeStats.partnerMedianResponse / maxResponseTime) * 100} 
          />
          <div className="flex justify-between text-sm">
            <span>{data.userName}</span>
            <span>{data.responseTimeStats.userMedianResponse}m</span>
          </div>
          <Progress 
            value={(data.responseTimeStats.userMedianResponse / maxResponseTime) * 100} 
          />
        </div>
      </DashboardCard>
    </div>
  );
};

export default ImprovedDashboard;