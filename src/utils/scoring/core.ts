
import { SurveyResponse, SurveyQuestion, CategoryScore, ThemeScore, PulseScoreTier } from '@/types/scoring.types';
import { THEME_TO_CATEGORY, CATEGORY_WEIGHTS, TIER_THRESHOLDS } from './config';

// Calculate theme scores from survey responses
export const calculateThemeScores = (
  questions: SurveyQuestion[],
  responses: { questionId: string; value: number | string }[]
): Record<string, { score: number; count: number; }> => {
  const themeScores: Record<string, { score: number; count: number }> = {};
  
  // Process each question and its response
  questions.forEach(question => {
    const response = responses.find(r => r.questionId === question.id);
    if (!response) return;
    
    // Skip text responses for score calculation
    if (typeof response.value !== 'number') return;
    
    // Initialize theme if not exists
    if (!themeScores[question.theme]) {
      themeScores[question.theme] = { score: 0, count: 0 };
    }
    
    // Add weighted score
    themeScores[question.theme].score += response.value * question.weight;
    themeScores[question.theme].count += 1;
  });
  
  // Normalize scores to 0-100 scale
  Object.keys(themeScores).forEach(theme => {
    if (themeScores[theme].count > 0) {
      // Calculate average weighted score (1-5) then convert to 0-100 scale
      themeScores[theme].score = 
        (themeScores[theme].score / themeScores[theme].count) * 20;
    }
  });
  
  return themeScores;
};

// Calculate category scores from theme scores
export const calculateCategoryScores = (themeScores: Record<string, { score: number; count: number }>): CategoryScore[] => {
  // Aggregate theme scores into categories
  const categoryTotals: Record<string, { score: number; count: number }> = {};
  
  Object.entries(themeScores).forEach(([theme, data]) => {
    const category = THEME_TO_CATEGORY[theme] || 'culture_trust';
    
    if (!categoryTotals[category]) {
      categoryTotals[category] = { score: 0, count: 0 };
    }
    
    categoryTotals[category].score += data.score;
    categoryTotals[category].count += 1;
  });
  
  // Create category scores array with weights
  const categoryScores: CategoryScore[] = Object.entries(categoryTotals).map(([category, data]) => {
    return {
      category: category as any,
      score: data.count > 0 ? data.score / data.count : 0,
      weight: CATEGORY_WEIGHTS[category as any] || 0.33
    };
  });
  
  return categoryScores;
};

// Calculate overall score from category scores
export const calculateOverallScore = (categoryScores: CategoryScore[]): number => {
  let totalScore = 0;
  let totalWeight = 0;
  
  categoryScores.forEach(category => {
    totalScore += category.score * category.weight;
    totalWeight += category.weight;
  });
  
  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
};

// Get tier based on overall score
export const getTier = (score: number): PulseScoreTier => {
  if (score >= TIER_THRESHOLDS.thriving) return 'thriving';
  if (score >= TIER_THRESHOLDS.stable) return 'stable';
  if (score >= TIER_THRESHOLDS.at_risk) return 'at_risk';
  return 'critical';
};

// Get display info for a tier
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

// Process a survey response to calculate overall score
export const processSurveyResponse = (response: SurveyResponse) => {
  // Extract theme data from the question mapping
  const themeData: Record<string, { scores: number[]; weights: number[] }> = {};
  
  Object.entries(response.responses).forEach(([questionId, value]) => {
    const questionInfo = response.questionMapping[questionId];
    if (!questionInfo) return;
    
    const theme = questionInfo.theme;
    const weight = questionInfo.weight;
    
    if (!themeData[theme]) {
      themeData[theme] = { scores: [], weights: [] };
    }
    
    themeData[theme].scores.push(value);
    themeData[theme].weights.push(weight);
  });
  
  // Calculate theme scores
  const themeScores: Record<string, { score: number; count: number }> = {};
  
  Object.entries(themeData).forEach(([theme, data]) => {
    const totalWeightedScore = data.scores.reduce(
      (sum, score, i) => sum + score * data.weights[i], 
      0
    );
    
    const totalWeight = data.weights.reduce((sum, w) => sum + w, 0);
    
    themeScores[theme] = {
      score: totalWeight > 0 ? (totalWeightedScore / totalWeight) * 20 : 0,
      count: data.scores.length
    };
  });
  
  // Calculate category scores & overall score
  const categoryScores = calculateCategoryScores(themeScores);
  const overallScore = calculateOverallScore(categoryScores);
  
  return { 
    overallScore, 
    categoryScores
  };
};

// Generates sample survey questions for testing
export const getSampleSurveyQuestions = (): SurveyQuestion[] => [
  {
    id: 'q1',
    text: 'I trust the leadership team to make good decisions.',
    type: 'likert',
    theme: 'trust_in_leadership',
    weight: 1.2
  },
  {
    id: 'q2',
    text: 'I feel psychologically safe to voice my opinions.',
    type: 'likert',
    theme: 'psychological_safety',
    weight: 1.5
  },
  {
    id: 'q3',
    text: 'I feel included and valued at work.',
    type: 'likert',
    theme: 'inclusion_belonging',
    weight: 1.0
  },
  {
    id: 'q4',
    text: 'I find my work meaningful and fulfilling.',
    type: 'likert',
    theme: 'motivation_fulfillment',
    weight: 1.0
  },
  {
    id: 'q5',
    text: 'I understand and believe in the company\'s mission.',
    type: 'likert',
    theme: 'mission_alignment',
    weight: 0.8
  },
  {
    id: 'q6',
    text: 'I plan to be working here a year from now.',
    type: 'likert',
    theme: 'engagement_continuity',
    weight: 1.2
  },
  {
    id: 'q7',
    text: 'What could leadership do to improve trust?',
    type: 'text',
    theme: 'trust_in_leadership',
    weight: 0.5
  }
];
