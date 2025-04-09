
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ColorSampleProps {
  color: string;
  name: string;
  hex: string;
  className?: string;
  textColor?: string;
}

const ColorSample: React.FC<ColorSampleProps> = ({ color, name, hex, className, textColor = 'text-text-primary' }) => {
  return (
    <div className={`flex items-center mb-4 sm:mb-6 ${className}`}>
      <div 
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg mr-3 sm:mr-4 shadow-sm flex-shrink-0" 
        style={{ backgroundColor: hex }}
      />
      <div className={textColor}>
        <h3 className="font-medium text-base sm:text-lg">{name}</h3>
        <p className="text-text-muted text-sm">{hex}</p>
        <p className="text-xs mt-1 text-text-muted">
          <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{color}</code>
        </p>
      </div>
    </div>
  );
};

export const ColorSystem: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="p-4 sm:p-8 bg-background-light rounded-xl">
      <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 sm:mb-8">PulsePlace Color System</h2>
      
      <div className="mb-8 sm:mb-10">
        <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Primary Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <ColorSample 
            color="bg-soulful-midnight text-white" 
            name="Soulful Midnight" 
            hex="#1A1A2E" 
          />
          <ColorSample 
            color="bg-pulse-blue text-white" 
            name="Pulse Blue" 
            hex="#3F8CFF" 
          />
          <ColorSample 
            color="bg-ember-coral text-white" 
            name="Ember Coral" 
            hex="#FF566B" 
          />
        </div>
      </div>

      <div className="mb-8 sm:mb-10">
        <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Background Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <ColorSample 
            color="bg-soft-cloud" 
            name="Soft Cloud" 
            hex="#F7F9FB" 
          />
          <ColorSample 
            color="bg-midnight-fog text-white" 
            name="Midnight Fog" 
            hex="#121417" 
          />
        </div>
      </div>

      <div className="mb-8 sm:mb-10">
        <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Text Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <ColorSample 
            color="text-charcoal-ink" 
            name="Charcoal Ink" 
            hex="#202020" 
          />
          <ColorSample 
            color="text-grey-mist" 
            name="Grey Mist" 
            hex="#8A888A" 
          />
        </div>
      </div>

      <div className="mb-8 sm:mb-10">
        <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Functional Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <ColorSample 
            color="bg-trust-mint text-white" 
            name="Trust Mint" 
            hex="#32D27E" 
          />
        </div>
      </div>
      
      <div className="mt-8 sm:mt-10">
        <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Brand Gradients</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <div className="h-16 sm:h-24 rounded-lg bg-pulse-gradient"></div>
            <p className="text-xs sm:text-sm text-text-muted">
              <code className="bg-gray-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs">bg-pulse-gradient</code>
            </p>
            <p className="text-xs sm:text-sm">Pulse Gradient - Used for key elements and CTAs</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 sm:h-24 rounded-lg bg-teal-gradient"></div>
            <p className="text-xs sm:text-sm text-text-muted">
              <code className="bg-gray-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs">bg-teal-gradient</code>
            </p>
            <p className="text-xs sm:text-sm">Teal Gradient - Used for success states and progress indicators</p>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Color Usage Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div>
            <h4 className="text-base sm:text-lg font-medium mb-2">Do's</h4>
            <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>Use Soulful Midnight for primary UI elements and important text</li>
              <li>Use Pulse Blue for interactive elements and highlighting</li>
              <li>Use Ember Coral sparingly for accent and calls to action</li>
              <li>Ensure text maintains proper contrast ratios with backgrounds</li>
              <li>Use Trust Mint to indicate success states and positive feedback</li>
            </ul>
          </div>
          <div className="mt-4 md:mt-0">
            <h4 className="text-base sm:text-lg font-medium mb-2">Don'ts</h4>
            <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>Don't use Ember Coral for primary buttons or large areas</li>
              <li>Avoid using Soulful Midnight text on dark backgrounds</li>
              <li>Don't mix too many colors in a single interface</li>
              <li>Avoid using colors not in the brand palette</li>
              <li>Don't use gradients excessively</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
