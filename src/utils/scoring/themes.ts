
import { ThemeScore, SurveyQuestion, SurveyResponse, ScoringTheme } from '@/types/scoring.types';
import { normalizeResponseValue } from './utils';

export const calculateThemeScores = (
  questions: SurveyQuestion[],
  responses: SurveyResponse[]
): ThemeScore[] => {
  const questionsMap = questions.reduce((map, question) => {
    map[question.id] = question;
    return map;
  }, {} as Record<string, SurveyQuestion>);

  const themeScores: Record<ScoringTheme, { sum: number; count: number }> = {
    trust_in_leadership: { sum: 0, count: 0 },
    psychological_safety: { sum: 0, count: 0 },
    inclusion_belonging: { sum: 0, count: 0 },
    motivation_fulfillment: { sum: 0, count: 0 },
    mission_alignment: { sum: 0, count: 0 },
    engagement_continuity: { sum: 0, count: 0 },
    team_cohesion: { sum: 0, count: 0 },
    work_life_balance: { sum: 0, count: 0 },
    career_growth: { sum: 0, count: 0 },
    inclusion_diversity: { sum: 0, count: 0 },
    leadership_effectiveness: { sum: 0, count: 0 },
    innovation_adaptability: { sum: 0, count: 0 }
  };

  responses.forEach(response => {
    const question = questionsMap[response.questionId];
    if (!question) return;

    const normalizedValue = normalizeResponseValue(response, question);
    const theme = question.theme;

    themeScores[theme].sum += normalizedValue * question.weight;
    themeScores[theme].count += question.weight;
  });

  return Object.entries(themeScores).map(([theme, { sum, count }]) => ({
    theme: theme as ScoringTheme,
    score: count > 0 ? sum / count : 0,
    count
  }));
};
