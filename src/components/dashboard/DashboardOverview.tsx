
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import StatsRow from './StatsRow';
import ChartsRow from './ChartsRow';
import EngagementChart from './EngagementChart';
import AIInsights from './AIInsights';
import ActivityFeed from './ActivityFeed';

const DashboardOverview = () => {
  const { toast } = useToast();
  
  const handleExportClick = () => {
    toast({
      title: "Report Exported",
      description: "Dashboard report has been exported to PDF",
    });
  };
  
  const handleScheduleClick = () => {
    toast({
      title: "Meeting Scheduled",
      description: "A calendar invite has been sent to your email",
    });
  };
  
  return (
    <div className="p-6 bg-gray-50 flex-grow">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-500">Pulse insights for August 2025</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="text-sm" onClick={handleExportClick}>
            Export Report
          </Button>
          <Button className="bg-pulse-gradient text-sm" onClick={handleScheduleClick}>
            Schedule Meeting
          </Button>
        </div>
      </div>
      
      {/* Stats Row */}
      <StatsRow />
      
      {/* Charts Row */}
      <ChartsRow />
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EngagementChart />
        <AIInsights />
        <ActivityFeed />
      </div>
    </div>
  );
};

export default DashboardOverview;
