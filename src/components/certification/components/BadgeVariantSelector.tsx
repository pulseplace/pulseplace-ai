
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
      <Label className="mb-2 block">Platform</Label>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={badgeVariant === 'default' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onVariantChange('default')}
          className={badgeVariant === 'default' ? "bg-soulful-midnight text-white" : ""}
        >
          Website
        </Button>
        <Button 
          variant={badgeVariant === 'linkedin' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onVariantChange('linkedin')}
          className={badgeVariant === 'linkedin' ? "bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90" : ""}
        >
          LinkedIn
        </Button>
        <Button 
          variant={badgeVariant === 'twitter' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onVariantChange('twitter')}
          className={badgeVariant === 'twitter' ? "bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90" : ""}
        >
          Twitter
        </Button>
        <Button 
          variant={badgeVariant === 'notion' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onVariantChange('notion')}
          className={badgeVariant === 'notion' ? "bg-black text-white hover:bg-black/90" : ""}
        >
          Notion
        </Button>
      </div>
    </div>
  );
};

export default BadgeVariantSelector;
