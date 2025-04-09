
import React from 'react';
import { Helmet } from 'react-helmet';
import { ColorSystem } from '@/components/design/ColorSystem';
import { TypographySystem } from '@/components/design/TypographySystem';
import { LogoUsage } from '@/components/design/LogoUsage';
import { UIElements } from '@/components/design/UIElements';
import { useIsMobile } from '@/hooks/use-mobile';

const BrandSystem: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <Helmet>
        <title>PulsePlace Brand System | Design Guidelines</title>
        <meta name="description" content="PulsePlace brand and design system guidelines" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>
      
      <header className="mb-8 sm:mb-12">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-primary">
          PulsePlace Brand System
        </h1>
        <p className="text-base md:text-lg mt-3 md:mt-4 text-text-muted max-w-3xl">
          This comprehensive guide outlines our brand elements, design tokens, and component usage to ensure consistency across all PulsePlace products.
        </p>
      </header>

      <div className="grid gap-8 md:gap-16">
        <LogoUsage />
        <ColorSystem />
        <TypographySystem />
        <UIElements />
      </div>
      
      <footer className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200">
        <p className="text-xs sm:text-sm text-text-muted">
          For questions about our brand system, contact the design team at design@pulseplace.ai
        </p>
      </footer>
    </div>
  );
};

export default BrandSystem;
