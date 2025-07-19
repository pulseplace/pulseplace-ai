
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Users, BarChart3, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Users className="h-8 w-8 text-pulse-600" />,
      title: "Deploy Pulse Surveys",
      description: "Send targeted surveys to your team to capture real-time employee sentiment and engagement data."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-pulse-600" />,
      title: "AI Analysis",
      description: "Our advanced AI analyzes responses to identify patterns, trends, and actionable insights about your workplace culture."
    },
    {
      icon: <Trophy className="h-8 w-8 text-pulse-600" />,
      title: "Get Certified",
      description: "Receive your PulsePlace certification based on your culture metrics and demonstrate your commitment to employee wellbeing."
    }
  ];

  return (
    <>
      <Helmet>
        <title>How It Works | PulsePlace.ai</title>
        <meta name="description" content="Learn how PulsePlace.ai helps organizations measure and improve workplace culture through AI-powered insights." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How PulsePlace Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your workplace culture with our three-step process that measures, analyzes, and certifies your organization's employee engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border text-center">
                <div className="mb-6 flex justify-center">
                  <div className="bg-pulse-50 p-4 rounded-full">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/demo">
              <Button className="bg-pulse-gradient text-white px-8 py-3">
                See It In Action
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
