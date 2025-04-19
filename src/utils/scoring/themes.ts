
import { ThemeScore, SurveyQuestion, SurveyResponse } from '@/types/scoring.types';
import { normalizeResponseValue } from './utils';

export const calculateThemeScores = (
  questions: SurveyQuestion[],
  responses: SurveyResponse[]
): ThemeScore[] => {
  const questionsMap = questions.reduce((map, question) => {
    map[question.id] = question;
    return map;
  }, {} as Record<string, SurveyQuestion>);

  const themeScores: Record<string, { sum: number; count: number }> = {};

  responses.forEach(response => {
    const question = questionsMap[response.questionId];
    if (!question) return;

    const normalizedValue = normalizeResponseValue(response, question);
    const theme = question.theme;

    if (!themeScores[theme]) {
      themeScores[theme] = { sum: 0, count: 0 };
    }

    themeScores[theme].sum += normalizedValue * question.weight;
    themeScores[theme].count += question.weight;
  });

  return Object.entries(themeScores).map(([theme, { sum, count }]) => ({
    theme: theme as any,
    score: count > 0 ? sum / count : 0,
    count
  }));
};
