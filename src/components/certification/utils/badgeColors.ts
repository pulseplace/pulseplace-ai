
import { BadgeStyle, BadgeVariant } from '@/types/badge.types';

interface BadgeColors {
  bg: string;
  stroke: string;
  textPrimary: string;
  textSecondary: string;
  logoFill: string;
}

export const getBadgeColors = (style: BadgeStyle, variant: BadgeVariant): BadgeColors => {
  // Base colors
  let colors: BadgeColors = {
    bg: 'url(#badge-gradient)',
    stroke: '#32D27E', // Trust Mint (success color)
    textPrimary: '#1A1A2E', // Soulful Midnight (primary color)
    textSecondary: '#8A8A8A', // Grey Mist (text-muted)
    logoFill: '#3F8CFF' // Pulse Blue
  };
  
  const isMinimal = style === 'minimal';
  const isColorful = style === 'colorful';
  
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
