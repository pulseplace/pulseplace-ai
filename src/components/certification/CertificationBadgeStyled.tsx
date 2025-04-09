
import React from 'react';
import { BadgeStyle, BadgeVariant } from '@/types/badge.types';
import { PulseScoreTier } from '@/types/scoring.types';
import { getTierDisplay } from '@/utils/scoring';

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
  const tierInfo = getTierDisplay(tier);
  const isCompact = style === 'compact';
  const isMinimal = style === 'minimal';
  const isColorful = style === 'colorful';
  
  // Generate badge colors based on variant and style
  const getBadgeColors = () => {
    // Base colors
    let colors = {
      bg: 'url(#badge-gradient)',
      stroke: '#32D27E', // Trust Mint (success color)
      textPrimary: '#1A1A2E', // Soulful Midnight (primary color)
      textSecondary: '#8A8A8A', // Grey Mist (text-muted)
      logoFill: '#3F8CFF' // Pulse Blue
    };
    
    // Apply style variations
    if (isMinimal) {
      colors = {
        bg: '#FFFFFF',
        stroke: '#1A1A2E', // Soulful Midnight
        textPrimary: '#1A1A2E', // Soulful Midnight
        textSecondary: '#8A8A8A', // Grey Mist
        logoFill: '#1A1A2E' // Soulful Midnight
      };
    }
    
    if (isColorful) {
      colors = {
        bg: '#3F8CFF', // Pulse Blue
        stroke: '#FFFFFF',
        textPrimary: '#FFFFFF',
        textSecondary: '#E6F0FF', // Light version of pulse blue
        logoFill: '#FFFFFF'
      };
    }
    
    // Apply variant-specific overrides
    switch (variant) {
      case 'linkedin':
        return {
          ...colors,
          bg: isMinimal ? '#FFFFFF' : isColorful ? '#0A66C2' : 'url(#linkedin-gradient)',
          stroke: isMinimal ? '#0A66C2' : '#FFFFFF',
          textPrimary: isMinimal ? '#0A66C2' : '#FFFFFF',
          logoFill: isMinimal ? '#0A66C2' : '#FFFFFF'
        };
      case 'twitter':
        return {
          ...colors,
          bg: isMinimal ? '#FFFFFF' : isColorful ? '#1DA1F2' : 'url(#twitter-gradient)',
          stroke: isMinimal ? '#1DA1F2' : '#FFFFFF',
          textPrimary: isMinimal ? '#1DA1F2' : '#FFFFFF',
          logoFill: isMinimal ? '#1DA1F2' : '#FFFFFF'
        };
      case 'notion':
        return {
          ...colors,
          bg: isMinimal ? '#FFFFFF' : isColorful ? '#000000' : 'url(#notion-gradient)',
          stroke: isMinimal ? '#000000' : '#FFFFFF',
          textPrimary: isMinimal ? '#000000' : '#FFFFFF',
          logoFill: isMinimal ? '#000000' : '#FFFFFF'
        };
      default:
        return colors;
    }
  };
  
  const colors = getBadgeColors();
  
  // Custom PulsePlace logo component
  const PulsePlaceLogo = ({ className }: { className?: string }) => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={colors.logoFill} 
      className={className} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M12 6v6l3 3" />
    </svg>
  );
  
  // SVG for the badge
  const BadgeSvg = () => {
    // Compact badge
    if (isCompact) {
      return (
        <svg width="180" height="60" viewBox="0 0 180 60" className="w-full max-w-[180px]">
          <rect width="180" height="60" rx="12" fill={colors.bg} />
          <foreignObject width="24" height="24" x="20" y="18">
            <PulsePlaceLogo />
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
    }
    
    // Standard badge (and other variants)
    return (
      <svg width="240" height="120" viewBox="0 0 240 120" className="w-full max-w-[240px]">
        <rect width="240" height="120" rx="16" fill={colors.bg} />
        <foreignObject width="36" height="36" x="24" y="30">
          <PulsePlaceLogo className="w-full h-full" />
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
  
  return (
    <div className="flex justify-center">
      <BadgeSvg />
    </div>
  );
};

export default CertificationBadgeStyled;
