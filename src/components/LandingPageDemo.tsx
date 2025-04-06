
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Brain, MessageSquare, BarChart, Sparkles, ChartBar, Check, ArrowRight } from 'lucide-react';
import { toast } from "sonner";

type TabType = 'feedback' | 'score' | 'insights';

const DEMO_FEEDBACKS = [
  "Our team meetings are productive, but I wish we had more cross-department collaboration.",
  "The management is supportive and the work-life balance is excellent. I love working here.",
  "There's a lack of clear career progression paths and limited professional development opportunities."
];

const LandingPageDemo = () => {
  const [activeTab, setActiveTab] = useState<TabType>('feedback');
  const [feedbackText, setFeedbackText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleQuickFeedback = (feedback: string) => {
    setFeedbackText(feedback);
  };

  const handleAnalyze = () => {
    if (!feedbackText.trim()) {
      toast.error("Please enter some feedback to analyze.");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      setActiveTab('score');
      toast.success("Feedback analyzed successfully!");
    }, 1500);
  };

  const handleViewInsights = () => {
    setActiveTab('insights');
  };

  // Determine sentiment based on feedback text
  const getSentiment = () => {
    const text = feedbackText.toLowerCase();
    if (text.includes('love') || text.includes('excellent') || text.includes('great') || text.includes('supportive')) {
      return { label: 'Positive', color: 'bg-green-100 text-green-800', score: 82 };
    } else if (text.includes('lack') || text.includes('limited') || text.includes('wish')) {
      return { label: 'Mixed', color: 'bg-yellow-100 text-yellow-800', score: 64 };
    } else if (text.includes('terrible') || text.includes('hate') || text.includes('poor')) {
      return { label: 'Negative', color: 'bg-red-100 text-red-800', score: 43 };
    }
    return { label: 'Neutral', color: 'bg-blue-100 text-blue-800', score: 72 };
  };

  const sentiment = getSentiment();

  // Calculate a simulated impact on different score components
  const getScoreComponents = () => {
    const baseScore = sentiment.score;
    return {
      emotionTrust: baseScore + Math.floor(Math.random() * 10) - 5,
      engagement: baseScore + Math.floor(Math.random() * 15) - 7,
      cultureTrust: baseScore + Math.floor(Math.random() * 12) - 6
    };
  };

  const scoreComponents = getScoreComponents();

  // Generate themes based on feedback
  const getThemes = () => {
    const text = feedbackText.toLowerCase();
    const themes = [];
    
    if (text.includes('team') || text.includes('collaboration') || text.includes('department'))
      themes.push('Team Dynamics');
    
    if (text.includes('management') || text.includes('leadership') || text.includes('manager'))
      themes.push('Leadership');
    
    if (text.includes('work-life') || text.includes('balance') || text.includes('flexible'))
      themes.push('Work-Life Balance');
    
    if (text.includes('career') || text.includes('progression') || text.includes('development') || text.includes('growth'))
      themes.push('Career Growth');
    
    return themes.length > 0 ? themes : ['Workplace Culture'];
  };

  // Generate insights based on sentiment and themes
  const getInsights = () => {
    const themes = getThemes();
    const insights = [];
    
    if (sentiment.label === 'Positive') {
      insights.push('Continue fostering the supportive environment that employees appreciate');
      insights.push(`Leverage strengths in ${themes[0]} to improve other areas`);
    } else if (sentiment.label === 'Mixed' || sentiment.label === 'Neutral') {
      insights.push(`Address concerns around ${themes[0]} to improve employee satisfaction`);
      insights.push('Conduct focused surveys to better understand specific pain points');
    } else {
      insights.push(`Immediate attention needed on ${themes[0]} issues`);
      insights.push('Create action plan to address negative sentiment areas');
    }
    
    return insights;
  };

  return (
    <section id="interactive-demo" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience PulsePlace in Action</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how our AI instantly analyzes employee feedback and generates actionable insights.
          </p>
        </div>
        
        <Card className="shadow-xl border-0 max-w-4xl mx-auto overflow-hidden">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
            <div className="bg-gradient-to-r from-pulse-600 to-pulse-800 p-6 text-white">
              <TabsList className="bg-white/20 text-white">
                <TabsTrigger value="feedback" className="data-[state=active]:bg-white data-[state=active]:text-pulse-800">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Enter Feedback
                </TabsTrigger>
                <TabsTrigger 
                  value="score" 
                  className="data-[state=active]:bg-white data-[state=active]:text-pulse-800"
                  disabled={!hasAnalyzed && !isAnalyzing}
                >
                  <ChartBar className="h-4 w-4 mr-2" />
                  View Score
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className="data-[state=active]:bg-white data-[state=active]:text-pulse-800"
                  disabled={!hasAnalyzed}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  AI Insights
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold">
                  {activeTab === 'feedback' && 'Submit Anonymous Employee Feedback'}
                  {activeTab === 'score' && 'Your PulseScore Results'}
                  {activeTab === 'insights' && 'AI-Generated Culture Insights'}
                </h3>
                <p className="text-white/80 mt-1">
                  {activeTab === 'feedback' && 'Enter feedback to see how our AI analyzes employee sentiment.'}
                  {activeTab === 'score' && 'See how this feedback affects your workplace culture metrics.'}
                  {activeTab === 'insights' && 'Actionable recommendations based on feedback analysis.'}
                </p>
              </div>
            </div>
            
            <CardContent className="p-6">
              <TabsContent value="feedback" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <Textarea 
                      placeholder="Type or select employee feedback to analyze..."
                      className="h-32 resize-none"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-3">Or try one of these examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {DEMO_FEEDBACKS.map((feedback, i) => (
                        <Button 
                          key={i} 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleQuickFeedback(feedback)}
                          className="text-xs"
                        >
                          Example {i + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-pulse-gradient"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !feedbackText.trim()}
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze Feedback
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="score" className="mt-0">
                {hasAnalyzed && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={sentiment.color}>
                            {sentiment.label} Sentiment
                          </Badge>
                          <span className="text-sm text-gray-500">
                            (Confidence: {Math.floor(70 + Math.random() * 25)}%)
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {getThemes().map((theme, i) => (
                            <Badge key={i} variant="outline" className="bg-pulse-50 text-pulse-700">
                              {theme}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="relative w-20 h-20">
                          <div 
                            className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold bg-white border-4"
                            style={{ 
                              borderColor: sentiment.score >= 80 ? '#10b981' : 
                                        sentiment.score >= 65 ? '#3b82f6' : 
                                        sentiment.score >= 50 ? '#f59e0b' : '#ef4444' 
                            }}
                          >
                            {sentiment.score}
                          </div>
                        </div>
                        <p className="text-sm font-medium mt-1">PulseScore™</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Score Breakdown</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Emotion & Trust Index (40%)</span>
                            <span className="font-semibold">{scoreComponents.emotionTrust}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-pulse-600 h-2 rounded-full" 
                              style={{ width: `${scoreComponents.emotionTrust}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Engagement Stability (30%)</span>
                            <span className="font-semibold">{scoreComponents.engagement}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-teal-500 h-2 rounded-full" 
                              style={{ width: `${scoreComponents.engagement}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Culture Trust Score (30%)</span>
                            <span className="font-semibold">{scoreComponents.cultureTrust}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${scoreComponents.cultureTrust}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleViewInsights}
                        className="bg-pulse-gradient"
                      >
                        View AI Insights
                        <Brain className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="insights" className="mt-0">
                {hasAnalyzed && (
                  <div className="space-y-6">
                    <div className="bg-pulse-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-pulse-100 p-2 rounded-full">
                          <Brain className="h-4 w-4 text-pulse-700" />
                        </div>
                        <h4 className="font-medium">AI-Generated Analysis</h4>
                      </div>
                      
                      <p className="text-gray-700">
                        {sentiment.label === 'Positive' 
                          ? "The feedback indicates a positive workplace culture with strong employee satisfaction." 
                          : sentiment.label === 'Mixed' 
                          ? "The feedback shows mixed sentiment. Some aspects of workplace culture are positive while others need improvement."
                          : sentiment.label === 'Negative'
                          ? "The feedback highlights significant concerns about workplace culture that require immediate attention."
                          : "The feedback is generally neutral about the workplace culture."}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Recommended Actions</h4>
                      <ul className="space-y-3">
                        {getInsights().map((insight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Industry Benchmarking</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Your PulseScore</p>
                          <p className="text-xl font-bold">{sentiment.score}</p>
                        </div>
                        <div className="h-12 w-px bg-gray-200"></div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Industry Average</p>
                          <p className="text-xl font-bold">{Math.floor(60 + Math.random() * 12)}</p>
                        </div>
                        <div className="h-12 w-px bg-gray-200"></div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Top Performers</p>
                          <p className="text-xl font-bold">{Math.floor(85 + Math.random() * 10)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setActiveTab('feedback')}
                      >
                        Try Another Feedback
                      </Button>
                      
                      <Button className="bg-pulse-gradient">
                        Get Full Report
                        <BarChart className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-6">
            This is a simplified demo. In production, PulsePlace.ai processes thousands of data points in real-time.
          </p>
          <Button className="bg-pulse-gradient">
            Join the Beta to See the Full Experience
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingPageDemo;
