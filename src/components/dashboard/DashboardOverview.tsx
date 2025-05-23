
import React, { useState, useEffect } from 'react';
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
import CertificationJourney from './CertificationJourney';
import { useOnboarding } from '@/hooks/useOnboarding';
import TaskList from './TaskList';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardOverview = () => {
  const { toast } = useToast();
  const { refreshData, isLoading } = useDashboard();
  const { isStepCompleted } = useOnboarding();
  const [showFilters, setShowFilters] = useState(false);
  const [timeRange, setTimeRange] = useState('30days');
  
  // Add an effect to handle potential loading issues by forcing a refresh after a timeout
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.log('Dashboard still loading after timeout, triggering refresh');
        refreshData();
      }
    }, 5000); // 5 second timeout
    
    return () => clearTimeout(timeoutId);
  }, [isLoading, refreshData]);
  
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
  
  // Only show the certification journey if they've started but not completed
  const showCertificationJourney = isStepCompleted('first-survey') && 
                                 !isStepCompleted('certification');
  
  // Loading fallback
  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 flex-grow">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Skeleton className="h-10 w-[160px]" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-44" />
          </div>
        </div>
        
        {/* Task List Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-64 w-full" />
        </div>
        
        {/* Stats Row Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        
        {/* Charts Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }
  
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
      
      {/* Task List */}
      <div className="mb-6">
        <TaskList />
      </div>
      
      {/* Certification Journey (if applicable) */}
      {showCertificationJourney && <CertificationJourney className="mb-6" />}
      
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
