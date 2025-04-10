
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock summaries for different tabs
const mockSummaries = {
  general: `Your PulseBot has been performing well over the past 30 days with a 92% satisfaction rate. 
  
  Key insights:
  - Total interactions increased by 12% compared to the previous period
  - 342 unique users engaged with PulseBot
  - Average response time of 1.2 seconds is excellent and contributes to positive user experience
  - English continues to be the dominant language (78.7%), but Spanish usage is growing (+2.1%)
  
  Recommendation: Consider expanding multilingual capabilities, especially for Spanish-speaking users.`,
  
  problems: `We've identified a few areas for improvement in your PulseBot:
  
  1. The most downvoted responses relate to complex topics like implementing culture surveys and distinguishing between engagement and satisfaction. Consider refining these responses with more specific, actionable information.
  
  2. Users seem to have difficulty getting detailed information about the certification process. Adding more comprehensive responses about certification steps would be helpful.
  
  3. Some users are asking about integration capabilities with platforms like Slack. Consider clarifying what integrations are currently available.`,
  
  dashboard: `Dashboard analytics summary:
  
  - User engagement metrics are strong with 98% response rate
  - Highest usage days are Tuesday and Wednesday
  - Most active time period is 10 AM - 2 PM
  - Top performing features: culture metrics queries, certification information
  - Underperforming features: custom report generation, department-specific analytics
  
  Growth opportunity: Expand department-specific analytics capabilities to meet user demand.`
};

const BotAnalyticsSummary: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'general' | 'problems' | 'dashboard'>('general');
  const [summary, setSummary] = useState<string>(mockSummaries.general);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState(30); // Default 30 days

  const loadSummary = (tab: 'general' | 'problems' | 'dashboard') => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSummary(mockSummaries[tab]);
      setIsLoading(false);
    }, 1000);
  };

  const handleTabChange = (tab: string) => {
    const newTab = tab as 'general' | 'problems' | 'dashboard';
    setActiveTab(newTab);
    loadSummary(newTab);
  };

  const handleRefresh = () => {
    loadSummary(activeTab);
    toast({
      title: "Refreshing",
      description: "Generating new analytics summary...",
    });
  };

  const handleTimeRangeChange = (days: number) => {
    setTimeRange(days);
    setIsLoading(true);
    
    // Simulate time range change
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Time Range Updated",
        description: `Showing data for the last ${days} days.`,
      });
    }, 800);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh} 
          disabled={isLoading}
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="general" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="problems" className="flex-1">Issues</TabsTrigger>
            <TabsTrigger value="dashboard" className="flex-1">Stats</TabsTrigger>
          </TabsList>
          
          <div className="bg-muted/30 p-4 rounded-md min-h-[250px]">
            {isLoading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line">{summary}</div>
              </div>
            )}
          </div>
        </Tabs>
        
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>Data from last {timeRange} days</span>
          <div className="space-x-2">
            {[7, 30, 90].map((days) => (
              <Button 
                key={days} 
                variant={timeRange === days ? "secondary" : "ghost"} 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={() => handleTimeRangeChange(days)}
              >
                {days}d
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotAnalyticsSummary;
