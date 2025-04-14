
import React, { useState } from 'react';
import { PulseBotAnalytics } from '@/components/chat/types';
import { DashboardCard } from '@/components/ui/dashboard-card';
import KeyMetricsGrid from './analytics/pulsebot/KeyMetricsGrid';
import PulseBotTabs from './analytics/pulsebot/PulseBotTabs';
import TrendsAnalysis from './analytics/pulsebot/TrendsAnalysis';
import EmptyStateCard from './EmptyStateCard';
import LastUpdatedTimestamp from './LastUpdatedTimestamp';
import ExportButton from './ExportButton';
import { Bot, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PulseBotAnalyticsDashboardProps {
  analytics: PulseBotAnalytics | null;
  isLoading: boolean;
  lastUpdated?: Date;
  onRefresh?: () => void;
}

const PulseBotAnalyticsDashboard: React.FC<PulseBotAnalyticsDashboardProps> = ({ 
  analytics, 
  isLoading,
  lastUpdated = new Date(),
  onRefresh
}) => {
  const [dateRange, setDateRange] = useState('30d');
  
  // Handle the case where analytics is null
  if (!isLoading && !analytics) {
    return (
      <EmptyStateCard 
        title="No Analytics Data Available"
        description="There is currently no PulseBot analytics data to display. Try refreshing or check back later."
        icon={<Bot className="h-12 w-12 text-muted-foreground/50" />}
        actionLabel="Refresh Data"
        onAction={onRefresh}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">PulseBot Analytics</h2>
          <p className="text-muted-foreground">Monitor PulseBot performance and engagement metrics</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <ExportButton 
            filename="pulsebot-analytics"
            formats={['pdf', 'csv']} 
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {['7d', '30d', '90d', '12m'].map((range) => (
          <Button
            key={range}
            variant={dateRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateRange(range)}
            disabled={isLoading}
          >
            {range === '7d' ? '7 Days' : 
             range === '30d' ? '30 Days' : 
             range === '90d' ? '90 Days' : '12 Months'}
          </Button>
        ))}
      </div>
      
      {/* Key Metrics */}
      <DashboardCard 
        title="Key Performance Metrics" 
        description="Overview of PulseBot engagement and performance"
        isLoading={isLoading}
        footer={
          <LastUpdatedTimestamp timestamp={lastUpdated} />
        }
      >
        <KeyMetricsGrid analytics={analytics} isLoading={isLoading} />
      </DashboardCard>
      
      {/* Tabs for different analytics views */}
      <DashboardCard 
        title="Detailed Analytics" 
        description="In-depth analysis of PulseBot interactions"
        isLoading={isLoading}
      >
        <PulseBotTabs analytics={analytics} isLoading={isLoading} />
      </DashboardCard>
    </div>
  );
};

export default PulseBotAnalyticsDashboard;
