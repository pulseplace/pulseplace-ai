
import { SurveyTheme } from '@/types/scoring.types';

// Map themes to friendly names for display
export const themeNames: Record<SurveyTheme, string> = {
  trust_in_leadership: 'Trust in Leadership',
  psychological_safety: 'Psychological Safety',
  inclusion_belonging: 'Inclusion & Belonging',
  work_life_balance: 'Work-Life Balance',
  growth_opportunity: 'Growth & Opportunity'
};

// Calculate theme scores by response values
export const calculateThemeScoresByValues = (responses: any[]): Record<string, { sum: number; count: number }> => {
  const themeScores: Record<SurveyTheme, { sum: number; count: number }> = {
    trust_in_leadership: { sum: 0, count: 0 },
    psychological_safety: { sum: 0, count: 0 },
    inclusion_belonging: { sum: 0, count: 0 },
    work_life_balance: { sum: 0, count: 0 },
    growth_opportunity: { sum: 0, count: 0 }
  };
  
  // Process responses to build theme scores
  // Logic will vary based on your specific data structure
  
  return themeScores;
};

// Get theme UI colors
export const getThemeColor = (theme: SurveyTheme): string => {
  const themeColors: Record<SurveyTheme, string> = {
    trust_in_leadership: '#4f46e5', // indigo
    psychological_safety: '#0891b2', // cyan
    inclusion_belonging: '#f59e0b', // amber
    work_life_balance: '#10b981', // emerald
    growth_opportunity: '#8b5cf6' // violet
  };
  
  return themeColors[theme] || '#64748b'; // Default slate
};

export const getBorderColor = (score: number): string => {
  if (score >= 80) return 'border-green-500';
  if (score >= 65) return 'border-yellow-500';
  if (score >= 50) return 'border-orange-500';
  return 'border-red-500';
};

export const getTextColor = (score: number): string => {
  if (score >= 80) return 'text-green-600';
  if (score >= 65) return 'text-yellow-600';
  if (score >= 50) return 'text-orange-600';
  return 'text-red-600';
};
