
import { SurveyResponse, ThemeScore, CategoryScore, PulseScoreTier } from '@/types/scoring.types';
import { processSurveyResponse } from './scoring/core';
import { getTier } from './scoring/core';

export const calculateOverallScore = (response: SurveyResponse) => {
  const result = processSurveyResponse(response);
  const tier = getTier(result.overallScore);
  
  return { 
    ...result,
    tier
  };
};

// Re-export needed functions
export { getSampleSurveyQuestions } from './scoring/core';
export { getTierDisplay } from './scoring/core';
export { getTier } from './scoring/core';
