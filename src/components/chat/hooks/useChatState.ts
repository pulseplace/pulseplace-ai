
import { useState } from 'react';
import { Message } from '../types';

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! Welcome to PulsePlace. How can I help you today?',
      timestamp: new Date().toISOString(),
    },
  ]);

  const addMessage = (message: Omit<Message, 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const updateLastMessage = (content: string) => {
    setMessages(prev => {
      const updatedMessages = [...prev];
      if (updatedMessages.length > 0) {
        const lastMessage = { ...updatedMessages[updatedMessages.length - 1] };
        lastMessage.content = content;
        updatedMessages[updatedMessages.length - 1] = lastMessage;
      }
      return updatedMessages;
    });
  };

  const clearMessages = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hello! Welcome to PulsePlace. How can I help you today?',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return {
    messages,
    setMessages,
    addMessage,
    updateLastMessage,
    clearMessages,
  };
};
