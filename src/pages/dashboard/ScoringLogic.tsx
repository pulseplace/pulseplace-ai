
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
          <TabsTrigger value="predictive">Predictive Models</TabsTrigger>
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
        
        <TabsContent value="predictive">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4">Predictive Analytics Models</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our advanced ML models analyze historical pulse data to predict future trends and identify early warning signals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Attrition Prediction</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Uses sentiment analysis, response patterns, and historical data to forecast potential turnover risks.
                </p>
                <div className="text-sm">
                  <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                    <span>Model Type:</span>
                    <span className="font-medium">Gradient Boosted Decision Trees</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                    <span>Accuracy:</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Key Features:</span>
                    <span className="font-medium">15</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Engagement Forecasting</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Projects future engagement levels based on current trends, seasonal patterns, and organizational changes.
                </p>
                <div className="text-sm">
                  <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                    <span>Model Type:</span>
                    <span className="font-medium">LSTM Neural Network</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                    <span>Accuracy:</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Forecast Range:</span>
                    <span className="font-medium">6 months</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-medium mb-2 text-purple-800 dark:text-purple-300">Enterprise AI Features</h3>
              <p className="text-sm text-purple-700 dark:text-purple-400 mb-4">
                Enterprise clients have access to additional predictive capabilities and custom model training.
              </p>
              <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>Skill gap prediction and learning recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>Team composition optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>Performance trajectory modeling</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScoringLogic;
