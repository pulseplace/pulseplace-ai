
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BadgeVariant } from '@/types/badge.types';

interface BadgeVariantSelectorProps {
  badgeVariant: BadgeVariant;
  onVariantChange: (variant: BadgeVariant) => void;
}

const BadgeVariantSelector: React.FC<BadgeVariantSelectorProps> = ({
  badgeVariant,
  onVariantChange
}) => {
  return (
    <div>
      <Label className="text-lg font-medium mb-2 block">Badge Variant</Label>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={badgeVariant === 'default' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onVariantChange('default')}
        >
          Default
        </Button>
        <Button 
          variant={badgeVariant === 'linkedin' ? 'default' : 'outline'}
          size="sm"
          className={badgeVariant === 'linkedin' ? 'bg-[#0A66C2]' : ''}
          onClick={() => onVariantChange('linkedin')}
        >
          LinkedIn
        </Button>
        <Button 
          variant={badgeVariant === 'twitter' ? 'default' : 'outline'}
          size="sm"
          className={badgeVariant === 'twitter' ? 'bg-[#1DA1F2]' : ''}
          onClick={() => onVariantChange('twitter')}
        >
          Twitter
        </Button>
        <Button 
          variant={badgeVariant === 'notion' ? 'default' : 'outline'}
          size="sm"
          className={badgeVariant === 'notion' ? 'bg-black' : ''}
          onClick={() => onVariantChange('notion')}
        >
          Notion
        </Button>
      </div>
    </div>
  );
};

export default BadgeVariantSelector;
