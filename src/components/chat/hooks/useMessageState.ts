import { useState, useRef, useEffect } from 'react';
import { Message, MessageLanguage } from '../types';
import { useToast } from '@/hooks/use-toast';

export const useMessageState = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi there! I\'m PulseBot, your AI assistant for workplace culture. How can I help you today?',
      timestamp: new Date(),
      language: 'en',
    };
    
    setMessages([welcomeMessage]);
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const addUserMessage = (content: string, language: MessageLanguage) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      language,
    };
    
    setMessages(prev => [...prev, userMessage]);
    return userMessage;
  };

  const addBotMessage = (content: string, language: MessageLanguage) => {
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      language,
    };
    
    setMessages(prev => [...prev, botMessage]);
    return botMessage;
  };

  const handleFeedback = (messageId: string, value: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { 
              ...message, 
              liked: value === 'positive' ? true : message.liked,
              disliked: value === 'negative' ? true : message.disliked
            }
          : message
      )
    );
    
    toast({
      title: value === 'positive' ? "Thanks for the positive feedback!" : "Thanks for your feedback",
      description: value === 'positive' 
        ? "We're glad this response was helpful." 
        : "We'll use this to improve future responses.",
    });
  };

  const clearHistory = () => {
    // Keep only the welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi there! I\'m PulseBot, your AI assistant for workplace culture. How can I help you today?',
      timestamp: new Date(),
      language: 'en',
    };
    
    setMessages([welcomeMessage]);
    
    toast({
      title: "Chat History Cleared",
      description: "Your conversation history has been cleared.",
    });
  };

  return {
    messages,
    setMessages,
    loading,
    setLoading,
    messagesEndRef,
    addUserMessage,
    addBotMessage,
    handleFeedback,
    clearHistory
  };
};
