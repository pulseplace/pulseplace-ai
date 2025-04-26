
// Re-export all scoring utilities from one file
export {
  calculateThemeScores,
  calculateCategoryScores,
  calculateOverallScore,
  getTier,
  getTierDisplay,
  processSurveyResponse,
  getSampleSurveyQuestions
} from './core';

export { THEME_TO_CATEGORY, CATEGORY_WEIGHTS, TIER_THRESHOLDS } from './config';
