
export type ScoringTheme = 
  | 'psychological_safety' 
  | 'trust_in_leadership' 
  | 'team_cohesion' 
  | 'work_life_balance'
  | 'career_growth'
  | 'inclusion_diversity'
  | 'communication'
  | 'recognition'
  | 'inclusion_belonging'
  | 'motivation_fulfillment'
  | 'mission_alignment'
  | 'engagement_continuity';

export type SurveyQuestionType = 'likert' | 'emoji' | 'text' | 'binary';

export interface SurveyQuestion {
  id: string;
  text: string;
  type: SurveyQuestionType;
  theme: ScoringTheme;
  weight: number;
}

export interface ThemeScore {
  theme: ScoringTheme;
  score: number;
  count: number;
}

export interface CategoryScore {
  category: string;
  score: number;
  weight: number;
}

export interface SurveyResponse {
  responses: Record<string, number>;
  questionMapping: Record<string, {
    theme: ScoringTheme;
    weight: number;
  }>;
}

export type PulseScoreTier = 'pulse_certified' | 'emerging_culture' | 'at_risk' | 'intervention_advised' | 'bronze' | 'silver' | 'gold' | 'not_eligible' | 'thriving';

export interface TierDisplay {
  label: string;
  color: string;
  description?: string;
}

export interface DateRangeFilter {
  from: Date;
  to: Date;
}

export interface SurveyResponseItem {
  questionId: string;
  value: number | string;
}

export interface PulseScoreData {
  overallScore: number;
  categoryScores: CategoryScore[];
  themeScores: ThemeScore[];
  tier: PulseScoreTier;
  insights: string[];
  recommendedActions?: string[];
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
  recommendedActions?: string[];
}

export type ScoringCategory = 'emotion_index' | 'engagement_stability' | 'culture_trust' | string;
