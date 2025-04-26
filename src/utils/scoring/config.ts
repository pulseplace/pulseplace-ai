
export const THEME_TO_CATEGORY: Record<string, string> = {
  'trust_in_leadership': 'culture_trust',
  'psychological_safety': 'culture_trust',
  'inclusion_belonging': 'emotion_index',
  'motivation_fulfillment': 'emotion_index',
  'mission_alignment': 'engagement_stability',
  'engagement_continuity': 'engagement_stability'
};

export const CATEGORY_WEIGHTS = {
  'emotion_index': 0.4,
  'engagement_stability': 0.3,
  'culture_trust': 0.3
};

export const TIER_THRESHOLDS = {
  thriving: 85,
  stable: 70,
  at_risk: 50,
  critical: 0
};
