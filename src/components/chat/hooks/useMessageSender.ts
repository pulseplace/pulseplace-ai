
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types';
import { supabase } from '@/integrations/supabase/client';

export const useMessageSender = (
  sessionId: string,
  addMessage: (message: Message) => void,
  setLoading: (isLoading: boolean) => void,
  handleError: (error: Error) => void,
  language: string = 'en'
) => {
  const [isSending, setIsSending] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;

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
          systemPrompt: "You are PulseBot, the helpful AI assistant for PulsePlace.ai. Answer questions about workplace culture assessment, PulseScore certification, and platform usage.",
          language: language
        },
      });

      if (error) throw new Error(error.message || 'Failed to get a response');
      
      // Add bot response to the chat
      if (data && data.message) {
        const botMessage: Message = {
          id: uuidv4(),
          role: data.message.role === 'assistant' ? 'assistant' : data.message.role,
          content: data.message.content,
          timestamp: new Date(),
        };
        
        addMessage(botMessage);
        // Reset retry count on success
        setRetryCount(0);
        setLastError(null);
      } else {
        throw new Error('Invalid response format from assistant');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setLastError(error as Error);
      
      // Implement auto-retry for network errors
      if (retryCount < MAX_RETRIES && (error as Error).message.includes('network')) {
        setRetryCount(prev => prev + 1);
        // Wait and retry
        setTimeout(() => {
          sendMessage(messageText);
        }, 1000 * retryCount);
        return;
      }
      
      handleError(error as Error);
      
      // Add error message to chat
      addMessage({
        id: uuidv4(),
        role: 'assistant',
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
    lastError,
    retryCount
  };
};
