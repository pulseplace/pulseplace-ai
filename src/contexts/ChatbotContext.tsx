import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  isChatOpen: boolean;
  sendMessage: (content: string) => Promise<void>;
  toggleChat: () => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-message',
          role: 'assistant',
          content: "Hi! I'm PulseBot, your AI assistant for workplace culture improvement. I can help you understand your culture metrics, certification progress, and provide insights to enhance your work environment.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  // Generate a unique ID for messages
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message to the chat
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('pulsebot-assistant', {
        body: { 
          message: content,
          sessionId: generateId(),
          language: 'en'
        },
      });

      if (error) throw new Error(error.message || 'Failed to get a response');

      if (data && data.reply) {
        const assistantMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Communication Error",
        description: "Unable to reach PulseBot. Please try again later.",
        variant: "destructive",
      });
      
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-message',
        role: 'assistant',
        content: "Hi! I'm PulseBot, your AI assistant for workplace culture improvement. I can help you understand your culture metrics, certification progress, and provide insights to enhance your work environment.",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        isChatOpen,
        sendMessage,
        toggleChat,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
