
import { SurveyResponse, SurveyQuestion, PulseScoreTier, ScoringTheme } from '@/types/scoring.types';

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

export const getTierDisplay = (tier: PulseScoreTier) => {
  switch (tier) {
    case 'pulse_certified':
      return { label: 'Pulse Certified™', color: 'text-green-600' };
    case 'emerging_culture':
      return { label: 'Emerging Culture', color: 'text-blue-600' };
    case 'at_risk':
      return { label: 'At Risk', color: 'text-amber-600' };
    case 'intervention_advised':
      return { label: 'Intervention Advised', color: 'text-red-600' };
    default:
      return { label: 'Uncertified', color: 'text-gray-600' };
  }
};

// Mock questions for demo purposes
export const getSampleSurveyQuestions = (): SurveyQuestion[] => {
  return [
    {
      id: 'q1',
      text: 'I feel valued by my leadership team',
      type: 'likert',
      theme: 'trust_in_leadership',
      weight: 1.0
    },
    {
      id: 'q2',
      text: 'I can express my opinions without fear of negative consequences',
      type: 'likert',
      theme: 'psychological_safety',
      weight: 1.2
    },
    {
      id: 'q3',
      text: 'I feel a sense of belonging at my workplace',
      type: 'likert',
      theme: 'inclusion_belonging',
      weight: 1.0
    },
    {
      id: 'q4',
      text: 'My work gives me a sense of purpose',
      type: 'likert',
      theme: 'motivation_fulfillment',
      weight: 0.8
    },
    {
      id: 'q5',
      text: 'I understand and believe in our company mission',
      type: 'likert',
      theme: 'mission_alignment',
      weight: 1.0
    },
    {
      id: 'q6',
      text: 'I see myself working here a year from now',
      type: 'likert',
      theme: 'engagement_continuity',
      weight: 1.5
    },
    {
      id: 'q7',
      text: 'Share any specific feedback about leadership communication',
      type: 'text',
      theme: 'trust_in_leadership',
      weight: 0.5
    }
  ];
};

// Updated function to clarify it accepts an array of responses
export const getFeedbackSynthesisPrompt = (responses: Array<{value: string}>): string => {
  return `Analyze the following employee feedback responses and provide key themes, sentiment analysis, and actionable insights:
${JSON.stringify(responses, null, 2)}

Focus on:
1. Common themes across responses
2. Positive highlights
3. Areas of concern
4. Actionable recommendations for leadership`;
};

// Updated function to clarify it accepts a single string of feedback
export const getOpenEndedFeedbackPrompt = (feedbackText: string): string => {
  return `Analyze the following open-ended employee feedback and provide sentiment analysis, key themes, and actionable insights:
"${feedbackText}"

Provide:
1. Overall sentiment (positive, neutral, negative)
2. Key themes identified
3. Specific concerns raised
4. Actionable recommendations`;
};
