
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BadgeStyle } from '@/types/badge.types';

interface BadgeStyleSelectorProps {
  badgeStyle: BadgeStyle;
  onStyleChange: (style: BadgeStyle) => void;
}

const BadgeStyleSelector: React.FC<BadgeStyleSelectorProps> = ({
  badgeStyle,
  onStyleChange
}) => {
  return (
    <div>
      <Label className="text-lg font-medium mb-2 block">Badge Style</Label>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={badgeStyle === 'standard' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStyleChange('standard')}
        >
          Standard
        </Button>
        <Button 
          variant={badgeStyle === 'compact' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStyleChange('compact')}
        >
          Compact
        </Button>
        <Button 
          variant={badgeStyle === 'minimal' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStyleChange('minimal')}
        >
          Minimal
        </Button>
        <Button 
          variant={badgeStyle === 'colorful' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStyleChange('colorful')}
        >
          Colorful
        </Button>
      </div>
    </div>
  );
};

export default BadgeStyleSelector;
