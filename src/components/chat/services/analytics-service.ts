
// Service for collecting chat analytics
import { PulseBotAnalytics, AnalyticsFilters } from '../types';

export const getAnalytics = async (filters?: AnalyticsFilters): Promise<PulseBotAnalytics> => {
  console.log('Getting analytics with filters:', filters);
  
  // Mock data - would be replaced with real API call
  return {
    totalInteractions: 128,
    uniqueUsers: 42,
    averageResponseTime: 1.2,
    positiveRating: 0.87,
    responseRate: 0.95,
    feedbackRatio: {
      positive: 0.82,
      negative: 0.18
    },
    topQueries: [
      { query: "how does certification work", count: 15 },
      { query: "workplace culture improvement", count: 12 },
      { query: "survey frequency", count: 9 }
    ],
    languageBreakdown: [
      { language: "English", count: 98, percentage: 76.5 },
      { language: "Spanish", count: 18, percentage: 14.1 },
      { language: "French", count: 12, percentage: 9.4 }
    ],
    avatarStateUsage: [
      { state: "neutral", count: 65, percentage: 50.8 },
      { state: "happy", count: 42, percentage: 32.8 },
      { state: "excited", count: 21, percentage: 16.4 }
    ],
    mostDownvotedResponses: [
      { query: "pricing question", response: "Please contact sales for pricing information", count: 3 },
      { query: "technical issue", response: "Please try refreshing your browser", count: 2 }
    ]
  };
};
