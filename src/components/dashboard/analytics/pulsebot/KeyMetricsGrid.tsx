
import React from 'react';
import { Users, MessageSquare, ThumbsUp, Activity } from 'lucide-react';
import KeyMetricCard from './KeyMetricCard';
import { PulseBotAnalytics } from '@/components/chat/types';

interface KeyMetricsGridProps {
  metrics?: {
    totalInteractions: number;
    uniqueUsers: number;
    satisfactionRate: number;
    activeUsers: number;
  };
  analytics?: PulseBotAnalytics;
  isLoading?: boolean;
}

const KeyMetricsGrid: React.FC<KeyMetricsGridProps> = ({ metrics, analytics, isLoading = false }) => {
  // Use either the direct metrics or extract from analytics
  const displayMetrics = metrics || (analytics ? {
    totalInteractions: analytics.totalInteractions,
    uniqueUsers: analytics.uniqueUsers,
    satisfactionRate: analytics.feedbackRatio.positive / (analytics.feedbackRatio.positive + analytics.feedbackRatio.negative) * 100,
    activeUsers: analytics.uniqueUsers // Assuming active users is the same as unique users for now
  } : {
    totalInteractions: 0,
    uniqueUsers: 0,
    satisfactionRate: 0,
    activeUsers: 0
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KeyMetricCard
        title="Total Interactions"
        value={displayMetrics.totalInteractions}
        icon={<MessageSquare />}
        color="blue"
      />
      
      <KeyMetricCard
        title="Unique Users"
        value={displayMetrics.uniqueUsers}
        icon={<Users />}
        color="purple"
      />
      
      <KeyMetricCard
        title="Satisfaction Rate"
        value={`${Math.round(displayMetrics.satisfactionRate)}%`}
        icon={<ThumbsUp />}
        color="green"
      />
      
      <KeyMetricCard
        title="Active Users"
        value={`${displayMetrics.activeUsers}`}
        icon={<Activity />}
        color="amber"
      />
    </div>
  );
};

export default KeyMetricsGrid;
