
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { ArrowRight, ArrowUpRight, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroTitle = () => {
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Adjust this value based on your fixed header height
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <div className="w-full lg:w-1/2 space-y-6">
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-pulse-100 text-pulse-700 text-sm font-medium mb-4">
        <span className="mr-1">Redefining workplace excellence</span>
        <div className="w-2 h-2 rounded-full bg-pulse-500 ml-2"></div>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        <span className="block">AI-Powered Rankings</span>
        <span className="bg-gradient-to-r from-pulse-600 to-teal-500 bg-clip-text text-transparent">
          for the Most Loved
        </span>
        <span className="block">Workplaces</span>
      </h1>
      
      <p className="text-lg text-gray-600 md:text-xl max-w-xl">
        PulsePlace.ai measures employee sentiment, trust, and culture in real time — and ranks companies who truly walk the talk.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-4 flex-wrap">
        <HashLink to="/#join-beta" scroll={scrollWithOffset}>
          <Button className="bg-pulse-gradient hover:opacity-90 transition-all h-12 px-6 text-base w-full sm:w-auto">
            Join the Beta <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </HashLink>
        
        <Link to="/demo">
          <Button 
            variant="outline" 
            className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 h-12 px-6 text-base w-full sm:w-auto"
          >
            Try Team Demo <Users className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/certification">
          <Button 
            variant="outline" 
            className="border-pulse-300 text-pulse-700 hover:bg-pulse-50 h-12 px-6 text-base w-full sm:w-auto"
          >
            Get Pulse Certified <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-4 pt-4">
        <div className="flex -space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold text-xs bg-pulse-${500 + i * 100}`}>
              {String.fromCharCode(65 + i)}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Join <span className="font-semibold">250+</span> organizations already using PulsePlace.ai
        </p>
      </div>
    </div>
  );
};

export default HeroTitle;
