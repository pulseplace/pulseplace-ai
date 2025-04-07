
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PulseScoreCalculator from '@/components/dashboard/PulseScoreCalculator';
import ThematicBucketsInfo from '@/components/dashboard/ThematicBucketsInfo';
import SchemaContent from '@/components/dashboard/scoring/SchemaContent';
import PromptsContent from '@/components/dashboard/scoring/PromptsContent';
import AdvancedAnalytics from '@/components/dashboard/AdvancedAnalytics';

const ScoringLogic = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">PulseScore™ Methodology</h1>
      
      <Tabs defaultValue="calculator">
        <TabsList className="mb-6">
          <TabsTrigger value="calculator">Score Calculator</TabsTrigger>
          <TabsTrigger value="thematicBuckets">Thematic Buckets</TabsTrigger>
          <TabsTrigger value="schema">Scoring Schema</TabsTrigger>
          <TabsTrigger value="prompts">AI Prompts</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator">
          <PulseScoreCalculator />
        </TabsContent>
        
        <TabsContent value="thematicBuckets">
          <ThematicBucketsInfo />
        </TabsContent>
        
        <TabsContent value="schema">
          <SchemaContent />
        </TabsContent>
        
        <TabsContent value="prompts">
          <PromptsContent />
        </TabsContent>
        
        <TabsContent value="advanced">
          <AdvancedAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScoringLogic;
