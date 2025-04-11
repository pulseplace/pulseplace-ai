
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, MessageFeedback, MessageLanguage } from '../types';
import { toast } from 'sonner';
import { logFeedback } from '../services/feedback-service';

export function useMessageHistory() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm PulseBot, your AI assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
      avatarState: 'happy'
    }
  ]);

  // Add a new message to the history
  const addMessage = (message: Omit<Message, 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  // Add a user message
  const addUserMessage = (content: string, language?: MessageLanguage) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      language
    };
    
    setMessages(prev => [...prev, userMessage]);
    return userMessage;
  };

  // Add a bot message
  const addBotMessage = (content: string, avatarState?: Message['avatarState']) => {
    const botMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content,
      timestamp: new Date().toISOString(),
      avatarState: avatarState || 'neutral'
    };
    
    setMessages(prev => [...prev, botMessage]);
    return botMessage;
  };

  // Handle feedback on messages
  const handleFeedback = async (messageId: string, value: 'positive' | 'negative', sessionId: string) => {
    // Find the message
    const message = messages.find(msg => msg.id === messageId);
    
    if (!message) {
      console.error('Message not found:', messageId);
      return;
    }
    
    // Log feedback to service
    try {
      await logFeedback(messageId, message.content, value === 'positive' ? 'up' : 'down', sessionId);
      
      // Update the messages with the feedback
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, feedback: value } 
            : msg
        )
      );
      
      // Show success toast
      toast.success(`Thank you for your ${value} feedback!`);
    } catch (error) {
      console.error('Error logging feedback:', error);
      toast.error('Failed to log feedback. Please try again.');
    }
  };

  // Clear chat history
  const clearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm PulseBot, your AI assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
        avatarState: 'happy'
      }
    ]);
    
    toast.success('Chat history cleared');
  };

  return {
    messages,
    setMessages,
    addMessage,
    addUserMessage,
    addBotMessage,
    handleFeedback,
    clearHistory
  };
}
