
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, BotAvatarStateValue } from '../types';
import { supabase } from '@/integrations/supabase/client';

export const useMessageSender = (
  sessionId: string,
  addMessage: (message: Message) => void,
  setLoading: (isLoading: boolean) => void,
  handleError: (error: Error) => void
) => {
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isSending) return;

    try {
      setIsSending(true);
      
      // Add user message to the chat
      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: messageText,
        timestamp: new Date(),
      };
      
      addMessage(userMessage);
      setLoading(true);
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ask-pulsebot', {
        body: { 
          messages: [{ role: 'user', content: messageText }],
          systemPrompt: "You are PulseBot, the helpful AI assistant for PulsePlace.ai. Answer questions about workplace culture assessment, PulseScore certification, and platform usage." 
        },
      });

      if (error) throw new Error(error.message || 'Failed to get a response');
      
      // Add bot response to the chat
      if (data && data.message) {
        const botMessage: Message = {
          id: uuidv4(),
          role: data.message.role === 'assistant' ? 'bot' : data.message.role,
          content: data.message.content,
          timestamp: new Date(),
        };
        
        addMessage(botMessage);
      } else {
        throw new Error('Invalid response format from assistant');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      handleError(error as Error);
      
      // Add error message to chat
      addMessage({
        id: uuidv4(),
        role: 'bot',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      });
    } finally {
      setLoading(false);
      setIsSending(false);
    }
  };

  return {
    sendMessage,
    isSending,
  };
};
