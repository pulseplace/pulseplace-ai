
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Check, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// Define the types for team insights
interface TeamInsight {
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
}

interface TeamInsightsProps {
  insights: TeamInsight[];
}

const TeamInsights: React.FC<TeamInsightsProps> = ({ insights }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team AI Insights</h2>
        <Badge className="bg-blue-100 text-blue-800 px-3 py-1">AI Generated</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className={`overflow-hidden border-l-4 ${getCardBorderColor(insight.insight_type)}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">{insight.team}</CardTitle>
                {getInsightTypeIcon(insight.insight_type)}
              </div>
              <p className="text-sm text-gray-500 mt-1">{insight.insight_type}</p>
            </CardHeader>
            <CardContent>
              {renderInsightContent(insight)}
            </CardContent>
          </Card>
        ))}
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

// Helper function to render the content based on insight type
const renderInsightContent = (insight: TeamInsight) => {
  switch (insight.insight_type) {
    case 'Culture Summary':
      return (
        <div className="text-sm">
          <p className="whitespace-pre-line">{insight.content}</p>
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
