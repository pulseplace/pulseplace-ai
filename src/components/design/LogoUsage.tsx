
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const LogoUsage: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="p-4 sm:p-8 bg-background-light rounded-xl">
      <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 sm:mb-8">Logo Usage</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Primary Logo</h3>
          <div className="mb-4 sm:mb-6 flex justify-center items-center h-32 sm:h-40 bg-soft-cloud rounded-lg">
            <img 
              src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" 
              alt="PulsePlace Primary Logo" 
              className="h-12 sm:h-16"
            />
          </div>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <p><strong>Usage:</strong> Main brand identifier for light backgrounds</p>
            <p><strong>Class:</strong> <code className="bg-gray-100 px-1 sm:px-2 py-0.5 rounded text-xs">logo-primary</code></p>
            <p><strong>Clear space:</strong> Maintain padding equal to the height of the "P" around all sides</p>
          </div>
        </div>
        
        <div className="bg-primary p-4 sm:p-6 rounded-lg shadow-sm">
          <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-white">Inverted Logo</h3>
          <div className="mb-4 sm:mb-6 flex justify-center items-center h-32 sm:h-40 bg-soulful-midnight rounded-lg">
            <img 
              src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" 
              alt="PulsePlace Inverted Logo" 
              className="h-12 sm:h-16 invert"
            />
          </div>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white">
            <p><strong>Usage:</strong> For dark backgrounds</p>
            <p><strong>Class:</strong> <code className="bg-gray-800 text-white px-1 sm:px-2 py-0.5 rounded text-xs">logo-primary invert</code></p>
            <p><strong>Clear space:</strong> Maintain padding equal to the height of the "P" around all sides</p>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Minimum Size</h3>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h4 className="text-base font-medium mb-2">Digital</h4>
              <div className="flex items-center gap-3 sm:gap-4">
                <img 
                  src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" 
                  alt="PulsePlace Logo Minimum Digital Size" 
                  className="h-5 sm:h-6"
                />
                <div className="text-xs sm:text-sm text-text-muted">
                  <p>Minimum 24px height</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-medium mb-2">Print</h4>
              <div className="flex items-center gap-3 sm:gap-4">
                <img 
                  src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" 
                  alt="PulsePlace Logo Minimum Print Size" 
                  className="h-6 sm:h-8"
                />
                <div className="text-xs sm:text-sm text-text-muted">
                  <p>Minimum 0.5" / 12.7mm height</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Incorrect Usage</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gray-100 p-2 sm:p-3 rounded">
              <div className="relative">
                <img 
                  src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" 
                  alt="Stretched Logo" 
                  className="h-10 sm:h-12 w-24 sm:w-32 object-fill"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-0.5 bg-destructive w-full transform rotate-45"></div>
                </div>
              </div>
              <p className="text-xs mt-1 sm:mt-2 text-text-muted">Don't stretch or distort</p>
            </div>
            
            <div className="bg-gray-100 p-2 sm:p-3 rounded">
              <div className="relative">
                <img 
                  src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" 
                  alt="Recolored Logo" 
                  className="h-10 sm:h-12 filter sepia"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-0.5 bg-destructive w-full transform rotate-45"></div>
                </div>
              </div>
              <p className="text-xs mt-1 sm:mt-2 text-text-muted">Don't change colors</p>
            </div>
            
            <div className="bg-gray-100 p-2 sm:p-3 rounded">
              <div className="relative">
                <div className="flex items-center justify-center h-10 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500">
                  <img 
                    src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" 
                    alt="Logo on busy background" 
                    className="h-6 sm:h-8"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-0.5 bg-destructive w-full transform rotate-45"></div>
                </div>
              </div>
              <p className="text-xs mt-1 sm:mt-2 text-text-muted">Don't place on busy backgrounds</p>
            </div>
            
            <div className="bg-gray-100 p-2 sm:p-3 rounded">
              <div className="relative">
                <img 
                  src="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" 
                  alt="Logo with effects" 
                  className="h-10 sm:h-12 drop-shadow-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-0.5 bg-destructive w-full transform rotate-45"></div>
                </div>
              </div>
              <p className="text-xs mt-1 sm:mt-2 text-text-muted">Don't add effects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
