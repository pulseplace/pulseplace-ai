
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PulseBotAnalytics } from '@/components/chat/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, MessageSquare, ThumbsUp, Clock } from 'lucide-react';
import TrendsAnalysis from './TrendsAnalysis';

interface MetricsProps {
  totalInteractions: number;
  uniqueUsers: number;
  satisfactionRate: number;
  activeUsers: number;
}

interface KeyMetricsGridProps {
  analytics?: PulseBotAnalytics;
  metrics?: MetricsProps;
  isLoading: boolean;
}

const KeyMetricsGrid: React.FC<KeyMetricsGridProps> = ({ 
  analytics, 
  metrics,
  isLoading 
}) => {
  // Use provided metrics, or derive from analytics if available
  const displayMetrics = metrics || {
    totalInteractions: analytics?.totalInteractions || 0,
    uniqueUsers: analytics?.uniqueUsers || 0,
    satisfactionRate: analytics?.positiveRating || 0,
    activeUsers: Math.floor((analytics?.uniqueUsers || 0) * 0.8)
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Interactions"
          value={displayMetrics.totalInteractions}
          change="+12%"
          icon={<MessageSquare className="h-5 w-5 text-blue-600" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Unique Users"
          value={displayMetrics.uniqueUsers}
          change="+8%"
          icon={<Users className="h-5 w-5 text-green-600" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Satisfaction Rate"
          value={`${displayMetrics.satisfactionRate}%`}
          change="+3%"
          icon={<ThumbsUp className="h-5 w-5 text-purple-600" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Avg. Response Time"
          value={analytics?.averageResponseTime ? `${analytics.averageResponseTime}s` : '1.2s'}
          change="-0.3s"
          icon={<Clock className="h-5 w-5 text-orange-600" />}
          isLoading={isLoading}
        />
      </div>
      
      {/* Add the trends visualization */}
      <TrendsAnalysis isLoading={isLoading} />
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number | string;
  change: string;
  icon: React.ReactNode;
  isLoading: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  isLoading 
}) => {
  const isPositiveChange = change.startsWith('+');
  
  return (
    <Card>
      <CardContent className="p-6">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-12" />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">{title}</h3>
              <div className="p-2 rounded-full bg-blue-50">{icon}</div>
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <div className={`text-sm mt-1 ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
              {change} from last period
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default KeyMetricsGrid;
