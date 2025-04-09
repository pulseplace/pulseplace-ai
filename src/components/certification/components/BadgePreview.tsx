
import React from 'react';
import { Label } from "@/components/ui/label";
import { BadgeStyle, BadgeVariant } from '@/types/badge.types';
import CertificationBadgeStyled from '../CertificationBadgeStyled';
import { PulseScoreTier } from '@/types/scoring.types';

interface BadgePreviewProps {
  companyName: string;
  tier: PulseScoreTier;
  score: number;
  badgeStyle: BadgeStyle;
  badgeVariant: BadgeVariant;
  customCta: string;
}

const BadgePreview: React.FC<BadgePreviewProps> = ({
  companyName,
  tier,
  score,
  badgeStyle,
  badgeVariant,
  customCta
}) => {
  return (
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
  );
};

export default BadgePreview;
