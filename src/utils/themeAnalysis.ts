
import { ScoringTheme } from '@/types/scoring.types';

export const calculateThemeSentiment = (feedbackData: Array<{ theme: ScoringTheme, text: string, sentiment: number }>) => {
  // Create starting template with all required ScoringTheme keys
  const themeResults: Record<ScoringTheme, { count: number; sentiment: number }> = {
    trust_in_leadership: { count: 0, sentiment: 0 },
    psychological_safety: { count: 0, sentiment: 0 },
    inclusion_belonging: { count: 0, sentiment: 0 },
    motivation_fulfillment: { count: 0, sentiment: 0 },
    mission_alignment: { count: 0, sentiment: 0 },
    engagement_continuity: { count: 0, sentiment: 0 },
    team_cohesion: { count: 0, sentiment: 0 },
    work_life_balance: { count: 0, sentiment: 0 },
    career_growth: { count: 0, sentiment: 0 },
    inclusion_diversity: { count: 0, sentiment: 0 },
    leadership_effectiveness: { count: 0, sentiment: 0 },
    innovation_adaptability: { count: 0, sentiment: 0 }
  };

  // Process all feedback entries
  feedbackData.forEach(entry => {
    if (!themeResults[entry.theme]) {
      console.warn(`Unknown theme encountered: ${entry.theme}`);
      return;
    }
    
    themeResults[entry.theme].count++;
    themeResults[entry.theme].sentiment += entry.sentiment;
  });

  // Calculate average sentiment for each theme
  Object.keys(themeResults).forEach(theme => {
    const typedTheme = theme as ScoringTheme;
    if (themeResults[typedTheme].count > 0) {
      themeResults[typedTheme].sentiment = themeResults[typedTheme].sentiment / themeResults[typedTheme].count;
    }
  });

  return themeResults;
};

export const getTopThemes = (themeData: Record<ScoringTheme, { count: number; sentiment: number }>, limit: number = 3) => {
  return Object.entries(themeData)
    .map(([theme, data]) => ({
      theme: theme as ScoringTheme,
      count: data.count,
      sentiment: data.sentiment
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const getLowSentimentThemes = (themeData: Record<ScoringTheme, { count: number; sentiment: number }>, threshold: number = 0) => {
  return Object.entries(themeData)
    .map(([theme, data]) => ({
      theme: theme as ScoringTheme,
      count: data.count,
      sentiment: data.sentiment
    }))
    .filter(item => item.count > 0 && item.sentiment < threshold)
    .sort((a, b) => a.sentiment - b.sentiment);
};
