
import React from 'react';
import MetaTags from '@/components/MetaTags';
import { Card, CardContent } from '@/components/ui/card';
import PulseBot from '@/components/features/PulseBot';
import { Bot, FileText, BarChart, CornerDownRight } from 'lucide-react';

const PulseBotPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <MetaTags 
        title="PulseBot AI Assistant | PulsePlace.ai" 
        description="Interact with PulseBot, your AI-powered culture analytics assistant that provides insights and recommendations."
      />
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">PulseBot AI Assistant</h1>
          <p className="text-gray-600 mb-6">
            Interact with your workplace culture data through natural language. Ask questions, get insights, and receive actionable recommendations.
          </p>
          
          <PulseBot />
        </div>
        
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-pulse-600" />
                <span>How PulseBot Works</span>
              </h2>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="shrink-0 mt-1 w-6 h-6 flex items-center justify-center bg-pulse-100 text-pulse-600 rounded-full text-sm font-medium">1</div>
                  <div>
                    <p className="font-medium">Ask Questions Naturally</p>
                    <p className="text-sm text-gray-600">Type questions in everyday language about your culture data</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="shrink-0 mt-1 w-6 h-6 flex items-center justify-center bg-pulse-100 text-pulse-600 rounded-full text-sm font-medium">2</div>
                  <div>
                    <p className="font-medium">Get AI-Powered Insights</p>
                    <p className="text-sm text-gray-600">PulseBot analyzes your workplace data and provides contextual responses</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="shrink-0 mt-1 w-6 h-6 flex items-center justify-center bg-pulse-100 text-pulse-600 rounded-full text-sm font-medium">3</div>
                  <div>
                    <p className="font-medium">Discover Actionable Recommendations</p>
                    <p className="text-sm text-gray-600">Get specific suggestions to improve your workplace culture</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Sample Questions</h2>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CornerDownRight className="h-4 w-4 text-pulse-600 mt-1 shrink-0" />
                  <p className="text-sm">What are our top performing departments?</p>
                </li>
                
                <li className="flex items-start gap-2">
                  <CornerDownRight className="h-4 w-4 text-pulse-600 mt-1 shrink-0" />
                  <p className="text-sm">What themes are emerging from our recent surveys?</p>
                </li>
                
                <li className="flex items-start gap-2">
                  <CornerDownRight className="h-4 w-4 text-pulse-600 mt-1 shrink-0" />
                  <p className="text-sm">Where should we focus our culture improvement efforts?</p>
                </li>
                
                <li className="flex items-start gap-2">
                  <CornerDownRight className="h-4 w-4 text-pulse-600 mt-1 shrink-0" />
                  <p className="text-sm">How does our work-life balance compare to benchmarks?</p>
                </li>
                
                <li className="flex items-start gap-2">
                  <CornerDownRight className="h-4 w-4 text-pulse-600 mt-1 shrink-0" />
                  <p className="text-sm">What's causing turnover risk in the customer support team?</p>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Related Features</span>
            </h3>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-blue-600" />
                <span>Advanced Analytics Dashboard</span>
              </li>
              <li className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-blue-600" />
                <span>Sentiment Analysis Engine</span>
              </li>
              <li className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-blue-600" />
                <span>Culture Compass™</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseBotPage;
