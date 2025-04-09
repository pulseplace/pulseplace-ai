
import React from 'react';
import { PulseBotAnalytics } from '@/components/chat/types';
import KeyMetricCard from './KeyMetricCard';

interface KeyMetricsGridProps {
  analytics: PulseBotAnalytics;
  isLoading: boolean;
}

const KeyMetricsGrid: React.FC<KeyMetricsGridProps> = ({ analytics, isLoading }) => {
  // Format feedback ratio as percentage
  const feedbackPositiveRate = analytics.feedbackRatio.ratio * 100;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KeyMetricCard 
        title="Total Interactions" 
        value={analytics.totalInteractions} 
        isLoading={isLoading} 
      />
      <KeyMetricCard 
        title="Unique Users" 
        value={analytics.uniqueUsers} 
        isLoading={isLoading} 
      />
      <KeyMetricCard 
        title="Positive Feedback" 
        value={isLoading ? '-' : `${feedbackPositiveRate.toFixed(1)}%`} 
        isLoading={isLoading} 
      />
      <KeyMetricCard 
        title="Top Language" 
        value={isLoading ? '-' : analytics.languageBreakdown[0]?.language || 'N/A'} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default KeyMetricsGrid;
