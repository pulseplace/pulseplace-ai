
import { 
  SurveyQuestion, 
  SurveyResponseItem,
  ThemeScore, 
  CategoryScore,
  PulseScoreTier,
  SurveyResponse
} from '@/types/scoring.types';
import { TIER_THRESHOLDS, TIER_DISPLAY, THEME_CATEGORY_WEIGHTS, CATEGORY_WEIGHTS } from './config';

// Calculate scores for each theme based on survey responses
export const calculateThemeScores = (
  questions: SurveyQuestion[],
  responses: SurveyResponseItem[]
): ThemeScore[] => {
  const themeMap: Record<string, { total: number; count: number; weight: number }> = {};
  
  // Group responses by theme
  responses.forEach(response => {
    const question = questions.find(q => q.id === response.questionId);
    if (!question) return;
    
    if (typeof response.value === 'string') return; // Skip text responses for now
    
    const { theme, weight } = question;
    
    if (!themeMap[theme]) {
      themeMap[theme] = { total: 0, count: 0, weight: 0 };
    }
    
    themeMap[theme].total += response.value * weight;
    themeMap[theme].count += 1;
    themeMap[theme].weight += weight;
  });
  
  // Convert to array of theme scores
  return Object.entries(themeMap).map(([theme, data]) => ({
    theme,
    score: data.count > 0 ? (data.total / data.weight) * 20 : 0, // Scale to 0-100
    count: data.count,
    weight: data.weight
  }));
};

// Calculate category scores based on theme scores
export const calculateCategoryScores = (
  themeScores: ThemeScore[]
): CategoryScore[] => {
  const categoryMap: Record<string, { total: number; weight: number }> = {};
  
  // Group theme scores by category
  themeScores.forEach(themeScore => {
    const themeConfig = THEME_CATEGORY_WEIGHTS[themeScore.theme as keyof typeof THEME_CATEGORY_WEIGHTS];
    if (!themeConfig) return;
    
    const { category, weight } = themeConfig;
    
    if (!categoryMap[category]) {
      categoryMap[category] = { total: 0, weight: 0 };
    }
    
    categoryMap[category].total += themeScore.score * weight;
    categoryMap[category].weight += weight;
  });
  
  // Convert to array of category scores and normalize
  return Object.entries(categoryMap).map(([category, data]) => ({
    category: category as any,
    score: data.weight > 0 ? data.total / data.weight : 0,
    weight: CATEGORY_WEIGHTS[category as keyof typeof CATEGORY_WEIGHTS] || 1
  }));
};

// Calculate overall score based on category scores
export const calculateOverallScore = (
  categoryScores: CategoryScore[]
): number => {
  let totalWeightedScore = 0;
  let totalWeight = 0;
  
  categoryScores.forEach(category => {
    totalWeightedScore += category.score * category.weight;
    totalWeight += category.weight;
  });
  
  return totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 0;
};

// Get tier based on score
export const getTier = (score: number): PulseScoreTier => {
  if (score >= TIER_THRESHOLDS.thriving) {
    return 'thriving';
  } else if (score >= TIER_THRESHOLDS.stable) {
    return 'stable';
  } else if (score >= TIER_THRESHOLDS.at_risk) {
    return 'at_risk';
  } else {
    return 'critical';
  }
};

// Get display information for a tier
export const getTierDisplay = (tier: PulseScoreTier) => {
  return TIER_DISPLAY[tier];
};

// Process a survey response and calculate all scores
export const processSurveyResponse = (response: SurveyResponse) => {
  // Convert the responses object to an array of response items
  const responseItems: SurveyResponseItem[] = Object.entries(response.responses).map(
    ([questionId, value]) => ({ questionId, value })
  );
  
  // Create an array of questions from the mapping
  const questions: SurveyQuestion[] = Object.entries(response.questionMapping).map(
    ([id, data]) => ({
      id,
      text: `Question ${id}`, // Placeholder
      type: 'likert', // Placeholder
      theme: data.theme as any,
      weight: data.weight
    })
  );
  
  const themeScores = calculateThemeScores(questions, responseItems);
  const categoryScores = calculateCategoryScores(themeScores);
  const overallScore = calculateOverallScore(categoryScores);
  
  return { themeScores, categoryScores, overallScore };
};

// Sample questions for prototyping
export const getSampleSurveyQuestions = (): SurveyQuestion[] => {
  return [
    {
      id: '1',
      text: 'I trust the leadership of my organization',
      type: 'likert',
      theme: 'trust_in_leadership',
      weight: 1.0
    },
    {
      id: '2',
      text: 'I feel safe to express my opinions without fear of negative consequences',
      type: 'likert',
      theme: 'psychological_safety',
      weight: 1.2
    },
    {
      id: '3',
      text: 'I feel like I belong at this organization',
      type: 'likert',
      theme: 'inclusion_belonging',
      weight: 1.0
    },
    {
      id: '4',
      text: 'My work gives me a sense of purpose',
      type: 'likert',
      theme: 'motivation_fulfillment',
      weight: 0.8
    },
    {
      id: '5',
      text: 'I understand how my work contributes to the organization\'s mission',
      type: 'likert',
      theme: 'mission_alignment',
      weight: 1.0
    }
  ] as SurveyQuestion[];
};
