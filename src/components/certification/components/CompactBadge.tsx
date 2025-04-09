
import React from 'react';
import PulsePlaceLogo from './PulsePlaceLogo';

interface CompactBadgeProps {
  colors: {
    bg: string;
    stroke: string;
    textPrimary: string;
    textSecondary: string;
    logoFill: string;
  };
  customCta?: string;
}

const CompactBadge: React.FC<CompactBadgeProps> = ({
  colors,
  customCta
}) => {
  return (
    <svg width="180" height="60" viewBox="0 0 180 60" className="w-full max-w-[180px]">
      <rect width="180" height="60" rx="12" fill={colors.bg} />
      <foreignObject width="24" height="24" x="20" y="18">
        <PulsePlaceLogo fill={colors.logoFill} />
      </foreignObject>
      <text x="50" y="32" fontFamily="Inter, sans-serif" fontWeight="bold" fontSize="12" fill={colors.textPrimary}>PulsePlace</text>
      <text x="50" y="46" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="bold" fill={colors.textPrimary}>CERTIFIED</text>
      {customCta && (
        <>
          <rect x="0" y="50" width="180" height="10" rx="0" fill={colors.stroke + "20"} />
          <text x="90" y="57" fontFamily="Inter, sans-serif" fontSize="8" fill={colors.textPrimary} textAnchor="middle">{customCta}</text>
        </>
      )}
      <defs>
        <linearGradient id="badge-gradient-compact" x1="0" y1="0" x2="180" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7F9FB" /> {/* Soft Cloud (background light) */}
          <stop offset="1" stopColor="#E9F4F0" /> {/* Lighter version of success */}
        </linearGradient>
        <linearGradient id="linkedin-gradient" x1="0" y1="0" x2="180" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6F2FF" />
          <stop offset="1" stopColor="#CCE4FF" />
        </linearGradient>
        <linearGradient id="twitter-gradient" x1="0" y1="0" x2="180" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6F7FF" />
          <stop offset="1" stopColor="#CCF0FF" />
        </linearGradient>
        <linearGradient id="notion-gradient" x1="0" y1="0" x2="180" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7F6F3" />
          <stop offset="1" stopColor="#EBEAE6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CompactBadge;
