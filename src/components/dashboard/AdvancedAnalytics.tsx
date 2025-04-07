
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { subDays, subMonths } from "date-fns";
import { DateRangeFilter } from "@/types/scoring.types";

// Importing the new components
import AnalyticsHeader from './analytics/AnalyticsHeader';
import DashboardControls from './analytics/DashboardControls';
import TabNav from './analytics/TabNav';
import TrendsTabContent from './analytics/TrendsTabContent';
import ThemesTabContent from './analytics/ThemesTabContent';
import BenchmarksTabContent from './analytics/BenchmarksTabContent';
import AttritionTabContent from './analytics/AttritionTabContent';
import AIInsightsTabContent from './analytics/AIInsightsTabContent';

const AdvancedAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trends');
  
  // Interactive filtering options
  const [dateRange, setDateRange] = useState<DateRangeFilter>({ 
    from: subDays(new Date(), 90), 
    to: new Date() 
  });
  const [department, setDepartment] = useState('all');
  const [location, setLocation] = useState('all');
  const [chartType, setChartType] = useState('line');
  
  // Customizable dashboard options
  const [visibleMetrics, setVisibleMetrics] = useState({
    pulseScore: true,
    categoryBreakdown: true,
    aiInsights: true,
    participationRate: true,
    engagementRetention: false,
    benchmarks: true
  });
  
  // Toggle visible metrics
  const toggleMetric = (metric: string) => {
    setVisibleMetrics({
      ...visibleMetrics,
      [metric]: !visibleMetrics[metric as keyof typeof visibleMetrics]
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <AnalyticsHeader />
        <CardContent>
          <DashboardControls
            dateRange={dateRange}
            setDateRange={setDateRange}
            department={department}
            setDepartment={setDepartment}
            location={location}
            setLocation={setLocation}
            chartType={chartType}
            setChartType={setChartType}
            visibleMetrics={visibleMetrics}
            toggleMetric={toggleMetric}
          />
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* Time Trends Tab */}
            <TabsContent value="trends">
              <TrendsTabContent chartType={chartType} visibleMetrics={visibleMetrics} />
            </TabsContent>
            
            {/* Theme Analysis Tab */}
            <TabsContent value="themes">
              <ThemesTabContent />
            </TabsContent>
            
            {/* Benchmarks Tab */}
            <TabsContent value="benchmarks">
              <BenchmarksTabContent />
            </TabsContent>
            
            {/* Attrition Prediction Tab */}
            <TabsContent value="attrition">
              <AttritionTabContent />
            </TabsContent>
            
            {/* AI Insights Tab */}
            <TabsContent value="aiInsights">
              <AIInsightsTabContent />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;
