
import { supabase } from '@/integrations/supabase/client';

// Define the response type
export interface BotAPIResponse {
  message: string;
  avatarState?: string;
  context?: any;
}

interface FeedbackRequest {
  messageId: string;
  feedback: string;
  message: string;
  sessionId: string;
}

export const pulseBotAPI = {
  async sendMessage(sessionId: string, message: string): Promise<BotAPIResponse> {
    try {
      console.log(`Sending message to PulseBot: ${message.substring(0, 50)}...`);
      
      // Call the Supabase Edge Function to process the message
      const { data, error } = await supabase.functions.invoke('ask-pulsebot', {
        body: {
          message,
          sessionId
        }
      });
      
      if (error) {
        console.error('Error calling PulseBot API:', error);
        throw new Error(error.message || 'Failed to get response from PulseBot');
      }
      
      console.log('Received response from PulseBot API');
      
      return {
        message: data.message,
        avatarState: data.avatarState,
        context: data.context
      };
    } catch (err) {
      console.error('Error in PulseBot API:', err);
      throw err;
    }
  },
  
  async sendFeedback(feedbackRequest: FeedbackRequest): Promise<void> {
    try {
      console.log(`Sending feedback for message: ${feedbackRequest.messageId}`);
      
      const { error } = await supabase.functions.invoke('log-pulsebot-feedback', {
        body: feedbackRequest
      });
      
      if (error) {
        console.error('Error sending feedback:', error);
        throw new Error(error.message || 'Failed to send feedback');
      }
      
      console.log('Feedback sent successfully');
    } catch (err) {
      console.error('Error in sendFeedback:', err);
      throw err;
    }
  },
  
  async generateBotAnalyticsSummary() {
    try {
      console.log('Fetching PulseBot analytics data');
      
      // In a real implementation, we would call a Supabase function to get the analytics
      // For now, return mock data
      
      return {
        totalInteractions: 1256,
        uniqueUsers: 325,
        satisfactionRate: 92,
        activeUsers: 214,
        topQueries: [
          { query: 'How does PulseScore work?', count: 78 },
          { query: 'What is organizational culture?', count: 65 },
          { query: 'How can I improve my team engagement?', count: 52 },
          { query: 'What is psychological safety?', count: 49 },
          { query: 'How to reduce employee turnover?', count: 43 }
        ],
        downvotedResponses: [
          { id: '1', userMessage: 'How do I implement a culture survey?', 
            botResponse: 'That\'s a complex topic that requires consideration of multiple factors.', 
            timestamp: '2023-04-02', downvotes: 12 },
          { id: '2', userMessage: 'What\'s the difference between engagement and satisfaction?', 
            botResponse: 'They are related concepts in employee experience measurement.', 
            timestamp: '2023-04-05', downvotes: 8 }
        ],
        languageDistribution: [
          { language: 'English', percentage: 68 },
          { language: 'Spanish', percentage: 12 },
          { language: 'French', percentage: 8 },
          { language: 'German', percentage: 7 },
          { language: 'Portuguese', percentage: 5 }
        ]
      };
    } catch (err) {
      console.error('Error generating analytics summary:', err);
      throw err;
    }
  }
};
