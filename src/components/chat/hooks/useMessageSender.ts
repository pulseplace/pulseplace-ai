
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '@/components/chat/types';
import { pulseBotAPI } from '../services';

export const useMessageSender = (
  sessionId: string,
  addMessage: (message: ChatMessage) => void,
  setIsTyping: (isTyping: boolean) => void,
  handleError: (error: Error) => void
) => {
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isSending) return;

    try {
      setIsSending(true);
      
      // Add user message to the chat
      const userMessage: ChatMessage = {
        id: uuidv4(),
        role: 'user',
        content: messageText,
        timestamp: new Date(),
      };
      
      addMessage(userMessage);
      setIsTyping(true);
      
      // Send message to API
      const response = await pulseBotAPI.sendMessage(sessionId, messageText);
      
      // Add bot response to the chat
      if (response.message) {
        const botMessage: ChatMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: response.message,
          timestamp: new Date(),
          // If we have avatar state or context in the response, add it
          avatarState: response.avatarState,
          context: response.context,
        };
        
        addMessage(botMessage);
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  };

  return {
    sendMessage,
    isSending,
  };
};
