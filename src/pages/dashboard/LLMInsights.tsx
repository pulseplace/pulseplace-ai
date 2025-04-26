
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';

const LLMInsights = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">PulsePlace LLM Insights</h1>
      <Alert className="mb-6 bg-blue-50">
        <Info className="h-4 w-4" />
        <AlertDescription>
          This dashboard provides AI-generated insights from employee feedback and survey responses.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium mb-2">Key Themes Detected</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span>Leadership Trust</span>
                  <span className="text-green-600 font-medium">+12% positive</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Work-Life Balance</span>
                  <span className="text-amber-600 font-medium">-8% negative</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Career Growth</span>
                  <span className="text-blue-600 font-medium">+3% neutral</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-md">
                <h4 className="font-medium">Communication Practices</h4>
                <p className="text-sm text-gray-600">
                  Consider implementing more regular team check-ins to address feedback concerns in real-time.
                </p>
              </div>
              <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-md">
                <h4 className="font-medium">Recognition Program</h4>
                <p className="text-sm text-gray-600">
                  Expand the peer recognition program to increase visibility of team member contributions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Emotion Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
          <p className="text-gray-500">Emotion analysis visualization will appear here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LLMInsights;
