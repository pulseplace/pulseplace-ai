
import React from 'react';

const HeroVisualization = () => {
  return (
    <div className="w-full lg:w-1/2 relative">
      <div className="w-full h-80 md:h-96 lg:h-[500px] relative overflow-hidden rounded-2xl bg-gradient-to-br from-pulse-100 to-pulse-50 shadow-lg">
        {/* Background elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400 opacity-20 rounded-full animate-spin-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pulse-400 opacity-10 rounded-full animate-spin-slow"></div>
        
        {/* Horizontal workflow diagram */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-lg">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center mb-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pulse-600 flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="ml-4 bg-white rounded-lg p-3 shadow-md w-full">
                  <h3 className="font-semibold text-pulse-700">Collect Feedback</h3>
                  <p className="text-sm text-gray-600">AI-powered pulse surveys measure employee sentiment</p>
                </div>
              </div>
              <div className="absolute left-6 top-12 h-10 w-0.5 bg-pulse-300"></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-center mb-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pulse-600 flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="ml-4 bg-white rounded-lg p-3 shadow-md w-full">
                  <h3 className="font-semibold text-pulse-700">Analyze Data</h3>
                  <p className="text-sm text-gray-600">Our AI generates insights from responses</p>
                </div>
              </div>
              <div className="absolute left-6 top-12 h-10 w-0.5 bg-pulse-300"></div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-center mb-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pulse-600 flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="ml-4 bg-white rounded-lg p-3 shadow-md w-full">
                  <h3 className="font-semibold text-pulse-700">Calculate PulseScore™</h3>
                  <p className="text-sm text-gray-600">Real-time workplace culture rating</p>
                </div>
              </div>
              <div className="absolute left-6 top-12 h-10 w-0.5 bg-pulse-300"></div>
            </div>
            
            {/* Step 4 */}
            <div className="relative">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pulse-600 flex items-center justify-center">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="ml-4 bg-white rounded-lg p-3 shadow-md w-full">
                  <h3 className="font-semibold text-pulse-700">Certify & Publish</h3>
                  <p className="text-sm text-gray-600">Top companies get Pulse Certified and ranked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisualization;
