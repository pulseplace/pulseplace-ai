
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange, DateRangeFilter } from '@/components/ui/date-range-picker';
import { PulseBotAnalytics as PulseBotAnalyticsType, PulseBotLog, AnalyticsFilters } from '@/components/chat/types';
import { fetchAnalytics } from '@/components/chat/services';
import PulseBotAnalyticsDashboard from '@/components/dashboard/PulseBotAnalyticsDashboard';

const PulseBotAnalytics: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<PulseBotAnalyticsType | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Filter states - updated to use DateRangeFilter
  const [dateRange, setDateRange] = useState<DateRangeFilter>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  const [language, setLanguage] = useState('all');
  const [feedbackType, setFeedbackType] = useState('all');
  
  // Load analytics data
  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAnalytics({
          dateFrom: dateRange.from,
          dateTo: dateRange.to,
          language: language !== 'all' ? language : undefined,
          feedbackType: feedbackType !== 'all' ? feedbackType : undefined
        });
        
        setAnalytics(data);
      } catch (error) {
        console.error('Error loading analytics:', error);
        toast({
          title: 'Error',
          description: 'Failed to load analytics data. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAnalytics();
  }, [dateRange, language, feedbackType, toast]);
  
  // Handle filter changes
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAnalytics({
        dateFrom: dateRange.from,
        dateTo: dateRange.to,
        language: language !== 'all' ? language : undefined,
        feedbackType: feedbackType !== 'all' ? feedbackType : undefined
      });
      
      setAnalytics(data);
      toast({
        title: 'Data Refreshed',
        description: 'Analytics data has been updated with current filters.'
      });
    } catch (error) {
      console.error('Error refreshing analytics:', error);
      toast({
        title: 'Error',
        description: 'Failed to refresh analytics data. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-6 bg-gray-50 flex-grow">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">PulseBot Analytics</h1>
          <p className="text-gray-500">Monitor usage, quality, and impact in real-time</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={feedbackType} onValueChange={setFeedbackType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Feedback Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Feedback</SelectItem>
              <SelectItem value="up">Positive Only</SelectItem>
              <SelectItem value="down">Negative Only</SelectItem>
            </SelectContent>
          </Select>
          
          <DatePickerWithRange 
            date={dateRange}
            setDate={setDateRange}
          />
          
          <Button 
            className="bg-pulse-gradient" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Refresh Data'}
          </Button>
        </div>
      </div>
      
      {analytics ? (
        <PulseBotAnalyticsDashboard 
          analytics={analytics} 
          isLoading={isLoading} 
        />
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">
                {isLoading ? 'Loading analytics data...' : 'No data available for the selected filters.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PulseBotAnalytics;
