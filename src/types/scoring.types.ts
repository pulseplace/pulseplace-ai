
export type ScoringTheme = 
  | 'trust_in_leadership'
  | 'psychological_safety'
  | 'inclusion_belonging'
  | 'motivation_fulfillment'
  | 'mission_alignment'
  | 'engagement_continuity';

export type ScoringCategory = 
  | 'emotion_index'
  | 'engagement_stability'
  | 'culture_trust';

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'likert' | 'emoji' | 'text' | 'binary';
  theme: ScoringTheme;
  weight: number;
}

export interface SurveyResponseItem {
  questionId: string;
  value: number | string;
}

export interface SurveyResponse {
  responses: Record<string, number>;
  questionMapping: Record<string, {
    theme: string;
    weight: number;
  }>;
}

export interface CategoryScore {
  category: ScoringCategory;
  score: number;
  weight: number;
}

export interface ThemeScore {
  theme: string;
  score: number;
  count: number;
  weight?: number;
}

// Updated PulseScoreTier to include all tiers used in the application
export type PulseScoreTier = 
  | 'thriving'
  | 'stable'
  | 'at_risk'
  | 'critical'
  | 'pulse_certified'
  | 'emerging_culture'
  | 'intervention_advised';

export interface SentimentAnalysis {
  score: number;
  polarity: 'positive' | 'neutral' | 'negative';
  themes: string[];
  keyPhrases: string[];
}

export interface AIInsight {
  concernCategory: string;
  concernText: string;
  severity: 'high' | 'medium' | 'low';
  impactArea: string;
  recommendedAction: string;
}

export interface PredictiveFlag {
  department: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
  predictedImpact: number;
}

export interface DashboardMetricVisibility {
  pulseScore: boolean;
  categoryBreakdown: boolean;
  aiInsights: boolean;
  participationRate: boolean;
  engagementRetention: boolean;
  benchmarks: boolean;
}

export interface DateRangeFilter {
  from: Date;
  to: Date;
}

export interface PulseScoreData {
  overallScore: number;
  categoryScores: CategoryScore[];
  themeScores: ThemeScore[];
  tier: PulseScoreTier;
  insights: string[];
  recommendedActions: string[];
}

export interface MockPulseScoreData {
  overallScore: number;
  categoryScores: {
    category: ScoringCategory;
    score: number;
    weight: number;
  }[];
  themeScores: ThemeScore[];
  tier: PulseScoreTier;
  insights: string[];
  recommendedActions: string[];
}

// Theme trend analysis types
export interface ThemeTrend {
  theme: ScoringTheme;
  previousScore: number;
  currentScore: number;
  change: number;
  direction: 'up' | 'down' | 'stable';
}

export interface AttritionRisk {
  department: string;
  risk: number;
  change: number;
  factors: {
    theme: ScoringTheme;
    impact: number;
  }[];
  level: 'high' | 'medium' | 'low';
}
