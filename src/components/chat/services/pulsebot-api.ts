
import { supabase } from '@/integrations/supabase/client';
import { Message, ChatAPIResponse } from '../types';

export interface PulseBotAPIResponse {
  message: string;
  avatar_state?: string;
  feedback?: {
    refs?: string[];
    sources?: string[];
  };
}

export interface PulseBotLogItem {
  id: string;
  user_message: string;
  bot_reply: string;
  avatar_state: string;
  language: string;
  created_at: string;
}

export interface FeedbackItem {
  id: string;
  message: string;
  feedback_type: string;
  timestamp: string;
}

export const pulseBotAPI = {
  async sendMessage(message: string, sessionId: string, language: string = 'en'): Promise<ChatAPIResponse> {
    try {
      // Construct a proper URL to the Supabase Edge Function
      const functionUrl = supabase.functions.url('ask-pulsebot');
      
      const { data, error } = await supabase.functions.invoke('ask-pulsebot', {
        body: { message, session_id: sessionId, language }
      });
      
      if (error) {
        console.error('Error calling PulseBot API:', error);
        throw new Error(error.message || 'Failed to get response from PulseBot');
      }
      
      const response = data as PulseBotAPIResponse;
      
      // Log the interaction in the database
      await this.logInteraction({
        user_message: message,
        bot_reply: response.message,
        avatar_state: response.avatar_state || 'neutral',
        session_id: sessionId,
        language
      });
      
      return {
        text: response.message,
        avatarState: response.avatar_state || 'neutral',
        feedback: response.feedback
      };
    } catch (error) {
      console.error('Error in sendMessage:', error);
      throw error;
    }
  },
  
  async logInteraction(data: {
    user_message: string;
    bot_reply: string;
    avatar_state: string;
    session_id: string;
    language: string;
  }) {
    try {
      const { error } = await supabase
        .from('pulsebot_logs')
        .insert([data]);
      
      if (error) {
        console.error('Error logging interaction:', error);
      }
    } catch (error) {
      console.error('Error in logInteraction:', error);
    }
  },
  
  async submitFeedback(message: string, feedbackType: 'upvote' | 'downvote', userIdentifier: string) {
    try {
      const { data, error } = await supabase.functions.invoke('log-pulsebot-feedback', {
        body: { message, feedback_type: feedbackType, user_identifier: userIdentifier }
      });
      
      if (error) {
        console.error('Error submitting feedback:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in submitFeedback:', error);
      throw error;
    }
  },
  
  async getAnalyticsData(): Promise<{
    logs: PulseBotLogItem[];
    feedback: FeedbackItem[];
  }> {
    try {
      // Get interaction logs
      const { data: logs, error: logsError } = await supabase
        .from('pulsebot_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);
      
      if (logsError) throw logsError;
      
      // Get feedback data
      const { data: feedback, error: feedbackError } = await supabase
        .from('pulsebot_feedback')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1000);
      
      if (feedbackError) throw feedbackError;
      
      return {
        logs: logs as PulseBotLogItem[],
        feedback: feedback as FeedbackItem[]
      };
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      throw error;
    }
  }
};
