
import { supabase } from '@/integrations/supabase/client';
import { PulseBotAnalytics, AnalyticsFilters } from '../types';

// Mock data for demo purposes
const mockAnalyticsData: PulseBotAnalytics = {
  totalInteractions: 1348,
  uniqueUsers: 486,
  positiveRating: 94,
  averageResponseTime: 1.1,
  responseRate: 98,
  topLanguages: [
    { language: 'English', count: 946, percentage: 70.2 },
    { language: 'Spanish', count: 154, percentage: 11.4 },
    { language: 'French', count: 105, percentage: 7.8 },
    { language: 'German', count: 61, percentage: 4.5 }
  ],
  feedbackRatio: {
    positive: 412,
    negative: 28
  },
  topQueries: [
    { query: "How can PulsePlace help with employee retention?", count: 92 },
    { query: "What are the features of PulsePlace?", count: 81 },
    { query: "How does certification work?", count: 74 },
    { query: "Can I integrate with my HRIS?", count: 62 },
    { query: "How much does it cost?", count: 48 },
    { query: "What makes PulsePlace different?", count: 42 },
    { query: "How do I export my certification?", count: 35 },
    { query: "What's the implementation time?", count: 31 }
  ],
  mostDownvotedResponses: [
    { query: "How do I implement a culture survey?", response: "That's a complex topic that requires consideration of multiple factors.", count: 12 },
    { query: "What's the difference between engagement and satisfaction?", response: "They are related concepts in employee experience measurement.", count: 8 }
  ],
  topDownvotedResponses: [
    { id: "1", userMessage: "How do I implement a culture survey?", botResponse: "That's a complex topic that requires consideration of multiple factors.", timestamp: "2023-04-02T12:34:56Z", downvotes: 12 },
    { id: "2", userMessage: "What's the difference between engagement and satisfaction?", botResponse: "They are related concepts in employee experience measurement.", timestamp: "2023-04-05T09:12:34Z", downvotes: 8 }
  ],
  avatarStateUsage: [
    { state: "happy", count: 265, percentage: 36.5 },
    { state: "neutral", count: 208, percentage: 28.2 },
    { state: "thinking", count: 135, percentage: 18.5 },
    { state: "confused", count: 62, percentage: 8.5 },
    { state: "excited", count: 60, percentage: 8.3 }
  ],
  languageBreakdown: [
    { language: "English", count: 946, percentage: 70.2 },
    { language: "Spanish", count: 154, percentage: 11.4 },
    { language: "French", count: 105, percentage: 7.8 },
    { language: "German", count: 61, percentage: 4.5 },
    { language: "Portuguese", count: 48, percentage: 3.6 },
    { language: "Other", count: 34, percentage: 2.5 }
  ]
};

export const fetchAnalytics = async (filters: AnalyticsFilters): Promise<PulseBotAnalytics> => {
  console.log('Fetching analytics with filters:', filters);
  
  try {
    // In a real implementation, we would fetch data from Supabase
    // For now, we'll simulate a network request with a short delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Apply filters to mock data
    if (filters.feedbackType === 'positive') {
      return {
        ...mockAnalyticsData,
        totalInteractions: Math.floor(mockAnalyticsData.totalInteractions * 0.8),
        positiveRating: 100, // Since we're only showing positive feedback
        feedbackRatio: {
          positive: mockAnalyticsData.feedbackRatio.positive,
          negative: 0
        }
      };
    }
    
    if (filters.feedbackType === 'negative') {
      return {
        ...mockAnalyticsData,
        totalInteractions: Math.floor(mockAnalyticsData.totalInteractions * 0.2),
        positiveRating: 0, // Since we're only showing negative feedback
        feedbackRatio: {
          positive: 0,
          negative: mockAnalyticsData.feedbackRatio.negative
        }
      };
    }
    
    if (filters.language && filters.language !== 'all') {
      const languageData = mockAnalyticsData.languageBreakdown.find(
        l => l.language.toLowerCase() === filters.language?.toLowerCase()
      );
      
      if (languageData) {
        return {
          ...mockAnalyticsData,
          totalInteractions: languageData.count,
          uniqueUsers: Math.floor(languageData.count * 0.4),
          languageBreakdown: [languageData]
        };
      }
    }
    
    return mockAnalyticsData;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

export const pulseBotAPI = {
  generateBotAnalyticsSummary: async (type: 'general' | 'problems' | 'dashboard', timeRange: number): Promise<string> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return appropriate summary based on type
    if (type === 'general') {
      return `PulseBot has handled 1,348 interactions over the past ${timeRange} days with a 94% satisfaction rate. The most common topics include employee retention, PulsePlace features, and certification process. Most users interact in English (70.2%), with Spanish (11.4%) being the second most common language. Users typically receive responses in 1.1 seconds on average.`;
    } else if (type === 'problems') {
      return `Analysis identified two main areas for improvement:\n\n1. Complex topic explanations - Several users downvoted responses to complex questions like "How do I implement a culture survey?" The responses were considered too generic or lacked practical steps.\n\n2. Differentiation explanations - Users struggled with conceptual distinctions like "engagement vs. satisfaction" where responses lacked clear examples.\n\nRecommendation: Enhance knowledge base with more specific examples and step-by-step guides for complex processes.`;
    } else {
      return `Dashboard Statistics (Last ${timeRange} days):\n\n• Total Conversations: 1,348\n• Unique Users: 486\n• Response Time: 1.1s average\n• Conversation Length: 4.2 messages average\n• Top Languages: English (70%), Spanish (11%), French (8%)\n• Most Active Times: Tuesdays 10-11am, Thursdays 2-3pm\n• Device Usage: Desktop 65%, Mobile 35%\n\nWeek-over-week growth: +12% interactions, +8% unique users`;
    }
  }
};
