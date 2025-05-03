
import { SurveyTheme, ScoringCategory } from '@/types/scoring.types';

// Map themes to categories for scoring
export const themeToCategory: Record<SurveyTheme, ScoringCategory> = {
  trust_in_leadership: 'culture_trust',
  psychological_safety: 'culture_trust',
  inclusion_belonging: 'emotion_index',
  work_life_balance: 'engagement_stability',
  growth_opportunity: 'engagement_stability'
};

// Category weights in final score
export const categoryWeights: Record<ScoringCategory, number> = {
  emotion_index: 0.4,
  culture_trust: 0.35,
  engagement_stability: 0.25
};

// Score thresholds for different tiers
export const scoreTierThresholds = {
  pulse_certified: 80,
  emerging_culture: 65,
  at_risk: 50
  // Below 50 is intervention_advised
};
