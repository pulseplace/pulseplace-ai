
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { aiInsights } from './data/analyticsData';
import { getSeverityColor } from './utils/chartConfig';

const AIInsightsTabContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-4">Top Concerns</h3>
          <ul className="space-y-3">
            {aiInsights.topConcerns.map((concern, i) => (
              <li key={i} className="bg-gray-50 p-3 rounded text-sm">
                {concern}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-4">Recommended Actions</h3>
          <ul className="space-y-3">
            {aiInsights.recommendedActions.map((action, i) => (
              <li key={i} className="bg-blue-50 p-3 rounded text-sm">
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-sm font-medium mb-4">Predictive Flags</h3>
        <div className="space-y-3">
          {aiInsights.predictiveFlags.map((flag, i) => (
            <div key={i} className="p-3 border rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-medium">{flag.department}</span>
                  <p className="text-sm text-gray-600 mt-1">{flag.issue}</p>
                </div>
                <Badge className={getSeverityColor(flag.severity)}>
                  {flag.severity} severity
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-sm font-medium mb-4">AI Conversation</h3>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm text-gray-600 mb-3">You can ask follow-up questions about any insight:</p>
          <div className="space-y-2">
            <div className="bg-blue-50 p-3 rounded-md text-sm">
              <p className="font-medium">Example questions:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Why is the Customer Support team showing high attrition risk?</li>
                <li>What specific actions can improve work-life balance concerns?</li>
                <li>How does our recognition score compare to industry benchmarks?</li>
                <li>What themes are most strongly correlated with high engagement?</li>
              </ul>
            </div>
            <div className="flex mt-3">
              <input
                type="text"
                placeholder="Ask the AI about your insights..."
                className="flex-1 px-3 py-2 border rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm">
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsTabContent;
