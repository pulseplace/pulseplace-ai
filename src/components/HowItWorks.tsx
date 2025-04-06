
import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our step-by-step approach to measuring and improving workplace culture.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <img 
            src="/lovable-uploads/4f3c79fd-71b5-4a9d-9b51-8a7712a973f1.png" 
            alt="PulsePlace Workflow: Employees complete surveys, AI analyzes responses, Company dashboard shows live score, Certification issued, Rank published" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
