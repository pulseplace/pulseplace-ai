
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BadgeStyle } from '@/types/badge.types';

interface BadgeStyleSelectorProps {
  badgeStyle: BadgeStyle;
  onChange: (style: BadgeStyle) => void;
}

const BadgeStyleSelector: React.FC<BadgeStyleSelectorProps> = ({
  badgeStyle,
  onChange
}) => {
  return (
    <div>
      <Label>Badge Style</Label>
      <div className="flex flex-wrap gap-2 mt-1">
        <Button 
          variant={badgeStyle === 'standard' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange('standard')}
          className="bg-soulful-midnight text-white hover:bg-pulse-blue"
        >
          Standard
        </Button>
        <Button 
          variant={badgeStyle === 'compact' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange('compact')}
          className={badgeStyle === 'compact' ? "bg-pulse-blue" : ""}
        >
          Compact
        </Button>
        <Button 
          variant={badgeStyle === 'minimal' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange('minimal')}
          className={badgeStyle === 'minimal' ? "bg-grey-mist text-white" : ""}
        >
          Minimal
        </Button>
        <Button 
          variant={badgeStyle === 'colorful' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange('colorful')}
          className={badgeStyle === 'colorful' ? "bg-ember-coral text-white" : ""}
        >
          Colorful
        </Button>
      </div>
    </div>
  );
};

export default BadgeStyleSelector;
