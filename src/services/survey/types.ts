
export interface Survey {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
  questions: any[];
}

export interface SurveyResponse {
  id?: string;
  surveyId: string;
  userId?: string | null;
  responses: Record<string, any>;
  createdAt?: string;
}

export interface CreateSurveyParams {
  title: string;
  description?: string;
  department?: string;
  is_anonymous?: boolean;
}
