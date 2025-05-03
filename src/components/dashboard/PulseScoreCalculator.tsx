
import React, { useState, useEffect } from 'react';
import { SurveyQuestion, SurveyResponse, PulseScoreData } from '@/types/scoring.types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generatePulseScore } from '@/utils/scoring/core';
import { getThemeColor, getBorderColor, getTextColor } from '@/utils/scoring/themes';
import { generateDepartmentInsights, generateRecommendedActions } from '@/utils/ai/departmentInsights';
import { BarChart3, LineChart, PieChart, ListChecks, FileSpreadsheet } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Example/mock data
const mockQuestions: SurveyQuestion[] = [
  {
    id: '1',
    text: 'I feel my ideas are valued by my team',
    type: 'likert',
    theme: 'psychological_safety',
    weight: 1
  },
  {
    id: '2',
    text: 'I have opportunities to learn and grow at my company',
    type: 'likert',
    theme: 'growth_opportunity',
    weight: 1
  },
  {
    id: '3',
    text: 'My manager genuinely cares about my wellbeing',
    type: 'likert',
    theme: 'trust_in_leadership',
    weight: 1
  }
  // ... more questions would be loaded from your database
];

const mockResponses: SurveyResponse[] = [
  { questionId: '1', value: 4, normalizedScore: 80 },
  { questionId: '2', value: 3, normalizedScore: 60 },
  { questionId: '3', value: 4, normalizedScore: 80 }
  // ... more responses
];

interface PulseScoreCalculatorProps {
  questions?: SurveyQuestion[];
  responses?: SurveyResponse[];
}

const PulseScoreCalculator: React.FC<PulseScoreCalculatorProps> = ({
  questions = mockQuestions,
  responses = mockResponses
}) => {
  const { user } = useAuth();
  const [pulseScore, setPulseScore] = useState<PulseScoreData | null>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [recommendedActions, setRecommendedActions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('overview');

  useEffect(() => {
    // Calculate pulse score
    const calculatedScore = generatePulseScore(responses, questions);
    
    // Generate AI insights based on score
    const generatedInsights = generateDepartmentInsights(calculatedScore.overallScore);
    
    // Generate recommended actions based on insights
    const actions = generateRecommendedActions(generatedInsights);
    
    // Set values with enriched data
    const enrichedScore = {
      ...calculatedScore,
      insights: generatedInsights,
      recommendedActions: actions
    };
    
    setPulseScore(enrichedScore);
    setInsights(generatedInsights);
    setRecommendedActions(actions);
  }, [questions, responses]);

  if (!pulseScore) {
    return <div className="flex justify-center p-8">Loading score data...</div>;
  }

  return (
    <Card className="shadow-md p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">PulseScore™ Analysis</h2>
          <p className="text-gray-500">
            Based on {pulseScore.responseCount} responses across {questions.length} questions
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex gap-2">
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm" className="bg-pulse-gradient">
            <ListChecks className="h-4 w-4 mr-2" />
            Take Action
          </Button>
        </div>
      </div>

      {/* Score overview with tier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1">
          <div className={`flex flex-col items-center p-6 border-2 rounded-lg ${getBorderColor(pulseScore.overallScore)}`}>
            <h3 className="text-lg font-medium mb-2">Overall PulseScore™</h3>
            <div className={`text-5xl font-bold mb-2 ${getTextColor(pulseScore.overallScore)}`}>
              {pulseScore.overallScore}
            </div>
            <div className="text-sm text-gray-500 mb-3">out of 100</div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
              {pulseScore.tier === 'pulse_certified' && 'Pulse Certified™'}
              {pulseScore.tier === 'emerging_culture' && 'Emerging Culture'}
              {pulseScore.tier === 'at_risk' && 'At Risk'}
              {pulseScore.tier === 'intervention_advised' && 'Intervention Advised'}
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Theme Scores</h3>
            <div className="space-y-4">
              {pulseScore.themesScores.map((theme) => (
                <div key={theme.theme} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{theme.theme.replace(/_/g, ' ')}</span>
                    <span className="text-sm font-medium">{theme.score}%</span>
                  </div>
                  <Progress 
                    value={theme.score} 
                    className="h-2" 
                    indicatorColor={getThemeColor(theme.theme)} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="flex items-center">
            <PieChart className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="actions" className="flex items-center">
            <ListChecks className="h-4 w-4 mr-2" />
            Actions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category scores */}
            <div className="col-span-2">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Category Scores</h3>
                <div className="space-y-4">
                  {pulseScore.categoryScores.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="capitalize">{category.category.replace(/_/g, ' ')}</span>
                        <span>{category.score}%</span>
                      </div>
                      <Progress value={category.score} className="h-2" />
                      <div className="text-xs text-gray-500">
                        Weight in final score: {Math.round(category.weight * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* AI Insights */}
            <div className="col-span-1">
              <Card className="p-6 h-full">
                <h3 className="text-lg font-medium mb-4">Key Insights</h3>
                <div className="space-y-4">
                  {insights && insights.length > 0 ? (
                    insights.slice(0, 3).map((insight, index) => (
                      <div key={index} className="border-l-2 border-pulse-600 pl-3 py-1">
                        <p className="text-sm font-medium">{insight.title}</p>
                        <p className="text-xs text-gray-500">{insight.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No insights available yet.</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Score Trends</h3>
            <p className="text-gray-500">Trend analysis will be available once you have multiple survey responses over time.</p>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">AI-Generated Insights</h3>
            <div className="space-y-6">
              {insights && insights.length > 0 ? (
                insights.map((insight, index) => (
                  <div key={index} className="border-l-2 border-pulse-600 pl-4 py-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-gray-600 mt-1">{insight.content}</p>
                    <div className="flex mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        insight.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        insight.severity === 'important' ? 'bg-orange-100 text-orange-800' :
                        insight.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 ml-2">
                        {insight.category}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No insights available yet.</p>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="actions">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Recommended Actions</h3>
            <div className="space-y-4">
              {recommendedActions && recommendedActions.length > 0 ? (
                recommendedActions.map((action, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-pulse-100 text-pulse-700 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <div>
                      <p>{action}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No recommended actions available yet.</p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default PulseScoreCalculator;
