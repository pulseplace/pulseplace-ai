
import React from 'react';
import Navbar from '@/components/navigation';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
          Welcome to <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">GTME</span>
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Your AI-powered marketing optimization platform. Improve your funnels, fix performance issues, and enhance your brand presence.
        </p>
        <div className="flex justify-center">
          <a href="/dashboard" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
