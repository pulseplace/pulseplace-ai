
import { supabase } from '@/integrations/supabase/client';
import { Message, SessionInfo } from '../types';
import { pulseAssistantConfig } from '@/config/chatbot-config';

/**
 * Calls the PulseBot API to get a response to the user's message
 */
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
      }));
    
    // Add the last message if not already included
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'user') {
      const alreadyIncluded = apiMessages.some(m => 
        m.role === 'user' && m.content === lastMessage.content
      );
      
      if (!alreadyIncluded) {
        apiMessages.push({ 
          role: 'user', 
          content: lastMessage.content 
        });
      }
    }

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

    if (error) {
      console.error('Error from Supabase edge function:', error);
      return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    }
    
    // Return the message content
    if (data && data.message) {
      return data.message.content;
    }
    
    return "I wasn't able to generate a response. Please try a different question.";
  } catch (error) {
    console.error('Error calling PulseBot API:', error);
    return "An unexpected error occurred. Please try again later.";
  }
};

/**
 * Generates analytics summaries based on PulseBot data
 * @param summaryType Type of summary to generate
 * @param timeRange Time range in days to analyze
 */
export const generateBotAnalyticsSummary = async (
  summaryType: 'general' | 'problems' | 'dashboard',
  timeRange: number = 7
): Promise<string | null> => {
  try {
    // Generate the appropriate prompt based on summary type
    let prompt = '';
    
    if (summaryType === 'general') {
      prompt = `You are an AI summarizer for PulseBot feedback data.

Summarize the overall tone of user feedback from the last ${timeRange} days. Include:
- Common themes in user questions
- Most appreciated bot responses
- Areas where users gave negative feedback
- Any noticeable shifts in language usage or behavior

Use a helpful, executive-friendly tone. Limit to 3 short paragraphs.`;
    } else if (summaryType === 'problems') {
      prompt = `Based on downvoted responses and flagged messages from the last ${timeRange} days:

- What types of bot replies are consistently marked unhelpful?
- Are there specific themes or topics users struggle with?
- What suggestions would you give to improve the bot's responses?

Return a clear, bullet-style list with actionable insights.`;
    } else if (summaryType === 'dashboard') {
      prompt = `Summarize PulseBot activity from the last ${timeRange} days:
- Total interactions
- Positive vs negative feedback ratio
- Top 3 questions users asked
- Most used bot language
- Any red flags or anomalies

Use clear, short sentences suitable for copying into a weekly report.`;
    }

    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('ask-pulsebot', {
      body: { 
        messages: [{ role: 'user', content: prompt }],
        systemPrompt: 'You are an analytics assistant that analyzes PulseBot data and provides insightful summaries.',
        maxTokens: 1000,
      },
    });

    if (error) {
      console.error('Error from Supabase edge function:', error);
      return "Unable to generate analytics summary. Please try again later.";
    }
    
    // Return the message content
    if (data && data.message) {
      return data.message.content;
    }
    
    return "Failed to generate analytics summary. Please try again with different parameters.";
  } catch (error) {
    console.error('Error generating analytics summary:', error);
    return "An unexpected error occurred. Please try again later.";
  }
};
