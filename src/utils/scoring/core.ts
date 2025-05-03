
import { SurveyQuestion, SurveyResponse, PulseScoreData, ThemeScore, CategoryScore, PulseScoreTier } from '@/types/scoring.types';
import { calculateThemeScores } from './themes';
import { THEME_TO_CATEGORY, CATEGORY_WEIGHTS, TIER_THRESHOLDS } from './config';
import { getTierFromScore } from './utils';

export const calculatePulseScore = (
  questions: SurveyQuestion[],
  responses: SurveyResponse[]
): PulseScoreData => {
  // Calculate theme scores
  const themeScores = calculateThemeScores(questions, responses);
  
  // Group theme scores by category
  const categoryScoresMap = new Map<string, { sum: number; count: number; weight: number }>();
  
  themeScores.forEach(themeScore => {
    const category = THEME_TO_CATEGORY[themeScore.theme];
    const categoryWeight = CATEGORY_WEIGHTS[category];
    
    if (!categoryScoresMap.has(category)) {
      categoryScoresMap.set(category, { sum: 0, count: 0, weight: categoryWeight });
    }
    
    const categoryData = categoryScoresMap.get(category)!;
    categoryData.sum += themeScore.score * themeScore.count;
    categoryData.count += themeScore.count;
  });
  
  // Calculate category scores
  const categoryScores: CategoryScore[] = Array.from(categoryScoresMap.entries()).map(
    ([category, data]) => ({
      category: category as any,
      score: data.count > 0 ? data.sum / data.count : 0,
      weight: data.weight
    })
  );
  
  // Calculate overall score
  let weightedSum = 0;
  let totalWeight = 0;
  
  categoryScores.forEach(categoryScore => {
    weightedSum += categoryScore.score * categoryScore.weight;
    totalWeight += categoryScore.weight;
  });
  
  const overallScore = totalWeight > 0 ? weightedSum / totalWeight : 0;
  
  // Determine tier based on overall score
  const tier = getTierFromScore(overallScore);
  
  // Generate insights and actions based on the scores
  const insights = generateInsights(themeScores, categoryScores);
  const recommendedActions = generateActions(themeScores, categoryScores, tier);
  
  return {
    overallScore,
    categoryScores,
    themeScores,
    tier,
    insights,
    recommendedActions
  };
};

const generateInsights = (themeScores: ThemeScore[], categoryScores: CategoryScore[]): string[] => {
  const insights = [];
  
  // Get the highest and lowest scoring themes
  const sortedThemes = [...themeScores].sort((a, b) => b.score - a.score);
  const highestTheme = sortedThemes[0];
  const lowestTheme = sortedThemes[sortedThemes.length - 1];
  
  if (highestTheme && highestTheme.score > 75) {
    insights.push(`Strong ${formatThemeName(highestTheme.theme)} indicates a positive foundation.`);
  }
  
  if (lowestTheme && lowestTheme.score < 60) {
    insights.push(`${formatThemeName(lowestTheme.theme)} may require attention.`);
  }
  
  // Add category-based insights
  categoryScores.forEach(category => {
    if (category.score < 60) {
      insights.push(`Low ${formatCategoryName(category.category)} score indicates potential cultural issues.`);
    }
  });
  
  // Add more generic insights if we don't have enough
  if (insights.length < 2) {
    insights.push("Regular pulse surveys help track cultural health over time.");
  }
  
  return insights;
};

const generateActions = (
  themeScores: ThemeScore[],
  categoryScores: CategoryScore[],
  tier: PulseScoreTier
): string[] => {
  const actions = [];
  
  // Get the lowest scoring themes that have enough responses
  const actionableThemes = themeScores
    .filter(theme => theme.count >= 3)
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);
  
  actionableThemes.forEach(theme => {
    actions.push(`Develop initiatives to improve ${formatThemeName(theme.theme)}.`);
  });
  
  // Add tier-specific actions
  switch (tier) {
    case 'pulse_certified':
      actions.push("Share certification achievements with your team and stakeholders.");
      break;
    case 'emerging_culture':
      actions.push("Focus on building more consistency across all cultural dimensions.");
      break;
    case 'at_risk':
      actions.push("Schedule regular manager check-ins to address culture concerns.");
      break;
    case 'intervention_advised':
      actions.push("Consider bringing in culture experts to develop an improvement plan.");
      break;
  }
  
  // Add more generic actions if we don't have enough
  if (actions.length < 2) {
    actions.push("Schedule a team workshop to discuss feedback and brainstorm improvements.");
  }
  
  return actions;
};

const formatThemeName = (theme: string): string => {
  return theme
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatCategoryName = (category: string): string => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
