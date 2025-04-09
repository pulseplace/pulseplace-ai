
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BadgeStyle, BadgeVariant } from '@/types/badge.types';
import { PulseScoreTier } from '@/types/scoring.types';
import BadgeStyleSelector from './components/BadgeStyleSelector';
import BadgeVariantSelector from './components/BadgeVariantSelector';
import BadgePreview from './components/BadgePreview';
import BadgeDownloadButton from './components/BadgeDownloadButton';
import CustomCtaInput from './components/CustomCtaInput';

interface BadgeGeneratorProps {
  companyName: string;
  tier: PulseScoreTier;
  score: number;
  badgeStyle: BadgeStyle;
  badgeVariant: BadgeVariant;
  onStyleChange: (style: BadgeStyle) => void;
  onVariantChange: (variant: BadgeVariant) => void;
}

const BadgeGenerator: React.FC<BadgeGeneratorProps> = ({
  companyName,
  tier,
  score,
  badgeStyle = 'standard',
  badgeVariant = 'default',
  onStyleChange,
  onVariantChange
}) => {
  const [customCta, setCustomCta] = useState("We're Pulse Certified!");
  
  const handleStyleChange = (style: BadgeStyle) => {
    if (onStyleChange) onStyleChange(style);
  };
  
  const handleVariantChange = (variant: BadgeVariant) => {
    if (onVariantChange) onVariantChange(variant);
  };
  
  const handleDownload = () => {
    // Download functionality would be implemented here
    console.log('Downloading badge');
  };
  
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <BadgePreview 
            companyName={companyName}
            tier={tier}
            score={score}
            badgeStyle={badgeStyle}
            badgeVariant={badgeVariant}
            customCta={customCta}
          />
          
          <CustomCtaInput
            value={customCta}
            onChange={setCustomCta}
          />
          
          <BadgeStyleSelector 
            badgeStyle={badgeStyle} 
            onChange={handleStyleChange} 
          />
          
          <BadgeVariantSelector 
            badgeVariant={badgeVariant} 
            onVariantChange={handleVariantChange} 
          />
          
          <BadgeDownloadButton onDownload={handleDownload} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeGenerator;
