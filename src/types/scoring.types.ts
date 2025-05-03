
export type QuestionType = 'likert' | 'emoji' | 'text' | 'binary';
export type SurveyTheme = 'trust_in_leadership' | 'psychological_safety' | 'inclusion_belonging' | 'work_life_balance' | 'growth_opportunity';
export type ScoringCategory = 'emotion_index' | 'engagement_stability' | 'culture_trust';
export type PulseScoreTier = 'pulse_certified' | 'emerging_culture' | 'at_risk' | 'intervention_advised';

export interface SurveyQuestion {
  id: string;
  text: string;
  type: QuestionType;
  theme: SurveyTheme;
  weight: number;
}

export interface SurveyResponse {
  questionId: string;
  value: number | string;
  normalizedScore?: number;
}

export interface ThemeScore {
  theme: SurveyTheme;
  score: number;
  count: number;
}

export interface CategoryScore {
  category: ScoringCategory;
  score: number;
  weight: number;
}
