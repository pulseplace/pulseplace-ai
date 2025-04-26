import React from 'react';
import Navbar from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
            PulsePlace.ai
          </span>
          <span className="block mt-2">Culture Certification for Modern Teams</span>
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Build stronger teams through anonymous feedback, AI-powered insights, and culture certification.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/auth/signup">
            <Button 
              size="lg"
              className="bg-pulse-gradient hover:opacity-90 transition-all"
            >
              Join Our Alpha
            </Button>
          </Link>
          <Link to="/pulse-score-lite">
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Try PulseScore Lite
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
