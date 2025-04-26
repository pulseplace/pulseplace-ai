
import { 
  SurveyQuestion, 
  SurveyResponse, 
  ThemeScore, 
  CategoryScore, 
  PulseScoreTier 
} from '@/types/scoring.types';
import { THEME_TO_CATEGORY, CATEGORY_WEIGHTS } from './config';

// Sample Survey Questions
export const getSampleSurveyQuestions = (): SurveyQuestion[] => {
  return [
    {
      id: 'q1',
      text: 'I trust my leadership team to make good decisions for the company',
      type: 'likert',
      theme: 'trust_in_leadership',
      weight: 1.2
    },
    {
      id: 'q2',
      text: 'I feel safe expressing my opinions at work',
      type: 'likert',
      theme: 'psychological_safety',
      weight: 1.0
    },
    {
      id: 'q3',
      text: 'I feel a sense of belonging on my team',
      type: 'likert',
      theme: 'inclusion_belonging',
      weight: 1.0
    },
    {
      id: 'q4',
      text: 'I find my work fulfilling',
      type: 'likert',
      theme: 'motivation_fulfillment',
      weight: 0.9
    },
    {
      id: 'q5',
      text: 'I understand how my work contributes to the company mission',
      type: 'likert',
      theme: 'mission_alignment',
      weight: 0.8
    },
    {
      id: 'q6',
      text: 'I intend to stay at this company for the foreseeable future',
      type: 'likert',
      theme: 'engagement_continuity',
      weight: 1.1
    }
  ];
};

// Calculate theme scores
export const calculateThemeScores = (
  responses: Record<string, number>, 
  questionMapping: Record<string, { theme: string; weight: number }>
): ThemeScore[] => {
  const themeScores: Record<string, { total: number; count: number; weights: number }> = {};
  
  // Sum up values by theme
  Object.entries(responses).forEach(([questionId, value]) => {
    if (questionMapping[questionId]) {
      const { theme, weight } = questionMapping[questionId];
      
      if (!themeScores[theme]) {
        themeScores[theme] = { total: 0, count: 0, weights: 0 };
      }
      
      themeScores[theme].total += (value * weight);
      themeScores[theme].count += 1;
      themeScores[theme].weights += weight;
    }
  });
  
  // Convert to array and calculate score
  return Object.entries(themeScores).map(([theme, data]) => {
    const weightedAverage = data.total / data.weights;
    // Normalize to 0-100 scale (assuming values are 1-5)
    const score = ((weightedAverage - 1) / 4) * 100;
    
    return {
      theme,
      score,
      count: data.count
    };
  });
};

// Calculate category scores
export const calculateCategoryScores = (themeScores: ThemeScore[]): CategoryScore[] => {
  const categoryData: Record<string, { total: number; count: number }> = {};
  
  // Group theme scores by category
  themeScores.forEach(themeScore => {
    const category = THEME_TO_CATEGORY[themeScore.theme as keyof typeof THEME_TO_CATEGORY] || 'unknown';
    
    if (!categoryData[category]) {
      categoryData[category] = { total: 0, count: 0 };
    }
    
    categoryData[category].total += themeScore.score;
    categoryData[category].count += 1;
  });
  
  // Convert to array and calculate avg score
  return Object.entries(categoryData).map(([category, data]) => {
    const avgScore = data.total / data.count;
    
    // Apply category weight (if defined)
    const weight = CATEGORY_WEIGHTS[category as keyof typeof CATEGORY_WEIGHTS] || 1;
    
    return {
      category: category as any,
      score: avgScore,
      weight
    };
  });
};

// Calculate overall score
export const calculateOverallScore = (categoryScores: CategoryScore[]): number => {
  let totalWeightedScore = 0;
  let totalWeight = 0;
  
  categoryScores.forEach(category => {
    totalWeightedScore += (category.score * category.weight);
    totalWeight += category.weight;
  });
  
  // Return weighted average, rounded to nearest integer
  return Math.round(totalWeightedScore / totalWeight);
};

// Define tier thresholds
export const TIER_THRESHOLDS = {
  thriving: 85,
  stable: 70,
  at_risk: 50,
  critical: 0
};

// Determine tier based on score
export const getTier = (score: number): PulseScoreTier => {
  if (score >= TIER_THRESHOLDS.thriving) return 'thriving';
  if (score >= TIER_THRESHOLDS.stable) return 'stable';
  if (score >= TIER_THRESHOLDS.at_risk) return 'at_risk';
  return 'critical';
};

// Get human-friendly tier display
export const getTierDisplay = (tier: PulseScoreTier): string => {
  switch (tier) {
    case 'thriving': return 'Thriving';
    case 'stable': return 'Stable';
    case 'at_risk': return 'At Risk';
    case 'critical': return 'Critical';
    default: return 'Unknown';
  }
};

// Process survey response
export const processSurveyResponse = (response: SurveyResponse) => {
  const themeScores = calculateThemeScores(
    response.responses, 
    response.questionMapping
  );
  
  const categoryScores = calculateCategoryScores(themeScores);
  const overallScore = calculateOverallScore(categoryScores);
  
  return {
    overallScore,
    categoryScores,
    themeScores
  };
};
