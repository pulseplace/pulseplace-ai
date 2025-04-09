
import React from 'react';
import { BadgeStyle, BadgeVariant } from '@/types/badge.types';
import { PulseScoreTier } from '@/types/scoring.types';
import StandardBadge from './components/StandardBadge';
import CompactBadge from './components/CompactBadge';
import { getBadgeColors } from './utils/badgeColors';

interface CertificationBadgeStyledProps {
  companyName: string;
  tier: PulseScoreTier;
  score: number;
  issueDate?: string;
  validUntil?: string;
  style?: BadgeStyle;
  customCta?: string;
  variant?: BadgeVariant;
}

const CertificationBadgeStyled: React.FC<CertificationBadgeStyledProps> = ({
  companyName,
  tier,
  score,
  issueDate = 'August 2025',
  validUntil = 'August 2026',
  style = 'standard',
  customCta,
  variant = 'default'
}) => {
  const isCompact = style === 'compact';
  const colors = getBadgeColors(style, variant);
  
  return (
    <div className="flex justify-center">
      {isCompact ? (
        <CompactBadge
          colors={colors}
          customCta={customCta}
        />
      ) : (
        <StandardBadge
          colors={colors}
          companyName={companyName}
          score={score}
          issueDate={issueDate}
          validUntil={validUntil}
          customCta={customCta}
        />
      )}
    </div>
  );
};

export default CertificationBadgeStyled;
