
import { useState, useRef, useCallback, useEffect } from 'react';
import { Message, BotAvatarState } from '../types';
import { logInteraction } from '../services';

export const useMessageManagement = (sessionId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarState>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome_msg',
      role: 'bot',
      content: "Hi! I'm your PulsePlace Assistant. Ask me anything about culture surveys, PulseScore, or certification.",
    };
    setMessages([welcomeMessage]);
  }, []);

  // Function to scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Clear history handler
  const clearHistory = () => {
    const welcomeMessage: Message = {
      id: 'welcome_msg',
      role: 'bot',
      content: "Hi! I'm your PulsePlace Assistant. Ask me anything about culture surveys, PulseScore, or certification.",
    };
    setMessages([welcomeMessage]);
  };

  return {
    messages,
    setMessages,
    loading,
    setLoading,
    botAvatarState,
    setBotAvatarState,
    messagesEndRef,
    scrollToBottom,
    clearHistory
  };
};
