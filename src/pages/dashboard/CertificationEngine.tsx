import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/hooks/useOnboarding';
import { insightsService, InsightRequest } from '@/services/insightsService';
import { surveyResponseService } from '@/services/survey/surveyResponseService';
import { scoringService } from '@/services/scoringService';
import { useDashboard } from '@/contexts/DashboardContext';
import QuestionThemeMapping from '@/components/dashboard/mapping/QuestionThemeMapping';
import { SurveyQuestion } from '@/types/scoring.types';

const CertificationEngine = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const { markStepComplete } = useOnboarding();
  const { surveys, responses, refreshData } = useDashboard();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pulseScore, setPulseScore] = useState<number | null>(null);
  const [isCertified, setIsCertified] = useState(false);
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>([]);
  const [categoryScores, setCategoryScores] = useState<any[]>([]);
  const [sentimentData, setSentimentData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any>(null);
  
  useEffect(() => {
    if (!user || !profile) {
      console.warn('User or profile not loaded');
      return;
    }
    
    if (!surveys || surveys.length === 0) {
      console.warn('No surveys found');
      return;
    }
    
    if (!responses || responses.length === 0) {
      console.warn('No responses found');
      return;
    }
    
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get the most recent survey
        const latestSurvey = surveys[0];
        
        // Get all responses for the survey
        const surveyResponses = responses.filter(r => r.surveyId === latestSurvey.id);
        
        if (!surveyResponses || surveyResponses.length === 0) {
          throw new Error('No responses found for the latest survey');
        }
        
        // Get the survey questions
        const questions = latestSurvey.questions;
        setSurveyQuestions(questions);
        
        // Calculate the pulse score
        const { overallScore, categoryScores, sentimentData } = await scoringService.calculateScores(latestSurvey.id);
        setPulseScore(overallScore);
        setCategoryScores(categoryScores);
        setSentimentData(sentimentData);
        
        // Check if the company is certified
        if (overallScore >= 80) {
          setIsCertified(true);
        }
        
        // Generate insights
        const insightRequest: InsightRequest = {
          companyName: profile.company || 'Your Company',
          departmentName: profile.department,
          overallScore: overallScore,
          categoryScores: categoryScores,
          sentimentData: sentimentData,
          certificationType: isCertified ? 'Pulse Certified' : 'Not Certified',
          responseCount: surveyResponses.length
        };
        
        const generatedInsights = await insightsService.generateInsights(insightRequest);
        setInsights(generatedInsights);
        
        // Mark the step as complete
        await markStepComplete('results-calculation');
        
        toast({
          title: "Results Calculated",
          description: "Your PulseScore™ and insights have been generated.",
        });
      } catch (error: any) {
        console.error('Error calculating results:', error);
        setError(error.message || 'Failed to calculate results');
        toast({
          title: "Calculation Failed",
          description: error.message || "Failed to calculate results. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, profile, surveys, responses, toast, markStepComplete]);
  
  const handleContinue = () => {
    navigate('/dashboard/share-certification');
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-pulse-600" />
          <span className="mt-2 text-gray-600">Calculating results...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <span className="mt-2 text-red-600">{error}</span>
        </div>
      </div>
    );
  }
  
  const sampleQuestion: SurveyQuestion = {
    id: 'sample-question',
    text: 'Sample question text',
    type: 'scale',
    theme: 'trust_in_leadership',
    weight: 1,
    options: [1, 2, 3, 4, 5]
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Certification Engine</h1>
        <p className="text-gray-600">Calculating your PulseScore™ and generating insights...</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle>PulseScore™</CardTitle>
            <CardDescription>Your overall workplace culture score</CardDescription>
          </CardHeader>
          <CardContent>
            {pulseScore !== null ? (
              <div className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-pulse-600">{pulseScore}</div>
                <Progress value={pulseScore} max={100} className="w-64 mt-4" />
                <div className="mt-4">
                  {isCertified ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Pulse Certified™
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Not Certified</Badge>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400 mx-auto mb-2" />
                Calculating...
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>AI-generated insights about your culture</CardDescription>
          </CardHeader>
          <CardContent>
            {insights ? (
              <div className="space-y-4">
                <p className="text-gray-700">{insights.summary}</p>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Strengths</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {insights.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Opportunities</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {insights.opportunities.map((opportunity, index) => (
                      <li key={index}>{opportunity}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Action Items</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {insights.actionItems.map((actionItem, index) => (
                      <li key={index}>{actionItem}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400 mx-auto mb-2" />
                Generating insights...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Survey Questions & Themes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {surveyQuestions.map(question => (
            <QuestionThemeMapping key={question.id} question={question} />
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <Button className="bg-pulse-gradient" onClick={handleContinue}>
          Continue to Certification
        </Button>
      </div>
    </div>
  );
};

export default CertificationEngine;
