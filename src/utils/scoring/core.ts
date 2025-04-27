
import { SurveyResponse, ThemeScore, CategoryScore, PulseScoreTier, ScoringTheme } from '@/types/scoring.types';

export const calculateThemeScores = (response: SurveyResponse): ThemeScore[] => {
  const themeScores: Record<ScoringTheme, { score: number; count: number }> = {
    trust_in_leadership: { score: 0, count: 0 },
    psychological_safety: { score: 0, count: 0 },
    inclusion_belonging: { score: 0, count: 0 },
    motivation_fulfillment: { score: 0, count: 0 },
    mission_alignment: { score: 0, count: 0 },
    engagement_continuity: { score: 0, count: 0 }
  };

  Object.entries(response.responses).forEach(([questionId, value]) => {
    const mapping = response.questionMapping[questionId];
    if (mapping && typeof value === 'number') {
      const theme = mapping.theme as ScoringTheme;
      themeScores[theme].score += value * mapping.weight;
      themeScores[theme].count++;
    }
  });

  return Object.entries(themeScores).map(([theme, data]) => ({
    theme: theme as ScoringTheme,
    score: data.count > 0 ? Math.round(data.score / data.count) : 0,
    count: data.count
  }));
};

export const calculateCategoryScores = (themeScores: ThemeScore[]): CategoryScore[] => {
  const categoryMapping = {
    emotion_index: ['psychological_safety', 'inclusion_belonging'],
    engagement_stability: ['motivation_fulfillment', 'engagement_continuity'],
    culture_trust: ['trust_in_leadership', 'mission_alignment']
  };

  const categoryWeights = {
    emotion_index: 0.4,
    engagement_stability: 0.3,
    culture_trust: 0.3
  };

  return Object.entries(categoryMapping).map(([category, themes]) => {
    const relevantScores = themeScores.filter(score => 
      themes.includes(score.theme)
    );
    
    const totalScore = relevantScores.reduce((sum, score) => sum + score.score, 0);
    const avgScore = relevantScores.length > 0 ? Math.round(totalScore / relevantScores.length) : 0;

    return {
      category: category as 'emotion_index' | 'engagement_stability' | 'culture_trust',
      score: avgScore,
      weight: categoryWeights[category as keyof typeof categoryWeights]
    };
  });
};

export const getTier = (score: number): PulseScoreTier => {
  if (score >= 85) return 'pulse_certified';
  if (score >= 70) return 'emerging_culture';
  if (score >= 55) return 'at_risk';
  return 'critical';
};

export const getTierDisplay = (tier: PulseScoreTier) => {
  const displayConfig = {
    pulse_certified: { label: 'Pulse Certified™', color: 'text-green-600' },
    emerging_culture: { label: 'Growth Culture™', color: 'text-blue-600' },
    at_risk: { label: 'At Risk', color: 'text-amber-600' },
    critical: { label: 'Critical', color: 'text-red-600' }
  };
  return displayConfig[tier];
};

export const getSampleSurveyQuestions = () => [
  {
    id: 'trust_leadership',
    text: 'I trust the leadership team at my organization.',
    type: 'likert',
    theme: 'trust_in_leadership' as ScoringTheme,
    weight: 1.2
  },
  {
    id: 'psych_safety',
    text: 'I feel safe sharing my opinions without fear of negative consequences.',
    type: 'likert',
    theme: 'psychological_safety' as ScoringTheme,
    weight: 1.0
  },
  {
    id: 'inclusion',
    text: 'I feel a sense of belonging at my workplace.',
    type: 'likert',
    theme: 'inclusion_belonging' as ScoringTheme,
    weight: 1.0
  },
  {
    id: 'engagement',
    text: 'I find my work meaningful and engaging.',
    type: 'likert',
    theme: 'motivation_fulfillment' as ScoringTheme,
    weight: 1.1
  },
  {
    id: 'mission',
    text: "I understand and believe in our company's mission.",
    type: 'likert',
    theme: 'mission_alignment' as ScoringTheme,
    weight: 0.9
  },
  {
    id: 'retention',
    text: 'I see myself working here a year from now.',
    type: 'likert',
    theme: 'engagement_continuity' as ScoringTheme,
    weight: 1.3
  }
];
