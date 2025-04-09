
/**
 * Badge styling types to be used across the application
 */

// Badge style options for visual appearance
export type BadgeStyle = 'standard' | 'compact' | 'minimal' | 'colorful';

// Badge variants for different platforms/contexts
export type BadgeVariant = 'default' | 'linkedin' | 'twitter' | 'notion';

// Badge type for different certification levels
export type BadgeType = 'basic' | 'premium' | 'enterprise' | 'custom';

// Configuration interface for badge generation
export interface BadgeConfig {
  style: BadgeStyle;
  variant: BadgeVariant;
  showLogo: boolean;
  showMetrics: boolean;
  customText?: string;
}
