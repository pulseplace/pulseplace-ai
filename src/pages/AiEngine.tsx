
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Cpu, LineChart, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import MetaTags from '@/components/MetaTags';

const AiEngine = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags
        title="AI Engine | PulsePlace.ai"
        description="Discover how PulsePlace.ai uses advanced AI to measure and improve workplace trust."
      />
    
      <h1 className="text-3xl font-bold mb-6">AI Engine</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-pulse-600" />
                <span>PulsePlace AI Technology</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                Our AI Engine powers PulsePlace with advanced workplace culture analytics.
              </p>
              <p className="mb-6">
                Leveraging natural language processing and machine learning, we extract meaningful insights
                from employee feedback and sentiment data to help organizations improve their workplace culture.
              </p>
              <Link to="/pulsebot">
                <Button className="bg-pulse-gradient hover:opacity-90 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Try PulseBot
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-6 w-6 text-pulse-600" />
                <span>Key Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 rounded-full bg-pulse-100 text-pulse-600">
                    <LineChart className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-medium">Sentiment Analysis</span>
                    <p className="text-sm text-gray-600">Analyze feedback across departments and teams</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 rounded-full bg-pulse-100 text-pulse-600">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-medium">Theme Identification</span>
                    <p className="text-sm text-gray-600">Extract key themes from open-ended responses</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 rounded-full bg-pulse-100 text-pulse-600">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-medium">Predictive Analytics</span>
                    <p className="text-sm text-gray-600">Forecast employee retention and engagement trends</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6">
                <Link to="/pulsebot-analytics">
                  <Button variant="outline">View Analytics Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Ready to see our AI in action?</h2>
            <p className="mb-6 text-gray-600">Experience how PulsePlace can transform your workplace culture</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/book-demo">
                <Button className="bg-pulse-gradient hover:opacity-90">Book a Demo</Button>
              </Link>
              <Link to="/join-beta">
                <Button variant="outline">Join Beta Program</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiEngine;
