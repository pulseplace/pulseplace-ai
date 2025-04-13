
import React from 'react';
import HeroTitle from './HeroTitle';
import HeroVisualization from './HeroVisualization';
import HeroStats from './HeroStats';

const Hero = () => {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 px-4">
      <div className="container mx-auto">
        {/* Main Hero Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <HeroTitle />
          <HeroVisualization />
        </div>
        
        {/* Stats with fallback handling */}
        <HeroStats />
      </div>
    </div>
  );
};

export default Hero;
