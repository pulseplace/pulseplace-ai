
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const FeaturesCTA: React.FC = () => {
  return (
    <section className="py-16 bg-pulse-gradient text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Experience PulsePlace?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our beta program today and be among the first to transform your workplace culture with AI.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/join-beta">
            <Button className="bg-white text-pulse-600 hover:bg-gray-100 transition-colors px-6">
              Join the Beta
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-white text-white hover:bg-white/20 transition-colors px-6">
              Contact Sales
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 max-w-lg mx-auto">
          <p className="text-sm text-white/80 mb-2">Special beta program for Tayana users</p>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="font-medium">Use code <span className="font-bold">TAYANA25</span> for priority access</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCTA;
