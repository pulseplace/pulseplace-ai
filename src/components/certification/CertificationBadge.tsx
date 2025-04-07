
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
}

const CertificationBadge: React.FC<CertificationBadgeProps> = ({
  companyName,
  tier,
  score,
  issueDate = 'August 2025',
  validUntil = 'August 2026',
  size = 'standard'
}) => {
  const tierInfo = getTierDisplay(tier);
  const isCompact = size === 'compact';
  
  // SVG for the badge
  const BadgeSvg = () => {
    if (isCompact) {
      return (
        <svg width="180" height="60" viewBox="0 0 180 60" className="w-full max-w-[180px]">
          <rect width="180" height="60" rx="4" fill="url(#badge-gradient-compact)" />
          <path d="M24 30.5L27 33.5L33 26" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="20" y="23" width="20" height="20" rx="10" stroke="#22C55E" strokeWidth="2" />
          <text x="50" y="32" fontFamily="Arial" fontWeight="bold" fontSize="12" fill="#22C55E">{tierInfo.label.toUpperCase()}</text>
          <text x="50" y="46" fontFamily="Arial" fontSize="10" fill="#4B5563">PulseScore: {score}/100</text>
          <defs>
            <linearGradient id="badge-gradient-compact" x1="0" y1="0" x2="180" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F0FDF4" />
              <stop offset="1" stopColor="#DCFCE7" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
    
    return (
      <svg width="240" height="120" viewBox="0 0 240 120" className="w-full max-w-[240px]">
        <rect width="240" height="120" rx="8" fill="url(#badge-gradient)" />
        <path d="M31.5 42.5L37 48L46 36" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="24" y="30" width="36" height="36" rx="18" stroke="#22C55E" strokeWidth="2.5" />
        <text x="80" y="40" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#22C55E">{tierInfo.label.toUpperCase()}</text>
        <text x="80" y="60" fontFamily="Arial" fontSize="12" fill="#4B5563">{companyName}</text>
        <text x="80" y="75" fontFamily="Arial" fontSize="10" fill="#6B7280">PulseScore: {score}/100</text>
        <text x="80" y="90" fontFamily="Arial" fontSize="10" fill="#6B7280">Valid: {issueDate} - {validUntil}</text>
        <defs>
          <linearGradient id="badge-gradient" x1="0" y1="0" x2="240" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0FDF4" />
            <stop offset="1" stopColor="#DCFCE7" />
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
