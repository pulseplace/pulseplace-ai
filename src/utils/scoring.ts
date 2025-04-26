
import { SurveyResponse, ThemeScore, CategoryScore, PulseScoreTier } from '@/types/scoring.types';
import { 
  processSurveyResponse,
  calculateThemeScores,
  calculateCategoryScores,
  calculateOverallScore as calculateScoreCore,
  getTier,
  getTierDisplay,
  getSampleSurveyQuestions
} from './scoring/core';

export const calculateOverallScore = (response: SurveyResponse) => {
  const result = processSurveyResponse(response);
  const tier = getTier(result.overallScore);
  
  return { 
    ...result,
    tier
  };
};

// Re-export needed functions
export { 
  getSampleSurveyQuestions, 
  getTierDisplay,
  getTier,
  calculateThemeScores,
  calculateCategoryScores,
  calculateScoreCore as calculateOverallScore
};
