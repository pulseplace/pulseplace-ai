
import { CategoryScore, ThemeScore } from '@/types/scoring.types';
import { themeToCategory, categoryWeights } from './config';

export const calculateCategoryScores = (themeScores: ThemeScore[]): CategoryScore[] => {
  const categoryScores: Record<string, { sum: number; count: number }> = {
    emotion_index: { sum: 0, count: 0 },
    engagement_stability: { sum: 0, count: 0 },
    culture_trust: { sum: 0, count: 0 }
  };

  themeScores.forEach(theme => {
    const category = themeToCategory[theme.theme];
    categoryScores[category].sum += theme.score * theme.count;
    categoryScores[category].count += theme.count;
  });

  return Object.entries(categoryScores).map(([category, { sum, count }]) => ({
    category: category as any,
    score: count > 0 ? sum / count : 0,
    weight: categoryWeights[category as keyof typeof categoryWeights]
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
