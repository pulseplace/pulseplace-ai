
import React from 'react';
import { 
  MessageSquare,
  Brain, 
  BarChart2, 
  Award, 
  Globe,
  ChevronRight 
} from 'lucide-react';

const steps = [
  {
    icon: <MessageSquare className="h-8 w-8 text-white" />,
    title: "Employees complete short pulse surveys",
    description: "Simple, engaging pulse surveys gather anonymous feedback from your team."
  },
  {
    icon: <Brain className="h-8 w-8 text-white" />,
    title: "AI analyzes responses + signals trust score",
    description: "Our advanced AI processes sentiment and derives meaningful insights."
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-white" />,
    title: "Company dashboard shows live PulseScore",
    description: "Access real-time analytics and benchmarking against industry peers."
  },
  {
    icon: <Award className="h-8 w-8 text-white" />,
    title: "Certification + Culture Report issued",
    description: "Earn official recognition with detailed insights and recommendations."
  },
  {
    icon: <Globe className="h-8 w-8 text-white" />,
    title: "Rank published to PulsePlace Index",
    description: "Showcase your workplace excellence on the public PulsePlace rankings."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our step-by-step approach to measuring and improving workplace culture.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-8 bottom-0 w-1 bg-gradient-to-b from-pulse-600 to-teal-500 hidden md:block" style={{ transform: 'translateX(-50%)' }}></div>
          
          {/* Steps */}
          <div className="space-y-12 md:space-y-24 relative">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-8`}>
                {/* Step Number Bubble */}
                <div className="w-16 h-16 rounded-full bg-pulse-gradient flex items-center justify-center shadow-lg z-10">
                  {step.icon}
                </div>
                
                {/* Content */}
                <div className={`md:w-[calc(50%-3rem)] p-6 bg-white rounded-xl shadow-md ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {index % 2 === 1 && <ChevronRight className="h-5 w-5 text-pulse-500 md:hidden" />}
                    {step.title}
                    {index % 2 === 0 && <ChevronRight className="h-5 w-5 text-pulse-500 ml-auto md:hidden" />}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
