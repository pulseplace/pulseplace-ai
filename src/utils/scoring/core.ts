
import { 
  SurveyResponse, 
  SurveyQuestion, 
  ThemeScore, 
  CategoryScore, 
  PulseScoreData,
  PulseScoreTier
} from '@/types/scoring.types';
import { themeToCategory, categoryWeights, scoreTierThresholds } from './config';

// Calculate tier based on overall score
export const calculateTier = (score: number): PulseScoreTier => {
  if (score >= scoreTierThresholds.pulse_certified) {
    return 'pulse_certified';
  } else if (score >= scoreTierThresholds.emerging_culture) {
    return 'emerging_culture';
  } else if (score >= scoreTierThresholds.at_risk) {
    return 'at_risk';
  } else {
    return 'intervention_advised';
  }
};

// Calculate theme scores from responses
export const calculateThemeScores = (responses: SurveyResponse[], questions: SurveyQuestion[]): ThemeScore[] => {
  // Group responses by theme using a map of theme -> { sum, count }
  const themeScoresMap: Record<string, { sum: number; count: number }> = {};
  
  responses.forEach(response => {
    // Find the corresponding question
    const question = questions.find(q => q.id === response.questionId);
    if (!question || typeof response.normalizedScore !== 'number') {
      return;
    }
    
    const { theme, weight } = question;
    
    if (!themeScoresMap[theme]) {
      themeScoresMap[theme] = { sum: 0, count: 0 };
    }
    
    themeScoresMap[theme].sum += response.normalizedScore * weight;
    themeScoresMap[theme].count += weight;
  });
  
  // Convert the map to an array of ThemeScore objects
  return Object.entries(themeScoresMap).map(([theme, { sum, count }]) => ({
    theme: theme as any, // Cast to appropriate theme type
    score: count > 0 ? Math.round(sum / count) : 0,
    count
  }));
};

// Calculate category scores from theme scores
export const calculateCategoryScores = (themesScores: ThemeScore[]): CategoryScore[] => {
  // Group theme scores by category
  const categoryScoresMap: Record<string, { sum: number; count: number }> = {};
  
  themesScores.forEach(themeScore => {
    const category = themeToCategory[themeScore.theme];
    
    if (!categoryScoresMap[category]) {
      categoryScoresMap[category] = { sum: 0, count: 0 };
    }
    
    categoryScoresMap[category].sum += themeScore.score;
    categoryScoresMap[category].count += 1;
  });
  
  // Convert to CategoryScore array with weights
  return Object.entries(categoryScoresMap).map(([category, { sum, count }]) => ({
    category: category as any, // Cast to appropriate category type
    score: count > 0 ? Math.round(sum / count) : 0,
    weight: categoryWeights[category as any]
  }));
};

// Calculate overall score from category scores
export const calculateOverallScore = (categoryScores: CategoryScore[]): number => {
  const weightedSum = categoryScores.reduce((sum, { category, score }) => {
    return sum + (score * categoryWeights[category]);
  }, 0);
  
  const totalWeight = categoryScores.reduce((sum, { weight }) => sum + weight, 0);
  
  return Math.round(totalWeight > 0 ? weightedSum / totalWeight : 0);
};

// Generate the complete PulseScore data object
export const generatePulseScore = (responses: SurveyResponse[], questions: SurveyQuestion[]): PulseScoreData => {
  // Calculate theme scores
  const themesScores = calculateThemeScores(responses, questions);
  
  // Calculate category scores
  const categoryScores = calculateCategoryScores(themesScores);
  
  // Calculate overall score
  const overallScore = calculateOverallScore(categoryScores);
  
  // Determine tier
  const tier = calculateTier(overallScore);
  
  return {
    overallScore,
    themesScores,
    categoryScores,
    responseCount: responses.length,
    tier
  };
};
