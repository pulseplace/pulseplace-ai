
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BarChart2, Brain, MessageSquare, Sparkles, Users } from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    {
      id: 1,
      title: "Employee Survey",
      description: "We collect anonymous sentiment data through our AI-powered pulse surveys.",
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      highlight: "Sentiment Analysis",
      highlightDesc: "Our AI analyzes emotional tone, trust indicators, and uncovers hidden insights from open-ended responses."
    },
    {
      id: 2,
      title: "AI Analysis",
      description: "Our algorithms process responses and combine with retention and engagement data.",
      icon: <Brain className="h-6 w-6 text-white" />,
      highlight: "Data Enrichment",
      highlightDesc: "We enrich survey data with over 50 workplace culture variables to create a comprehensive picture."
    },
    {
      id: 3,
      title: "PulseScore™ Generated",
      description: "A real-time culture score is calculated and displayed on your dashboard.",
      icon: <BarChart2 className="h-6 w-6 text-white" />,
      highlight: "Live Updates",
      highlightDesc: "Your score updates in real-time as new feedback comes in, not just once a year like traditional surveys."
    },
    {
      id: 4,
      title: "Certification & Ranking",
      description: "Top-scoring companies receive Pulse Certification and are featured in our rankings.",
      icon: <Users className="h-6 w-6 text-white" />,
      highlight: "Employer Branding",
      highlightDesc: "Showcase your certification to attract top talent who value exceptional workplace culture."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From survey to certification — see how PulsePlace.ai transforms workplace culture.
          </p>
        </div>

        {/* Replace heavy image with lightweight UI */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="w-full flex justify-center">
            <div className="relative w-full bg-white rounded-xl shadow-md p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center text-center">
                    <div className="bg-pulse-gradient rounded-full h-14 w-14 flex items-center justify-center mb-4">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Step {step.id}</h3>
                    <p className="text-sm text-gray-600">{step.title}</p>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block mt-6 w-full flex justify-center">
                        <ArrowRight className="text-pulse-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            {/* Replace second infographic with card-based UI */}
            <div className="grid grid-cols-2 gap-4">
              {steps.map((step) => (
                <Card key={step.id} className={`border-l-4 ${step.id === activeStep ? 'border-l-pulse-500 bg-pulse-50' : 'border-l-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex space-x-3 items-start">
                      <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step.id === activeStep ? 'bg-pulse-gradient' : 'bg-gray-100'}`}>
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{step.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-pulse-700">Process Flow</h3>
                <div className="flex space-x-1">
                  {steps.map((step) => (
                    <button 
                      key={step.id}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${activeStep === step.id ? 'bg-pulse-500' : 'bg-gray-300'}`}
                      onClick={() => setActiveStep(step.id)}
                      aria-label={`View step ${step.id}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                {steps.map((step) => (
                  <div 
                    key={step.id}
                    className={`transition-all duration-500 ${activeStep === step.id ? 'opacity-100 translate-y-0' : 'opacity-0 absolute top-0 left-0 translate-y-3'}`}
                    style={{ display: activeStep === step.id ? 'block' : 'none' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-pulse-gradient flex items-center justify-center shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 flex items-center">
                          <span className="mr-2">Step {step.id}: {step.title}</span>
                        </h4>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="outline" size="sm" className="border-pulse-200 text-pulse-700">
                              <Sparkles className="h-4 w-4 mr-2" /> {step.highlight}
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80 bg-white">
                            <div className="space-y-2">
                              <h5 className="font-medium text-pulse-700">{step.highlight}</h5>
                              <p className="text-sm text-gray-600">{step.highlightDesc}</p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">PulsePlace Dashboard Preview</h3>
                  <div className="h-3 w-20 bg-gradient-to-r from-pulse-300 to-teal-300 rounded-full" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="text-sm font-medium text-gray-700">Engagement</h5>
                      <div className="bg-pulse-100 text-pulse-800 text-xs px-2 py-0.5 rounded-full font-medium">+12%</div>
                    </div>
                    <div className="h-20 flex items-center justify-center">
                      <div className="w-full space-y-1">
                        <div className="w-3/4 h-2 bg-pulse-400 rounded-full"></div>
                        <div className="w-full h-2 bg-pulse-300 rounded-full"></div>
                        <div className="w-1/2 h-2 bg-pulse-500 rounded-full"></div>
                      </div>
                    </div>
                    <Skeleton className="h-2 w-3/4 mt-2" />
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="text-sm font-medium text-gray-700">Trust Score</h5>
                      <div className="bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded-full font-medium">85/100</div>
                    </div>
                    <div className="h-20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-4 border-teal-400 flex items-center justify-center">
                        <span className="text-lg font-bold text-teal-600">85%</span>
                      </div>
                    </div>
                    <Skeleton className="h-2 w-2/3 mt-2" />
                  </div>
                </div>
                
                <Button size="sm" className="w-full bg-pulse-gradient hover:opacity-90">
                  View Full Demo <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
