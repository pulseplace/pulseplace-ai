
import { ScoringTheme, ScoringCategory } from '@/types/scoring.types';

export const THEME_TO_CATEGORY: Record<string, ScoringCategory> = {
  trust_in_leadership: 'culture_trust',
  psychological_safety: 'culture_trust',
  inclusion_belonging: 'culture_trust',
  motivation_fulfillment: 'engagement_stability',
  mission_alignment: 'emotion_index',
  engagement_continuity: 'engagement_stability'
};

export const CATEGORY_WEIGHTS: Record<ScoringCategory, number> = {
  emotion_index: 0.4, // 40%
  engagement_stability: 0.3, // 30%
  culture_trust: 0.3 // 30%
};

export const TIER_THRESHOLDS = {
  thriving: 85, // Previously pulse_certified
  stable: 70, // Previously emerging_culture
  at_risk: 50,
  critical: 0 // Previously intervention_advised
};
