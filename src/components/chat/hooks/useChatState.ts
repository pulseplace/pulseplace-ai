import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Message, SessionInfo } from '../types';

export const useChatState = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionInfo] = useState<SessionInfo>(() => ({
    id: `session_${Math.random().toString(36).substring(2, 11)}`,
    createdAt: new Date()
  }));
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: `welcome_${Date.now()}`,
      role: 'bot', 
      content: "Hi, I'm PulseBot — your workplace guide! Ask me anything about surveys, PulseScore, or certification." 
    }
  ]);

  const toggleChat = () => setOpen(!open);

  // Clear chat history functionality
  const clearHistory = () => {
    // Keep the welcome message but clear everything else
    const welcomeMessage = {
      id: `welcome_${Date.now()}`,
      role: 'bot',
      content: "Hi, I'm PulseBot — your workplace guide! Ask me anything about surveys, PulseScore, or certification."
    };
    
    setMessages([welcomeMessage]);
    
    toast({
      description: "Chat history has been cleared",
      duration: 3000,
    });
  };

  return {
    open,
    setOpen,
    loading,
    setLoading,
    sessionInfo,
    messages,
    setMessages,
    toggleChat,
    clearHistory
  };
};
