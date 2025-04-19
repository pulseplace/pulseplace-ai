
import { ScoringTheme, ScoringCategory } from '@/types/scoring.types';

export const THEME_TO_CATEGORY: Record<ScoringTheme, ScoringCategory> = {
  trust_in_leadership: 'culture_trust',
  psychological_safety: 'culture_trust',
  inclusion_belonging: 'culture_trust',
  motivation_fulfillment: 'engagement_stability',
  mission_alignment: 'emotion_index',
  engagement_continuity: 'engagement_stability'
};

export const CATEGORY_WEIGHTS: Record<ScoringCategory, number> = {
  emotion_index: 0.4,
  engagement_stability: 0.3,
  culture_trust: 0.3
};

export const TIER_THRESHOLDS = {
  pulse_certified: 85,
  emerging_culture: 70,
  at_risk: 50,
  intervention_advised: 0
};
