
import React from 'react';
import { Helmet } from 'react-helmet';
import { ColorSystem } from '@/components/design/ColorSystem';
import { TypographySystem } from '@/components/design/TypographySystem';
import { LogoUsage } from '@/components/design/LogoUsage';
import { UIElements } from '@/components/design/UIElements';

const BrandSystem: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <Helmet>
        <title>PulsePlace Brand System | Design Guidelines</title>
        <meta name="description" content="PulsePlace brand and design system guidelines" />
      </Helmet>
      
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">
          PulsePlace Brand System
        </h1>
        <p className="text-lg mt-4 text-text-muted max-w-3xl">
          This comprehensive guide outlines our brand elements, design tokens, and component usage to ensure consistency across all PulsePlace products.
        </p>
      </header>

      <div className="grid gap-16">
        <LogoUsage />
        <ColorSystem />
        <TypographySystem />
        <UIElements />
      </div>
      
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <p className="text-sm text-text-muted">
          For questions about our brand system, contact the design team at design@pulseplace.ai
        </p>
      </footer>
    </div>
  );
};

export default BrandSystem;
