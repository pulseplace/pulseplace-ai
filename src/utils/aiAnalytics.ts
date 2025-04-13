
import { SentimentAnalysis, AIInsight, PredictiveFlag } from '@/types/scoring.types';

/**
 * Analyzes sentiment from text feedback using AI processing
 */
export const analyzeSentimentWithAI = (text: string): SentimentAnalysis => {
  // Real implementation would connect to an LLM API
  // This is a simplified version for development/demo purposes
  
  const lowercaseText = text.toLowerCase();
  
  // Simple keyword-based sentiment analysis
  const positiveKeywords = ['good', 'great', 'excellent', 'happy', 'satisfied', 'love', 'positive', 'enjoy'];
  const negativeKeywords = ['bad', 'poor', 'terrible', 'unhappy', 'dissatisfied', 'hate', 'negative', 'difficult'];
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  // Count positive and negative keywords
  positiveKeywords.forEach(keyword => {
    if (lowercaseText.includes(keyword)) {
      positiveScore += 1;
    }
  });
  
  negativeKeywords.forEach(keyword => {
    if (lowercaseText.includes(keyword)) {
      negativeScore += 1;
    }
  });
  
  // Calculate overall sentiment score (0-1 scale)
  const totalKeywords = positiveKeywords.length + negativeKeywords.length;
  const score = (positiveScore - negativeScore + totalKeywords) / (2 * totalKeywords);
  
  // Determine polarity based on score
  let polarity: 'positive' | 'neutral' | 'negative' = 'neutral';
  if (score > 0.6) {
    polarity = 'positive';
  } else if (score < 0.4) {
    polarity = 'negative';
  }
  
  // Extract key phrases (in a real implementation, this would use NLP)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const keyPhrases = sentences
    .filter(s => s.length > 10 && s.length < 100)
    .map(s => s.trim())
    .slice(0, 3);
  
  // Extract themes (in a real implementation, this would use topic modeling)
  const themes = [];
  if (lowercaseText.includes('lead') || lowercaseText.includes('manage')) {
    themes.push('leadership');
  }
  if (lowercaseText.includes('team') || lowercaseText.includes('colleague')) {
    themes.push('team dynamics');
  }
  if (lowercaseText.includes('grow') || lowercaseText.includes('learn') || lowercaseText.includes('develop')) {
    themes.push('growth & development');
  }
  if (lowercaseText.includes('communicate') || lowercaseText.includes('talk') || lowercaseText.includes('share')) {
    themes.push('communication');
  }
  if (themes.length === 0) {
    themes.push('general feedback');
  }
  
  return {
    score,
    polarity,
    themes,
    keyPhrases: keyPhrases.length > 0 ? keyPhrases : ['No key phrases identified']
  };
};

/**
 * Generates AI insights from analyzed feedback data
 */
export const generateAIInsights = (
  departmentData: { 
    name: string; 
    sentimentScore: number; 
    responseRate: number;
    keyThemes: string[];
  }[]
): AIInsight[] => {
  const insights: AIInsight[] = [];
  
  departmentData.forEach(dept => {
    // Detect low sentiment scores
    if (dept.sentimentScore < 0.4) {
      insights.push({
        concernCategory: 'Low Morale',
        concernText: `${dept.name} department shows signs of low morale with a sentiment score of ${Math.round(dept.sentimentScore * 100)}/100.`,
        severity: 'high',
        impactArea: 'Team Performance',
        recommendedAction: `Schedule listening sessions with ${dept.name} team members to identify specific concerns.`
      });
    }
    
    // Detect low response rates
    if (dept.responseRate < 0.6) {
      insights.push({
        concernCategory: 'Low Engagement',
        concernText: `${dept.name} has a low survey response rate of ${Math.round(dept.responseRate * 100)}%.`,
        severity: 'medium',
        impactArea: 'Data Quality',
        recommendedAction: `Implement a communication plan to increase survey participation in the ${dept.name} department.`
      });
    }
    
    // Generate theme-based insights
    if (dept.keyThemes.includes('leadership')) {
      insights.push({
        concernCategory: 'Leadership Perception',
        concernText: `Leadership theme is prominent in ${dept.name} feedback.`,
        severity: dept.sentimentScore < 0.5 ? 'high' : 'low',
        impactArea: 'Leadership Trust',
        recommendedAction: dept.sentimentScore < 0.5 
          ? `Review leadership practices in ${dept.name} department.` 
          : `Maintain positive leadership practices in ${dept.name} department.`
      });
    }
  });
  
  // Add general insights if we have few department-specific ones
  if (insights.length < 3) {
    insights.push({
      concernCategory: 'Culture Development',
      concernText: 'Opportunity to strengthen overall workplace culture.',
      severity: 'medium',
      impactArea: 'Company Culture',
      recommendedAction: 'Implement a culture ambassador program to champion workplace values.'
    });
  }
  
  return insights;
};

/**
 * Generates predictive flags for potential future issues
 */
export const generatePredictiveFlags = (
  historicalData: {
    department: string;
    sentimentTrend: number[];
    turnoverRate: number;
    engagementScore: number;
  }[]
): PredictiveFlag[] => {
  const flags: PredictiveFlag[] = [];
  
  historicalData.forEach(dept => {
    // Analyze sentiment trend
    const sentimentTrend = dept.sentimentTrend;
    
    if (sentimentTrend.length >= 3) {
      // Check for declining sentiment over last 3 periods
      const isDecliningSentiment = 
        sentimentTrend[sentimentTrend.length - 1] < sentimentTrend[sentimentTrend.length - 2] &&
        sentimentTrend[sentimentTrend.length - 2] < sentimentTrend[sentimentTrend.length - 3];
      
      // Check for sudden drop in sentiment
      const latestDrop = sentimentTrend[sentimentTrend.length - 2] - sentimentTrend[sentimentTrend.length - 1];
      const isSuddenDrop = latestDrop > 10;
      
      if (isDecliningSentiment || isSuddenDrop) {
        flags.push({
          department: dept.department,
          issue: 'Declining employee sentiment',
          severity: isSuddenDrop ? 'high' : 'medium',
          predictedImpact: dept.turnoverRate * 1.5
        });
      }
    }
    
    // Check for high turnover combined with low engagement
    if (dept.turnoverRate > 0.15 && dept.engagementScore < 70) {
      flags.push({
        department: dept.department,
        issue: 'Retention risk',
        severity: 'high',
        predictedImpact: dept.turnoverRate * 2
      });
    }
    
    // Check for low engagement
    if (dept.engagementScore < 60) {
      flags.push({
        department: dept.department,
        issue: 'Low team engagement',
        severity: 'medium',
        predictedImpact: dept.engagementScore * 0.5
      });
    }
  });
  
  return flags;
};

/**
 * Creates a Culture Compass from survey and sentiment data
 * The Culture Compass is a visualization of the company culture along key dimensions
 */
export const generateCultureCompass = (
  surveyData: {
    category: string;
    score: number;
    benchmark: number;
  }[]
): {
  dimensions: {
    name: string;
    score: number;
    benchmark: number;
    gap: number;
    status: 'strength' | 'neutral' | 'opportunity';
  }[];
  overallAlignment: number;
  primaryStrength: string;
  primaryGap: string;
} => {
  // Map survey data to compass dimensions
  const dimensions = surveyData.map(item => {
    const gap = item.score - item.benchmark;
    let status: 'strength' | 'neutral' | 'opportunity' = 'neutral';
    
    if (gap >= 5) {
      status = 'strength';
    } else if (gap <= -5) {
      status = 'opportunity';
    }
    
    return {
      name: item.category,
      score: item.score,
      benchmark: item.benchmark,
      gap: gap,
      status
    };
  });
  
  // Calculate overall alignment score
  const absoluteGaps = dimensions.map(d => Math.abs(d.gap));
  const overallAlignment = 100 - (absoluteGaps.reduce((sum, gap) => sum + gap, 0) / absoluteGaps.length);
  
  // Find primary strength and gap
  const sortedByGap = [...dimensions].sort((a, b) => b.gap - a.gap);
  const primaryStrength = sortedByGap[0].name;
  const primaryGap = sortedByGap[sortedByGap.length - 1].name;
  
  return {
    dimensions,
    overallAlignment,
    primaryStrength,
    primaryGap
  };
};

/**
 * Processes open-ended feedback and extracts key themes
 */
export const processOpenEndedFeedback = (
  feedbackResponses: string[]
): {
  themes: { name: string; count: number; examples: string[] }[];
  overallSentiment: number;
  wordCloud: { text: string; value: number }[];
} => {
  // Word frequency counter
  const wordCounts: Record<string, number> = {};
  
  // Theme tracker
  const themeTracker: Record<string, { count: number; examples: string[] }> = {
    'leadership': { count: 0, examples: [] },
    'communication': { count: 0, examples: [] },
    'work-life balance': { count: 0, examples: [] },
    'career growth': { count: 0, examples: [] },
    'team dynamics': { count: 0, examples: [] },
    'recognition': { count: 0, examples: [] },
    'resources': { count: 0, examples: [] },
    'other': { count: 0, examples: [] }
  };
  
  // Theme keywords mapping
  const themeKeywords: Record<string, string[]> = {
    'leadership': ['leader', 'manage', 'boss', 'direct', 'supervis'],
    'communication': ['communicat', 'inform', 'messag', 'share', 'tell', 'talk', 'meet'],
    'work-life balance': ['balance', 'stress', 'hour', 'flexib', 'time', 'burnout', 'personal'],
    'career growth': ['career', 'grow', 'develop', 'promot', 'advance', 'opportunit', 'learn', 'skill'],
    'team dynamics': ['team', 'peer', 'colleague', 'collaborat', 'work together', 'group'],
    'recognition': ['recogni', 'appreciat', 'reward', 'value', 'feedback'],
    'resources': ['resource', 'tool', 'equipment', 'software', 'technolog', 'support', 'training']
  };
  
  // Track overall sentiment
  let overallSentimentSum = 0;
  
  // Process each feedback response
  feedbackResponses.forEach(feedback => {
    const lowercaseText = feedback.toLowerCase();
    
    // Process for word cloud
    const words = lowercaseText
      .replace(/[^\w\s]/gi, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !['that', 'this', 'with', 'which', 'would', 'could', 'have', 'there', 'their', 'about'].includes(word));
    
    words.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
    
    // Theme detection
    let maxThemeScore = 0;
    let primaryTheme = 'other';
    
    Object.entries(themeKeywords).forEach(([theme, keywords]) => {
      let themeScore = 0;
      
      keywords.forEach(keyword => {
        if (lowercaseText.includes(keyword)) {
          themeScore += 1;
        }
      });
      
      if (themeScore > maxThemeScore) {
        maxThemeScore = themeScore;
        primaryTheme = theme;
      }
    });
    
    // Increment theme count and add example
    themeTracker[primaryTheme].count += 1;
    if (themeTracker[primaryTheme].examples.length < 3) {
      themeTracker[primaryTheme].examples.push(feedback);
    }
    
    // Get sentiment for this feedback
    const sentimentResult = analyzeSentimentWithAI(feedback);
    overallSentimentSum += sentimentResult.score;
  });
  
  // Calculate overall sentiment
  const overallSentiment = feedbackResponses.length > 0 
    ? overallSentimentSum / feedbackResponses.length 
    : 0.5;
  
  // Create theme array sorted by frequency
  const themes = Object.entries(themeTracker)
    .map(([name, data]) => ({
      name,
      count: data.count,
      examples: data.examples
    }))
    .filter(theme => theme.count > 0)
    .sort((a, b) => b.count - a.count);
  
  // Create word cloud data
  const wordCloud = Object.entries(wordCounts)
    .filter(([_, count]) => count > 1)
    .map(([text, value]) => ({ text, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 30);
  
  return {
    themes,
    overallSentiment,
    wordCloud
  };
};

/**
 * PulseBot query processing - analyze user queries and generate responses
 */
export const processPulseBotQuery = (
  query: string,
  contextData: {
    recentScores: { department: string; score: number }[];
    topThemes: { name: string; sentiment: number }[];
    surveyStats: { responseRate: number; participantCount: number };
  }
): {
  response: string;
  dataPoints?: any;
  suggestedFollowups: string[];
} => {
  const lowercaseQuery = query.toLowerCase();
  
  // Handle score/performance queries
  if (lowercaseQuery.includes('score') || lowercaseQuery.includes('perform')) {
    const highestDept = [...contextData.recentScores].sort((a, b) => b.score - a.score)[0];
    const lowestDept = [...contextData.recentScores].sort((a, b) => a.score - b.score)[0];
    
    return {
      response: `Based on the latest survey data, the average PulseScore is ${Math.round(contextData.recentScores.reduce((sum, dept) => sum + dept.score, 0) / contextData.recentScores.length)}. The highest performing department is ${highestDept.department} with a score of ${highestDept.score}, while ${lowestDept.department} has the lowest score at ${lowestDept.score}.`,
      dataPoints: {
        averageScore: Math.round(contextData.recentScores.reduce((sum, dept) => sum + dept.score, 0) / contextData.recentScores.length),
        departmentScores: contextData.recentScores
      },
      suggestedFollowups: [
        `Why is ${lowestDept.department} scoring lower?`,
        `What actions can improve our overall score?`,
        `How does our score compare to industry benchmarks?`
      ]
    };
  }
  
  // Handle theme queries
  if (lowercaseQuery.includes('theme') || lowercaseQuery.includes('topic')) {
    const positiveThemes = contextData.topThemes
      .filter(theme => theme.sentiment > 0.6)
      .map(theme => theme.name);
    
    const negativeThemes = contextData.topThemes
      .filter(theme => theme.sentiment < 0.4)
      .map(theme => theme.name);
    
    return {
      response: `The top themes from your feedback are: ${contextData.topThemes.map(t => t.name).join(', ')}. ${positiveThemes.length > 0 ? `Positive themes include ${positiveThemes.join(', ')}. ` : ''}${negativeThemes.length > 0 ? `Areas for improvement include ${negativeThemes.join(', ')}.` : ''}`,
      dataPoints: {
        themes: contextData.topThemes
      },
      suggestedFollowups: [
        `Tell me more about the ${contextData.topThemes[0].name} theme`,
        `What actions can improve ${negativeThemes[0] || 'our weakest areas'}?`,
        `How have themes changed over time?`
      ]
    };
  }
  
  // Handle participation queries
  if (lowercaseQuery.includes('participat') || lowercaseQuery.includes('response') || lowercaseQuery.includes('survey')) {
    return {
      response: `Your latest survey had a ${Math.round(contextData.surveyStats.responseRate * 100)}% response rate with ${contextData.surveyStats.participantCount} participants. ${contextData.surveyStats.responseRate > 0.7 ? 'This is a good participation rate that provides reliable insights.' : 'There\'s room to improve participation for more comprehensive data.'}`,
      dataPoints: contextData.surveyStats,
      suggestedFollowups: [
        `How can we increase survey participation?`,
        `Is our response rate above industry average?`,
        `Which departments have the highest participation?`
      ]
    };
  }
  
  // Handle recommendation queries
  if (lowercaseQuery.includes('recommend') || lowercaseQuery.includes('suggest') || lowercaseQuery.includes('action') || lowercaseQuery.includes('improve')) {
    const lowestScoreDept = [...contextData.recentScores].sort((a, b) => a.score - b.score)[0];
    const improveTheme = contextData.topThemes.sort((a, b) => a.sentiment - b.sentiment)[0];
    
    return {
      response: `Based on your current culture data, I recommend: 1) Focus on improving ${improveTheme.name} which shows lower sentiment, 2) Schedule feedback sessions with the ${lowestScoreDept.department} team to address their score of ${lowestScoreDept.score}, and 3) Consider implementing a regular pulse survey cadence to track improvements over time.`,
      suggestedFollowups: [
        `How can we specifically improve ${improveTheme.name}?`,
        `What are best practices for team feedback sessions?`,
        `Tell me more about pulse survey cadence`
      ]
    };
  }
  
  // General fallback
  return {
    response: `I can help you analyze your workplace culture data. You can ask about scores, themes, participation rates, or specific recommendations. What would you like to know about your organization's pulse data?`,
    suggestedFollowups: [
      `What are our top performing departments?`,
      `What themes are emerging from our feedback?`,
      `How can we improve our overall PulseScore?`
    ]
  };
};
