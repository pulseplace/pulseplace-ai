
import { ThemeScore, CategoryScore, PulseScoreTier, SurveyResponse } from '@/types/scoring.types';
import { THEME_TO_CATEGORY, CATEGORY_WEIGHTS, TIER_THRESHOLDS } from './config';

export const calculateThemeScores = (responses: SurveyResponse[]): ThemeScore[] => {
  const themeScores: Record<string, { score: number; count: number }> = {};
  
  responses.forEach(response => {
    Object.keys(response.responses).forEach(questionId => {
      const theme = response.questionMapping[questionId]?.theme;
      const weight = response.questionMapping[questionId]?.weight || 1;
      const value = response.responses[questionId];
      
      if (theme && typeof value === 'number') {
        if (!themeScores[theme]) {
          themeScores[theme] = { score: 0, count: 0 };
        }
        themeScores[theme].score += value * weight;
        themeScores[theme].count += 1;
      }
    });
  });

  return Object.entries(themeScores).map(([theme, data]) => ({
    theme,
    score: data.count > 0 ? Math.round(data.score / data.count) : 0,
    count: data.count
  }));
};

export const calculateCategoryScores = (themeScores: ThemeScore[]): CategoryScore[] => {
  const categoryScores: Record<string, { score: number; count: number }> = {};
  
  themeScores.forEach(themeScore => {
    const category = THEME_TO_CATEGORY[themeScore.theme as keyof typeof THEME_TO_CATEGORY];
    if (category) {
      if (!categoryScores[category]) {
        categoryScores[category] = { score: 0, count: 0 };
      }
      categoryScores[category].score += themeScore.score * (themeScore.weight || 1);
      categoryScores[category].count += 1;
    }
  });

  return Object.entries(categoryScores).map(([category, data]) => ({
    category: category as any,
    score: data.count > 0 ? Math.round(data.score / data.count) : 0,
    weight: CATEGORY_WEIGHTS[category as keyof typeof CATEGORY_WEIGHTS] || 1
  }));
};

export const calculateOverallScore = (categoryScores: CategoryScore[]): number => {
  let totalScore = 0;
  let totalWeight = 0;
  
  categoryScores.forEach(score => {
    totalScore += score.score * score.weight;
    totalWeight += score.weight;
  });
  
  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
};

export const determineTier = (score: number): PulseScoreTier => {
  if (score >= TIER_THRESHOLDS.thriving) return 'thriving';
  if (score >= TIER_THRESHOLDS.stable) return 'stable';
  if (score >= TIER_THRESHOLDS.at_risk) return 'at_risk';
  return 'critical';
};

export const getFeedbackSynthesisPrompt = (responses: any[]): string => {
  // Placeholder implementation
  return `Analyze the following survey responses and provide insights about workplace culture: ${JSON.stringify(responses)}`;
};

export const getOpenEndedFeedbackPrompt = (responses: any[]): string => {
  // Placeholder implementation
  return `Generate insights from open-ended feedback: ${JSON.stringify(responses)}`;
};

export const getTierColor = (tier: PulseScoreTier): string => {
  switch (tier) {
    case 'thriving': return '#10B981'; // green-500
    case 'stable': return '#3B82F6'; // blue-500
    case 'at_risk': return '#F59E0B'; // amber-500
    case 'critical': return '#EF4444'; // red-500
    default: return '#6B7280'; // gray-500
  }
};

export const getTierLabel = (tier: PulseScoreTier): string => {
  switch (tier) {
    case 'thriving': return 'Thriving';
    case 'stable': return 'Stable';
    case 'at_risk': return 'At Risk';
    case 'critical': return 'Critical';
    default: return 'Unknown';
  }
};
