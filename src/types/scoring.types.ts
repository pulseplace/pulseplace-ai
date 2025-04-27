
export type ScoringTheme = 
  | 'psychological_safety' 
  | 'trust_in_leadership' 
  | 'team_cohesion' 
  | 'work_life_balance'
  | 'career_growth'
  | 'inclusion_diversity'
  | 'communication'
  | 'recognition';

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

export type PulseScoreTier = 'bronze' | 'silver' | 'gold' | 'not_eligible';

export interface DateRangeFilter {
  from: Date;
  to: Date;
}
