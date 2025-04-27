import { 
  SurveyQuestion, 
  SurveyResponse, 
  ThemeScore, 
  CategoryScore, 
  PulseScoreTier,
  ScoringTheme
} from '@/types/scoring.types';
import { 
  TIER_THRESHOLDS, 
  TIER_DISPLAY,
  THEME_CATEGORY_WEIGHTS,
  CATEGORY_WEIGHTS
} from './config';

// Calculate theme scores from a survey response
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
    theme: theme as ScoringTheme,
    score: data.count > 0 ? Math.round((data.score / data.count) * 20) : 0, // Scale to 0-100
    count: data.count
  }));
};

// Calculate category scores from theme scores
export const calculateCategoryScores = (themeScores: ThemeScore[]): CategoryScore[] => {
  const categoryScores: Record<string, { score: number; count: number }> = {};
  
  themeScores.forEach(themeScore => {
    const categoryInfo = (THEME_CATEGORY_WEIGHTS as any)[themeScore.theme];
    if (categoryInfo) {
      const { category, weight } = categoryInfo;
      if (!categoryScores[category]) {
        categoryScores[category] = { score: 0, count: 0 };
      }
      categoryScores[category].score += themeScore.score * weight;
      categoryScores[category].count += weight;
    }
  });

  return Object.entries(categoryScores).map(([category, data]) => ({
    category: category as any,
    score: data.count > 0 ? Math.round(data.score / data.count) : 0,
    weight: (CATEGORY_WEIGHTS as any)[category] || 1
  }));
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

// Determine tier based on overall score
export const getTier = (score: number): PulseScoreTier => {
  if (score >= TIER_THRESHOLDS.pulse_certified) return 'pulse_certified';
  if (score >= TIER_THRESHOLDS.thriving) return 'thriving';
  if (score >= TIER_THRESHOLDS.stable) return 'stable';
  if (score >= TIER_THRESHOLDS.at_risk) return 'at_risk';
  return 'critical';
};

// Get tier display information
export const getTierDisplay = (tier: PulseScoreTier) => {
  return TIER_DISPLAY[tier];
};

// Generate sample survey questions for testing
export const getSampleSurveyQuestions = (): SurveyQuestion[] => {
  return [
    {
      id: 'q1',
      text: 'I trust the leadership team at my organization',
      type: 'likert',
      theme: 'trust_in_leadership',
      weight: 1.2
    },
    {
      id: 'q2',
      text: 'I feel safe sharing my opinions without fear of negative consequences',
      type: 'likert',
      theme: 'psychological_safety',
      weight: 1.0
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
      text: 'I find my work meaningful and engaging',
      type: 'likert',
      theme: 'motivation_fulfillment',
      weight: 1.1
    },
    {
      id: 'q5',
      text: 'I understand and believe in our company\'s mission',
      type: 'likert',
      theme: 'mission_alignment',
      weight: 0.9
    },
    {
      id: 'q6',
      text: 'I see myself working here a year from now',
      type: 'likert',
      theme: 'engagement_continuity',
      weight: 1.3
    }
  ];
};

// Process a survey response and calculate all scores
export const processSurveyResponse = (response: SurveyResponse) => {
  const themeScores = calculateThemeScores(response);
  const categoryScores = calculateCategoryScores(themeScores);
  const overallScore = calculateOverallScore(categoryScores);
  const tier = getTier(overallScore);
  
  return {
    themeScores,
    categoryScores,
    overallScore,
    tier
  };
};
