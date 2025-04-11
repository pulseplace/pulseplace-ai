
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import MetaTags from '@/components/MetaTags';
import { getAnalytics } from '@/components/chat/services/analytics-service';
import BotAnalyticsSummary from '@/components/dashboard/analytics/pulsebot/BotAnalyticsSummary';

const PulseBotAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAnalytics();
        setAnalyticsData(data);
      } catch (err) {
        console.error('Error fetching bot analytics:', err);
        setError('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <MetaTags
        title="PulseBot Analytics | PulsePlace.ai"
        description="Analyze PulseBot interactions and performance metrics"
      />
      
      <h1 className="text-3xl font-bold mb-6">PulseBot Analytics</h1>
      
      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-pulse-600 mr-2" />
          <p>Loading analytics data...</p>
        </div>
      ) : error ? (
        <Card className="p-6">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card>
      ) : (
        // Fix: Ensure we pass the correct props to BotAnalyticsSummary
        <BotAnalyticsSummary 
          analytics={analyticsData} 
          isLoading={isLoading} 
        />
      )}
    </div>
  );
};

export default PulseBotAnalytics;
