import { useState, useCallback } from 'react';
import { Message, MessageLanguage } from '../types';
import { useToast } from '@/hooks/use-toast';

export const useMessageHandler = (sessionInfo: any, setSessionInfo: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const addMessage = useCallback((message: Omit<Message, 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    // Update session info based on message role
    setSessionInfo(prev => ({
      ...prev,
      messageCount: prev.messageCount + 1,
      userMessageCount: message.role === 'user' ? prev.userMessageCount + 1 : prev.userMessageCount,
      botMessageCount: message.role === 'assistant' ? prev.botMessageCount + 1 : prev.botMessageCount
    }));

    return newMessage;
  }, [setSessionInfo]);

  const sendMessage = useCallback(async (text: string, language: MessageLanguage) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      language,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Simulate bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateBotResponse(text),
        timestamp: new Date(),
        language,
      };
      
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
      
      // Show success toast occasionally
      if (Math.random() > 0.8) {
        toast({
          title: "Helpful insight!",
          description: "I've shared an important insight based on our analysis.",
        });
      }
    }, 1500);
  }, [toast]);

  const handleFeedback = useCallback((messageId: string, value: 'positive' | 'negative') => {
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
  }, [toast]);

  const clearHistory = useCallback(() => {
    // Keep only the welcome message or reset to empty
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
  }, [toast]);

  // Initialize with welcome message if needed
  useCallback(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: 'Hi there! I\'m PulseBot, your AI assistant for workplace culture. How can I help you today?',
        timestamp: new Date(),
        language: 'en',
      };
      
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  return {
    messages,
    loading,
    addMessage,
    sendMessage,
    handleFeedback,
    clearHistory
  };
};

// Helper function
function generateBotResponse(userMessage: string): string {
  const responses = [
    "I understand you're asking about workplace culture. Our PulsePlace platform can help measure and improve trust in your organization.",
    "That's a great question about employee engagement. Our AI-powered analytics can provide insights based on real-time feedback.",
    "PulsePlace certification is based on verified employee feedback data, not just testimonials. It's a powerful tool for employer branding.",
    "Our pulse surveys are designed to measure trust without causing survey fatigue. They're quick, engaging, and provide valuable insights.",
    "Would you like to know more about how our dashboard works? It provides real-time metrics on your workplace culture.",
    "The PulseScore™ is our proprietary metric that quantifies workplace trust based on multiple factors.",
    "I'd be happy to explain how our certification process works. It involves data collection, analysis, and verification.",
    "Many organizations see significant improvements in retention and productivity after implementing PulsePlace."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
