
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Filter, 
  Calendar 
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import StatsRow from './StatsRow';
import ChartsRow from './ChartsRow';
import EngagementChart from './EngagementChart';
import AIInsights from './AIInsights';
import ActivityFeed from './ActivityFeed';
import DashboardFilter from './DashboardFilter';
import { useDashboard } from '@/contexts/DashboardContext';

const DashboardOverview = () => {
  const { toast } = useToast();
  const { refreshData } = useDashboard();
  const [showFilters, setShowFilters] = useState(false);
  const [timeRange, setTimeRange] = useState('30days');
  
  const handleExportClick = () => {
    toast({
      title: "Report Exported",
      description: "Dashboard report has been exported to PDF",
    });
    
    // In a real implementation, we would generate and download a PDF here
    const dummyLink = document.createElement('a');
    dummyLink.href = '#';
    dummyLink.setAttribute('download', 'pulse_dashboard_report.pdf');
    dummyLink.click();
  };
  
  const handleScheduleClick = () => {
    toast({
      title: "Meeting Scheduled",
      description: "A calendar invite has been sent to your email",
    });
  };
  
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    refreshData(); // Refresh data when time range changes
  };
  
  return (
    <div className="p-6 bg-gray-50 flex-grow">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-500">Pulse insights for April 2025</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="text-sm" onClick={handleFilterToggle}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <Button variant="outline" className="text-sm" onClick={handleExportClick}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          
          <Button className="bg-pulse-gradient text-sm" onClick={handleScheduleClick}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>
      
      {showFilters && <DashboardFilter onClose={() => setShowFilters(false)} />}
      
      {/* Stats Row */}
      <StatsRow timeRange={timeRange} />
      
      {/* Charts Row */}
      <ChartsRow timeRange={timeRange} />
      
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
