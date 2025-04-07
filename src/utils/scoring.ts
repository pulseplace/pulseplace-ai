import { ScoringTheme, SurveyQuestion, SurveyResponse, ThemeScore, CategoryScore, PulseScoreData, PulseScoreTier, SentimentAnalysis } from '@/types/scoring.types';

// Mapping of question themes to categories
const themesToCategories: Record<ScoringTheme, 'emotion_index' | 'engagement_stability' | 'culture_trust'> = {
  trust_in_leadership: 'culture_trust',
  psychological_safety: 'culture_trust',
  inclusion_belonging: 'emotion_index',
  motivation_fulfillment: 'emotion_index',
  mission_alignment: 'engagement_stability',
  engagement_continuity: 'engagement_stability'
};

// Weights for each category in the overall PulseScore
const categoryWeights: Record<'emotion_index' | 'engagement_stability' | 'culture_trust', number> = {
  emotion_index: 0.4,
  engagement_stability: 0.3, 
  culture_trust: 0.3
};

// Tier thresholds
const tierThresholds = {
  pulse_certified: 85,
  growth_culture: 70,
  developing: 50,
  at_risk: 0
};

/**
 * Normalize a response value to a 0-100 scale
 */
export const normalizeResponseValue = (
  response: SurveyResponse, 
  question: SurveyQuestion
): number => {
  if (typeof response.value === 'number') {
    switch (question.type) {
      case 'likert':
        // Assuming likert scale from 1-5
        return (response.value - 1) * 25;
      case 'emoji':
        // Assuming emoji scale from 1-5
        return (response.value - 1) * 25;
      case 'binary':
        // Binary responses (yes/no) mapped to 100/0
        return response.value === 1 ? 100 : 0;
      default:
        return response.value;
    }
  } else if (question.type === 'text') {
    // Text responses require sentiment analysis
    // This is a placeholder until we implement actual sentiment analysis
    return 50;
  }
  
  return 0;
};

/**
 * Calculate theme scores based on normalized response values
 */
export const calculateThemeScores = (
  questions: SurveyQuestion[], 
  responses: SurveyResponse[]
): ThemeScore[] => {
  const themeScores: Record<ScoringTheme, { sum: number; count: number }> = {
    trust_in_leadership: { sum: 0, count: 0 },
    psychological_safety: { sum: 0, count: 0 },
    inclusion_belonging: { sum: 0, count: 0 },
    motivation_fulfillment: { sum: 0, count: 0 },
    mission_alignment: { sum: 0, count: 0 },
    engagement_continuity: { sum: 0, count: 0 }
  };

  // Map questions by ID for easy lookup
  const questionsMap = questions.reduce((map, question) => {
    map[question.id] = question;
    return map;
  }, {} as Record<string, SurveyQuestion>);

  // Process each response
  responses.forEach(response => {
    const question = questionsMap[response.questionId];
    if (!question) return;

    // Normalize the response value
    const normalizedValue = normalizeResponseValue(response, question);
    
    // Add to theme score, weighted by question weight
    const theme = question.theme;
    themeScores[theme].sum += normalizedValue * question.weight;
    themeScores[theme].count += question.weight;
  });

  // Calculate average score for each theme
  return Object.entries(themeScores).map(([theme, { sum, count }]) => ({
    theme: theme as ScoringTheme,
    score: count > 0 ? sum / count : 0,
    count
  }));
};

/**
 * Calculate category scores based on theme scores
 */
export const calculateCategoryScores = (themeScores: ThemeScore[]): CategoryScore[] => {
  const categoryScores: Record<'emotion_index' | 'engagement_stability' | 'culture_trust', { sum: number; count: number }> = {
    emotion_index: { sum: 0, count: 0 },
    engagement_stability: { sum: 0, count: 0 },
    culture_trust: { sum: 0, count: 0 }
  };

  // Aggregate theme scores into categories
  themeScores.forEach(theme => {
    const category = themesToCategories[theme.theme];
    categoryScores[category].sum += theme.score * theme.count;
    categoryScores[category].count += theme.count;
  });

  // Calculate average score for each category
  return Object.entries(categoryScores).map(([category, { sum, count }]) => ({
    category: category as 'emotion_index' | 'engagement_stability' | 'culture_trust',
    score: count > 0 ? sum / count : 0,
    weight: categoryWeights[category as keyof typeof categoryWeights]
  }));
};

/**
 * Calculate overall PulseScore
 */
export const calculateOverallScore = (categoryScores: CategoryScore[]): number => {
  let weightedSum = 0;
  let totalWeight = 0;

  categoryScores.forEach(category => {
    weightedSum += category.score * category.weight;
    totalWeight += category.weight;
  });

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
};

/**
 * Determine PulseScore tier
 */
export const determineTier = (score: number): PulseScoreTier => {
  if (score >= tierThresholds.pulse_certified) return 'pulse_certified';
  if (score >= tierThresholds.growth_culture) return 'growth_culture';
  if (score >= tierThresholds.developing) return 'developing';
  return 'at_risk';
};

/**
 * Generate insights based on scores
 */
export const generateInsights = (
  themeScores: ThemeScore[], 
  categoryScores: CategoryScore[]
): string[] => {
  const insights: string[] = [];

  // Example logic for generating insights
  const lowestTheme = themeScores.reduce((lowest, current) => 
    current.count > 0 && current.score < lowest.score ? current : lowest, 
    { theme: 'trust_in_leadership' as ScoringTheme, score: 100, count: 1 }
  );

  if (lowestTheme.score < 60) {
    insights.push(`Focus area: ${lowestTheme.theme.replace(/_/g, ' ')} needs attention with a score of ${Math.round(lowestTheme.score)}.`);
  }

  const highestCategory = categoryScores.reduce((highest, current) => 
    current.score > highest.score ? current : highest, 
    { category: 'emotion_index' as 'emotion_index', score: 0, weight: 0 }
  );

  insights.push(`Strength: ${highestCategory.category.replace(/_/g, ' ')} is your highest performing area at ${Math.round(highestCategory.score)}.`);

  return insights;
};

/**
 * Generate recommended actions based on scores
 */
export const generateRecommendedActions = (themeScores: ThemeScore[]): string[] => {
  const recommendations: string[] = [];

  // Sort themes by score (ascending)
  const sortedThemes = [...themeScores].sort((a, b) => a.score - b.score);

  // Generate recommendations for the lowest scoring themes
  if (sortedThemes[0].count > 0) {
    const lowestTheme = sortedThemes[0].theme.replace(/_/g, ' ');
    if (sortedThemes[0].score < 50) {
      recommendations.push(`Conduct focused sessions to address ${lowestTheme} challenges.`);
    } else if (sortedThemes[0].score < 70) {
      recommendations.push(`Consider team-building activities to improve ${lowestTheme}.`);
    }
  }

  if (sortedThemes[1].count > 0) {
    const secondLowestTheme = sortedThemes[1].theme.replace(/_/g, ' ');
    recommendations.push(`Develop an action plan for improving ${secondLowestTheme}.`);
  }

  // Add a general recommendation
  recommendations.push("Schedule monthly pulse surveys to track progress on identified areas.");

  return recommendations;
};

/**
 * Perform sentiment analysis on text responses
 * This is a placeholder for actual NLP/AI processing
 */
export const analyzeSentiment = (textResponse: string): SentimentAnalysis => {
  // This is a simplified placeholder for actual sentiment analysis
  // In a real implementation, this would call an NLP service or AI model
  
  const length = textResponse.length;
  const hasPositiveWords = /good|great|excellent|happy|satisfied|love/i.test(textResponse);
  const hasNegativeWords = /bad|poor|terrible|unhappy|dissatisfied|hate/i.test(textResponse);
  
  let score = 0.5; // Neutral default
  let polarity: 'positive' | 'neutral' | 'negative' = 'neutral';
  
  if (hasPositiveWords && !hasNegativeWords) {
    score = 0.8;
    polarity = 'positive';
  } else if (hasNegativeWords && !hasPositiveWords) {
    score = 0.2;
    polarity = 'negative';
  }
  
  return {
    score,
    polarity,
    themes: ['placeholder'],
    keyPhrases: ['placeholder']
  };
};

/**
 * Calculate the complete PulseScore
 */
export const calculatePulseScore = (
  questions: SurveyQuestion[], 
  responses: SurveyResponse[]
): PulseScoreData => {
  // Calculate theme scores
  const themeScores = calculateThemeScores(questions, responses);
  
  // Calculate category scores
  const categoryScores = calculateCategoryScores(themeScores);
  
  // Calculate overall score
  const overallScore = calculateOverallScore(categoryScores);
  
  // Determine tier
  const tier = determineTier(overallScore);
  
  // Generate insights
  const insights = generateInsights(themeScores, categoryScores);
  
  // Generate recommended actions
  const recommendedActions = generateRecommendedActions(themeScores);
  
  return {
    overallScore,
    categoryScores,
    themeScores,
    tier,
    insights,
    recommendedActions
  };
};

/**
 * Get tier display information
 */
export const getTierDisplay = (tier: PulseScoreTier): { label: string; color: string } => {
  switch (tier) {
    case 'pulse_certified':
      return { label: 'Pulse Certified™ – Lovable Workplace', color: 'text-green-500' };
    case 'growth_culture':
      return { label: 'Growth Culture – Building Excellence', color: 'text-blue-500' };
    case 'developing':
      return { label: 'Developing – Needs Improvement', color: 'text-yellow-500' };
    case 'at_risk':
      return { label: 'At-Risk – Critical Culture Risk', color: 'text-red-500' };
    default:
      return { label: 'Unknown', color: 'text-gray-500' };
  }
};

/**
 * AI prompt template for survey feedback synthesis
 */
export const getFeedbackSynthesisPrompt = (surveyResponses: any): string => {
  return `
  Analyze the following workplace survey responses and provide:
  1. A summary of key themes and sentiment
  2. Top 3 strengths identified
  3. Top 3 areas for improvement
  4. 1-2 notable quotes that represent the overall sentiment
  5. 3 specific, actionable recommendations
  
  Survey responses:
  ${JSON.stringify(surveyResponses)}
  
  Format the response as JSON with the following structure:
  {
    "summary": "overall summary text",
    "strengths": ["strength 1", "strength 2", "strength 3"],
    "improvementAreas": ["area 1", "area 2", "area 3"],
    "notableQuotes": ["quote 1", "quote 2"],
    "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
  }
  `;
};

/**
 * Sample survey questions with weights and themes, aligned with the thematic buckets
 */
export const getSampleSurveyQuestions = (): SurveyQuestion[] => {
  return [
    {
      id: '1',
      text: 'I trust senior leaders to lead us successfully.',
      type: 'likert',
      theme: 'trust_in_leadership',
      weight: 1.2
    },
    {
      id: '2',
      text: 'Leadership communicates transparently about company changes.',
      type: 'likert',
      theme: 'trust_in_leadership',
      weight: 1.0
    },
    {
      id: '3',
      text: 'It\'s safe to take risks or admit mistakes here.',
      type: 'likert',
      theme: 'psychological_safety',
      weight: 1.5
    },
    {
      id: '4',
      text: 'I feel like I belong at this company.',
      type: 'likert',
      theme: 'inclusion_belonging',
      weight: 1.0
    },
    {
      id: '5',
      text: 'I see myself still working here in two years.',
      type: 'likert',
      theme: 'engagement_continuity',
      weight: 1.3
    },
    {
      id: '6',
      text: 'My work feels meaningful and fulfilling.',
      type: 'likert',
      theme: 'motivation_fulfillment',
      weight: 1.2
    },
    {
      id: '7',
      text: 'I believe in our mission and values.',
      type: 'likert',
      theme: 'mission_alignment',
      weight: 1.0
    },
    {
      id: '8',
      text: 'How do you feel about your workplace culture overall?',
      type: 'emoji',
      theme: 'inclusion_belonging',
      weight: 1.0
    },
    {
      id: '9',
      text: 'What would make this company a better place to work?',
      type: 'text',
      theme: 'motivation_fulfillment',
      weight: 1.0
    }
  ];
};
