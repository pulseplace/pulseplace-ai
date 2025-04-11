
import { useState, useCallback } from 'react';
import { BotAvatarStateValue, MessageLanguage } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useConfettiControl } from './useConfettiControl';

type MessageHandlers = {
  addUserMessage: (content: string, language: MessageLanguage) => any;
  addBotMessage: (content: string, language: MessageLanguage) => any;
  setLoading: (loading: boolean) => void;
};

export const useBotResponse = (messageHandlers: MessageHandlers) => {
  const { addUserMessage, addBotMessage, setLoading } = messageHandlers;
  const [botAvatarState, setBotAvatarState] = useState<BotAvatarStateValue>('neutral');
  const { toast } = useToast();
  const { triggerConfetti } = useConfettiControl();

  const generateBotResponse = (userMessage: string): string => {
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
  };

  const sendMessage = useCallback(async (text: string, language: MessageLanguage) => {
    if (!text.trim()) return;
    
    // Add user message
    addUserMessage(text, language);
    
    // Update bot state
    setLoading(true);
    setBotAvatarState('thinking');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate bot response
      const responseText = generateBotResponse(text);
      addBotMessage(responseText, language);
      
      setBotAvatarState('neutral');
      
      // Show confetti occasionally
      if (Math.random() > 0.8) {
        triggerConfetti({
          particleCount: 70,
          spread: 360,
          startVelocity: 40
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addBotMessage('Sorry, I encountered an error. Please try again.', language);
      setBotAvatarState('confused');
      
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [addUserMessage, addBotMessage, setLoading, toast, triggerConfetti]);

  return {
    botAvatarState,
    setBotAvatarState,
    sendMessage
  };
};
