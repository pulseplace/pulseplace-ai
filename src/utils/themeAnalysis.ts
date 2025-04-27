
import { ThemeScore, ScoringTheme } from '@/types/scoring.types';

// Calculate sentiment scores based on theme scores
export const calculateThemeSentiment = (themeScores: ThemeScore[]) => {
  // Mock implementation for theme sentiment analysis
  return themeScores.map(theme => ({
    theme: theme.theme,
    score: theme.score,
    sentiment: theme.score >= 80 ? 'positive' : theme.score >= 60 ? 'neutral' : 'negative',
    keywords: getMockKeywords(theme.theme),
    trend: getMockTrend()
  }));
};

// Generate mock keywords for each theme
const getMockKeywords = (theme: ScoringTheme) => {
  const keywordMap: Record<ScoringTheme, string[]> = {
    trust_in_leadership: ['transparency', 'communication', 'consistency'],
    psychological_safety: ['openness', 'feedback', 'mistakes', 'learning'],
    inclusion_belonging: ['diversity', 'respect', 'equity', 'community'],
    motivation_fulfillment: ['purpose', 'growth', 'autonomy', 'mastery'],
    mission_alignment: ['values', 'vision', 'impact', 'clarity'],
    engagement_continuity: ['commitment', 'loyalty', 'retention', 'satisfaction']
  };
  
  return keywordMap[theme] || ['general', 'workplace', 'culture'];
};

// Generate a mock trend direction
const getMockTrend = () => {
  const trends = ['up', 'stable', 'down'];
  return trends[Math.floor(Math.random() * trends.length)];
};
