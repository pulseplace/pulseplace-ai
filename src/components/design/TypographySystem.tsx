
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const TypographySystem: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="p-4 sm:p-8 bg-background-light rounded-xl">
      <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 sm:mb-8">Typography System</h2>
      
      <div className="grid gap-6 sm:gap-10">
        <div>
          <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Font Families</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <div className="p-4 sm:p-6 bg-white shadow-sm rounded-lg">
              <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Display Font</h4>
              <p className="font-display text-xl sm:text-2xl">Neue Haas Grotesk Display Pro</p>
              <div className="mt-3 sm:mt-4 text-text-muted text-xs sm:text-sm">
                <p><code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">font-display</code> - for headlines and important text</p>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 bg-white shadow-sm rounded-lg">
              <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Body Font</h4>
              <p className="font-body text-xl sm:text-2xl">Inter</p>
              <div className="mt-3 sm:mt-4 text-text-muted text-xs sm:text-sm">
                <p><code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">font-body</code> or <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">font-sans</code> - for body text and general interface</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Typography Scale</h3>
          <div className="space-y-4 sm:space-y-6">
            <div className="p-3 sm:p-4 border-l-4 border-secondary">
              <span className="text-xs sm:text-sm text-text-muted block mb-1">Display/Heading 1</span>
              <h1 className="text-3xl sm:text-5xl font-display font-bold">Headline Text</h1>
              <div className="mt-2 text-text-muted text-xs sm:text-sm">
                <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">text-5xl font-display font-bold</code>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 border-l-4 border-secondary">
              <span className="text-xs sm:text-sm text-text-muted block mb-1">Heading 2</span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold">Headline Text</h2>
              <div className="mt-2 text-text-muted text-xs sm:text-sm">
                <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">text-4xl font-display font-bold</code>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 border-l-4 border-secondary">
              <span className="text-xs sm:text-sm text-text-muted block mb-1">Heading 3</span>
              <h3 className="text-xl sm:text-3xl font-display font-semibold">Headline Text</h3>
              <div className="mt-2 text-text-muted text-xs sm:text-sm">
                <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">text-3xl font-display font-semibold</code>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 border-l-4 border-secondary">
              <span className="text-xs sm:text-sm text-text-muted block mb-1">Heading 4</span>
              <h4 className="text-lg sm:text-2xl font-display font-medium">Headline Text</h4>
              <div className="mt-2 text-text-muted text-xs sm:text-sm">
                <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">text-2xl font-display font-medium</code>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 border-l-4 border-secondary">
              <span className="text-xs sm:text-sm text-text-muted block mb-1">Paragraph</span>
              <p className="text-sm sm:text-base font-body">This is standard paragraph text for PulsePlace interfaces. It should be easily readable with appropriate line height and spacing.</p>
              <div className="mt-2 text-text-muted text-xs sm:text-sm">
                <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">text-base font-body</code>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 border-l-4 border-secondary">
              <span className="text-xs sm:text-sm text-text-muted block mb-1">Small Text / Caption</span>
              <p className="text-xs sm:text-sm font-body text-text-muted">This is small text used for captions, labels, and supporting information.</p>
              <div className="mt-2 text-text-muted text-xs sm:text-sm">
                <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">text-sm font-body text-text-muted</code>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Letter Spacing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-3 sm:p-4 bg-white shadow-sm rounded-lg">
              <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Standard</h4>
              <p className="text-lg sm:text-xl">Normal letter spacing</p>
              <div className="mt-2 text-text-muted text-xs sm:text-sm">
                <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">tracking-normal</code>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 bg-white shadow-sm rounded-lg">
              <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Wide</h4>
              <p className="text-lg sm:text-xl tracking-wider">Wider letter spacing</p>
              <div className="mt-2 text-text-muted text-xs sm:text-sm">
                <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">tracking-wider</code>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 bg-white shadow-sm rounded-lg">
              <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Widest</h4>
              <p className="text-lg sm:text-xl tracking-widest">Widest letter spacing</p>
              <div className="mt-2 text-text-muted text-xs sm:text-sm">
                <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">tracking-widest</code>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 bg-white shadow-sm rounded-lg">
              <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Uppercase + Wide</h4>
              <p className="text-base sm:text-lg uppercase tracking-wider">Brand text styles</p>
              <div className="mt-2 text-text-muted text-xs sm:text-sm">
                <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">uppercase tracking-wider</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
