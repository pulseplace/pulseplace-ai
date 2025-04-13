
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import CultureCompass from '@/components/analytics/CultureCompass';
import PulseScoreCalculator from '@/components/analytics/PulseScoreCalculator';
import RealTimeInsights from '@/components/analytics/RealTimeInsights';
import { Download, RefreshCw, Zap, Share2, PieChart, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AiDashboard: React.FC = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Sample data for the Culture Compass
  const cultureDimensions = [
    {
      name: "Trust & Transparency",
      score: 72,
      benchmark: 65,
      gap: 7,
      status: 'strength' as 'strength' | 'neutral' | 'opportunity',
      trend: 'up' as 'up' | 'down' | 'stable',
      keyInsight: "Leadership communication is highly valued and creating strong trust."
    },
    {
      name: "Psychological Safety",
      score: 68,
      benchmark: 70,
      gap: -2,
      status: 'opportunity' as 'strength' | 'neutral' | 'opportunity',
      trend: 'stable' as 'up' | 'down' | 'stable',
      keyInsight: "Team meetings could benefit from more inclusive speaking opportunities."
    },
    {
      name: "Belonging & Inclusion",
      score: 78,
      benchmark: 68,
      gap: 10,
      status: 'strength' as 'strength' | 'neutral' | 'opportunity',
      trend: 'up' as 'up' | 'down' | 'stable',
      keyInsight: "Diversity initiatives are showing positive impact on sense of belonging."
    },
    {
      name: "Growth & Development",
      score: 58,
      benchmark: 72,
      gap: -14,
      status: 'opportunity' as 'strength' | 'neutral' | 'opportunity',
      trend: 'down' as 'up' | 'down' | 'stable',
      keyInsight: "Career development paths need clearer definition and communication."
    },
    {
      name: "Work-Life Balance",
      score: 65,
      benchmark: 60,
      gap: 5,
      status: 'neutral' as 'strength' | 'neutral' | 'opportunity',
      trend: 'stable' as 'up' | 'down' | 'stable',
      keyInsight: "Flexible work policies are appreciated but workload concerns persist."
    },
  ];

  // Sample data for predicted risks
  const predictedRisks = [
    {
      type: "Retention Risk: Engineering",
      description: "Higher than normal turnover intent detected in survey responses",
      severity: 'medium' as 'high' | 'medium' | 'low'
    },
    {
      type: "Psychological Safety: Product Team",
      description: "Recent reorganization may have affected team dynamics",
      severity: 'high' as 'high' | 'medium' | 'low'
    }
  ];
  
  // Sample data for PulseScore
  const categoryScores = [
    {
      category: "Employee Experience",
      score: 78,
      weight: 1.2,
      trend: 'up' as 'up' | 'down' | 'stable',
      aiInsight: "Onboarding improvements are having positive impact on new employee experience."
    },
    {
      category: "Team Dynamics",
      score: 82,
      weight: 1.0,
      trend: 'stable' as 'up' | 'down' | 'stable',
      aiInsight: "Cross-functional collaboration remains strong across departments."
    },
    {
      category: "Leadership Trust",
      score: 68,
      weight: 1.5,
      trend: 'down' as 'up' | 'down' | 'stable',
      aiInsight: "Recent strategic changes have created uncertainty. More transparent communication needed."
    },
    {
      category: "Mission Alignment",
      score: 85,
      weight: 0.9,
      trend: 'up' as 'up' | 'down' | 'stable',
      aiInsight: "Recent company town halls have successfully reinforced organizational mission."
    },
  ];
  
  // Sample sentiment analysis data
  const positiveThemes = [
    {
      theme: "Supportive Management",
      sentiment: 'positive' as 'positive' | 'negative' | 'neutral',
      percentage: 78,
      sampleQuote: "My manager regularly checks in on my wellbeing and career goals."
    },
    {
      theme: "Work Flexibility",
      sentiment: 'positive' as 'positive' | 'negative' | 'neutral',
      percentage: 82,
      sampleQuote: "The hybrid work policy gives me the flexibility I need to be productive."
    },
    {
      theme: "Team Collaboration",
      sentiment: 'positive' as 'positive' | 'negative' | 'neutral',
      percentage: 75,
      sampleQuote: "Cross-team projects have helped build stronger relationships across departments."
    }
  ];
  
  const negativeThemes = [
    {
      theme: "Career Growth",
      sentiment: 'negative' as 'positive' | 'negative' | 'neutral',
      percentage: 65,
      sampleQuote: "I'm unsure about my career path and promotion opportunities here."
    },
    {
      theme: "Workload Balance",
      sentiment: 'negative' as 'positive' | 'negative' | 'neutral',
      percentage: 58,
      sampleQuote: "The pace of projects often feels unsustainable with our current team size."
    }
  ];
  
  const neutralThemes = [
    {
      theme: "Remote Onboarding",
      sentiment: 'neutral' as 'positive' | 'negative' | 'neutral',
      percentage: 50,
      sampleQuote: "Remote onboarding has its challenges but the team has been helpful."
    },
    {
      theme: "Cross-team Communication",
      sentiment: 'neutral' as 'positive' | 'negative' | 'neutral',
      percentage: 45,
      sampleQuote: "Sometimes there's confusion between teams, but generally things work well."
    }
  ];
  
  // Sample trend data
  const trendData = [
    {
      name: "Employee Engagement",
      direction: 'up' as 'up' | 'down' | 'stable',
      percentage: 12,
      description: "Engagement has improved significantly in the last quarter, likely due to new team-building initiatives."
    },
    {
      name: "Manager Effectiveness",
      direction: 'up' as 'up' | 'down' | 'stable',
      percentage: 8,
      description: "Recent leadership training is showing positive results in manager feedback scores."
    },
    {
      name: "Work-Life Balance",
      direction: 'down' as 'up' | 'down' | 'stable',
      percentage: 7,
      description: "Recent project deadlines have created pressure, affecting reported work-life balance."
    },
    {
      name: "Team Morale",
      direction: 'stable' as 'up' | 'down' | 'stable',
      percentage: 2,
      description: "Team morale has remained relatively consistent over the past three months."
    }
  ];
  
  // Sample highlight quotes
  const highlightQuotes = [
    "The new flexible work policy has made a huge difference in my ability to balance home and work responsibilities.",
    "Our team meetings have become much more inclusive and productive since implementing the new facilitation approach.",
    "I appreciate how leadership has been transparent about company challenges and future direction in recent all-hands meetings.",
    "The mentorship program has been valuable, but I'd like to see more structured growth paths for my role."
  ];
  
  // Handle data refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      
      toast({
        title: "Dashboard Refreshed",
        description: "AI insights have been updated with the latest data.",
      });
    }, 2000);
  };
  
  // Handle report export
  const handleExportReport = () => {
    toast({
      title: "Export Started",
      description: "Your comprehensive AI insights report is being generated.",
    });
    
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your report has been downloaded.",
      });
    }, 1500);
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Culture Dashboard</h1>
          <p className="text-gray-500">Real-time analysis and insights powered by PulsePlace AI</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </Button>
          
          <Button 
            className="flex items-center gap-1 bg-pulse-gradient"
            onClick={handleExportReport}
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-pulse-600" />
              <span>AI-Generated Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-pulse-600">24</div>
            <p className="text-sm text-gray-500">Actionable insights discovered</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="h-4 w-4 text-pulse-600" />
              <span>Data Processing</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-pulse-600">2.5k</div>
            <p className="text-sm text-gray-500">Survey responses analyzed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-pulse-600" />
              <span>Participation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-pulse-600">87%</div>
            <p className="text-sm text-gray-500">Employee participation rate</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="insights">
        <TabsList className="mb-6">
          <TabsTrigger value="insights">Real-Time Insights</TabsTrigger>
          <TabsTrigger value="pulsescore">PulseScore™</TabsTrigger>
          <TabsTrigger value="compass">Culture Compass™</TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights">
          <div className="space-y-6">
            <RealTimeInsights 
              lastUpdated="April 12, 2025 09:15 AM"
              positiveThemes={positiveThemes}
              negativeThemes={negativeThemes}
              neutralThemes={neutralThemes}
              trends={trendData}
              highlightQuotes={highlightQuotes}
              isLoading={isRefreshing}
              onRefresh={handleRefresh}
            />
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">AI Manager Recommendation</h3>
                  <p className="text-sm text-gray-700">
                    Consider scheduling a focus group to address career development concerns, which appeared in 65% of feedback comments. Engineering and Product teams show the highest need for clearer growth paths.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Share2 className="h-3.5 w-3.5 mr-1" />
                      Share with Leadership
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="pulsescore">
          <PulseScoreCalculator 
            overallScore={75}
            categoryScores={categoryScores}
            benchmarkComparison={7}
            participationRate={87}
            certificationStatus="emerging"
            certificationRationale="Your organization is showing strong positive culture indicators, particularly in mission alignment and team dynamics. To achieve Pulse Certified™ status, focus on addressing the recent decline in leadership trust scores and continue building on your strong employee experience initiatives."
            lastCalculated="April 12, 2025"
          />
        </TabsContent>
        
        <TabsContent value="compass">
          <CultureCompass 
            dimensions={cultureDimensions}
            overallAlignment={68}
            primaryStrength="Your inclusion and belonging initiatives are creating a strong sense of community and team identity."
            primaryGap="Focus on clearer career development paths and growth opportunities, particularly in technical roles."
            lastUpdated="April 12, 2025"
            predictedRisks={predictedRisks}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiDashboard;
