
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
