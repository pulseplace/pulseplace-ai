
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const AIIntegrationStatus: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">AI Integration Components</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Sentiment Analysis Pipeline</span>
            <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
            </div>
            <span className="text-sm font-medium">100%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">PulseBot Implementation</span>
            <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
            </div>
            <span className="text-sm font-medium">100%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Real-time Insights Engine</span>
            <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
            </div>
            <span className="text-sm font-medium">100%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Culture Compass Implementation</span>
            <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
            </div>
            <span className="text-sm font-medium">100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIIntegrationStatus;
