
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Download } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { format, subDays } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PulseBotAnalyticsDashboard from '@/components/dashboard/PulseBotAnalyticsDashboard';
import { PulseBotAnalytics } from '@/components/chat/types';
import { useToast } from "@/hooks/use-toast";
import KeyMetricsGrid from '@/components/dashboard/analytics/pulsebot/KeyMetricsGrid';

const PulseBotAnalyticsPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30days');
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState<PulseBotAnalytics | null>(null);
  
  // Mock data for initial render
  const mockAnalyticsData: PulseBotAnalytics = {
    totalInteractions: 1248,
    uniqueUsers: 456,
    positiveRating: 92,
    averageResponseTime: 1.2,
    topLanguages: ['English', 'Spanish', 'French'],
    feedbackDistribution: {
      positive: 382,
      negative: 34,
      neutral: 156
    },
    feedbackRatio: {
      positive: 382,
      negative: 34
    },
    topQueries: [
      { query: "How can PulsePlace help with employee retention?", count: 86 },
      { query: "What are the features of PulsePlace?", count: 73 },
      { query: "How does certification work?", count: 68 },
      { query: "Can I integrate with my HRIS?", count: 56 },
      { query: "How much does it cost?", count: 43 },
      { query: "What makes PulsePlace different?", count: 38 },
      { query: "How do I export my certification?", count: 32 },
      { query: "What's the implementation time?", count: 29 }
    ],
    popularQueries: [
      "How can PulsePlace help with employee retention?",
      "What are the features of PulsePlace?",
      "How does certification work?"
    ],
    mostDownvotedResponses: [
      { query: "How do I implement a culture survey?", response: "That's a complex topic that requires consideration of multiple factors.", count: 12 },
      { query: "What's the difference between engagement and satisfaction?", response: "They are related concepts in employee experience measurement.", count: 8 }
    ],
    topDownvotedResponses: [
      { id: "1", userMessage: "How do I implement a culture survey?", botResponse: "That's a complex topic that requires consideration of multiple factors.", timestamp: "2023-04-02T12:34:56Z", downvotes: 12 },
      { id: "2", userMessage: "What's the difference between engagement and satisfaction?", botResponse: "They are related concepts in employee experience measurement.", timestamp: "2023-04-05T09:12:34Z", downvotes: 8 }
    ],
    avatarStateUsage: [
      { state: "happy", count: 245, percentage: 35.5 },
      { state: "neutral", count: 198, percentage: 28.7 },
      { state: "thinking", count: 125, percentage: 18.1 },
      { state: "confused", count: 67, percentage: 9.7 },
      { state: "excited", count: 55, percentage: 8.0 }
    ],
    languageBreakdown: [
      { language: "English", count: 876, percentage: 70.2 },
      { language: "Spanish", count: 142, percentage: 11.4 },
      { language: "French", count: 97, percentage: 7.8 },
      { language: "German", count: 56, percentage: 4.5 },
      { language: "Portuguese", count: 45, percentage: 3.6 },
      { language: "Other", count: 32, percentage: 2.5 }
    ],
    logs: []
  };

  // Fetch analytics data
  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      // Calculate date range based on selection
      let fromDate = new Date();
      switch (timeRange) {
        case '7days':
          fromDate = subDays(new Date(), 7);
          break;
        case '30days':
          fromDate = subDays(new Date(), 30);
          break;
        case '90days':
          fromDate = subDays(new Date(), 90);
          break;
        case 'year':
          fromDate = subDays(new Date(), 365);
          break;
      }
      
      // In a real implementation, we would fetch data from Supabase
      // For now, we'll use mock data with a short delay to simulate loading
      setTimeout(() => {
        setAnalyticsData(mockAnalyticsData);
        setIsLoading(false);
      }, 1500);
      
      // Example of how the real implementation would look:
      /*
      const { data, error } = await supabase.functions.invoke('pulsebot-analytics', {
        body: {
          dateFrom: format(fromDate, 'yyyy-MM-dd'),
          dateTo: format(new Date(), 'yyyy-MM-dd')
        }
      });
      
      if (error) throw error;
      setAnalyticsData(data);
      */
    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics data: " + error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  return (
    <div className="container mx-auto py-6">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <DashboardHeader 
            title="PulseBot Analytics" 
            subtitle="Insights from user interactions with PulseBot"
          />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="feedback">User Feedback</TabsTrigger>
                <TabsTrigger value="queries">Top Queries</TabsTrigger>
                <TabsTrigger value="languages">Languages</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex flex-wrap gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
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
              
              <Button variant="outline" className="text-sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Button variant="outline" className="text-sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
              <Skeleton className="h-[400px] w-full" />
            </div>
          ) : (
            <>
              {analyticsData && (
                <TabsContent value={activeTab} className="mt-0">
                  {activeTab === 'overview' && (
                    <PulseBotAnalyticsDashboard 
                      analytics={analyticsData} 
                      isLoading={isLoading} 
                    />
                  )}
                  
                  {activeTab === 'feedback' && (
                    <div className="space-y-6">
                      <KeyMetricsGrid 
                        metrics={{
                          totalInteractions: analyticsData.feedbackRatio.positive + analyticsData.feedbackRatio.negative,
                          uniqueUsers: Math.floor((analyticsData.feedbackRatio.positive + analyticsData.feedbackRatio.negative) * 0.7),
                          satisfactionRate: (analyticsData.feedbackRatio.positive / (analyticsData.feedbackRatio.positive + analyticsData.feedbackRatio.negative)) * 100,
                          activeUsers: Math.floor(analyticsData.uniqueUsers * 0.8)
                        }}
                        isLoading={isLoading}
                      />
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Feedback Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="prose max-w-none">
                            <p>Detailed feedback analysis shows that users are generally satisfied with PulseBot responses. The most common reasons for negative feedback include:</p>
                            <ul>
                              <li>Responses that are too generic (42%)</li>
                              <li>Missing specific product details (28%)</li>
                              <li>Lack of technical depth (18%)</li>
                              <li>Other reasons (12%)</li>
                            </ul>
                            
                            <h3>Improvement Areas</h3>
                            <p>Based on user feedback patterns, we recommend:</p>
                            <ol>
                              <li>Enhancing knowledge base with more specific product details</li>
                              <li>Improving responses for technical questions</li>
                              <li>Adding more contextual examples in responses</li>
                            </ol>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  
                  {/* Additional tab content would be implemented here */}
                </TabsContent>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PulseBotAnalyticsPage;
