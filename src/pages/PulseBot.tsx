
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Bot, Sparkles, ArrowRight, HelpCircle, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import MetaTags from '@/components/MetaTags';

const PulseBotPage: React.FC = () => {
  // Automatically open PulseBot when the page loads
  useEffect(() => {
    // Find and click the PulseBot button
    const pulseBotButton = document.querySelector('#pulsebot-container button');
    if (pulseBotButton && pulseBotButton instanceof HTMLElement) {
      setTimeout(() => {
        pulseBotButton.click();
      }, 500);
    }
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <MetaTags
        title="PulseBot AI Assistant | PulsePlace.ai"
        description="Chat with PulseBot for instant assistance on PulsePlace features and workplace culture insights."
      />
      
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">PulseBot</h1>
          <p className="text-lg text-gray-600">Your AI assistant for workplace culture insights</p>
        </div>
        
        <Link to="/pulsebot-analytics">
          <Button className="bg-pulse-gradient">
            <LineChart className="mr-2 h-4 w-4" />
            View PulseBot Analytics
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-pulse-600" />
              About PulseBot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              PulseBot is our AI assistant that helps you understand workplace culture, navigate the PulseScore 
              certification process, and use the PulsePlace platform effectively.
            </p>
            
            <h3 className="font-medium text-lg mb-2">PulseBot can help you with:</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-pulse-500 flex-shrink-0 mt-0.5" />
                <span>Answering questions about workplace culture assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-pulse-500 flex-shrink-0 mt-0.5" />
                <span>Explaining the PulseScore certification process</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 text-pulse-500 flex-shrink-0 mt-0.5" />
                <span>Providing insights on improving workplace trust</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquare className="h-5 w-5 text-pulse-500 flex-shrink-0 mt-0.5" />
                <span>Gathering feedback about your experience</span>
              </li>
            </ul>
            
            <div className="bg-pulse-50 p-4 rounded-lg border border-pulse-100">
              <p className="text-pulse-700 font-medium">
                Click the chat icon in the corner of any page to start a conversation with PulseBot!
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start text-left" onClick={() => {
              const pulseBotButton = document.querySelector('#pulsebot-container button');
              if (pulseBotButton && pulseBotButton instanceof HTMLElement) {
                pulseBotButton.click();
              }
            }}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with PulseBot
            </Button>
            
            <Link to="/pulsebot-analytics" className="block">
              <Button variant="outline" className="w-full justify-start text-left">
                <LineChart className="mr-2 h-4 w-4" />
                PulseBot Analytics
              </Button>
            </Link>
            
            <Link to="/help" className="block">
              <Button variant="outline" className="w-full justify-start text-left">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help Center
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Ready to see more?</h2>
              <p className="text-gray-600">Try our other features or book a full platform demo</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link to="/dashboard-preview">
                <Button variant="outline" className="flex items-center gap-2">
                  View Dashboard Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              
              <Link to="/book-demo">
                <Button className="bg-pulse-gradient flex items-center gap-2">
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Add missing LineChart import
import { LineChart } from 'lucide-react';

export default PulseBotPage;
