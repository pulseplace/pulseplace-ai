
import { CategoryScore, ThemeScore } from '@/types/scoring.types';
import { THEME_TO_CATEGORY, CATEGORY_WEIGHTS } from './config';

export const calculateCategoryScores = (themeScores: ThemeScore[]): CategoryScore[] => {
  const categoryScores: Record<string, { sum: number; count: number }> = {
    emotion_index: { sum: 0, count: 0 },
    engagement_stability: { sum: 0, count: 0 },
    culture_trust: { sum: 0, count: 0 }
  };

  themeScores.forEach(theme => {
    const category = THEME_TO_CATEGORY[theme.theme];
    categoryScores[category].sum += theme.score * theme.count;
    categoryScores[category].count += theme.count;
  });

  return Object.entries(categoryScores).map(([category, { sum, count }]) => ({
    category: category as any,
    score: count > 0 ? sum / count : 0,
    weight: CATEGORY_WEIGHTS[category as keyof typeof CATEGORY_WEIGHTS]
  }));
};

export const calculateOverallScore = (categoryScores: CategoryScore[]): number => {
  let weightedSum = 0;
  let totalWeight = 0;

  categoryScores.forEach(category => {
    weightedSum += category.score * category.weight;
    totalWeight += category.weight;
  });

  return Math.round(totalWeight > 0 ? weightedSum / totalWeight : 0);
};
