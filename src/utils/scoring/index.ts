
import { SurveyResponse, ThemeScore, CategoryScore, PulseScoreTier, ScoringTheme } from '@/types/scoring.types';
import { 
  calculateThemeScores as calcThemeScores,
  calculateCategoryScores as calcCategoryScores,
  getTier,
  getTierDisplay,
  getSampleSurveyQuestions
} from './scoring/core';

// Process a survey response and calculate all scores
export const processSurveyResponse = (response: SurveyResponse) => {
  const themeScores = calcThemeScores(response);
  const categoryScores = calcCategoryScores(themeScores);
  const overallScore = calculateOverallScore(categoryScores);
  
  return {
    themeScores,
    categoryScores,
    overallScore
  };
};

// Calculate overall score from category scores
export const calculateOverallScore = (categoryScores: CategoryScore[]): number => {
  let totalScore = 0;
  let totalWeight = 0;
  
  categoryScores.forEach(score => {
    totalScore += score.score * score.weight;
    totalWeight += score.weight;
  });
  
  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
};

// Feedback synthesis prompts for PromptsContent.tsx
export const getFeedbackSynthesisPrompt = (themeScoresInput: { themeScores: Array<{theme: ScoringTheme, score: number}> }) => {
  return `Based on the following theme scores, provide a summary of strengths and areas for improvement: 
${themeScoresInput.themeScores.map(ts => `${ts.theme}: ${ts.score}`).join(', ')}`;
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
  calcThemeScores as calculateThemeScores,
  calcCategoryScores as calculateCategoryScores
};
