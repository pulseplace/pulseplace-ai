
// Configuration for PulseScore calculation and display

export const THEME_TO_CATEGORY = {
  trust_in_leadership: 'culture_trust',
  psychological_safety: 'culture_trust',
  inclusion_belonging: 'culture_trust',
  motivation_fulfillment: 'engagement_stability',
  mission_alignment: 'engagement_stability',
  engagement_continuity: 'emotion_index'
};

export const CATEGORY_WEIGHTS = {
  culture_trust: 1.4,
  engagement_stability: 1.2,
  emotion_index: 1.0
};

export const TIER_THRESHOLDS = {
  thriving: 80,
  stable: 60,
  at_risk: 40,
  critical: 0
};
