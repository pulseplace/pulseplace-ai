
import React from 'react';
import { PulseBotAnalytics } from '@/components/chat/types';
import KeyMetricCard from './KeyMetricsCard';

interface KeyMetricsGridProps {
  analytics: PulseBotAnalytics;
  isLoading: boolean;
}

const KeyMetricsGrid: React.FC<KeyMetricsGridProps> = ({ analytics, isLoading }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KeyMetricCard 
        title="Total Interactions" 
        value={analytics.totalInteractions.toLocaleString()} 
        isLoading={isLoading} 
      />
      
      <KeyMetricCard 
        title="Unique Users" 
        value={analytics.uniqueUsers.toLocaleString()} 
        isLoading={isLoading} 
      />
      
      <KeyMetricCard 
        title="Positive Feedback" 
        value={analytics.feedbackRatio.ratio * 100 > 0 
          ? `${(analytics.feedbackRatio.ratio * 100).toFixed(1)}%` 
          : 'No feedback'} 
        isLoading={isLoading} 
      />
      
      <KeyMetricCard 
        title="Languages" 
        value={analytics.languageBreakdown.length} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default KeyMetricsGrid;
