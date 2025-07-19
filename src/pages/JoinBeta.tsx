
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Rocket, Users, Zap, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JoinBeta = () => {
  const benefits = [
    {
      icon: <Rocket className="h-8 w-8 text-pulse-600" />,
      title: "Early Access",
      description: "Be among the first to experience our cutting-edge workplace culture platform."
    },
    {
      icon: <Users className="h-8 w-8 text-pulse-600" />,
      title: "Direct Feedback",
      description: "Shape the product development with your insights and suggestions."
    },
    {
      icon: <Zap className="h-8 w-8 text-pulse-600" />,
      title: "Priority Support",
      description: "Get dedicated support from our team during the beta period."
    },
    {
      icon: <Gift className="h-8 w-8 text-pulse-600" />,
      title: "Special Pricing",
      description: "Lock in exclusive beta pricing when we launch publicly."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Join Beta Program | PulsePlace.ai</title>
        <meta name="description" content="Join PulsePlace.ai's beta program and get early access to our workplace culture platform." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Beta Program
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get exclusive early access to PulsePlace.ai and help us build the future of workplace culture measurement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-pulse-50 p-3 rounded-full">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8">
              Join hundreds of forward-thinking organizations already participating in our beta program.
            </p>
            <Button className="bg-pulse-gradient text-white px-8 py-3 mb-4">
              Apply for Beta Access
            </Button>
            <p className="text-sm text-gray-500">
              We'll review your application and get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinBeta;
