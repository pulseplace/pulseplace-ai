
import { BadgeStyle, BadgeVariant } from '@/types/badge.types';

interface BadgeColors {
  bg: string;
  stroke: string;
  textPrimary: string;
  textSecondary: string;
  logoFill: string;
}

export const getBadgeColors = (style: BadgeStyle, variant: BadgeVariant): BadgeColors => {
  // Base colors for default variant
  const defaultColors: BadgeColors = {
    bg: 'url(#badge-gradient)',
    stroke: '#32D27E', // Trust Mint (success color)
    textPrimary: '#1A1A2E', // Soulful Midnight (primary color)
    textSecondary: '#8A8A8A', // Grey Mist (text-muted)
    logoFill: '#32D27E', // Trust Mint (success color)
  };
  
  // LinkedIn variant colors
  if (variant === 'linkedin') {
    return {
      bg: 'url(#linkedin-gradient)',
      stroke: '#0A66C2',
      textPrimary: '#0A66C2',
      textSecondary: '#4B5563',
      logoFill: '#0A66C2',
    };
  }
  
  // Twitter variant colors
  if (variant === 'twitter') {
    return {
      bg: 'url(#twitter-gradient)',
      stroke: '#1DA1F2',
      textPrimary: '#1DA1F2',
      textSecondary: '#4B5563',
      logoFill: '#1DA1F2',
    };
  }
  
  // Notion variant colors
  if (variant === 'notion') {
    return {
      bg: 'url(#notion-gradient)',
      stroke: '#000000',
      textPrimary: '#000000',
      textSecondary: '#4B5563',
      logoFill: '#000000',
    };
  }
  
  return defaultColors;
};
