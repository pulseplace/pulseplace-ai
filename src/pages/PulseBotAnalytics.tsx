
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, RefreshCw, Filter, Bot, Users, MessageSquare, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MetaTags from '@/components/MetaTags';
import KeyMetricsGrid from '@/components/dashboard/analytics/pulsebot/KeyMetricsGrid';
import PulseBotTabs from '@/components/dashboard/analytics/pulsebot/PulseBotTabs';
import KeyMetricCard from '@/components/dashboard/analytics/pulsebot/KeyMetricCard';

// Mock data for PulseBot Analytics
const mockPulseBotAnalytics = {
  totalInteractions: 1248,
  uniqueUsers: 342,
  averageResponseTime: 1.2,
  positiveRating: 92,
  responseRate: 98,
  feedbackRatio: {
    positive: 1147,
    negative: 101
  },
  topQueries: [
    { query: "How do I implement a culture survey?", count: 68 },
    { query: "What's the difference between engagement and satisfaction?", count: 42 },
    { query: "How can I improve employee trust?", count: 36 },
    { query: "What are the best metrics for measuring workplace culture?", count: 29 },
    { query: "How often should we run pulse surveys?", count: 24 },
    { query: "Can PulseBot integrate with Slack?", count: 19 },
    { query: "What's a good response rate for surveys?", count: 17 },
    { query: "How does the certification process work?", count: 15 }
  ],
  mostDownvotedResponses: [
    { query: "How do I implement a culture survey?", response: "That's a complex topic that requires consideration of multiple factors.", count: 12 },
    { query: "What's the difference between engagement and satisfaction?", response: "They are related concepts in employee experience measurement.", count: 8 }
  ],
  languageBreakdown: [
    { language: "English", count: 982, percentage: 78.7 },
    { language: "Spanish", count: 114, percentage: 9.1 },
    { language: "French", count: 76, percentage: 6.1 },
    { language: "German", count: 42, percentage: 3.4 },
    { language: "Other", count: 34, percentage: 2.7 }
  ],
  avatarStateUsage: [
    { state: "Neutral", count: 520, percentage: 41.7 },
    { state: "Happy", count: 410, percentage: 32.8 },
    { state: "Thinking", count: 186, percentage: 14.9 },
    { state: "Excited", count: 94, percentage: 7.5 },
    { state: "Confused", count: 38, percentage: 3.1 }
  ],
  // Add more mock data as needed
};

const PulseBotAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');
  const [analytics, setAnalytics] = useState(mockPulseBotAnalytics);
  const { toast } = useToast();

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleRefresh = () => {
    setIsLoading(true);
    toast({
      title: "Refreshing Analytics",
      description: "Fetching the latest data..."
    });
    
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Analytics Updated",
        description: "Your PulseBot analytics have been refreshed."
      });
    }, 2000);
  };
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your analytics report is being generated and will download shortly."
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your analytics report has been downloaded."
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <MetaTags
        title="PulseBot Analytics | PulsePlace.ai"
        description="Track and analyze PulseBot performance and engagement metrics."
      />
      
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">PulseBot Analytics</h1>
          <p className="text-gray-600">Track performance, usage patterns, and engagement with your PulseBot assistant.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Dashboard Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isLoading}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Time Period:</span>
                  <div className="flex">
                    <Button 
                      variant={dateRange === '7d' ? 'secondary' : 'outline'} 
                      size="sm"
                      onClick={() => setDateRange('7d')}
                    >
                      7D
                    </Button>
                    <Button 
                      variant={dateRange === '30d' ? 'secondary' : 'outline'} 
                      size="sm"
                      onClick={() => setDateRange('30d')}
                    >
                      30D
                    </Button>
                    <Button 
                      variant={dateRange === '90d' ? 'secondary' : 'outline'} 
                      size="sm"
                      onClick={() => setDateRange('90d')}
                    >
                      90D
                    </Button>
                    <Button 
                      variant={dateRange === 'custom' ? 'secondary' : 'outline'} 
                      size="sm"
                      onClick={() => setDateRange('custom')}
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Custom
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KeyMetricCard
              title="Total Interactions"
              value={analytics.totalInteractions}
              icon={<MessageSquare />}
              color="blue"
              trend={{ value: 12, label: "vs. previous period" }}
            />
            <KeyMetricCard
              title="Unique Users"
              value={analytics.uniqueUsers}
              icon={<Users />}
              color="green" 
              trend={{ value: 8, label: "vs. previous period" }}
            />
            <KeyMetricCard
              title="Satisfaction Rate"
              value={`${analytics.positiveRating}%`}
              icon={<ThumbsUp />}
              color="purple"
              trend={{ value: 3, label: "vs. previous period" }}
            />
            <KeyMetricCard
              title="Response Rate"
              value={`${analytics.responseRate}%`}
              icon={<Bot />}
              color="teal"
              trend={{ value: 1, label: "vs. previous period" }}
            />
          </div>
          
          {/* Main Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">PulseBot Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="metrics">
                <TabsList className="mb-6">
                  <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                  <TabsTrigger value="conversations">Conversation Analytics</TabsTrigger>
                  <TabsTrigger value="feedback">User Feedback</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="metrics">
                  <KeyMetricsGrid 
                    analytics={analytics} 
                    isLoading={isLoading} 
                  />
                </TabsContent>
                
                <TabsContent value="conversations">
                  <PulseBotTabs 
                    analytics={analytics}
                    isLoading={isLoading}
                  />
                </TabsContent>
                
                <TabsContent value="feedback">
                  <div className="space-y-6">
                    <p className="text-gray-500">Coming soon: User feedback analytics with sentiment analysis and improvement recommendations.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="detailed">
                  <div className="space-y-6">
                    <p className="text-gray-500">Coming soon: Detailed analytics with custom filtering and reporting options.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PulseBotAnalytics;
