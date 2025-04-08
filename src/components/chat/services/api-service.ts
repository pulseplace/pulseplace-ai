
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Message, SessionInfo, FeedbackData, BotAvatarState } from '../types';
import { pulseAssistantConfig } from '@/config/chatbot-config';

export const callPulseBotAPI = async (
  messages: Message[],
  language: string,
  sessionInfo: SessionInfo
): Promise<string | null> => {
  try {
    // Format messages for the API
    const apiMessages = messages
      .filter(m => m.role === 'bot' ? m.id !== 'welcome_msg' : true) // Filter out welcome message
      .map(m => ({ 
        role: m.role === 'bot' ? 'assistant' : 'user', 
        content: m.content 
      }))
      .concat({ 
        role: 'user', 
        content: messages[messages.length - 1].content 
      });

    // Get system prompt based on selected language
    const systemPrompt = pulseAssistantConfig.systemPrompt[language] || pulseAssistantConfig.systemPrompt.en;

    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('ask-pulsebot', {
      body: { 
        messages: apiMessages,
        systemPrompt,
        maxTokens: 500,
        userIdentifier: sessionInfo.id
      },
    });

    if (error) throw new Error(error.message || 'Failed to get a response');

    // Return the message content
    if (data && data.message) {
      return data.message.content;
    }
    
    return null;
  } catch (error) {
    console.error('Error calling PulseBot API:', error);
    throw error;
  }
};

export const logFeedback = async (messageId: string, content: string, feedback_type: 'up' | 'down', sessionId: string) => {
  try {
    // Insert feedback directly into the pulsebot_feedback table
    const { data, error } = await supabase
      .from('pulsebot_feedback')
      .insert({
        message: content,
        feedback_type,
        user_identifier: sessionId
      });
    
    if (error) throw new Error(error.message || 'Failed to log feedback');
    console.log('Feedback logged successfully');
    return true;
  } catch (err) {
    console.error('Error logging feedback:', err);
    // Silent fail - we don't want to bother the user if feedback logging fails
    return false;
  }
};

export const logInteraction = async (
  sessionId: string,
  userMessage: string, 
  botReply: string, 
  language: string, 
  avatarState: BotAvatarState
) => {
  try {
    const { data, error } = await supabase
      .from('pulsebot_logs')
      .insert({
        session_id: sessionId,
        user_message: userMessage,
        bot_reply: botReply,
        language,
        avatar_state: avatarState,
        created_at: new Date().toISOString()
      });
    
    if (error) throw new Error(error.message || 'Failed to log interaction');
    console.log('Interaction logged successfully');
    return true;
  } catch (err) {
    console.error('Error logging interaction:', err);
    // Silent fail - we don't want to bother the user if interaction logging fails
    return false;
  }
};

export const fetchAnalytics = async (filters?: {
  dateFrom?: Date;
  dateTo?: Date;
  language?: string;
  feedbackType?: string;
}) => {
  try {
    // Query for total interactions
    let logsQuery = supabase
      .from('pulsebot_logs')
      .select('*');
    
    // Apply date filters if provided
    if (filters?.dateFrom) {
      logsQuery = logsQuery.gte('created_at', filters.dateFrom.toISOString());
    }
    
    if (filters?.dateTo) {
      logsQuery = logsQuery.lte('created_at', filters.dateTo.toISOString());
    }
    
    // Apply language filter if provided
    if (filters?.language && filters.language !== 'all') {
      logsQuery = logsQuery.eq('language', filters.language);
    }
    
    const { data: logs, error: logsError } = await logsQuery;
    
    if (logsError) throw logsError;
    
    // Query for feedback data
    let feedbackQuery = supabase
      .from('pulsebot_feedback')
      .select('*');
    
    // Apply date filters if provided
    if (filters?.dateFrom) {
      feedbackQuery = feedbackQuery.gte('timestamp', filters.dateFrom.toISOString());
    }
    
    if (filters?.dateTo) {
      feedbackQuery = feedbackQuery.lte('timestamp', filters.dateTo.toISOString());
    }
    
    // Apply feedback type filter if provided
    if (filters?.feedbackType && filters.feedbackType !== 'all') {
      feedbackQuery = feedbackQuery.eq('feedback_type', filters.feedbackType);
    }
    
    const { data: feedback, error: feedbackError } = await feedbackQuery;
    
    if (feedbackError) throw feedbackError;
    
    // Process the data to generate analytics
    const analytics = processAnalyticsData(logs || [], feedback || []);
    
    return analytics;
  } catch (err) {
    console.error('Error fetching analytics:', err);
    throw err;
  }
};

// Helper function to process analytics data
function processAnalyticsData(logs: any[], feedback: any[]) {
  // Calculate unique users
  const uniqueUsers = new Set(logs.map(log => log.session_id)).size;
  
  // Calculate language breakdown
  const languageCount: Record<string, number> = {};
  logs.forEach(log => {
    const lang = log.language || 'unknown';
    languageCount[lang] = (languageCount[lang] || 0) + 1;
  });
  
  const languageBreakdown = Object.entries(languageCount).map(([language, count]) => ({
    language,
    count,
    percentage: (count / logs.length) * 100
  }));
  
  // Calculate feedback ratio
  const positiveCount = feedback.filter(f => f.feedback_type === 'up').length;
  const negativeCount = feedback.filter(f => f.feedback_type === 'down').length;
  const feedbackRatio = {
    positive: positiveCount,
    negative: negativeCount,
    ratio: positiveCount / (positiveCount + negativeCount) || 0
  };
  
  // Calculate avatar state usage
  const avatarStateCount: Record<string, number> = {};
  logs.forEach(log => {
    const state = log.avatar_state || 'unknown';
    avatarStateCount[state] = (avatarStateCount[state] || 0) + 1;
  });
  
  const avatarStateUsage = Object.entries(avatarStateCount).map(([state, count]) => ({
    state: state as BotAvatarState,
    count,
    percentage: (count / logs.length) * 100
  }));
  
  // Find top queries
  const queryCount: Record<string, number> = {};
  logs.forEach(log => {
    const query = log.user_message;
    if (query) {
      queryCount[query] = (queryCount[query] || 0) + 1;
    }
  });
  
  const topQueries = Object.entries(queryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([query, count]) => ({ query, count }));
  
  // Find top downvoted responses
  const downvotedResponses: Record<string, number> = {};
  feedback.filter(f => f.feedback_type === 'down').forEach(f => {
    downvotedResponses[f.message] = (downvotedResponses[f.message] || 0) + 1;
  });
  
  const topDownvotedResponses = Object.entries(downvotedResponses)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([response, downvotes]) => ({ response, downvotes }));
  
  return {
    totalInteractions: logs.length,
    uniqueUsers,
    languageBreakdown,
    feedbackRatio,
    avatarStateUsage,
    topQueries,
    topDownvotedResponses
  };
}
