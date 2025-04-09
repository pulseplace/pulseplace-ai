
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";
import { pulseBotAPI } from '@/components/chat/services/pulsebot-api';
import { useToast } from "@/hooks/use-toast";

const BotAnalyticsSummary: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'general' | 'problems' | 'dashboard'>('general');
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState(7); // Default 7 days

  useEffect(() => {
    loadSummary();
  }, [activeTab, timeRange]);

  const loadSummary = async () => {
    setIsLoading(true);
    try {
      const summaryData = await pulseBotAPI.generateBotAnalyticsSummary(activeTab, timeRange);
      setSummary(summaryData);
    } catch (error) {
      console.error('Error loading bot analytics summary:', error);
      toast({
        title: "Error",
        description: "Failed to generate analytics summary. Please try again.",
        variant: "destructive"
      });
      setSummary("Could not generate summary at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadSummary();
    toast({
      title: "Refreshing",
      description: "Generating new analytics summary...",
    });
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
          onValueChange={(v) => setActiveTab(v as 'general' | 'problems' | 'dashboard')}
          className="w-full"
        >
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="general" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="problems" className="flex-1">Issues</TabsTrigger>
            <TabsTrigger value="dashboard" className="flex-1">Stats</TabsTrigger>
          </TabsList>
          
          <div className="bg-muted/30 p-4 rounded-md min-h-[250px]">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/6" />
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                {summary ? (
                  <div className="whitespace-pre-line">{summary}</div>
                ) : (
                  <p className="text-gray-500">No insights available. Click refresh to generate a summary.</p>
                )}
              </div>
            )}
          </div>
        </Tabs>
        
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>Data from last {timeRange} days</span>
          <div className="space-x-2">
            {[7, 14, 30].map((days) => (
              <Button 
                key={days} 
                variant={timeRange === days ? "secondary" : "ghost"} 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={() => setTimeRange(days)}
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
