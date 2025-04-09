
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PulseBotAnalytics } from '@/components/chat/types';
import FeedbackDistributionChart from './FeedbackDistributionChart';
import LanguageDistributionChart from './LanguageDistributionChart';
import AvatarStateChart from './AvatarStateChart';
import QueriesTable from './QueriesTable';
import DownvotedResponsesTable from './DownvotedResponsesTable';
import BotAnalyticsSummary from './BotAnalyticsSummary';

interface PulseBotTabsProps {
  analytics: PulseBotAnalytics;
  isLoading: boolean;
}

const PulseBotTabs: React.FC<PulseBotTabsProps> = ({ analytics, isLoading }) => {
  // Convert the mostDownvotedResponses to match the DownvotedResponse type
  const formattedDownvotedResponses = analytics.topDownvotedResponses || analytics.mostDownvotedResponses.map(item => ({
    id: crypto.randomUUID(),
    userMessage: item.query,
    botResponse: item.response,
    timestamp: new Date().toISOString(),
    downvotes: item.count
  }));

  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
        <TabsTrigger value="languages">Languages</TabsTrigger>
        <TabsTrigger value="avatars">Avatar States</TabsTrigger>
        <TabsTrigger value="queries">Top Queries</TabsTrigger>
        <TabsTrigger value="insights">AI Insights</TabsTrigger>
      </TabsList>
      
      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeedbackDistributionChart 
            positive={analytics.feedbackRatio.positive} 
            negative={analytics.feedbackRatio.negative} 
            isLoading={isLoading} 
          />
          <LanguageDistributionChart 
            languageBreakdown={analytics.languageBreakdown} 
            isLoading={isLoading} 
          />
        </div>
        <QueriesTable 
          queries={analytics.topQueries.slice(0, 5)} 
          isLoading={isLoading} 
        />
      </TabsContent>
      
      {/* Feedback Tab */}
      <TabsContent value="feedback">
        <div className="space-y-6">
          <FeedbackDistributionChart 
            positive={analytics.feedbackRatio.positive} 
            negative={analytics.feedbackRatio.negative} 
            isLoading={isLoading} 
            fullSize={true}
          />
          <DownvotedResponsesTable 
            responses={formattedDownvotedResponses} 
            isLoading={isLoading} 
          />
        </div>
      </TabsContent>
      
      {/* Languages Tab */}
      <TabsContent value="languages">
        <LanguageDistributionChart 
          languageBreakdown={analytics.languageBreakdown} 
          isLoading={isLoading} 
          fullSize={true}
        />
      </TabsContent>
      
      {/* Avatar States Tab */}
      <TabsContent value="avatars">
        <AvatarStateChart 
          avatarStateUsage={analytics.avatarStateUsage} 
          isLoading={isLoading} 
        />
      </TabsContent>
      
      {/* Top Queries Tab */}
      <TabsContent value="queries">
        <QueriesTable 
          queries={analytics.topQueries} 
          isLoading={isLoading} 
        />
      </TabsContent>
      
      {/* AI Insights Tab */}
      <TabsContent value="insights">
        <BotAnalyticsSummary />
      </TabsContent>
    </Tabs>
  );
};

export default PulseBotTabs;
