
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BadgeStyle, BadgeVariant } from '@/types/badge.types';
import CertificationBadgeStyled from './CertificationBadgeStyled';
import { PulseScoreTier } from '@/types/scoring.types';

interface BadgeCustomizerProps {
  companyName: string;
  tier: PulseScoreTier;
  score: number;
  issueDate?: string;
  validUntil?: string;
  onStyleSelect?: (style: BadgeStyle) => void;
  onVariantSelect?: (variant: BadgeVariant) => void;
}

const BadgeCustomizer: React.FC<BadgeCustomizerProps> = ({
  companyName,
  tier,
  score,
  issueDate = 'April 2025',
  validUntil = 'April 2026',
  onStyleSelect,
  onVariantSelect
}) => {
  const [selectedStyle, setSelectedStyle] = useState<BadgeStyle>('standard');
  const [selectedVariant, setSelectedVariant] = useState<BadgeVariant>('default');
  const [customCta, setCustomCta] = useState("We're Pulse Certified!");
  
  const handleStyleChange = (style: BadgeStyle) => {
    setSelectedStyle(style);
    if (onStyleSelect) onStyleSelect(style);
  };
  
  const handleVariantChange = (variant: BadgeVariant) => {
    setSelectedVariant(variant);
    if (onVariantSelect) onVariantSelect(variant);
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Badge Customization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          {/* Badge Preview */}
          <div className="bg-white p-6 border rounded-md flex justify-center items-center shadow-sm">
            <CertificationBadgeStyled 
              companyName={companyName}
              tier={tier}
              score={score}
              issueDate={issueDate}
              validUntil={validUntil}
              style={selectedStyle}
              customCta={customCta}
              variant={selectedVariant}
            />
          </div>
          
          {/* Style Selection */}
          <div>
            <Label className="block mb-2">Badge Style</Label>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedStyle === 'standard' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStyleChange('standard')}
              >
                Standard
              </Button>
              <Button 
                variant={selectedStyle === 'compact' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStyleChange('compact')}
              >
                Compact
              </Button>
              <Button 
                variant={selectedStyle === 'minimal' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStyleChange('minimal')}
              >
                Minimal
              </Button>
              <Button 
                variant={selectedStyle === 'colorful' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStyleChange('colorful')}
              >
                Colorful
              </Button>
            </div>
          </div>
          
          {/* Variant Selection */}
          <div>
            <Label className="block mb-2">Badge Variant</Label>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedVariant === 'default' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleVariantChange('default')}
              >
                Default
              </Button>
              <Button 
                variant={selectedVariant === 'linkedin' ? 'default' : 'outline'}
                size="sm"
                className={selectedVariant === 'linkedin' ? 'bg-[#0A66C2]' : ''}
                onClick={() => handleVariantChange('linkedin')}
              >
                LinkedIn
              </Button>
              <Button 
                variant={selectedVariant === 'twitter' ? 'default' : 'outline'}
                size="sm"
                className={selectedVariant === 'twitter' ? 'bg-[#1DA1F2]' : ''}
                onClick={() => handleVariantChange('twitter')}
              >
                Twitter
              </Button>
              <Button 
                variant={selectedVariant === 'notion' ? 'default' : 'outline'}
                size="sm"
                className={selectedVariant === 'notion' ? 'bg-black' : ''}
                onClick={() => handleVariantChange('notion')}
              >
                Notion
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeCustomizer;
