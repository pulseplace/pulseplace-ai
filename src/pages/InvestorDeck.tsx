
import React from 'react';
import MetaTags from '@/components/MetaTags';
import ScrollDeck from '@/components/ScrollDeck';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Define sample slides - these would be replaced with your actual content
const sampleSlides = [
  {
    id: '1',
    title: 'PulsePlace.ai: Revolutionizing Workplace Culture',
    content: (
      <div>
        <p className="text-lg mb-4">
          Helping companies build and certify high-trust workplace cultures through AI-powered insights.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Automated pulse surveys with deep sentiment analysis</li>
          <li>Certification process for high-performing cultures</li>
          <li>Predictive insights to prevent culture issues</li>
        </ul>
      </div>
    ),
    imageUrl: '/lovable-uploads/4f3c79fd-71b5-4a9d-9b51-8a7712a973f1.png'
  },
  {
    id: '2',
    title: 'The Problem We're Solving',
    content: (
      <div>
        <p className="mb-4">
          Companies struggle to measure, improve, and showcase their workplace culture:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>70% of employees report feeling disengaged at work</li>
          <li>$550B annual cost to US economy from employee disengagement</li>
          <li>Traditional surveys are infrequent and lack actionable insights</li>
          <li>No standardized way to certify and showcase culture excellence</li>
        </ul>
      </div>
    )
  },
  {
    id: '3',
    title: 'Our Solution',
    content: (
      <div>
        <p className="mb-4">
          PulsePlace.ai offers an end-to-end platform for measuring, improving, and certifying workplace culture:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="border p-3 rounded-md">
            <h4 className="font-bold mb-2">Measure</h4>
            <p className="text-sm">Automated pulse surveys with AI analysis</p>
          </div>
          <div className="border p-3 rounded-md">
            <h4 className="font-bold mb-2">Understand</h4>
            <p className="text-sm">Real-time dashboards with predictive insights</p>
          </div>
          <div className="border p-3 rounded-md">
            <h4 className="font-bold mb-2">Improve</h4>
            <p className="text-sm">AI-guided action plans for leadership</p>
          </div>
          <div className="border p-3 rounded-md">
            <h4 className="font-bold mb-2">Certify</h4>
            <p className="text-sm">Recognized badging for high-trust workplaces</p>
          </div>
        </div>
      </div>
    ),
    imageUrl: '/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png'
  },
  // Additional slides can be added here
];

const InvestorDeck: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <MetaTags 
        title="Investor Deck | PulsePlace.ai" 
        description="PulsePlace.ai investor presentation - revolutionizing workplace culture."
      />
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Investor Presentation</h1>
          <p className="text-gray-600 mb-6">
            Learn how PulsePlace.ai is revolutionizing workplace culture measurement and certification.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>PulsePlace.ai Investment Opportunity</CardTitle>
            <CardDescription>Scroll through our pitch deck to learn more</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollDeck slides={sampleSlides} className="mb-8" />
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            Note: This is a preliminary investor deck. For more detailed information or 
            to schedule a meeting, please contact our team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestorDeck;
