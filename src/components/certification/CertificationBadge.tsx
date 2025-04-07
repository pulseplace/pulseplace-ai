
import React from 'react';
import { PulseScoreTier } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';

interface CertificationBadgeProps {
  companyName: string;
  tier: PulseScoreTier;
  score: number;
  issueDate?: string;
  validUntil?: string;
  size?: 'standard' | 'compact';
  customCta?: string;
  variant?: 'default' | 'linkedin' | 'twitter' | 'notion';
}

const CertificationBadge: React.FC<CertificationBadgeProps> = ({
  companyName,
  tier,
  score,
  issueDate = 'August 2025',
  validUntil = 'August 2026',
  size = 'standard',
  customCta,
  variant = 'default'
}) => {
  const tierInfo = getTierDisplay(tier);
  const isCompact = size === 'compact';
  
  // Generate badge colors based on variant
  const getBadgeColors = () => {
    switch (variant) {
      case 'linkedin':
        return {
          bg: 'url(#linkedin-gradient)',
          stroke: '#0A66C2',
          textPrimary: '#0A66C2',
          textSecondary: '#4B5563'
        };
      case 'twitter':
        return {
          bg: 'url(#twitter-gradient)',
          stroke: '#1DA1F2',
          textPrimary: '#1DA1F2',
          textSecondary: '#4B5563'
        };
      case 'notion':
        return {
          bg: 'url(#notion-gradient)',
          stroke: '#000000',
          textPrimary: '#000000',
          textSecondary: '#4B5563'
        };
      default:
        return {
          bg: 'url(#badge-gradient)',
          stroke: '#22C55E',
          textPrimary: '#22C55E',
          textSecondary: '#4B5563'
        };
    }
  };
  
  const colors = getBadgeColors();
  
  // SVG for the badge
  const BadgeSvg = () => {
    if (isCompact) {
      return (
        <svg width="180" height="60" viewBox="0 0 180 60" className="w-full max-w-[180px]">
          <rect width="180" height="60" rx="4" fill={colors.bg} />
          <path d="M24 30.5L27 33.5L33 26" stroke={colors.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="20" y="23" width="20" height="20" rx="10" stroke={colors.stroke} strokeWidth="2" />
          <text x="50" y="32" fontFamily="Arial" fontWeight="bold" fontSize="12" fill={colors.textPrimary}>{tierInfo.label.toUpperCase()}</text>
          <text x="50" y="46" fontFamily="Arial" fontSize="10" fill={colors.textSecondary}>PulseScore: {score}/100</text>
          {customCta && (
            <rect x="0" y="50" width="180" height="10" rx="0" fill={colors.stroke + "20"} />
            <text x="90" y="57" fontFamily="Arial" fontSize="8" fill={colors.textPrimary} textAnchor="middle">{customCta}</text>
          )}
          <defs>
            <linearGradient id="badge-gradient-compact" x1="0" y1="0" x2="180" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F0FDF4" />
              <stop offset="1" stopColor="#DCFCE7" />
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
    }
    
    return (
      <svg width="240" height="120" viewBox="0 0 240 120" className="w-full max-w-[240px]">
        <rect width="240" height="120" rx="8" fill={colors.bg} />
        <path d="M31.5 42.5L37 48L46 36" stroke={colors.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="24" y="30" width="36" height="36" rx="18" stroke={colors.stroke} strokeWidth="2.5" />
        <text x="80" y="40" fontFamily="Arial" fontWeight="bold" fontSize="14" fill={colors.textPrimary}>{tierInfo.label.toUpperCase()}</text>
        <text x="80" y="60" fontFamily="Arial" fontSize="12" fill={colors.textSecondary}>{companyName}</text>
        <text x="80" y="75" fontFamily="Arial" fontSize="10" fill={colors.textSecondary}>PulseScore: {score}/100</text>
        <text x="80" y="90" fontFamily="Arial" fontSize="10" fill={colors.textSecondary}>Valid: {issueDate} - {validUntil}</text>
        {customCta && (
          <rect x="0" y="105" width="240" height="15" rx="0" fill={colors.stroke + "20"} />
          <text x="120" y="115" fontFamily="Arial" fontSize="10" fill={colors.textPrimary} textAnchor="middle">{customCta}</text>
        )}
        <defs>
          <linearGradient id="badge-gradient" x1="0" y1="0" x2="240" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0FDF4" />
            <stop offset="1" stopColor="#DCFCE7" />
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
  
  return (
    <div className="flex justify-center">
      <BadgeSvg />
    </div>
  );
};

export default CertificationBadge;
