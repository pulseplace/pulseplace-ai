
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
        
        <div className="max-w-3xl mx-auto">
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-lg bg-white rounded-xl shadow-md p-6 md:p-8">
              <img 
                src="/lovable-uploads/4f3c79fd-71b5-4a9d-9b51-8a7712a973f1.png" 
                alt="PulsePlace.ai workflow process - From survey to certification" 
                className="w-auto max-h-[700px] mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksIntro;
