
import { PulseScoreTier } from '@/types/scoring.types';

// Tier threshold values
export const TIER_THRESHOLDS = {
  thriving: 80,
  stable: 65,
  at_risk: 45,
  critical: 0
};

// Mapping of tiers to display data
export const TIER_DISPLAY = {
  thriving: { 
    label: 'Thriving',
    color: 'text-green-600'
  },
  stable: { 
    label: 'Stable',
    color: 'text-blue-600'
  },
  at_risk: { 
    label: 'At Risk',
    color: 'text-amber-600'
  },
  critical: { 
    label: 'Critical',
    color: 'text-red-600'
  }
};

// Theme weights for category calculations
export const THEME_CATEGORY_WEIGHTS = {
  trust_in_leadership: { category: 'culture_trust', weight: 0.4 },
  psychological_safety: { category: 'culture_trust', weight: 0.6 },
  inclusion_belonging: { category: 'emotion_index', weight: 0.5 },
  motivation_fulfillment: { category: 'emotion_index', weight: 0.5 },
  mission_alignment: { category: 'engagement_stability', weight: 0.6 },
  engagement_continuity: { category: 'engagement_stability', weight: 0.4 }
};

// Category weights for overall score
export const CATEGORY_WEIGHTS = {
  culture_trust: 0.4,
  emotion_index: 0.3,
  engagement_stability: 0.3
};
