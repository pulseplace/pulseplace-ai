
import { SurveyResponse, SurveyQuestion } from '@/types/scoring.types';

export const normalizeResponseValue = (
  response: SurveyResponse,
  question: SurveyQuestion
): number => {
  if (typeof response.value === 'number') {
    switch (question.type) {
      case 'likert':
        return (response.value - 1) * 25;
      case 'emoji':
        return (response.value - 1) * 25;
      default:
        return response.value;
    }
  }
  return 0;
};

export const formatThemeName = (theme: string): string => {
  return theme
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
