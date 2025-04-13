
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Check, Info, TrendingDown, TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { toast } from 'sonner';

// Define the types for team insights with literal types for insight_type
export interface TeamInsight {
  team: string;
  insight_type: 'Culture Summary' | 'PulseScore Certification' | 'Risk Alert';
  ai_generated: boolean;
  content?: string;
  pulse_score?: number;
  certification_eligible?: boolean;
  summary?: string;
  risk_type?: string;
  engagement_drop_percent?: number;
  sentiment_drop?: string;
  recommendation?: string;
  updated_at?: string | Date; // Timestamp field
}

interface TeamInsightsProps {
  insights: TeamInsight[];
}

const TeamInsights: React.FC<TeamInsightsProps> = ({ insights: initialInsights }) => {
  const [insights, setInsights] = useState<TeamInsight[]>(initialInsights);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [realTimeStatus, setRealTimeStatus] = useState<'connected' | 'disconnected' | 'failed'>('connected');

  // Simulate real-time updates
  useEffect(() => {
    const realTimeUpdateSimulation = setTimeout(() => {
      // This simulates receiving real-time updates
      if (Math.random() > 0.8) {
        setRealTimeStatus('failed');
        toast.error("Real-time connection lost. Using cached insights data.", {
          description: "The system will automatically attempt to reconnect.",
          duration: 5000,
        });
      }
    }, 5000);

    return () => clearTimeout(realTimeUpdateSimulation);
  }, []);

  const handleRefreshInsights = () => {
    setLoading(true);
    // Simulate fetching updated insights
    setTimeout(() => {
      // Update insights with slight modifications to demonstrate real-time changes
      const updatedInsights = insights.map(insight => {
        if (insight.insight_type === 'PulseScore Certification' && insight.pulse_score) {
          return {
            ...insight,
            pulse_score: Math.min(100, insight.pulse_score + Math.floor(Math.random() * 5)),
            updated_at: new Date()
          };
        }
        if (insight.insight_type === 'Risk Alert' && insight.engagement_drop_percent) {
          return {
            ...insight, 
            engagement_drop_percent: Math.max(5, insight.engagement_drop_percent - Math.floor(Math.random() * 8)),
            updated_at: new Date()
          };
        }
        return insight;
      });
      
      setInsights(updatedInsights);
      setLastRefreshed(new Date());
      setLoading(false);
      setRealTimeStatus('connected');
      
      toast.success("Insights refreshed successfully", {
        description: "Latest AI-generated insights are now displayed.",
      });
    }, 2000);
  };

  // Check for certification eligibility
  const certificationEligibleTeams = insights
    .filter(insight => 
      insight.insight_type === 'PulseScore Certification' && 
      insight.pulse_score && 
      insight.pulse_score >= 80
    )
    .map(insight => insight.team);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Team AI Insights</h2>
          <p className="text-sm text-gray-500 mt-1">
            AI-generated insights based on survey and feedback data
          </p>
        </div>
        <div className="flex items-center gap-3">
          {realTimeStatus === 'failed' && (
            <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Using cached data</span>
            </Badge>
          )}
          {realTimeStatus === 'connected' && (
            <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
              <Check className="h-3.5 w-3.5" />
              <span>Real-time</span>
            </Badge>
          )}
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1">AI Generated</Badge>
          <button 
            onClick={handleRefreshInsights}
            disabled={loading}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      {certificationEligibleTeams.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">Certification Eligibility Signals</h3>
              <p className="text-sm text-green-700 mt-1">
                The following teams are eligible for PulseScore™ Certification:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {certificationEligibleTeams.map((team, index) => (
                  <Badge key={index} className="bg-green-100 text-green-800 border border-green-200">
                    {team}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className={`overflow-hidden border-l-4 ${getCardBorderColor(insight.insight_type)} hover:shadow-md transition-shadow`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">{insight.team}</CardTitle>
                {getInsightTypeIcon(insight.insight_type)}
              </div>
              <p className="text-sm text-gray-500 mt-1">{insight.insight_type}</p>
            </CardHeader>
            <CardContent>
              {renderInsightContent(insight)}
              
              {/* Enhanced visualization for trends */}
              {renderTrendVisualization(insight)}
              
              {/* Last updated timestamp */}
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
                <span>Last updated: {formatTimestamp(insight.updated_at)}</span>
                {getSentimentIndicator(insight)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Fallback message for when real-time fails completely */}
      {insights.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-6 text-center">
          <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-amber-800 mb-2">Real-Time Insights Unavailable</h3>
          <p className="text-amber-700 mb-4">
            We're unable to fetch real-time insights at this moment. This could be due to network connectivity issues.
          </p>
          <button
            onClick={handleRefreshInsights}
            disabled={loading}
            className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 mx-auto"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Retry Connection</span>
          </button>
        </div>
      )}
      
      <div className="text-xs text-gray-500 text-right">
        Last data refresh: {format(lastRefreshed, 'MMM d, yyyy • h:mm:ss a')}
      </div>
    </div>
  );
};

// Helper function to get the appropriate border color based on insight type
const getCardBorderColor = (insightType: string): string => {
  switch (insightType) {
    case 'Culture Summary':
      return 'border-blue-500';
    case 'PulseScore Certification':
      return 'border-green-500';
    case 'Risk Alert':
      return 'border-red-500';
    default:
      return 'border-gray-300';
  }
};

// Helper function to get the appropriate icon based on insight type
const getInsightTypeIcon = (insightType: string) => {
  switch (insightType) {
    case 'Culture Summary':
      return <Info className="h-5 w-5 text-blue-500" />;
    case 'PulseScore Certification':
      return <Check className="h-5 w-5 text-green-500" />;
    case 'Risk Alert':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

// Helper function to format the timestamp
const formatTimestamp = (timestamp?: string | Date): string => {
  if (!timestamp) {
    return 'Just now';
  }
  
  try {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return format(date, 'MMM d, yyyy • h:mm a');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date unavailable';
  }
};

// Helper function to get sentiment indicator based on insight type
const getSentimentIndicator = (insight: TeamInsight) => {
  if (insight.insight_type === 'PulseScore Certification' && insight.pulse_score) {
    return (
      <Badge 
        className={`flex items-center gap-1 ${insight.pulse_score > 75 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
      >
        {insight.pulse_score > 75 ? 
          <TrendingUp className="h-3 w-3" /> : 
          <TrendingDown className="h-3 w-3" />
        }
        <span>{insight.pulse_score}</span>
      </Badge>
    );
  }
  
  if (insight.insight_type === 'Risk Alert' && insight.engagement_drop_percent) {
    return (
      <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
        <TrendingDown className="h-3 w-3" />
        <span>{insight.engagement_drop_percent}%</span>
      </Badge>
    );
  }
  
  return null;
};

// Helper function to render trend visualization
const renderTrendVisualization = (insight: TeamInsight) => {
  if (insight.insight_type === 'PulseScore Certification' && insight.pulse_score) {
    const sparklineData = Array.from({ length: 5 }, () => Math.floor(Math.random() * 30) + 60);
    sparklineData.push(insight.pulse_score); // End with current score
    
    return (
      <div className="mt-2">
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <span>Score Trend</span>
          <div className="ml-2 flex items-end h-[20px] gap-[2px]">
            {sparklineData.map((value, i) => (
              <div 
                key={i} 
                className={`w-[3px] ${i === sparklineData.length - 1 ? 'bg-green-500' : 'bg-green-200'}`} 
                style={{ height: `${value * 0.2}px` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (insight.insight_type === 'Risk Alert' && insight.engagement_drop_percent) {
    const sparklineData = Array.from({ length: 5 }, () => Math.floor(Math.random() * 15) + 5);
    sparklineData.unshift(insight.engagement_drop_percent); // Start with current value
    
    return (
      <div className="mt-2">
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <span>Drop Trend</span>
          <div className="ml-2 flex items-end h-[20px] gap-[2px]">
            {sparklineData.map((value, i) => (
              <div 
                key={i} 
                className={`w-[3px] ${i === 0 ? 'bg-red-500' : 'bg-red-200'}`} 
                style={{ height: `${value * 0.6}px` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

// Helper function to render the content based on insight type
const renderInsightContent = (insight: TeamInsight) => {
  switch (insight.insight_type) {
    case 'Culture Summary':
      return (
        <div className="text-sm">
          <p className="whitespace-pre-line">{insight.content}</p>
          
          {/* Added tooltip with additional context */}
          <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
            <strong>Key drivers:</strong> Leadership transparency, role clarity, and team collaboration
          </div>
        </div>
      );
    case 'PulseScore Certification':
      return (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="font-medium">PulseScore</div>
            <div className="text-2xl font-bold">{insight.pulse_score}</div>
          </div>
          <p className="text-sm whitespace-pre-line">{insight.summary}</p>
          
          {/* Added detailed score breakdown with tooltips */}
          <div className="bg-green-50 p-2 rounded text-xs">
            <div className="font-medium text-green-800 mb-1">Score Breakdown:</div>
            <div className="flex justify-between">
              <span>Trust & Safety</span>
              <span>{Math.floor(Math.random() * 15) + 85}%</span>
            </div>
            <div className="flex justify-between">
              <span>Employee Engagement</span>
              <span>{Math.floor(Math.random() * 15) + 75}%</span>
            </div>
            <div className="flex justify-between">
              <span>Leadership</span>
              <span>{Math.floor(Math.random() * 15) + 80}%</span>
            </div>
          </div>
          
          {insight.certification_eligible && (
            <Badge className="bg-green-100 text-green-800">Certification Eligible</Badge>
          )}
        </div>
      );
    case 'Risk Alert':
      return (
        <div className="space-y-2">
          <div className="font-medium text-red-600">{insight.risk_type}</div>
          <div className="text-sm">
            <div className="flex justify-between">
              <span>Engagement Drop:</span>
              <span className="font-medium">{insight.engagement_drop_percent}%</span>
            </div>
            <div className="flex justify-between">
              <span>Sentiment Shift:</span>
              <span className="font-medium">{insight.sentiment_drop}</span>
            </div>
          </div>
          
          {/* Added risk assessment with tooltip */}
          <div className="bg-red-50 p-2 rounded text-xs">
            <div className="font-medium text-red-800 mb-1">Risk Assessment:</div>
            <div className="flex justify-between">
              <span>Severity</span>
              <span>{insight.engagement_drop_percent && insight.engagement_drop_percent > 20 ? 'High' : 'Medium'}</span>
            </div>
            <div className="flex justify-between">
              <span>Time sensitivity</span>
              <span>{insight.engagement_drop_percent && insight.engagement_drop_percent > 25 ? 'Urgent' : 'Moderate'}</span>
            </div>
            <div className="flex justify-between">
              <span>Impact radius</span>
              <span>{insight.team === 'Team Gamma' ? 'Department-wide' : 'Team-specific'}</span>
            </div>
          </div>
          
          <div className="mt-3 text-sm">
            <p className="font-medium">Recommendation:</p>
            <p>{insight.recommendation}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default TeamInsights;
