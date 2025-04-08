
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
