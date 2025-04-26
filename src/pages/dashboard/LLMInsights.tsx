
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, BrainCircuit, Lightbulb, MessageSquare } from 'lucide-react';

const LLMInsights = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">LLM Insights</h1>
        <p className="text-gray-600">
          AI-powered analysis of your workplace culture data
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Processed Responses
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              Total survey responses analyzed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Insights Generated
            </CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              Actionable insights identified
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Model Confidence
            </CardTitle>
            <BrainCircuit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              Average confidence score
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              LLM Generated Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Recognition Gap</h3>
                <p className="text-gray-700">
                  Analysis of feedback indicates a significant gap between employee expectations for recognition and current practices. 
                  73% of respondents mentioned feeling undervalued despite high performance metrics.
                </p>
                <div className="mt-3 flex items-center text-sm">
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-medium">Medium Priority</span>
                  <span className="ml-4 text-gray-500 text-xs">Confidence: 92%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Communication Clarity</h3>
                <p className="text-gray-700">
                  Natural language processing identified confusion around strategic direction in 64% of leadership-related feedback.
                  Employees are seeking more transparent communication about company goals and changes.
                </p>
                <div className="mt-3 flex items-center text-sm">
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">High Priority</span>
                  <span className="ml-4 text-gray-500 text-xs">Confidence: 89%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Work-Life Balance</h3>
                <p className="text-gray-700">
                  Sentiment analysis shows an 18% improvement in work-life balance satisfaction following the implementation
                  of flexible work policies. This correlates with a 12% increase in overall engagement scores.
                </p>
                <div className="mt-3 flex items-center text-sm">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">Positive Trend</span>
                  <span className="ml-4 text-gray-500 text-xs">Confidence: 96%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LLMInsights;
