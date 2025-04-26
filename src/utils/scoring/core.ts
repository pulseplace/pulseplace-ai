
import { SurveyQuestion, SurveyResponse, ThemeScore, CategoryScore, PulseScoreTier } from '@/types/scoring.types';
import { THEME_TO_CATEGORY, CATEGORY_WEIGHTS, TIER_THRESHOLDS } from './config';

export const processSurveyResponse = (response: SurveyResponse) => {
  const themeScores = calculateThemeScores(response);
  const categoryScores = calculateCategoryScores(themeScores);
  const overallScore = calculateOverallScore(categoryScores);
  
  return {
    overallScore,
    categoryScores,
    themeScores
  };
};

export const calculateThemeScores = (response: SurveyResponse): ThemeScore[] => {
  const themeScores: Record<string, { score: number; count: number }> = {};
  
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

export const getTier = (score: number): PulseScoreTier => {
  if (score >= TIER_THRESHOLDS.thriving) return 'thriving';
  if (score >= TIER_THRESHOLDS.stable) return 'stable';
  if (score >= TIER_THRESHOLDS.at_risk) return 'at_risk';
  return 'critical';
};

export const getTierDisplay = (tier: PulseScoreTier) => {
  switch (tier) {
    case 'thriving':
      return { label: 'Thriving', color: 'text-green-600' };
    case 'stable':
      return { label: 'Stable', color: 'text-blue-600' };
    case 'at_risk':
      return { label: 'At Risk', color: 'text-amber-600' };
    case 'critical':
      return { label: 'Critical', color: 'text-red-600' };
    default:
      return { label: 'Unknown', color: 'text-gray-600' };
  }
};

export const getSampleSurveyQuestions = (): SurveyQuestion[] => {
  return [
    {
      id: 'q1',
      text: 'I feel valued by my leadership team',
      type: 'likert',
      theme: 'trust_in_leadership',
      weight: 1.0
    },
    {
      id: 'q2',
      text: 'I can express my opinions without fear of negative consequences',
      type: 'likert',
      theme: 'psychological_safety',
      weight: 1.2
    },
    {
      id: 'q3',
      text: 'I feel a sense of belonging at my workplace',
      type: 'likert',
      theme: 'inclusion_belonging',
      weight: 1.0
    },
    {
      id: 'q4',
      text: 'My work gives me a sense of purpose',
      type: 'likert',
      theme: 'motivation_fulfillment',
      weight: 0.8
    },
    {
      id: 'q5',
      text: 'I understand and believe in our company mission',
      type: 'likert',
      theme: 'mission_alignment',
      weight: 1.0
    },
    {
      id: 'q6',
      text: 'I see myself working here a year from now',
      type: 'likert',
      theme: 'engagement_continuity',
      weight: 1.5
    },
    {
      id: 'q7',
      text: 'Share any specific feedback about leadership communication',
      type: 'text',
      theme: 'trust_in_leadership',
      weight: 0.5
    }
  ];
};
