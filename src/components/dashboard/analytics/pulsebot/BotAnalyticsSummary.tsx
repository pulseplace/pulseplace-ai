
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw } from 'lucide-react';
import { generateBotAnalyticsSummary } from '@/components/chat/services/pulsebot-api';

const BotAnalyticsSummary: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'general' | 'problems' | 'dashboard'>('general');
  const [timeRange, setTimeRange] = useState<string>('7');
  const [summaries, setSummaries] = useState<{
    general: string | null;
    problems: string | null;
    dashboard: string | null;
  }>({
    general: null,
    problems: null,
    dashboard: null
  });
  const [isLoading, setIsLoading] = useState<{
    general: boolean;
    problems: boolean;
    dashboard: boolean;
  }>({
    general: false,
    problems: false,
    dashboard: false
  });

  // Load the summary for the active tab on component mount
  useEffect(() => {
    if (!summaries[activeTab]) {
      loadSummary(activeTab);
    }
  }, [activeTab]);

  const loadSummary = async (type: 'general' | 'problems' | 'dashboard') => {
    setIsLoading(prev => ({ ...prev, [type]: true }));
    
    try {
      const summary = await generateBotAnalyticsSummary(type, parseInt(timeRange));
      
      setSummaries(prev => ({
        ...prev,
        [type]: summary
      }));
    } catch (error) {
      console.error(`Error loading ${type} summary:`, error);
      toast({
        title: "Error",
        description: `Failed to generate ${type} summary. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleRefresh = () => {
    loadSummary(activeTab);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    // Clear summaries when time range changes
    setSummaries({
      general: null,
      problems: null,
      dashboard: null
    });
    // Load the summary for the current tab with the new time range
    loadSummary(activeTab);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">AI-Generated PulseBot Insights</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh}
            disabled={isLoading[activeTab]}
          >
            {isLoading[activeTab] ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="general">General Sentiment</TabsTrigger>
            <TabsTrigger value="problems">Problem Areas</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            {isLoading.general ? (
              <div className="py-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : summaries.general ? (
              <div className="space-y-4 whitespace-pre-line">
                {summaries.general}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground mb-4">No general sentiment summary available</p>
                <Button onClick={() => loadSummary('general')}>Generate Summary</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="problems">
            {isLoading.problems ? (
              <div className="py-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : summaries.problems ? (
              <div className="space-y-4 whitespace-pre-line">
                {summaries.problems}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground mb-4">No problem areas summary available</p>
                <Button onClick={() => loadSummary('problems')}>Generate Summary</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="dashboard">
            {isLoading.dashboard ? (
              <div className="py-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : summaries.dashboard ? (
              <div className="space-y-4 whitespace-pre-line">
                {summaries.dashboard}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground mb-4">No dashboard summary available</p>
                <Button onClick={() => loadSummary('dashboard')}>Generate Summary</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BotAnalyticsSummary;
