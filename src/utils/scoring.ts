
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

// Feedback synthesis prompts for PromptsContent.tsx
export const getFeedbackSynthesisPrompt = (themeScores: ThemeScore[]) => {
  return `Based on the following theme scores, provide a summary of strengths and areas for improvement: 
${themeScores.map(ts => `${ts.theme}: ${ts.score}`).join(', ')}`;
};

export const getOpenEndedFeedbackPrompt = (responses: Record<string, any>) => {
  return `Analyze the following open-ended responses and identify common themes and sentiments: 
${JSON.stringify(responses)}`;
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
