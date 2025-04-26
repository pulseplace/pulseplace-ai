
import { SurveyQuestion, SurveyResponse, CategoryScore } from '@/types/scoring.types';
import { THEME_TO_CATEGORY, CATEGORY_WEIGHTS, TIER_THRESHOLDS } from './config';

export const calculatePulseScore = (
  responses: Record<string, number>,
  questionMapping: Record<string, { theme: string; weight: number }>
): {
  themeScores: Record<string, { score: number; count: number }>;
  overallScore: number;
} => {
  const themeScores: Record<string, { score: number; count: number }> = {};
  
  // Process each response
  Object.entries(responses).forEach(([questionId, value]) => {
    const questionInfo = questionMapping[questionId];
    if (!questionInfo) return;
    
    const { theme, weight } = questionInfo;
    const normalizedValue = (value - 1) * 25; // Convert 1-5 scale to 0-100
    
    if (!themeScores[theme]) {
      themeScores[theme] = { score: 0, count: 0 };
    }
    
    themeScores[theme].score += normalizedValue * weight;
    themeScores[theme].count += weight;
  });
  
  // Calculate average scores for each theme
  Object.keys(themeScores).forEach(theme => {
    if (themeScores[theme].count > 0) {
      themeScores[theme].score = themeScores[theme].score / themeScores[theme].count;
    }
  });
  
  // Calculate overall score (simple average of theme scores for now)
  const themeValues = Object.values(themeScores);
  const overallScore = Math.round(
    themeValues.reduce((sum, theme) => sum + theme.score, 0) / 
    (themeValues.length || 1)
  );
  
  return { themeScores, overallScore };
};

// Calculate category scores based on theme scores
export const calculateCategoryScores = (
  themeScores: Record<string, { score: number; count: number }>
): CategoryScore[] => {
  const categoryScores: Record<string, { score: number; count: number }> = {
    emotion_index: { score: 0, count: 0 },
    engagement_stability: { score: 0, count: 0 },
    culture_trust: { score: 0, count: 0 }
  };
  
  // Group theme scores by category
  Object.entries(themeScores).forEach(([theme, { score, count }]) => {
    const category = THEME_TO_CATEGORY[theme as keyof typeof THEME_TO_CATEGORY] || 'emotion_index';
    categoryScores[category].score += score * count;
    categoryScores[category].count += count;
  });
  
  // Calculate average score for each category
  return Object.entries(categoryScores).map(([category, { score, count }]) => ({
    category: category as keyof typeof CATEGORY_WEIGHTS,
    score: count > 0 ? score / count : 0,
    weight: CATEGORY_WEIGHTS[category as keyof typeof CATEGORY_WEIGHTS]
  }));
};

// Calculate the weighted overall score based on category scores
export const calculateWeightedOverallScore = (categoryScores: CategoryScore[]): number => {
  let weightedSum = 0;
  let totalWeight = 0;
  
  categoryScores.forEach(({ score, weight }) => {
    weightedSum += score * weight;
    totalWeight += weight;
  });
  
  return Math.round(totalWeight > 0 ? weightedSum / totalWeight : 0);
};

// Main function to calculate overall score from a survey response
export const calculateOverallScore = (surveyResponse: SurveyResponse): {
  overallScore: number;
  categoryScores: CategoryScore[];
} => {
  // Calculate theme scores
  const { themeScores, overallScore: rawScore } = calculatePulseScore(
    surveyResponse.responses,
    surveyResponse.questionMapping
  );
  
  // Calculate category scores
  const categoryScores = calculateCategoryScores(themeScores);
  
  // Calculate weighted overall score
  const overallScore = calculateWeightedOverallScore(categoryScores);
  
  return { overallScore, categoryScores };
};
