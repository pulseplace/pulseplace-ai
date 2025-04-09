
import React from 'react';
import { Layers, Brain, Cpu, Lock } from 'lucide-react';

const TechnologyStack: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Technology Stack</h2>
        <p className="text-center text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Built with cutting-edge technologies to ensure performance, security, and scalability.
        </p>
        
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Layers className="h-12 w-12 text-pulse-600" />
              </div>
              <h3 className="text-lg font-semibold text-center">Enterprise LLMs</h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                State-of-the-art language models
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Brain className="h-12 w-12 text-pulse-600" />
              </div>
              <h3 className="text-lg font-semibold text-center">Neural Networks</h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                Advanced pattern recognition
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Cpu className="h-12 w-12 text-pulse-600" />
              </div>
              <h3 className="text-lg font-semibold text-center">Cloud Computing</h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                Scalable infrastructure
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Lock className="h-12 w-12 text-pulse-600" />
              </div>
              <h3 className="text-lg font-semibold text-center">Enterprise Security</h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                SOC 2 compliant systems
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
