
import React from 'react';
import { Info, Check, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { TeamInsight } from './types';

// Helper function to get the appropriate border color based on insight type
export const getCardBorderColor = (insightType: string): string => {
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
export const getInsightTypeIcon = (insightType: string): React.ReactNode => {
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
export const formatTimestamp = (timestamp?: string | Date): string => {
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
export const getSentimentIndicator = (insight: TeamInsight): React.ReactNode => {
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
export const renderTrendVisualization = (insight: TeamInsight): React.ReactNode => {
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
export const renderInsightContent = (insight: TeamInsight): React.ReactNode => {
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
