
import React from 'react';
import Navbar from '@/components/navigation';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">PulsePlace.ai</span>
          <span className="block mt-2">Culture Certification for Modern Teams</span>
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Empower, certify, and improve your workplace culture through anonymous feedback and AI insights.
        </p>
        <div className="flex justify-center">
          <a href="/dashboard" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
