
import { SurveyResponse, ThemeScore } from '@/types/scoring.types';

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
    theme: theme as any,
    score: Math.round(total / count),
    count
  }));
};

export const analyzeThemeSentiment = (themeScores: ThemeScore[]) => {
  // Mock sentiment analysis of themes
  return themeScores.map(score => ({
    theme: score.theme,
    score: score.score,
    sentiment: score.score >= 80 ? 'positive' : score.score >= 60 ? 'neutral' : 'negative',
    keyWords: getKeywordsForTheme(score.theme)
  }));
};

const getKeywordsForTheme = (theme: string) => {
  const keywordMap: Record<string, string[]> = {
    psychological_safety: ['openness', 'vulnerability', 'acceptance', 'trust'],
    trust_in_leadership: ['transparency', 'authenticity', 'vision', 'strategy'],
    team_cohesion: ['collaboration', 'unity', 'support', 'teamwork'],
    work_life_balance: ['flexibility', 'boundaries', 'wellness', 'burnout prevention'],
    career_growth: ['development', 'opportunities', 'learning', 'advancement'],
    inclusion_diversity: ['equity', 'belonging', 'representation', 'perspectives'],
    communication: ['clarity', 'frequency', 'transparency', 'listening'],
    recognition: ['appreciation', 'acknowledgment', 'feedback', 'celebration'],
    inclusion_belonging: ['acceptance', 'community', 'connection', 'diversity'],
    motivation_fulfillment: ['purpose', 'engagement', 'satisfaction', 'meaningfulness'],
    mission_alignment: ['values', 'purpose', 'commitment', 'belief'],
    engagement_continuity: ['retention', 'loyalty', 'connection', 'participation'],
  };
  
  return keywordMap[theme] || ['sentiment', 'feedback', 'culture', 'engagement'];
};
