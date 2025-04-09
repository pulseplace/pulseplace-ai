
import React from 'react';

interface ColorSampleProps {
  color: string;
  name: string;
  hex: string;
  className?: string;
  textColor?: string;
}

const ColorSample: React.FC<ColorSampleProps> = ({ color, name, hex, className, textColor = 'text-text-primary' }) => {
  return (
    <div className={`flex items-center mb-6 ${className}`}>
      <div 
        className="w-16 h-16 rounded-lg mr-4 shadow-sm flex-shrink-0" 
        style={{ backgroundColor: hex }}
      />
      <div className={textColor}>
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-text-muted">{hex}</p>
        <p className="text-xs mt-1 text-text-muted">
          <code className="bg-gray-100 px-1 py-0.5 rounded">{color}</code>
        </p>
      </div>
    </div>
  );
};

export const ColorSystem: React.FC = () => {
  return (
    <div className="p-8 bg-background-light rounded-xl">
      <h2 className="text-3xl font-display font-bold mb-8">PulsePlace Color System</h2>
      
      <div className="mb-10">
        <h3 className="text-xl font-medium mb-4">Primary Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="mb-10">
        <h3 className="text-xl font-medium mb-4">Background Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div className="mb-10">
        <h3 className="text-xl font-medium mb-4">Text Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div className="mb-10">
        <h3 className="text-xl font-medium mb-4">Functional Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorSample 
            color="bg-trust-mint text-white" 
            name="Trust Mint" 
            hex="#32D27E" 
          />
        </div>
      </div>
      
      <div className="mt-10">
        <h3 className="text-xl font-medium mb-4">Brand Gradients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-pulse-gradient"></div>
            <p className="text-sm text-text-muted">
              <code className="bg-gray-100 px-2 py-1 rounded">bg-pulse-gradient</code>
            </p>
            <p className="text-sm">Pulse Gradient - Used for key elements and CTAs</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-teal-gradient"></div>
            <p className="text-sm text-text-muted">
              <code className="bg-gray-100 px-2 py-1 rounded">bg-teal-gradient</code>
            </p>
            <p className="text-sm">Teal Gradient - Used for success states and progress indicators</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-medium mb-4">Color Usage Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h4 className="text-lg font-medium mb-2">Do's</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Use Soulful Midnight for primary UI elements and important text</li>
              <li>Use Pulse Blue for interactive elements and highlighting</li>
              <li>Use Ember Coral sparingly for accent and calls to action</li>
              <li>Ensure text maintains proper contrast ratios with backgrounds</li>
              <li>Use Trust Mint to indicate success states and positive feedback</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2">Don'ts</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
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
