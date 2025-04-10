
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types';

interface MessageSenderProps {
  onMessageSent: (message: Message) => void;
  onLoading: (isLoading: boolean) => void;
  onError: (error: Error) => void;
}

export const useMessageSender = ({ onMessageSent, onLoading, onError }: MessageSenderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async (content: string, language: string = 'en', additionalMetadata?: any) => {
    if (!content.trim()) return;
    
    try {
      setIsLoading(true);
      onLoading(true);
      
      // Create a user message
      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };
      
      onMessageSent(userMessage);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a bot response
      const botResponse: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: `I received your message: "${content.trim()}"`,
        timestamp: new Date().toISOString(),
      };
      
      onMessageSent(botResponse);
    } catch (error) {
      console.error('Error sending message:', error);
      onError(error instanceof Error ? error : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
      onLoading(false);
    }
  };

  return {
    isLoading,
    inputValue,
    setInputValue,
    sendMessage
  };
};
