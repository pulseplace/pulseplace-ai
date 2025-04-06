
import React from 'react';
import { Sparkles } from 'lucide-react';

const WhyPulsePlace = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Future of Work Deserves a New Standard
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-5 w-5 text-pulse-500 mr-2" />
            <p className="text-xl md:text-2xl text-gray-600">
              Traditional "Best Places to Work" lists are outdated, slow, and pay-to-play.
            </p>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            PulsePlace is here to change that — with live culture scores, anonymous employee signals, and AI-powered benchmarking.
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-pulse-500 to-teal-500 mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default WhyPulsePlace;
