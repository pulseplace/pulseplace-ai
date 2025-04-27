
import { ScoringTheme, SurveyQuestion, SurveyResponse, ThemeScore, CategoryScore, PulseScoreTier } from '@/types/scoring.types';

// Calculate theme scores from survey responses
export const calculateThemeScores = (response: SurveyResponse): ThemeScore[] => {
  const themeScores: Record<ScoringTheme, { total: number; count: number }> = {
    psychological_safety: { total: 0, count: 0 },
    trust_in_leadership: { total: 0, count: 0 },
    team_cohesion: { total: 0, count: 0 },
    work_life_balance: { total: 0, count: 0 },
    career_growth: { total: 0, count: 0 },
    inclusion_diversity: { total: 0, count: 0 },
    communication: { total: 0, count: 0 },
    recognition: { total: 0, count: 0 }
  };
  
  // Process each response
  Object.entries(response.responses).forEach(([questionId, answer]) => {
    // Get the question metadata
    const questionMeta = response.questionMapping[questionId];
    
    if (questionMeta) {
      const { theme, weight } = questionMeta;
      // Add the weighted score to the appropriate theme
      themeScores[theme].total += answer * weight;
      themeScores[theme].count += 1;
    }
  });
  
  // Convert to array of theme scores
  return Object.entries(themeScores)
    .filter(([_, data]) => data.count > 0) // Only include themes with responses
    .map(([theme, data]) => ({
      theme: theme as ScoringTheme,
      score: Math.round((data.total / data.count) * 20), // Scale to 0-100
      count: data.count
    }));
};

// Calculate category scores from theme scores
export const calculateCategoryScores = (themeScores: ThemeScore[]): CategoryScore[] => {
  // Map themes to categories
  const categoryMap: Record<string, ScoringTheme[]> = {
    'culture_trust': ['psychological_safety', 'trust_in_leadership'],
    'team_dynamics': ['team_cohesion', 'communication'],
    'employee_wellbeing': ['work_life_balance', 'recognition'],
    'growth_inclusion': ['career_growth', 'inclusion_diversity']
  };
  
  // Calculate scores by category
  return Object.entries(categoryMap).map(([category, themes]) => {
    // Filter theme scores to only include those in this category
    const relevantScores = themeScores.filter(score => themes.includes(score.theme));
    
    // Calculate average score for the category
    const totalScore = relevantScores.reduce((sum, score) => sum + score.score * score.count, 0);
    const totalCount = relevantScores.reduce((sum, score) => sum + score.count, 0);
    
    return {
      category,
      score: totalCount > 0 ? Math.round(totalScore / totalCount) : 0,
      weight: category === 'culture_trust' ? 0.4 : category === 'team_dynamics' ? 0.3 : 0.15
    };
  });
};

// Get certification tier based on scores
export const getTier = (overallScore: number): PulseScoreTier => {
  if (overallScore >= 85) return 'gold';
  if (overallScore >= 75) return 'silver';
  if (overallScore >= 65) return 'bronze';
  return 'not_eligible';
};

// Get display text for tier
export const getTierDisplay = (tier: PulseScoreTier): string => {
  switch (tier) {
    case 'gold': return 'Gold';
    case 'silver': return 'Silver';
    case 'bronze': return 'Bronze';
    case 'not_eligible': return 'Not Eligible';
    default: return 'Unknown';
  }
};

// Get sample survey questions
export const getSampleSurveyQuestions = (): SurveyQuestion[] => {
  return [
    {
      id: 'q1',
      text: 'I feel comfortable sharing concerns with my team',
      type: 'likert',
      theme: 'psychological_safety',
      weight: 1.2
    },
    {
      id: 'q2',
      text: 'I trust my company leadership to make good decisions',
      type: 'likert',
      theme: 'trust_in_leadership',
      weight: 1.1
    },
    {
      id: 'q3',
      text: 'My team works well together to solve problems',
      type: 'likert',
      theme: 'team_cohesion',
      weight: 1.0
    },
    {
      id: 'q4',
      text: 'I maintain a healthy balance between work and personal life',
      type: 'likert',
      theme: 'work_life_balance',
      weight: 0.9
    },
    {
      id: 'q5',
      text: 'I have opportunities to learn and grow in my role',
      type: 'likert',
      theme: 'career_growth',
      weight: 1.0
    },
    {
      id: 'q6',
      text: 'My company values diversity of thought and background',
      type: 'likert',
      theme: 'inclusion_diversity',
      weight: 1.1
    }
  ];
};
