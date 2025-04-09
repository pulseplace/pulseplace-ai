
import React from 'react';

interface ColorSampleProps {
  color: string;
  name: string;
  hex: string;
  className?: string;
}

const ColorSample: React.FC<ColorSampleProps> = ({ color, name, hex, className }) => {
  return (
    <div className={`flex items-center mb-6 ${className}`}>
      <div 
        className="w-16 h-16 rounded-lg mr-4 shadow-sm flex-shrink-0" 
        style={{ backgroundColor: hex }}
      />
      <div>
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-text-muted">{hex}</p>
      </div>
    </div>
  );
};

export const ColorSystem: React.FC = () => {
  return (
    <div className="p-8 bg-background-light rounded-xl">
      <h2 className="text-3xl font-display font-bold mb-8">PulsePlace Color System</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ColorSample 
          color="primary" 
          name="Soulful Midnight" 
          hex="#1A1A2E" 
        />
        <ColorSample 
          color="secondary" 
          name="Pulse Blue" 
          hex="#3F8CFF" 
        />
        <ColorSample 
          color="accent" 
          name="Ember Coral" 
          hex="#FF566B" 
        />
        <ColorSample 
          color="background-light" 
          name="Soft Cloud" 
          hex="#F7F9FB" 
        />
        <ColorSample 
          color="background-dark" 
          name="Midnight Fog" 
          hex="#121417" 
        />
        <ColorSample 
          color="text-primary" 
          name="Charcoal Ink" 
          hex="#202020" 
        />
        <ColorSample 
          color="text-muted" 
          name="Grey Mist" 
          hex="#8A888A" 
        />
        <ColorSample 
          color="success" 
          name="Trust Mint" 
          hex="#32D27E" 
        />
      </div>
      
      <div className="mt-10">
        <h3 className="text-xl font-medium mb-4">Brand Gradients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-24 rounded-lg bg-pulse-gradient"></div>
          <div className="h-24 rounded-lg bg-teal-gradient"></div>
        </div>
      </div>
    </div>
  );
};
