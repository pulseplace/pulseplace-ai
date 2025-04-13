
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, BarChart, Bot, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">PulsePlace.ai Dashboard</h1>
          <p className="text-gray-600">Your workplace culture analytics platform powered by AI</p>
        </div>
        
        <Button className="bg-pulse-gradient">Run New Survey</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-pulse-600" />
              <span>AI Dashboard</span>
            </CardTitle>
            <CardDescription>
              Explore AI-powered insights and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              View your PulseScore™, culture analytics, and AI-generated insights in an interactive dashboard.
            </p>
            <Link to="/ai-dashboard">
              <Button className="w-full">View AI Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-pulse-600" />
              <span>PulseBot</span>
            </CardTitle>
            <CardDescription>
              Chat with our AI assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Get answers about your workplace culture data through natural language conversations.
            </p>
            <Link to="/pulsebot">
              <Button className="w-full" variant="outline">
                Chat with PulseBot
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-6 w-6 text-pulse-600" />
              <span>LLM Insights</span>
            </CardTitle>
            <CardDescription>
              View AI-generated culture insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Explore detailed AI analysis of your workplace culture and get actionable recommendations.
            </p>
            <Link to="/dashboard/llm-insights">
              <Button className="w-full" variant="outline">
                View Insights
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-gradient-to-br from-pulse-50 to-purple-50 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Zap className="h-5 w-5 text-pulse-600" />
              <span>AI Integration Progress</span>
            </h2>
            <p className="text-gray-600 mb-4">
              Your AI features are 85% complete and will be fully deployed by April 21, 2025.
            </p>
            <Link to="/features/ai-engine">
              <Button variant="outline">View Integration Status</Button>
            </Link>
          </div>
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm font-medium mb-1 flex justify-between">
                <span>Overall AI Completion</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-pulse-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Real-time Analysis</span>
                  <span className="text-amber-600">In Progress</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>PulseScore™ Algorithm</span>
                  <span className="text-green-600">Complete</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Sentiment Analysis</span>
                  <span className="text-green-600">Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center bg-white p-6 rounded-lg shadow-sm">
        <Bot className="h-12 w-12 text-pulse-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">PulseBot Demo</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Experience the power of AI-driven workplace culture analysis. Ask PulseBot questions about your culture data and get instant insights.
        </p>
        <Link to="/pulsebot">
          <Button className="bg-pulse-gradient">
            Launch PulseBot Demo
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
