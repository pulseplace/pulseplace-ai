
import { SurveyQuestion } from '@/types/scoring.types';

export interface Survey {
  id: string;
  title: string;
  description: string;
  created_by: string;
  company: string;
  department: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_anonymous: boolean;
  questions: SurveyQuestion[]; // Add the questions field
}

export interface SurveyResponse {
  id?: string;
  surveyId: string;
  userId?: string;
  anonymous?: boolean;
  responses: Record<string, any>;
  created_at?: string;
}

export interface CreateSurveyParams {
  title: string;
  description?: string;
  department?: string | null;
  is_anonymous?: boolean;
  questions?: SurveyQuestion[];
}
