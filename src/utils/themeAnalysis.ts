
import { SurveyQuestion, SurveyResponse, ThemeScore } from '@/types/scoring.types';

interface ThemeAnalysisResult {
  themeScores: ThemeScore[];
  sentimentScores: Record<string, number>;
}

export const calculateThemeScores = (
  questions: SurveyQuestion[],
  responses: SurveyResponse[]
): ThemeScore[] => {
  // Group questions by theme
  const themeQuestions: Record<string, SurveyQuestion[]> = {};
  questions.forEach(q => {
    if (!themeQuestions[q.theme]) {
      themeQuestions[q.theme] = [];
    }
    themeQuestions[q.theme].push(q);
  });
  
  // Create a map of question IDs to responses
  const responseMap: Record<string, SurveyResponse> = {};
  responses.forEach(r => {
    responseMap[r.questionId] = r;
  });
  
  // Calculate scores for each theme
  const themeScores: ThemeScore[] = [];
  Object.entries(themeQuestions).forEach(([theme, qs]) => {
    let totalScore = 0;
    let totalWeight = 0;
    
    qs.forEach(q => {
      const response = responseMap[q.id];
      if (response && typeof response.normalizedScore === 'number') {
        totalScore += response.normalizedScore * q.weight;
        totalWeight += q.weight;
      }
    });
    
    const score = totalWeight > 0 ? totalScore / totalWeight : 0;
    themeScores.push({
      theme: theme as any,
      score: score,
      count: qs.length
    });
  });
  
  return themeScores;
};

export const analyzeSentiment = (responses: SurveyResponse[]): Record<string, number> => {
  // In a real implementation, this would use NLP to analyze sentiment
  // For now, we'll return mock data
  return {
    positive: 65,
    negative: 15,
    neutral: 20,
  };
};

export const analyzeThemeData = (
  questions: SurveyQuestion[],
  responses: SurveyResponse[]
): ThemeAnalysisResult => {
  const themeScores = calculateThemeScores(questions, responses);
  const sentimentScores = analyzeSentiment(responses);
  
  return {
    themeScores,
    sentimentScores
  };
};
