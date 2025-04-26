
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BarChart3, Bot, BrainCircuit } from 'lucide-react';

const LLMInsights = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">LLM Insights</h1>
          <p className="text-gray-500">Advanced language model analysis of workplace culture data</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="mr-2">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-pulse-gradient text-white">
            Generate New Insights
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BrainCircuit className="h-5 w-5 mr-2 text-purple-600" />
              Language Understanding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">93%</p>
            <p className="text-sm text-gray-500">Semantic accuracy on employee feedback</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2 text-blue-600" />
              PulseBot Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">87%</p>
            <p className="text-sm text-gray-500">Sentiment analysis accuracy</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
              Predictive Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">76%</p>
            <p className="text-sm text-gray-500">Trend prediction accuracy</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500 text-center">
              Advanced sentiment analysis visualization<br />
              (Data visualization would appear here)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Theme Extraction</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500 text-center">
              Key themes extracted from employee feedback<br />
              (Data visualization would appear here)
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Action Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-100 rounded-md">
              <h3 className="font-medium text-green-800 mb-2">Communication Enhancement</h3>
              <p className="text-sm text-green-700">
                LLM analysis indicates a 27% increase in mentions of communication challenges. 
                Consider implementing regular team check-ins and standardizing project documentation.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">Career Development</h3>
              <p className="text-sm text-blue-700">
                Natural language processing identified strong correlation between mentorship and satisfaction scores.
                Recommendation: Formalize mentorship program and provide clearer advancement pathways.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-md">
              <h3 className="font-medium text-purple-800 mb-2">Work-Life Balance</h3>
              <p className="text-sm text-purple-700">
                Semantic analysis found increasing concern (32% growth) about after-hours expectations.
                Consider establishing clear communication boundaries and flexible work arrangements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LLMInsights;
