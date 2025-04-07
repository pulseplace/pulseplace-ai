import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { 
  calculatePulseScore, 
  getSampleSurveyQuestions, 
  getTierDisplay 
} from '@/utils/scoring';
import { SurveyQuestion, SurveyResponse, PulseScoreData } from '@/types/scoring.types';
import { Activity, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const PulseScoreCalculator = () => {
  const [questions] = useState<SurveyQuestion[]>(getSampleSurveyQuestions());
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [pulseScore, setPulseScore] = useState<PulseScoreData | null>(null);
  
  useEffect(() => {
    const initialResponses = questions.map(q => ({
      questionId: q.id,
      value: q.type === 'text' ? '' : 3,
    }));
    setResponses(initialResponses);
  }, [questions]);
  
  useEffect(() => {
    if (responses.length === 0) return;
    
    const scoreData = calculatePulseScore(questions, responses);
    setPulseScore(scoreData);
  }, [responses, questions]);
  
  const handleResponseChange = (questionId: string, value: number | string) => {
    setResponses(prev => 
      prev.map(r => r.questionId === questionId ? { ...r, value } : r)
    );
  };
  
  const handleRandomize = () => {
    const randomResponses = questions.map(q => ({
      questionId: q.id,
      value: q.type === 'text' ? 
        'This is a sample text response.' : 
        Math.floor(Math.random() * 5) + 1,
    }));
    setResponses(randomResponses);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            PulseScore™ Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Adjust the responses below to see how different factors affect the PulseScore calculation.
            </p>
            <Button variant="outline" onClick={handleRandomize} className="mb-6">
              Randomize Responses
            </Button>
          </div>
          
          <div className="space-y-6">
            {questions.map(question => (
              <div key={question.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-2">
                    <span className="font-medium">{question.text}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-400 mt-1" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">
                            Theme: {question.theme.replace(/_/g, ' ')}
                            <br />
                            Weight: {question.weight}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {question.type !== 'text' && (
                    <span className="font-semibold text-pulse-600">
                      {responses.find(r => r.questionId === question.id)?.value}
                    </span>
                  )}
                </div>
                
                {question.type === 'text' ? (
                  <textarea 
                    className="w-full p-2 border rounded"
                    value={responses.find(r => r.questionId === question.id)?.value as string || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    rows={3}
                    placeholder="Enter your response here..."
                  />
                ) : (
                  <Slider
                    value={[Number(responses.find(r => r.questionId === question.id)?.value || 3)]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) => handleResponseChange(question.id, value[0])}
                    className="py-4"
                  />
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  Theme: {question.theme.replace(/_/g, ' ')} | Weight: {question.weight}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {pulseScore && (
        <Card>
          <CardHeader>
            <CardTitle>Calculated PulseScore Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-md flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4">Overall Score</h3>
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold border-4"
                  style={{ 
                    borderColor: 
                      pulseScore.tier === 'pulse_certified' ? '#10b981' : 
                      pulseScore.tier === 'emerging_culture' ? '#3b82f6' : 
                      pulseScore.tier === 'at_risk' ? '#f59e0b' : '#ef4444' 
                  }}
                >
                  {pulseScore.overallScore}
                </div>
                <div className="mt-4 text-center">
                  <p className={`font-medium ${getTierDisplay(pulseScore.tier).color}`}>
                    {getTierDisplay(pulseScore.tier).label}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-4">Category Scores</h3>
                <ul className="space-y-3">
                  {pulseScore.categoryScores.map(category => (
                    <li key={category.category} className="flex justify-between">
                      <span>{category.category.replace(/_/g, ' ')}</span>
                      <span className="font-semibold">{Math.round(category.score)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-4">Insights</h3>
                <ul className="list-disc list-inside text-sm space-y-2">
                  {pulseScore.insights.map((insight, i) => (
                    <li key={i}>{insight}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold mt-4 mb-2">Recommended Actions</h3>
                <ul className="list-disc list-inside text-sm space-y-2">
                  {pulseScore.recommendedActions.map((action, i) => (
                    <li key={i}>{action}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PulseScoreCalculator;
