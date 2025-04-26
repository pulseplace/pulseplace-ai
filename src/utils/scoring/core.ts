
import { SurveyQuestion, SurveyResponse, ThemeScore, CategoryScore, PulseScoreTier } from '@/types/scoring.types';
import { THEME_TO_CATEGORY, CATEGORY_WEIGHTS, TIER_THRESHOLDS } from './config';

// Generate sample survey questions for the calculator demo
export const getSampleSurveyQuestions = (): SurveyQuestion[] => {
  return [
    {
      id: 'q1',
      text: 'I trust the leadership of the organization to make sound decisions.',
      type: 'likert',
      theme: 'trust_in_leadership',
      weight: 1.3
    },
    {
      id: 'q2',
      text: 'I feel safe expressing my opinions without fear of negative consequences.',
      type: 'likert',
      theme: 'psychological_safety',
      weight: 1.4
    },
    {
      id: 'q3',
      text: 'I feel a sense of belonging on my team and in the organization.',
      type: 'likert',
      theme: 'inclusion_belonging',
      weight: 1.2
    },
    {
      id: 'q4',
      text: 'I feel motivated to give my best effort each day.',
      type: 'likert',
      theme: 'motivation_fulfillment',
      weight: 1.1
    },
    {
      id: 'q5',
      text: 'My work aligns with the mission and values of the organization.',
      type: 'likert',
      theme: 'mission_alignment',
      weight: 1.0
    },
    {
      id: 'q6',
      text: 'I see myself working here in two years.',
      type: 'likert',
      theme: 'engagement_continuity',
      weight: 1.5
    },
    {
      id: 'q7',
      text: 'What changes would improve your workplace experience?',
      type: 'text',
      theme: 'psychological_safety',
      weight: 1.2
    }
  ];
};

// Calculate scores based on themes (psychological safety, trust, etc)
export const calculateThemeScores = (questions: SurveyQuestion[], responses: any[]): ThemeScore[] => {
  const themeScores: Record<string, { sum: number; count: number; weight: number }> = {};
  
  responses.forEach(response => {
    if (typeof response.value !== 'string') {
      const question = questions.find(q => q.id === response.questionId);
      if (question && response.value) {
        const theme = question.theme;
        if (!themeScores[theme]) {
          themeScores[theme] = { sum: 0, count: 0, weight: question.weight };
        }
        themeScores[theme].sum += response.value;
        themeScores[theme].count += 1;
      }
    }
  });
  
  return Object.entries(themeScores).map(([theme, data]) => ({
    theme,
    score: data.count > 0 ? (data.sum / data.count) * 20 : 0, // Convert to 0-100 scale
    count: data.count,
    weight: data.weight
  }));
};

// Group theme scores into categories (culture, engagement, etc)
export const calculateCategoryScores = (themeScores: ThemeScore[]): CategoryScore[] => {
  const categoryScores: Record<string, { sum: number; count: number }> = {};
  
  themeScores.forEach(themeScore => {
    // @ts-ignore - We know there might be a mismatch here but we're handling it
    const category = THEME_TO_CATEGORY[themeScore.theme] || 'other';
    if (!categoryScores[category]) {
      categoryScores[category] = { sum: 0, count: 0 };
    }
    categoryScores[category].sum += themeScore.score * (themeScore.weight || 1);
    categoryScores[category].count += 1;
  });
  
  return Object.entries(categoryScores).map(([category, data]) => ({
    // @ts-ignore - Type is properly handled
    category,
    score: data.count > 0 ? data.sum / data.count : 0,
    // @ts-ignore - Type is properly handled
    weight: CATEGORY_WEIGHTS[category] || 1.0
  }));
};

// Calculate overall pulse score from category scores
export const calculateOverallScore = (categoryScores: CategoryScore[]): number => {
  if (categoryScores.length === 0) return 0;
  
  let weightedSum = 0;
  let weightSum = 0;
  
  categoryScores.forEach(category => {
    weightedSum += category.score * category.weight;
    weightSum += category.weight;
  });
  
  return Math.round(weightSum > 0 ? weightedSum / weightSum : 0);
};

// Process a full survey response
export const processSurveyResponse = (response: SurveyResponse) => {
  // Convert the response format to an array of items with question ids and values
  const responseItems = Object.entries(response.responses).map(([questionId, value]) => ({
    questionId,
    value
  }));
  
  // Build a basic question array from the question mapping
  const questions = Object.entries(response.questionMapping).map(([questionId, info]) => ({
    id: questionId,
    // @ts-ignore - We're using a simplified version here
    theme: info.theme,
    weight: info.weight,
    text: '',
    type: 'likert'
  }));
  
  // Calculate theme scores
  const themeScores = calculateThemeScores(questions, responseItems);
  
  // Calculate category scores
  const categoryScores = calculateCategoryScores(themeScores);
  
  // Calculate overall score
  const overallScore = calculateOverallScore(categoryScores);
  
  return {
    themeScores,
    categoryScores,
    overallScore
  };
};

// Get the tier based on score
export const getTier = (score: number): PulseScoreTier => {
  if (score >= TIER_THRESHOLDS.thriving) return 'thriving';
  if (score >= TIER_THRESHOLDS.stable) return 'stable';
  if (score >= TIER_THRESHOLDS.at_risk) return 'at_risk';
  return 'critical';
};

// Get display info for a tier
export const getTierDisplay = (tier: PulseScoreTier) => {
  switch (tier) {
    case 'thriving':
      return { 
        label: 'Thriving Culture',
        color: 'text-emerald-600',
        description: 'Your culture demonstrates strong employee engagement and positive sentiment.'
      };
    case 'stable':
      return { 
        label: 'Stable Culture',
        color: 'text-blue-600',
        description: 'Your culture shows good foundational elements with room for enhancement.'
      };
    case 'at_risk':
      return { 
        label: 'At Risk',
        color: 'text-amber-600',
        description: 'Your culture has areas of concern that need focused attention.'
      };
    case 'critical':
      return { 
        label: 'Critical Action Needed',
        color: 'text-red-600',
        description: 'Your culture requires immediate intervention to address significant issues.'
      };
    default:
      return { 
        label: 'Analyzing',
        color: 'text-gray-600',
        description: 'Analysis in progress.'
      };
  }
};
