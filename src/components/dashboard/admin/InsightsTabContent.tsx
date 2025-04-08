
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface InsightsTabContentProps {
  insights: {
    summary: string;
    strengths: string[];
    opportunities: string[];
    actionItems: string[];
  } | null;
  onGenerateInsights: () => void;
}

const InsightsTabContent: React.FC<InsightsTabContentProps> = ({ insights, onGenerateInsights }) => {
  if (insights) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Executive Summary</h3>
          <p className="text-gray-700">{insights.summary}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Key Strengths</h3>
            <ul className="list-disc list-inside space-y-1">
              {insights.strengths.map((strength: string, index: number) => (
                <li key={index} className="text-gray-700">{strength}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Improvement Areas</h3>
            <ul className="list-disc list-inside space-y-1">
              {insights.opportunities.map((opportunity: string, index: number) => (
                <li key={index} className="text-gray-700">{opportunity}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Recommended Actions</h3>
          <ul className="list-disc list-inside space-y-1">
            {insights.actionItems.map((action: string, index: number) => (
              <li key={index} className="text-gray-700">{action}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-center py-8">
      <BarChart2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">No Insights Available</h3>
      <p className="text-gray-500 mb-4">
        There are no AI-generated insights available yet. Complete surveys to generate insights.
      </p>
      <Button onClick={onGenerateInsights}>
        Generate Test Insights
      </Button>
    </div>
  );
};

export default InsightsTabContent;
