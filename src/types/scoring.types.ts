
import { Json } from './database.types';

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

export interface SurveyResponse {
  questionId: string;
  value: number | string;
  normalizedScore?: number;
}

export interface ThemeScore {
  theme: ScoringTheme;
  score: number;
  count: number;
}

export interface CategoryScore {
  category: ScoringCategory;
  score: number;
  weight: number;
}

export interface PulseScoreData {
  overallScore: number;
  categoryScores: CategoryScore[];
  themeScores: ThemeScore[];
  tier: PulseScoreTier;
  insights: string[];
  recommendedActions: string[];
}

export type PulseScoreTier = 
  | 'pulse_certified'
  | 'emerging_culture'
  | 'at_risk'
  | 'intervention_advised';

export interface SentimentAnalysis {
  score: number;
  polarity: 'positive' | 'neutral' | 'negative';
  themes: string[];
  keyPhrases: string[];
}
