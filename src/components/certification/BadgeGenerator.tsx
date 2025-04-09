
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BadgeStyle, BadgeVariant } from '@/types/badge.types';
import CertificationBadgeStyled from './CertificationBadgeStyled';
import { PulseScoreTier } from '@/types/scoring.types';

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
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleStyleChange = (style: BadgeStyle) => {
    if (onStyleChange) onStyleChange(style);
  };
  
  const handleVariantChange = (variant: BadgeVariant) => {
    if (onVariantChange) onVariantChange(variant);
  };
  
  const handleDownload = () => {
    setIsDownloading(true);
    // Simulated download delay
    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };
  
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <Label className="text-lg font-medium">Badge Preview</Label>
            <div className="bg-white p-4 border rounded-lg flex justify-center shadow-sm">
              <CertificationBadgeStyled 
                companyName={companyName}
                tier={tier}
                score={score}
                style={badgeStyle}
                variant={badgeVariant}
                customCta={customCta}
              />
            </div>
          </div>
          
          <div>
            <Label className="text-lg font-medium mb-2 block">Badge Style</Label>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={badgeStyle === 'standard' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStyleChange('standard')}
              >
                Standard
              </Button>
              <Button 
                variant={badgeStyle === 'compact' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStyleChange('compact')}
              >
                Compact
              </Button>
              <Button 
                variant={badgeStyle === 'minimal' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStyleChange('minimal')}
              >
                Minimal
              </Button>
              <Button 
                variant={badgeStyle === 'colorful' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStyleChange('colorful')}
              >
                Colorful
              </Button>
            </div>
          </div>
          
          <div>
            <Label className="text-lg font-medium mb-2 block">Badge Variant</Label>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={badgeVariant === 'default' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleVariantChange('default')}
              >
                Default
              </Button>
              <Button 
                variant={badgeVariant === 'linkedin' ? 'default' : 'outline'}
                size="sm"
                className={badgeVariant === 'linkedin' ? 'bg-[#0A66C2]' : ''}
                onClick={() => handleVariantChange('linkedin')}
              >
                LinkedIn
              </Button>
              <Button 
                variant={badgeVariant === 'twitter' ? 'default' : 'outline'}
                size="sm"
                className={badgeVariant === 'twitter' ? 'bg-[#1DA1F2]' : ''}
                onClick={() => handleVariantChange('twitter')}
              >
                Twitter
              </Button>
              <Button 
                variant={badgeVariant === 'notion' ? 'default' : 'outline'}
                size="sm"
                className={badgeVariant === 'notion' ? 'bg-black' : ''}
                onClick={() => handleVariantChange('notion')}
              >
                Notion
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full"
          >
            {isDownloading ? 'Downloading...' : 'Download Badge'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeGenerator;
