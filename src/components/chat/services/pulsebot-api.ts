
import { PulseBotAnalytics } from '../types';

// Mock PulseBot API service
export const pulseBotAPI = {
  // Method to generate AI summary of bot analytics
  generateBotAnalyticsSummary: async (
    type: 'general' | 'problems' | 'dashboard', 
    timeRange: number = 30
  ): Promise<string> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // These would typically come from a real API, not hardcoded
        const summaries = {
          general: `Your PulseBot has been performing well over the past ${timeRange} days with a 92% satisfaction rate. 
  
Key insights:
- Total interactions increased by 12% compared to the previous period
- 342 unique users engaged with PulseBot
- Average response time of 1.2 seconds is excellent
- English continues to be the dominant language (78.7%)

Recommendation: Consider expanding multilingual capabilities.`,
          
          problems: `We've identified a few areas for improvement in your PulseBot over the last ${timeRange} days:
  
1. The most downvoted responses relate to complex topics like implementing culture surveys.

2. Users seem to have difficulty getting detailed information about the certification process.

3. Some users are asking about integration capabilities with platforms like Slack.

Consider refining these responses with more specific, actionable information.`,
          
          dashboard: `Dashboard analytics summary for the past ${timeRange} days:
  
- User engagement metrics are strong with 98% response rate
- Highest usage days are Tuesday and Wednesday
- Most active time period is 10 AM - 2 PM
- Top performing features: culture metrics queries, certification information

Growth opportunity: Expand department-specific analytics capabilities.`
        };
        
        resolve(summaries[type]);
      }, 1500);
    });
  },
  
  // Method to fetch PulseBot analytics data
  fetchAnalytics: async (
    timeRange: string = '30d'
  ): Promise<PulseBotAnalytics> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data that would come from a real API
        const analytics: PulseBotAnalytics = {
          totalInteractions: 1248,
          uniqueUsers: 342,
          averageResponseTime: 1.2,
          positiveRating: 92,
          responseRate: 98,
          feedbackRatio: {
            positive: 1147,
            negative: 101
          },
          topQueries: [
            { query: "How do I implement a culture survey?", count: 68 },
            { query: "What's the difference between engagement and satisfaction?", count: 42 },
            { query: "How can I improve employee trust?", count: 36 },
            { query: "What are the best metrics for measuring workplace culture?", count: 29 },
            { query: "How often should we run pulse surveys?", count: 24 },
            { query: "Can PulseBot integrate with Slack?", count: 19 },
            { query: "What's a good response rate for surveys?", count: 17 },
            { query: "How does the certification process work?", count: 15 }
          ],
          mostDownvotedResponses: [
            { query: "How do I implement a culture survey?", response: "That's a complex topic that requires consideration of multiple factors.", count: 12 },
            { query: "What's the difference between engagement and satisfaction?", response: "They are related concepts in employee experience measurement.", count: 8 }
          ],
          languageBreakdown: [
            { language: "English", count: 982, percentage: 78.7 },
            { language: "Spanish", count: 114, percentage: 9.1 },
            { language: "French", count: 76, percentage: 6.1 },
            { language: "German", count: 42, percentage: 3.4 },
            { language: "Other", count: 34, percentage: 2.7 }
          ],
          avatarStateUsage: [
            { state: "Neutral", count: 520, percentage: 41.7 },
            { state: "Happy", count: 410, percentage: 32.8 },
            { state: "Thinking", count: 186, percentage: 14.9 },
            { state: "Excited", count: 94, percentage: 7.5 },
            { state: "Confused", count: 38, percentage: 3.1 }
          ]
        };
        
        resolve(analytics);
      }, 1500);
    });
  }
};

export default pulseBotAPI;
