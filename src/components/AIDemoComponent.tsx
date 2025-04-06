
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, MessageSquareText, BarChart, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from "sonner";

type SentimentType = 'Positive' | 'Neutral' | 'Negative';
type ThemeType = 'Leadership' | 'Work-Life Balance' | 'Career Growth' | 'Compensation' | 'Team Dynamics';

interface AnalysisResult {
  sentiment: SentimentType;
  confidence: number;
  themes: ThemeType[];
  summary: string;
  actionItems?: string[];
}

// Sample employee responses for users to test with
const sampleResponses = [
  "I love working here. My manager is supportive and I feel like I'm growing in my career.",
  "The work is challenging but my team is great. I wish we had more flexibility with remote work options.",
  "Compensation is below market rate and there's limited opportunity for advancement.",
  "I'm neutral about my experience here. Some days are good, others are stressful."
];

// Mock AI analysis function (simulates API call to backend)
const mockAnalyzeFeedback = (feedback: string): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Simple sentiment analysis based on keywords
      let sentiment: SentimentType = 'Neutral';
      let confidence = 0.7;
      
      if (feedback.toLowerCase().includes('love') || 
          feedback.toLowerCase().includes('great') || 
          feedback.toLowerCase().includes('supportive')) {
        sentiment = 'Positive';
        confidence = 0.85 + (Math.random() * 0.1);
      } else if (feedback.toLowerCase().includes('below') || 
                feedback.toLowerCase().includes('limited') || 
                feedback.toLowerCase().includes('stress')) {
        sentiment = 'Negative';
        confidence = 0.75 + (Math.random() * 0.15);
      }
      
      // Extract themes based on keywords
      const themes: ThemeType[] = [];
      if (feedback.toLowerCase().includes('manager') || feedback.toLowerCase().includes('leadership')) {
        themes.push('Leadership');
      }
      if (feedback.toLowerCase().includes('flexibility') || feedback.toLowerCase().includes('remote') || 
          feedback.toLowerCase().includes('work-life') || feedback.toLowerCase().includes('hours')) {
        themes.push('Work-Life Balance');
      }
      if (feedback.toLowerCase().includes('career') || feedback.toLowerCase().includes('growth') || 
          feedback.toLowerCase().includes('advancement') || feedback.toLowerCase().includes('opportunity')) {
        themes.push('Career Growth');
      }
      if (feedback.toLowerCase().includes('compensation') || feedback.toLowerCase().includes('salary') || 
          feedback.toLowerCase().includes('pay') || feedback.toLowerCase().includes('benefits')) {
        themes.push('Compensation');
      }
      if (feedback.toLowerCase().includes('team') || feedback.toLowerCase().includes('colleagues') || 
          feedback.toLowerCase().includes('collaboration')) {
        themes.push('Team Dynamics');
      }
      
      // If no themes were detected, add a default one
      if (themes.length === 0) {
        themes.push('Team Dynamics');
      }
      
      // Generate a summary based on sentiment and themes
      let summary = '';
      if (sentiment === 'Positive') {
        summary = `Employee expresses satisfaction with ${themes.join(' and ').toLowerCase() || 'their experience'}.`;
      } else if (sentiment === 'Negative') {
        summary = `Employee shows concerns regarding ${themes.join(' and ').toLowerCase() || 'their experience'}.`;
      } else {
        summary = `Employee has mixed feelings about ${themes.join(' and ').toLowerCase() || 'their experience'}.`;
      }
      
      // Generate action items based on sentiment and themes
      let actionItems: string[] = [];
      if (themes.includes('Leadership') && sentiment !== 'Positive') {
        actionItems.push('Schedule leadership training for managers');
      }
      if (themes.includes('Work-Life Balance') && sentiment !== 'Positive') {
        actionItems.push('Review flexible work policies');
      }
      if (themes.includes('Career Growth') && sentiment !== 'Positive') {
        actionItems.push('Enhance career development programs');
      }
      if (themes.includes('Compensation') && sentiment !== 'Positive') {
        actionItems.push('Conduct compensation benchmarking');
      }
      if (themes.includes('Team Dynamics') && sentiment !== 'Positive') {
        actionItems.push('Organize team-building activities');
      }
      
      resolve({
        sentiment,
        confidence,
        themes,
        summary,
        actionItems: actionItems.length > 0 ? actionItems : undefined
      });
    }, 1500); // Simulate a 1.5 second API call
  });
};

const AIDemoComponent = () => {
  const [feedback, setFeedback] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  const handleAnalyze = async () => {
    if (!feedback.trim()) {
      toast.error('Please enter some feedback to analyze.');
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const result = await mockAnalyzeFeedback(feedback);
      setAnalysisResult(result);
    } catch (error) {
      toast.error('Failed to analyze feedback. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleSampleClick = (sample: string) => {
    setFeedback(sample);
  };
  
  const getSentimentColor = (sentiment: SentimentType) => {
    switch (sentiment) {
      case 'Positive': return 'bg-green-100 text-green-800';
      case 'Negative': return 'bg-red-100 text-red-800';
      case 'Neutral': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareText className="h-5 w-5 text-pulse-600" />
              Employee Feedback
            </CardTitle>
            <CardDescription>
              Enter sample employee feedback to see our AI in action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter employee feedback here..."
                className="h-40 resize-none"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              
              <div>
                <Label className="text-sm text-gray-500 mb-2 block">Try one of these samples:</Label>
                <div className="flex flex-wrap gap-2">
                  {sampleResponses.map((sample, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSampleClick(sample)}
                      className="text-xs"
                    >
                      Sample {index + 1}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-pulse-gradient"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Feedback'}
              {!isAnalyzing && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-pulse-600" />
              AI Analysis
            </CardTitle>
            <CardDescription>
              See how our AI extracts insights from feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {isAnalyzing ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="h-12 w-12 rounded-full bg-pulse-100 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-pulse-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-24 rounded-full" />
                      <Skeleton className="h-8 w-36 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[180px]" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ) : analysisResult ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className={getSentimentColor(analysisResult.sentiment)}>
                        {analysisResult.sentiment} Sentiment
                      </Badge>
                      <span className="text-sm text-gray-500">
                        ({Math.round(analysisResult.confidence * 100)}% confidence)
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">Simulated AI Analysis</span>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label className="text-sm text-gray-500 mb-2 block">Key Themes:</Label>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.themes.map((theme, index) => (
                        <Badge key={index} variant="outline" className="bg-pulse-50 text-pulse-700">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-gray-500 mb-2 block">Summary:</Label>
                    <p className="text-sm text-gray-800 p-3 bg-gray-50 rounded-md">
                      {analysisResult.summary}
                    </p>
                  </div>
                  
                  {analysisResult.actionItems && (
                    <div>
                      <Label className="text-sm text-gray-500 mb-2 block">Recommended Actions:</Label>
                      <ul className="space-y-2">
                        {analysisResult.actionItems.map((item, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-pulse-600 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="bg-pulse-50 p-3 rounded-md mt-6">
                    <div className="flex items-center gap-2 text-pulse-800 text-sm font-medium mb-1">
                      <BarChart className="h-4 w-4" />
                      PulseScore Impact
                    </div>
                    <p className="text-sm text-gray-700">
                      This type of feedback would influence your PulseScore™ in the 
                      {analysisResult.sentiment === 'Positive' ? ' positive direction' : 
                       analysisResult.sentiment === 'Negative' ? ' negative direction' : 
                       ' neutral way'}.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="bg-pulse-50 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 text-pulse-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Enter feedback to see analysis
                  </h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Our AI will analyze the sentiment, extract key themes, and provide actionable insights.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-10 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">How the AI Engine Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-pulse-100 p-2 rounded-full">
                <MessageSquareText className="h-4 w-4 text-pulse-600" />
              </div>
              <h4 className="font-medium">1. Data Collection</h4>
            </div>
            <p className="text-sm text-gray-600">
              Gather anonymous employee feedback through pulse surveys and existing data sources.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-pulse-100 p-2 rounded-full">
                <Brain className="h-4 w-4 text-pulse-600" />
              </div>
              <h4 className="font-medium">2. AI Processing</h4>
            </div>
            <p className="text-sm text-gray-600">
              LLMs analyze text for sentiment, extract themes, and identify underlying patterns.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-pulse-100 p-2 rounded-full">
                <BarChart className="h-4 w-4 text-pulse-600" />
              </div>
              <h4 className="font-medium">3. Actionable Insights</h4>
            </div>
            <p className="text-sm text-gray-600">
              Convert raw data into strategic recommendations and benchmark against industry standards.
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This is a simplified demo. In production, our AI processes thousands of data points in real-time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIDemoComponent;
