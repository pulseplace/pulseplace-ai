
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PulseBotAnalytics } from '@/components/chat/types';
import KeyMetricsGrid from './analytics/pulsebot/KeyMetricsGrid';
import PulseBotTabs from './analytics/pulsebot/PulseBotTabs';
import TrendsAnalysis from './analytics/pulsebot/TrendsAnalysis';

interface PulseBotAnalyticsDashboardProps {
  analytics: PulseBotAnalytics;
  isLoading: boolean;
}

const PulseBotAnalyticsDashboard: React.FC<PulseBotAnalyticsDashboardProps> = ({ 
  analytics, 
  isLoading 
}) => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <KeyMetricsGrid analytics={analytics} isLoading={isLoading} />
      
      {/* Tabs for different analytics views */}
      <PulseBotTabs analytics={analytics} isLoading={isLoading} />
    </div>
  );
};

export default PulseBotAnalyticsDashboard;
