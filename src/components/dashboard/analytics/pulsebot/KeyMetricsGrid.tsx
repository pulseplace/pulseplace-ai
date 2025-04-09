
import React from 'react';
import { Grid } from "@tremor/react";
import { Users, MessageSquare, ThumbsUp, Activity } from 'lucide-react';
import KeyMetricCard from './KeyMetricCard';

interface KeyMetricsGridProps {
  metrics: {
    totalInteractions: number;
    uniqueUsers: number;
    satisfactionRate: number;
    activeUsers: number;
  };
  isLoading?: boolean;
}

const KeyMetricsGrid: React.FC<KeyMetricsGridProps> = ({ metrics, isLoading = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KeyMetricCard
        title="Total Interactions"
        value={metrics.totalInteractions}
        icon={<MessageSquare />}
        color="blue"
      />
      
      <KeyMetricCard
        title="Unique Users"
        value={metrics.uniqueUsers}
        icon={<Users />}
        color="purple"
      />
      
      <KeyMetricCard
        title="Satisfaction Rate"
        value={`${metrics.satisfactionRate}%`}
        icon={<ThumbsUp />}
        color="green"
      />
      
      <KeyMetricCard
        title="Active Users"
        value={`${metrics.activeUsers}`}
        icon={<Activity />}
        color="amber"
      />
    </div>
  );
};

export default KeyMetricsGrid;
