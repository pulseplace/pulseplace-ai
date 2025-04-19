
import { SurveyQuestion } from '@/types/scoring.types';

export const calculatePulseScore = (
  responses: Record<string, string | number>,
  questions: SurveyQuestion[]
): number => {
  const likertQuestions = questions.filter(q => q.type === 'likert');
  if (likertQuestions.length === 0) return 0;

  let totalScore = 0;
  let totalWeight = 0;

  likertQuestions.forEach(question => {
    const response = responses[question.id];
    if (typeof response === 'number') {
      totalScore += (response * 20) * question.weight; // Convert 1-5 scale to 0-100
      totalWeight += question.weight;
    }
  });

  return Math.round(totalWeight > 0 ? totalScore / totalWeight : 0);
};
