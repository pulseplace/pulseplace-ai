
import { SurveyResponse, ScoringTheme } from '@/types/scoring.types';

// Process scoring themes and categories from survey responses
export const extractThemeScoresFromResponse = (response: SurveyResponse) => {
  const themeScores: Record<ScoringTheme, { total: number, count: number }> = {
    trust_in_leadership: { total: 0, count: 0 },
    psychological_safety: { total: 0, count: 0 },
    inclusion_belonging: { total: 0, count: 0 },
    motivation_fulfillment: { total: 0, count: 0 },
    mission_alignment: { total: 0, count: 0 },
    engagement_continuity: { total: 0, count: 0 }
  };
  
  // Process each response and accumulate theme scores
  Object.entries(response.responses).forEach(([questionId, score]) => {
    const questionInfo = response.questionMapping[questionId];
    if (questionInfo && typeof score === 'number') {
      const { theme, weight = 1 } = questionInfo;
      if (theme in themeScores) {
        themeScores[theme as ScoringTheme].total += score * weight;
        themeScores[theme as ScoringTheme].count += 1;
      }
    }
  });
  
  // Calculate average scores for each theme
  return Object.entries(themeScores).map(([theme, data]) => ({
    theme: theme as ScoringTheme,
    score: data.count > 0 ? Math.round((data.total / data.count) * 20) : 0, // Scale to 0-100
    count: data.count
  }));
};

// Identify primary strength/concern themes based on scores
export const identifyPrimaryThemes = (themeScores: { theme: ScoringTheme; score: number; count: number }[]) => {
  if (!themeScores || themeScores.length === 0) {
    return { strength: null, concern: null };
  }
  
  const sortedByScore = [...themeScores].sort((a, b) => b.score - a.score);
  
  return {
    strength: sortedByScore[0],
    concern: sortedByScore[sortedByScore.length - 1]
  };
};

// Generate a feedback prompt based on theme scores
export const generateThemeFeedbackPrompt = (
  themeScores: { theme: ScoringTheme; score: number; count: number }[]
) => {
  const { strength, concern } = identifyPrimaryThemes(themeScores);
  
  let promptText = `Based on the survey data, please provide feedback on the following workplace culture themes:\n\n`;
  
  themeScores.forEach(theme => {
    promptText += `- ${formatThemeName(theme.theme)}: ${theme.score}/100\n`;
  });
  
  promptText += `\nThe strongest area appears to be ${strength ? formatThemeName(strength.theme) : 'Unknown'} with a score of ${strength ? strength.score : 'N/A'}/100.\n`;
  promptText += `The area of concern appears to be ${concern ? formatThemeName(concern.theme) : 'Unknown'} with a score of ${concern ? concern.score : 'N/A'}/100.\n\n`;
  
  promptText += `Based on these scores, what specific recommendations would you provide to improve workplace culture, particularly focusing on the area of concern?`;
  
  return promptText;
};

// Format theme names for display
export const formatThemeName = (theme: ScoringTheme): string => {
  return theme
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
