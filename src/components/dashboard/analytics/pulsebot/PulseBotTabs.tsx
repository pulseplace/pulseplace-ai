
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PulseBotAnalytics } from '@/components/chat/types';
import FeedbackDistributionChart from './FeedbackDistributionChart';
import AvatarStateChart from './AvatarStateChart';
import LanguageDistributionChart from './LanguageDistributionChart';
import DownvotedResponsesTable from './DownvotedResponsesTable';
import QueriesTable from './QueriesTable';

interface PulseBotTabsProps {
  analytics: PulseBotAnalytics;
  isLoading: boolean;
}

const PulseBotTabs: React.FC<PulseBotTabsProps> = ({ analytics, isLoading }) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="language">Language Usage</TabsTrigger>
        <TabsTrigger value="feedback">Feedback Analysis</TabsTrigger>
        <TabsTrigger value="queries">User Queries</TabsTrigger>
      </TabsList>
      
      {/* Overview Tab */}
      <TabsContent value="overview">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeedbackDistributionChart 
            positive={analytics.feedbackRatio.positive}
            negative={analytics.feedbackRatio.negative}
            isLoading={isLoading}
          />
          
          <AvatarStateChart 
            avatarStateUsage={analytics.avatarStateUsage}
            isLoading={isLoading}
          />
        </div>
      </TabsContent>
      
      {/* Language Usage Tab */}
      <TabsContent value="language">
        <LanguageDistributionChart 
          languageBreakdown={analytics.languageBreakdown}
          isLoading={isLoading}
        />
      </TabsContent>
      
      {/* Feedback Analysis Tab */}
      <TabsContent value="feedback">
        <DownvotedResponsesTable 
          responses={analytics.topDownvotedResponses}
          isLoading={isLoading}
        />
      </TabsContent>
      
      {/* User Queries Tab */}
      <TabsContent value="queries">
        <QueriesTable 
          queries={analytics.topQueries}
          isLoading={isLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PulseBotTabs;
