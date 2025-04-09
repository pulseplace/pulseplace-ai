import { useState, useRef, useCallback, useEffect } from 'react';
import { Message, BotAvatarState } from '../types';
import { logInteraction } from '../services';

// Maximum number of messages to keep in memory to prevent performance issues
const MAX_MESSAGES = 50;

export const useMessageManagement = (sessionId: string) => {
  // Try to load messages from localStorage
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedMessages = localStorage.getItem('pulsebot_history');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        // Validate the parsed data is an array of messages
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          return parsedMessages;
        }
      }
      // Default welcome message if no saved messages or invalid format
      return [{
        id: 'welcome_msg',
        role: 'assistant',
        content: "Hi! I'm your PulsePlace Assistant. Ask me anything about culture surveys, PulseScore, or certification.",
      }];
    } catch (error) {
      console.error("Error loading chat history:", error);
      // Default welcome message on error
      return [{
        id: 'welcome_msg',
        role: 'assistant',
        content: "Hi! I'm your PulsePlace Assistant. Ask me anything about culture surveys, PulseScore, or certification.",
      }];
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarState>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('pulsebot_history', JSON.stringify(messages));
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  }, [messages]);

  // Function to scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Clear history handler
  const clearHistory = () => {
    const welcomeMessage: Message = {
      id: 'welcome_msg',
      role: 'assistant',
      content: "Hi! I'm your PulsePlace Assistant. Ask me anything about culture surveys, PulseScore, or certification.",
    };
    setMessages([welcomeMessage]);
    
    try {
      // Clear the saved history in localStorage
      localStorage.removeItem('pulsebot_history');
    } catch (error) {
      console.error("Error clearing chat history:", error);
    }
  };
  
  // Function to add messages that also handles memory management
  const safeSetMessages = (newMessages: Message[]) => {
    // If we're approaching the limit, trim the oldest messages but keep the welcome message
    if (newMessages.length > MAX_MESSAGES) {
      const welcomeMessage = newMessages.find(m => m.id === 'welcome_msg');
      const trimmedMessages = newMessages.slice(-MAX_MESSAGES);
      
      // If the welcome message got trimmed, add it back at the start
      if (welcomeMessage && !trimmedMessages.some(m => m.id === 'welcome_msg')) {
        trimmedMessages.unshift(welcomeMessage);
      }
      
      setMessages(trimmedMessages);
    } else {
      setMessages(newMessages);
    }
  };

  return {
    messages,
    setMessages: safeSetMessages,
    loading,
    setLoading,
    botAvatarState,
    setBotAvatarState,
    messagesEndRef,
    scrollToBottom,
    clearHistory
  };
};
