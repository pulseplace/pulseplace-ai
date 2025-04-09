
import React from 'react';
import PulsePlaceLogo from './PulsePlaceLogo';

interface StandardBadgeProps {
  colors: {
    bg: string;
    stroke: string;
    textPrimary: string;
    textSecondary: string;
    logoFill: string;
  };
  companyName: string;
  score: number;
  issueDate: string;
  validUntil: string;
  customCta?: string;
}

const StandardBadge: React.FC<StandardBadgeProps> = ({
  colors,
  companyName,
  score,
  issueDate,
  validUntil,
  customCta
}) => {
  return (
    <svg width="240" height="120" viewBox="0 0 240 120" className="w-full max-w-[240px]">
      <rect width="240" height="120" rx="16" fill={colors.bg} />
      <foreignObject width="36" height="36" x="24" y="30">
        <PulsePlaceLogo fill={colors.logoFill} className="w-full h-full" />
      </foreignObject>
      <text x="80" y="40" fontFamily="Inter, sans-serif" fontWeight="bold" fontSize="16" fill={colors.textPrimary}>PulsePlace</text>
      <text x="80" y="60" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="bold" fill={colors.textPrimary}>CERTIFIED</text>
      <text x="80" y="75" fontFamily="Inter, sans-serif" fontSize="10" fill={colors.textSecondary}>PulseScore: {score}/100</text>
      <text x="80" y="90" fontFamily="Inter, sans-serif" fontSize="10" fill={colors.textSecondary}>Valid: {issueDate} - {validUntil}</text>
      {customCta && (
        <>
          <rect x="0" y="105" width="240" height="15" rx="0" fill={colors.stroke + "20"} />
          <text x="120" y="115" fontFamily="Inter, sans-serif" fontSize="10" fill={colors.textPrimary} textAnchor="middle">{customCta}</text>
        </>
      )}
      <defs>
        <linearGradient id="badge-gradient" x1="0" y1="0" x2="240" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7F9FB" /> {/* Soft Cloud (background light) */}
          <stop offset="1" stopColor="#E9F4F0" /> {/* Lighter version of success */}
        </linearGradient>
        <linearGradient id="linkedin-gradient" x1="0" y1="0" x2="240" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6F2FF" />
          <stop offset="1" stopColor="#CCE4FF" />
        </linearGradient>
        <linearGradient id="twitter-gradient" x1="0" y1="0" x2="240" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6F7FF" />
          <stop offset="1" stopColor="#CCF0FF" />
        </linearGradient>
        <linearGradient id="notion-gradient" x1="0" y1="0" x2="240" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7F6F3" />
          <stop offset="1" stopColor="#EBEAE6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StandardBadge;
