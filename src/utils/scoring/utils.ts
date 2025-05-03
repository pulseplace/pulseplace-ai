
import { PulseScoreTier, SurveyQuestion, SurveyResponse } from '@/types/scoring.types';
import { TIER_THRESHOLDS } from './config';

// Get the tier based on score
export const getTierFromScore = (score: number): PulseScoreTier => {
  if (score >= TIER_THRESHOLDS.pulse_certified) {
    return 'pulse_certified';
  } else if (score >= TIER_THRESHOLDS.emerging_culture) {
    return 'emerging_culture';
  } else if (score >= TIER_THRESHOLDS.at_risk) {
    return 'at_risk';
  } else {
    return 'intervention_advised';
  }
};

// Function to format scores for display
export const formatScore = (score: number): string => {
  return Math.round(score).toString();
};

// Function to get color based on score
export const getScoreColor = (score: number): string => {
  if (score >= 80) {
    return 'text-green-600';
  } else if (score >= 60) {
    return 'text-yellow-500';
  } else {
    return 'text-red-500';
  }
};

// Function to get background color based on score
export const getScoreBgColor = (score: number): string => {
  if (score >= 80) {
    return 'bg-green-100';
  } else if (score >= 60) {
    return 'bg-yellow-100';
  } else {
    return 'bg-red-100';
  }
};

// Normalize response value based on question type
export const normalizeResponseValue = (response: SurveyResponse, question: SurveyQuestion): number => {
  if (typeof response.value === 'number') {
    return response.value;
  }
  
  // For text responses, we'll use a simple sentiment scoring (0-10)
  // In a real implementation, this would use NLP for sentiment analysis
  if (question.type === 'text') {
    return 5; // Default neutral score
  }
  
  // For binary questions (yes/no)
  if (question.type === 'binary') {
    return response.value === 'yes' ? 10 : 0;
  }
  
  // Fallback
  return 0;
};

// Helper for tier display
export const getTierDisplay = (tier: PulseScoreTier): { title: string; description: string; color: string } => {
  switch (tier) {
    case 'pulse_certified':
      return {
        title: 'Pulse Certified',
        description: 'Your organization demonstrates excellence in workplace culture.',
        color: 'green',
      };
    case 'emerging_culture':
      return {
        title: 'Emerging Culture',
        description: 'Your organization is building a positive workplace culture.',
        color: 'blue',
      };
    case 'at_risk':
      return {
        title: 'At Risk',
        description: 'Your organization shows concerning signs in workplace culture.',
        color: 'orange',
      };
    case 'intervention_advised':
      return {
        title: 'Intervention Advised',
        description: 'Your organization requires immediate attention to workplace culture.',
        color: 'red',
      };
  }
};

// Additional functions needed
export const calculateCategoryScores = (themeScores: any[]) => {
  // Implementation that would calculate category scores from theme scores
  return [
    { category: 'emotion_index', score: 75, weight: 0.4 },
    { category: 'engagement_stability', score: 82, weight: 0.3 },
    { category: 'culture_trust', score: 68, weight: 0.3 }
  ];
};

export const calculateOverallScore = (categoryScores: any[]) => {
  // Calculate weighted average
  let totalWeight = 0;
  let weightedSum = 0;
  
  categoryScores.forEach(category => {
    weightedSum += category.score * category.weight;
    totalWeight += category.weight;
  });
  
  return totalWeight > 0 ? weightedSum / totalWeight : 0;
};

export const getSampleSurveyQuestions = () => {
  return [
    {
      id: '1',
      text: 'I feel valued at my organization',
      type: 'likert',
      theme: 'trust_in_leadership',
      weight: 1
    },
    {
      id: '2',
      text: 'I can speak up without fear of negative consequences',
      type: 'likert',
      theme: 'psychological_safety',
      weight: 1
    },
    {
      id: '3',
      text: 'I feel a sense of belonging at my workplace',
      type: 'likert',
      theme: 'inclusion_belonging',
      weight: 1
    }
  ];
};

export const getFeedbackSynthesisPrompt = (feedback: string) => {
  return `Synthesize the following employee feedback into key themes and actionable insights:
${feedback}

Please provide:
1. Top 3 themes identified
2. Sentiment analysis (positive/negative/neutral)
3. Recommended actions based on feedback`;
};

export const getOpenEndedFeedbackPrompt = (question: string) => {
  return `Based on the following open-ended question from our survey:
"${question}"

Please provide a thoughtful response that:
1. Identifies your true feelings about this topic
2. Provides specific examples if possible
3. Suggests any improvements you'd like to see`;
};
