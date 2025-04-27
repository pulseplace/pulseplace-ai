import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScoreBreakdownView from '@/components/dashboard/scoring/ScoreBreakdownView';
import DataSampleView from '@/components/dashboard/scoring/DataSampleView';
import PromptsContent from '@/components/dashboard/scoring/PromptsContent';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { ThemeScore, ScoringTheme } from '@/types/scoring.types';

const ScoringLogic = () => {
  // Sample theme scores for demonstration
  const [themeScores] = useState<ThemeScore[]>([
    { theme: 'trust_in_leadership' as ScoringTheme, score: 85, count: 12 },
    { theme: 'psychological_safety' as ScoringTheme, score: 72, count: 10 },
    { theme: 'inclusion_belonging' as ScoringTheme, score: 78, count: 8 },
    { theme: 'motivation_fulfillment' as ScoringTheme, score: 80, count: 12 },
    { theme: 'mission_alignment' as ScoringTheme, score: 92, count: 6 },
    { theme: 'engagement_continuity' as ScoringTheme, score: 68, count: 14 }
  ]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">PulseScore Logic Explorer</h1>
      
      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertTitle>Transparency is our core value</AlertTitle>
        <AlertDescription>
          Unlike "black box" survey tools, PulsePlace.ai provides full visibility into how scores are calculated.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="breakdown">
        <TabsList className="mb-4">
          <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
          <TabsTrigger value="data">Data Structure</TabsTrigger>
          <TabsTrigger value="prompts">AI Prompts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakdown">
          <Card>
            <CardHeader>
              <CardTitle>PulseScore Categories & Themes</CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreBreakdownView />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <DataSampleView />
        </TabsContent>
        
        <TabsContent value="prompts">
          <PromptsContent themeScores={themeScores} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScoringLogic;
