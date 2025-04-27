
import { SurveyResponse, ThemeScore, CategoryScore, PulseScoreTier, TierDisplay, ScoringTheme } from '@/types/scoring.types';

export const calculateThemeScores = (response: SurveyResponse): ThemeScore[] => {
  const themeScores: Record<string, { total: number; count: number }> = {};

  Object.entries(response.responses).forEach(([questionId, value]) => {
    const question = response.questionMapping[questionId];
    if (!question) return;

    const { theme, weight } = question;
    
    if (!themeScores[theme]) {
      themeScores[theme] = { total: 0, count: 0 };
    }
    
    themeScores[theme].total += value * weight;
    themeScores[theme].count += 1;
  });

  return Object.entries(themeScores).map(([theme, { total, count }]) => ({
    theme: theme as ScoringTheme,
    score: Math.round(total / count),
    count
  }));
};

export const calculateCategoryScores = (themeScores: ThemeScore[]): CategoryScore[] => {
  // Simplified mapping from themes to categories
  const themeCategoryMap: Record<string, { category: string; weight: number }> = {
    psychological_safety: { category: 'emotion_index', weight: 0.6 },
    trust_in_leadership: { category: 'emotion_index', weight: 0.4 },
    team_cohesion: { category: 'culture_trust', weight: 0.5 },
    work_life_balance: { category: 'culture_trust', weight: 0.3 },
    career_growth: { category: 'culture_trust', weight: 0.2 },
    inclusion_diversity: { category: 'engagement_stability', weight: 0.3 },
    communication: { category: 'engagement_stability', weight: 0.4 },
    recognition: { category: 'engagement_stability', weight: 0.3 },
    inclusion_belonging: { category: 'culture_trust', weight: 0.5 },
    motivation_fulfillment: { category: 'emotion_index', weight: 0.5 },
    mission_alignment: { category: 'engagement_stability', weight: 0.4 },
    engagement_continuity: { category: 'engagement_stability', weight: 0.6 }
  };

  const categoryData: Record<string, { total: number; weight: number }> = {};

  themeScores.forEach(themeScore => {
    const mapping = themeCategoryMap[themeScore.theme];
    if (!mapping) return;

    const { category, weight } = mapping;
    
    if (!categoryData[category]) {
      categoryData[category] = { total: 0, weight: 0 };
    }
    
    categoryData[category].total += themeScore.score * weight;
    categoryData[category].weight += weight;
  });

  return Object.entries(categoryData).map(([category, { total, weight }]) => ({
    category,
    score: Math.round(total / weight),
    weight: weight
  }));
};

export const getTier = (overallScore: number): PulseScoreTier => {
  if (overallScore >= 85) return 'pulse_certified';
  if (overallScore >= 80) return 'emerging_culture';
  if (overallScore >= 70) return 'at_risk';
  return 'intervention_advised';
};

export const getTierDisplay = (tier: PulseScoreTier): TierDisplay => {
  switch (tier) {
    case 'pulse_certified':
      return { label: 'Pulse Certified™', color: 'text-green-600 bg-green-50' };
    case 'thriving':
      return { label: 'Thriving', color: 'text-green-600 bg-green-50' };
    case 'emerging_culture':
      return { label: 'Emerging Culture', color: 'text-blue-600 bg-blue-50' };
    case 'at_risk':
      return { label: 'At Risk', color: 'text-yellow-600 bg-yellow-50' };
    case 'intervention_advised':
      return { label: 'Intervention Advised', color: 'text-red-600 bg-red-50' };
    case 'bronze':
      return { label: 'Bronze', color: 'text-amber-700 bg-amber-50' };
    case 'silver':
      return { label: 'Silver', color: 'text-gray-600 bg-gray-100' };
    case 'gold':
      return { label: 'Gold', color: 'text-yellow-600 bg-yellow-50' };
    case 'not_eligible':
      return { label: 'Not Eligible', color: 'text-gray-500 bg-gray-100' };
    default:
      return { label: 'Undefined', color: 'text-gray-500 bg-gray-100' };
  }
};

export const getSampleSurveyQuestions = () => {
  return [
    {
      id: "q1",
      text: "I feel safe sharing my opinions at work without fear of negative consequences.",
      type: "likert" as const,
      theme: "psychological_safety" as ScoringTheme,
      weight: 1.2
    },
    {
      id: "q2",
      text: "I trust the leadership of my company to make good decisions.",
      type: "likert" as const,
      theme: "trust_in_leadership" as ScoringTheme,
      weight: 1.0
    },
    {
      id: "q3",
      text: "I feel a strong sense of belonging with my team.",
      type: "likert" as const,
      theme: "team_cohesion" as ScoringTheme,
      weight: 0.9
    },
    {
      id: "q4",
      text: "My workload allows me to maintain a healthy work-life balance.",
      type: "likert" as const,
      theme: "work_life_balance" as ScoringTheme,
      weight: 0.8
    }
  ];
};
