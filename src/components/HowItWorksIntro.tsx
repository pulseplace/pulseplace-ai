
import React from 'react';

const HowItWorksIntro = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From survey to certification — see how PulsePlace.ai transforms workplace culture.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="w-full flex justify-center">
            <div className="relative w-full bg-white rounded-xl shadow-md p-4 md:p-6">
              <img 
                src="/lovable-uploads/8ddd4a13-530a-46ac-909c-052283c1315d.png" 
                alt="PulsePlace.ai workflow process: Employees complete surveys, AI analyzes responses, Company dashboard shows PulseScore, Certification issued, Rank published" 
                className="w-full h-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksIntro;
